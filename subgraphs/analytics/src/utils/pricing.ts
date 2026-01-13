/* eslint-disable prefer-const */
import { Bundle, Pool, Token } from '../types/schema'
import { BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { absBigInt, exponentToBigDecimal, safeDiv } from '../utils/index'
import { MAX_TICK_DEVIATION_FOR_PRICING, ONE_BD, Q192, ZERO_BD, ZERO_BI } from './constants'
import { 
  REFERENCE_TOKEN, 
  STABLE_TOKEN_POOL, 
  MINIMUM_NATIVE_LOCKED,
  WHITELIST_TOKENS,
  STABLE_COINS
} from './chain'

function getPoolPreviousTickOrCurrent(pool: Pool): BigInt {
  const value = pool.previousTick
  if (value === null) {
    return pool.tick
  }
  return value
}

export function priceToTokenPrices(price: BigInt, token0: Token, token1: Token): BigDecimal[] {
  let num = price.times(price).toBigDecimal()
  let denom = Q192.toBigDecimal()
  let price1 = num
    .div(denom)
    .times(exponentToBigDecimal(token0.decimals))
    .div(exponentToBigDecimal(token1.decimals))

  let price0 = safeDiv(BigDecimal.fromString('1'), price1)
  return [price0, price1]
}

export function getEthPriceInUSD(): BigDecimal {
  let usdcPool = Pool.load(STABLE_TOKEN_POOL)
  if (usdcPool !== null) {
    if (usdcPool.token0 == REFERENCE_TOKEN) return usdcPool.token1Price
    else return usdcPool.token0Price
  } else {
    return ZERO_BD
  }
} 

/**
 * Search through graph to find derived Native token per token.
 **/
export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == REFERENCE_TOKEN) {
    return ONE_BD
  }
  let whiteList = token.whitelistPools
  // for now just take USD from pool with greatest TVL
  // need to update this to actually detect best rate based on liquidity distribution
  let largestLiquidityNative = ZERO_BD
  let priceSoFar = ZERO_BD
  let bundle = Bundle.load('1')

  // hardcoded fix for incorrect rates
  // if whitelist includes token - get the safe price
  if (STABLE_COINS.includes(token.id)) {
    priceSoFar = safeDiv(ONE_BD, bundle!.maticPriceUSD)
  } else {
  for (let i = 0; i < whiteList.length; ++i) {
    let poolAddress = whiteList[i]
    let pool = Pool.load(poolAddress)!
    if (pool.liquidity.gt(ZERO_BI)) {

      // Ignore pools with suspiciously large tick deviation since the previous swap/update.
      const previousTick = getPoolPreviousTickOrCurrent(pool)
      let tickDeviation = absBigInt(pool.tick.minus(previousTick))
      if (tickDeviation.gt(MAX_TICK_DEVIATION_FOR_PRICING)) {
        log.warning('ignore pool {} , tick deviation {}', [pool.id, tickDeviation.toString()])
        continue
      }

      if (pool.token0 == token.id) {
        // whitelist token is token1
        let token1 = Token.load(pool.token1)!
        // get the derived Native in pool
        let nativeLocked = pool.totalValueLockedToken1.times(token1.derivedMatic)
        if (nativeLocked.gt(largestLiquidityNative) && nativeLocked.gt(MINIMUM_NATIVE_LOCKED)) {
          largestLiquidityNative = nativeLocked
          // token1 per our token * Native per token1
          priceSoFar = pool.token1Price.times(token1.derivedMatic as BigDecimal)
        }
      }
      if (pool.token1 == token.id) {
        let token0 = Token.load(pool.token0)!
        // get the derived Native in pool
        let nativeLocked = pool.totalValueLockedToken0.times(token0.derivedMatic)
        if (nativeLocked.gt(largestLiquidityNative) && nativeLocked.gt(MINIMUM_NATIVE_LOCKED)) {
          largestLiquidityNative = nativeLocked
          // token0 per our token * Native per token0
          priceSoFar = pool.token0Price.times(token0.derivedMatic as BigDecimal)
        }
      }
    }
  }
}
  return priceSoFar // nothing was found return 0
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
export function getTrackedAmountUSD(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token
): BigDecimal {
  let bundle = Bundle.load('1')!
  let price0USD = token0.derivedMatic.times(bundle.maticPriceUSD)
  let price1USD = token1.derivedMatic.times(bundle.maticPriceUSD)

  // both are whitelist tokens, return sum of both amounts
  if (WHITELIST_TOKENS.includes(token0.id) && WHITELIST_TOKENS.includes(token1.id)) {
    return tokenAmount0.times(price0USD).plus(tokenAmount1.times(price1USD))
  }

  // take double value of the whitelisted token amount
  if (WHITELIST_TOKENS.includes(token0.id) && !WHITELIST_TOKENS.includes(token1.id)) {
    return tokenAmount0.times(price0USD).times(BigDecimal.fromString('2'))
  }

  // take double value of the whitelisted token amount
  if (!WHITELIST_TOKENS.includes(token0.id) && WHITELIST_TOKENS.includes(token1.id)) {
    return tokenAmount1.times(price1USD).times(BigDecimal.fromString('2'))
  }

  // neither token is on white list, tracked amount is 0
  return ZERO_BD
}
