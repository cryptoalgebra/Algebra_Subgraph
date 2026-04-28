import { ZERO_BD, ZERO_BI, ONE_BI } from './constants'
/* eslint-disable prefer-const */
import {
  AlgebraDayData,
  AlgebraHourData,
  Factory,
  Pool,
  PoolDayData,
  Token,
  TokenDayData,
  TokenHourData,
  Bundle,
  PoolHourData,
  PoolMinuteData,
  FeeHourData
} from '../types/schema'
import { FACTORY_ADDRESS } from './chain'
import { ethereum, BigInt } from '@graphprotocol/graph-ts'


/**
 * Tracks global aggregate data over daily windows
 * @param event
 */
export function updateAlgebraDayData(event: ethereum.Event): AlgebraDayData {
  let algebra = Factory.load(FACTORY_ADDRESS)!
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400 // rounded
  let dayStartTimestamp = dayID * 86400
  let algebraDayData = AlgebraDayData.load(dayID.toString())
  if (algebraDayData === null) {
    algebraDayData = new AlgebraDayData(dayID.toString())
    algebraDayData.date = dayStartTimestamp
    algebraDayData.volumeMatic = ZERO_BD
    algebraDayData.volumeUSD = ZERO_BD
    algebraDayData.volumeUSDUntracked = ZERO_BD
    algebraDayData.feesUSD = ZERO_BD
  }
  algebraDayData.tvlUSD = algebra.totalValueLockedUSD
  algebraDayData.txCount = algebra.txCount
  algebraDayData.save()
  return algebraDayData as AlgebraDayData
}


/**
 * Tracks global aggregate data over hour windows
 * @param event
 */
export function updateAlgebraHourData(event: ethereum.Event): AlgebraHourData {
  let algebra = Factory.load(FACTORY_ADDRESS)!
  let timestamp = event.block.timestamp.toI32()
  let hourID = timestamp / 3600 // rounded
  let hourStartTimestamp = hourID * 3600
  let algebraHourData = AlgebraHourData.load(hourID.toString())
  if (algebraHourData === null) {
    algebraHourData = new AlgebraHourData(hourID.toString())
    algebraHourData.date = hourStartTimestamp
    algebraHourData.volumeMatic = ZERO_BD
    algebraHourData.volumeUSD = ZERO_BD
    algebraHourData.volumeUSDUntracked = ZERO_BD
    algebraHourData.feesUSD = ZERO_BD
  }
  algebraHourData.tvlUSD = algebra.totalValueLockedUSD
  algebraHourData.txCount = algebra.txCount
  algebraHourData.save()
  return algebraHourData as AlgebraHourData
}

export function updatePoolDayData(event: ethereum.Event): PoolDayData {
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayStartTimestamp = dayID * 86400
  let dayPoolID = event.address
    .toHexString()
    .concat('-')
    .concat(dayID.toString())
  let pool = Pool.load(event.address.toHexString())!
  let poolDayData = PoolDayData.load(dayPoolID)
  if (poolDayData === null) {
    poolDayData = new PoolDayData(dayPoolID)
    poolDayData.date = dayStartTimestamp
    poolDayData.pool = pool.id
    // things that dont get initialized always
    poolDayData.volumeToken0 = ZERO_BD
    poolDayData.volumeToken1 = ZERO_BD
    poolDayData.feesToken0 = ZERO_BD
    poolDayData.feesToken1 = ZERO_BD
    poolDayData.volumeUSD = ZERO_BD
    poolDayData.untrackedVolumeUSD = ZERO_BD
    poolDayData.feesUSD = ZERO_BD
    poolDayData.txCount = ZERO_BI
    poolDayData.open = pool.token0Price
    poolDayData.high = pool.token0Price
    poolDayData.low = pool.token0Price
  }

  if (pool.token0Price.gt(poolDayData.high)) {
    poolDayData.high = pool.token0Price
  }
  if (pool.token0Price.lt(poolDayData.low)) {
    poolDayData.low = pool.token0Price
  }

  poolDayData.liquidity = pool.liquidity
  poolDayData.sqrtPrice = pool.sqrtPrice

  poolDayData.token0Price = pool.token0Price
  poolDayData.token1Price = pool.token1Price
  poolDayData.close = pool.token0Price
  poolDayData.tick = pool.tick
  poolDayData.tvlUSD = pool.totalValueLockedUSD
  poolDayData.txCount = poolDayData.txCount.plus(ONE_BI)
  poolDayData.save()

  return poolDayData as PoolDayData
}

export function updateFeeHourData(event: ethereum.Event, Fee: BigInt, overrideFee: BigInt, pluginFee: BigInt): void{
  let timestamp = event.block.timestamp.toI32()
  let hourIndex = timestamp / 3600 
  let hourStartUnix = hourIndex * 3600
  let hourFeeID = event.address
    .toHexString()
    .concat('-')
    .concat(hourIndex.toString())
  let FeeHourDataEntity = FeeHourData.load(hourFeeID)
  if(FeeHourDataEntity){
    FeeHourDataEntity.timestamp = BigInt.fromI32(hourStartUnix)
    FeeHourDataEntity.fee += Fee
    FeeHourDataEntity.changesCount += ONE_BI
    if(FeeHourDataEntity.maxFee < Fee) FeeHourDataEntity.maxFee = Fee
    if(FeeHourDataEntity.minFee > Fee) FeeHourDataEntity.minFee = Fee  
    FeeHourDataEntity.endFee = Fee
    if (overrideFee > ZERO_BI) {
      FeeHourDataEntity.hasOverrideFee = true
      FeeHourDataEntity.overrideFee = overrideFee
    }
    if (pluginFee > ZERO_BI) {
      FeeHourDataEntity.pluginFee = pluginFee
    }
  }
  else{
    FeeHourDataEntity = new FeeHourData(hourFeeID)
    FeeHourDataEntity.timestamp = BigInt.fromI32(hourStartUnix)
    FeeHourDataEntity.fee = Fee
    FeeHourDataEntity.changesCount = ONE_BI
    FeeHourDataEntity.pool = event.address.toHexString()
    FeeHourDataEntity.hasOverrideFee = overrideFee > ZERO_BI
    FeeHourDataEntity.overrideFee = overrideFee
    FeeHourDataEntity.pluginFee = pluginFee
    if(Fee != ZERO_BI){
      FeeHourDataEntity.startFee = Fee
      FeeHourDataEntity.endFee = Fee
      FeeHourDataEntity.maxFee = Fee 
      FeeHourDataEntity.minFee = Fee 
    } else {
      FeeHourDataEntity.startFee = ZERO_BI
      FeeHourDataEntity.endFee = ZERO_BI
      FeeHourDataEntity.maxFee = ZERO_BI 
      FeeHourDataEntity.minFee = ZERO_BI 
    }

  }
  FeeHourDataEntity.save()
}

export function updatePoolHourData(event: ethereum.Event): PoolHourData {
  let timestamp = event.block.timestamp.toI32()
  let hourIndex = timestamp / 3600 // get unique hour within unix history
  let hourStartUnix = hourIndex * 3600 // want the rounded effect
  let hourPoolID = event.address
    .toHexString()
    .concat('-')
    .concat(hourIndex.toString())
  let pool = Pool.load(event.address.toHexString())!
  let poolHourData = PoolHourData.load(hourPoolID)
  if (poolHourData === null) {
    poolHourData = new PoolHourData(hourPoolID)
    poolHourData.periodStartUnix = hourStartUnix
    poolHourData.pool = pool.id
    // things that dont get initialized always
    poolHourData.volumeToken0 = ZERO_BD
    poolHourData.volumeToken1 = ZERO_BD
    poolHourData.volumeUSD = ZERO_BD
    poolHourData.untrackedVolumeUSD = ZERO_BD
    poolHourData.txCount = ZERO_BI
    poolHourData.feesUSD = ZERO_BD

    poolHourData.open = pool.token0Price
    poolHourData.high = pool.token0Price
    poolHourData.low = pool.token0Price
  }

  if (pool.token0Price.gt(poolHourData.high)) {
    poolHourData.high = pool.token0Price
  }
  if (pool.token0Price.lt(poolHourData.low)) {
    poolHourData.low = pool.token0Price
  }

  poolHourData.liquidity = pool.liquidity
  poolHourData.sqrtPrice = pool.sqrtPrice
  poolHourData.token0Price = pool.token0Price
  poolHourData.token1Price = pool.token1Price
  poolHourData.close = pool.token0Price
  poolHourData.tick = pool.tick
  poolHourData.tvlUSD = pool.totalValueLockedUSD
  poolHourData.txCount = poolHourData.txCount.plus(ONE_BI)
  poolHourData.save()

  // test
  return poolHourData as PoolHourData
}

export function updatePoolMinuteData(event: ethereum.Event): PoolMinuteData {
  let timestamp = event.block.timestamp.toI32()
  let minuteIndex = timestamp / 60
  let minuteStartUnix = minuteIndex * 60
  let minutePoolID = event.address
    .toHexString()
    .concat('-')
    .concat(minuteIndex.toString())
  let pool = Pool.load(event.address.toHexString())!
  let poolMinuteData = PoolMinuteData.load(minutePoolID)
  if (poolMinuteData === null) {
    poolMinuteData = new PoolMinuteData(minutePoolID)
    poolMinuteData.periodStartUnix = minuteStartUnix
    poolMinuteData.pool = pool.id
    poolMinuteData.volumeToken0 = ZERO_BD
    poolMinuteData.volumeToken1 = ZERO_BD
    poolMinuteData.volumeUSD = ZERO_BD
    poolMinuteData.untrackedVolumeUSD = ZERO_BD
    poolMinuteData.txCount = ZERO_BI
    poolMinuteData.feesUSD = ZERO_BD

    poolMinuteData.open = pool.token0Price
    poolMinuteData.high = pool.token0Price
    poolMinuteData.low = pool.token0Price
  }

  if (pool.token0Price.gt(poolMinuteData.high)) {
    poolMinuteData.high = pool.token0Price
  }
  if (pool.token0Price.lt(poolMinuteData.low)) {
    poolMinuteData.low = pool.token0Price
  }

  poolMinuteData.liquidity = pool.liquidity
  poolMinuteData.sqrtPrice = pool.sqrtPrice
  poolMinuteData.token0Price = pool.token0Price
  poolMinuteData.token1Price = pool.token1Price
  poolMinuteData.close = pool.token0Price
  poolMinuteData.tick = pool.tick
  poolMinuteData.tvlUSD = pool.totalValueLockedUSD
  poolMinuteData.txCount = poolMinuteData.txCount.plus(ONE_BI)
  poolMinuteData.save()

  return poolMinuteData as PoolMinuteData
}

export function updateTokenDayData(token: Token, event: ethereum.Event): TokenDayData {
  let bundle = Bundle.load('1')!
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayStartTimestamp = dayID * 86400
  let tokenDayID = token.id
    .toString()
    .concat('-')
    .concat(dayID.toString())
  let tokenPrice = token.derivedMatic.times(bundle.maticPriceUSD)

  let tokenDayData = TokenDayData.load(tokenDayID)
  if (tokenDayData === null) {
    tokenDayData = new TokenDayData(tokenDayID)
    tokenDayData.date = dayStartTimestamp
    tokenDayData.token = token.id
    tokenDayData.volume = ZERO_BD
    tokenDayData.volumeUSD = ZERO_BD
    tokenDayData.feesUSD = ZERO_BD
    tokenDayData.untrackedVolumeUSD = ZERO_BD
    tokenDayData.open = tokenPrice
    tokenDayData.high = tokenPrice
    tokenDayData.low = tokenPrice
  }

  if (tokenPrice.gt(tokenDayData.high)) {
    tokenDayData.high = tokenPrice
  }

  if (tokenPrice.lt(tokenDayData.low)) {
    tokenDayData.low = tokenPrice
  }

  tokenDayData.close = tokenPrice
  tokenDayData.priceUSD = token.derivedMatic.times(bundle.maticPriceUSD)
  tokenDayData.totalValueLocked = token.totalValueLocked
  tokenDayData.totalValueLockedUSD = token.totalValueLockedUSD
  tokenDayData.save()

  return tokenDayData as TokenDayData
}


export function updateTokenHourData(token: Token, event: ethereum.Event): TokenHourData {
  let bundle = Bundle.load('1')!
  let timestamp = event.block.timestamp.toI32()
  let hourIndex = timestamp / 3600 // get unique hour within unix history
  let hourStartUnix = hourIndex * 3600 // want the rounded effect
  let tokenHourID = token.id
    .toString()
    .concat('-')
    .concat(hourIndex.toString())
  let tokenHourData = TokenHourData.load(tokenHourID)
  let tokenPrice = token.derivedMatic.times(bundle.maticPriceUSD)

  if (tokenHourData === null) {
    tokenHourData = new TokenHourData(tokenHourID)
    tokenHourData.periodStartUnix = hourStartUnix
    tokenHourData.token = token.id
    tokenHourData.volume = ZERO_BD
    tokenHourData.volumeUSD = ZERO_BD
    tokenHourData.untrackedVolumeUSD = ZERO_BD
    tokenHourData.feesUSD = ZERO_BD
    tokenHourData.open = tokenPrice
    tokenHourData.high = tokenPrice
    tokenHourData.low = tokenPrice
    tokenHourData.close = tokenPrice
  }

  if (tokenPrice.gt(tokenHourData.high)) {
    tokenHourData.high = tokenPrice
  }

  if (tokenPrice.lt(tokenHourData.low)) {
    tokenHourData.low = tokenPrice
  }

  tokenHourData.close = tokenPrice
  tokenHourData.priceUSD = tokenPrice
  tokenHourData.totalValueLocked = token.totalValueLocked
  tokenHourData.totalValueLockedUSD = token.totalValueLockedUSD
  tokenHourData.save()

  return tokenHourData as TokenHourData
}
