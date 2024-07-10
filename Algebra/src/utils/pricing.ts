/* eslint-disable prefer-const */
import { ONE_BD, ONE_BI, ZERO_BD, ZERO_BI } from './constants'
import { Bundle, Pool, Token } from './../types/schema'
import { BigDecimal, BigInt} from '@graphprotocol/graph-ts'
import { exponentToBigDecimal, safeDiv, getAmounts } from '../utils/index'

const WBNB_ADDRESS = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
export const USDT_WBNB_POOL = '0xd405b976ac01023c9064024880999fc450a8668b'

// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
export let WHITELIST_TOKENS: string[] = [
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
  '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD 
  '0x55d398326f99059ff775485246999027b3197955', // USDT
  '0x2170ed0880ac9a755fd29b2688956bd959f933f8', // ETH
  '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', // BTCB
  '0x90c97f71e18723b0cf0dfa30ee176ab653e89f40', // FRAX
  '0xf4c8e32eadec4bfe97e0f595add0f4450a863a11', // THE
  '0x1bdd3cf7f79cfb8edbb955f20ad99211551ba275', // BNBx
  '0x52f24a5e03aee338da5fd9df68d2b6fae1178827', // ankrBNB
  '0xf7de7e8a6bd59ed41a4b5fe50278b3b7f31384df', // RDNT
  '0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5', // HAY
  '0x2952beb1326accbb5243725bd4da2fc937bca087', // wUSDR
  '0x64048a7eecf3a2f1ba9e144aac3d7db6e58f555e', // frxETH
  '0xf307910a4c7bbc79691fd374889b36d8531b08e3', // ANKR
]

let MINIMUM_BNB_LOCKED = BigDecimal.fromString('5')

let Q192 = Math.pow(2, 192)

let STABLE_COINS: string[] = [
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
  '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  '0x55d398326f99059ff775485246999027b3197955', // USDT
  '0x90c97f71e18723b0cf0dfa30ee176ab653e89f40', // FRAX
  '0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5', // HAY
]

let BLACKLIST_POOLS: string[] = []

export function priceToTokenPrices(price: BigInt, token0: Token, token1: Token): BigDecimal[] {
  let num = price.times(price).toBigDecimal()
  let denom = BigDecimal.fromString(Q192.toString())
  let price1 = num
    .div(denom)
    .times(exponentToBigDecimal(token0.decimals))
    .div(exponentToBigDecimal(token1.decimals))

  let price0 = safeDiv(BigDecimal.fromString('1'), price1)
  return [price0, price1]
}

export function getEthPriceInUSD(): BigDecimal {
  let usdtPool = Pool.load(USDT_WBNB_POOL) // usdt is token0
  if (usdtPool !== null) {
    return usdtPool.token0Price
  } else {
    return ZERO_BD
  }
} 


/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived Bnb (add stablecoin estimates)
 **/
export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == WBNB_ADDRESS) {
    return ONE_BD
  }
  let whiteList = token.whitelistPools
  // for now just take USD from pool with greatest TVL
  // need to update this to actually detect best rate based on liquidity distribution
  let largestliquidityConcentration = ZERO_BD
  let priceSoFar = ZERO_BD
  let bundle = Bundle.load('1')

  // hardcoded fix for incorrect rates
  // if whitelist includes token - get the safe price
  if (STABLE_COINS.includes(token.id)) {
    priceSoFar = safeDiv(ONE_BD, bundle!.bnbPriceUSD)
  } else {
  for (let i = 0; i < whiteList.length; ++i) {
    let poolAddress = whiteList[i]
    let pool = Pool.load(poolAddress)!
    if (pool.liquidity.gt(ZERO_BI) && !(BLACKLIST_POOLS.includes(poolAddress))) {

      if (pool.token0 == token.id) {
        // whitelist token is token1
        let token1 = Token.load(pool.token1)!

        let amount = getAmounts(pool.liquidity, pool.tick.minus(BigInt.fromI32(61)), pool.tick.minus(ONE_BI),  pool.tick, false)
        let liquidityConcentration = amount.div(token1.decimals.toBigDecimal()).times(token1.derivedBnb)

        // get the derived Bnb in pool
        let bnbLocked = pool.totalValueLockedToken1.times(token1.derivedBnb)
        if ( liquidityConcentration.gt(largestliquidityConcentration) && bnbLocked.gt(MINIMUM_BNB_LOCKED)) {
          largestliquidityConcentration = liquidityConcentration
          // token1 per our token * Eth per token1
          priceSoFar = pool.token1Price.times(token1.derivedBnb as BigDecimal)
        }
      }
      if (pool.token1 == token.id) {
        let token0 = Token.load(pool.token0)!


        let amount = getAmounts(pool.liquidity, pool.tick.plus(ONE_BI), pool.tick.plus(BigInt.fromI32(61)), pool.tick, true)
        let liquidityConcentration = amount.div(token0.decimals.toBigDecimal()).times(token0.derivedBnb)

        // get the derived Bnb in pool
        let bnbLocked = pool.totalValueLockedToken0.times(token0.derivedBnb)
        if (liquidityConcentration.gt(largestliquidityConcentration) && bnbLocked.gt(MINIMUM_BNB_LOCKED)) {
          largestliquidityConcentration = liquidityConcentration
          // token0 per our token * Bnb per token0
          priceSoFar = pool.token0Price.times(token0.derivedBnb as BigDecimal)
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
  let price0USD = token0.derivedBnb.times(bundle.bnbPriceUSD)
  let price1USD = token1.derivedBnb.times(bundle.bnbPriceUSD)

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
