/* eslint-disable prefer-const */
import { FACTORY_ADDRESS, WHITELIST_TOKENS} from '../utils/chain'
import { ZERO_BI, ONE_BI, ZERO_BD, ZERO_ADDRESS} from '../utils/constants'
import { Factory, PositionTransferCache } from '../types/schema'
import { Pool as PoolEvent } from '../types/Factory/Factory'
import { DefaultCommunityFee, CustomPool } from '../types/Factory/Factory'
import { Pool, Token, Bundle } from '../types/schema'
import { Pool as PoolTemplate} from '../types/templates'
import { fetchTokenSymbol, fetchTokenName, fetchTokenTotalSupply, fetchTokenDecimals } from '../utils/token'
import { log, BigInt, Address } from '@graphprotocol/graph-ts'

export function handlePoolCreated(event: PoolEvent): void {
  let pool = event.params.pool.toHexString()
  let token0 = event.params.token0.toHexString()
  let token1 = event.params.token1.toHexString()
  let deployer = ZERO_ADDRESS
  let timestamp = event.block.timestamp
  let blockNumber = event.block.number

  createPool(pool, token0, token1, deployer, timestamp, blockNumber)
}

export function handleCustomPoolCreated(event: CustomPool): void {
  let pool = event.params.pool.toHexString()
  let token0 = event.params.token0.toHexString()
  let token1 = event.params.token1.toHexString()
  let deployer = event.params.deployer.toHexString()
  let timestamp = event.block.timestamp
  let blockNumber = event.block.number

  createPool(pool, token0, token1, deployer, timestamp, blockNumber)
}

function createPool(
  poolAddress: string, 
  token0Address: string, 
  token1Address: string, 
  deployer: string, 
  timestamp: BigInt, 
  blockNumber: BigInt
): void {
  // load factory
  let factory = Factory.load(FACTORY_ADDRESS)
  if (factory == null) {
    factory = new Factory(FACTORY_ADDRESS)
    factory.poolCount = ZERO_BI
    factory.totalVolumeMatic = ZERO_BD
    factory.totalVolumeUSD = ZERO_BD
    factory.untrackedVolumeUSD = ZERO_BD
    factory.totalFeesUSD = ZERO_BD
    factory.totalFeesMatic = ZERO_BD
    factory.defaultCommunityFee = ZERO_BI
    factory.totalCommunityFeesUSD = ZERO_BD
    factory.totalCommunityFeesMatic = ZERO_BD
    factory.totalAlgebraFeesUSD = ZERO_BD
    factory.totalValueLockedMatic = ZERO_BD
    factory.totalValueLockedUSD = ZERO_BD
    factory.totalValueLockedUSDUntracked = ZERO_BD
    factory.totalValueLockedMaticUntracked = ZERO_BD
    factory.txCount = ZERO_BI
    factory.owner = ZERO_ADDRESS

    let transferCache = new PositionTransferCache('1')
    transferCache.owner = Address.fromHexString(ZERO_ADDRESS)
    transferCache.save()

    // create new bundle for tracking matic price
    let bundle = new Bundle('1')
    bundle.maticPriceUSD = ZERO_BD
    bundle.save()
  }

  factory.poolCount = factory.poolCount.plus(ONE_BI)

  let pool = new Pool(poolAddress) as Pool

  let token0 = Token.load(token0Address)
  let token1 = Token.load(token1Address)
  // fetch info if null
  if (token0 === null) {
    token0 = new Token(token0Address)
    token0.symbol = fetchTokenSymbol(Address.fromString(token0Address))
    token0.name = fetchTokenName(Address.fromString(token0Address))
    token0.totalSupply = fetchTokenTotalSupply(Address.fromString(token0Address))
    let decimals = fetchTokenDecimals(Address.fromString(token0Address))

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token 0 was null', [])
      return
    }

    token0.decimals = decimals
    token0.derivedMatic = ZERO_BD
    token0.volume = ZERO_BD
    token0.volumeUSD = ZERO_BD
    token0.feesUSD = ZERO_BD
    token0.untrackedVolumeUSD = ZERO_BD
    token0.totalValueLocked = ZERO_BD
    token0.totalValueLockedUSD = ZERO_BD
    token0.totalValueLockedUSDUntracked = ZERO_BD
    token0.txCount = ZERO_BI
    token0.poolCount = ZERO_BI
    token0.whitelistPools = []
  }
  if (token1 === null) {
    token1 = new Token(token1Address)
    token1.symbol = fetchTokenSymbol(Address.fromString(token1Address))
    token1.name = fetchTokenName(Address.fromString(token1Address))
    token1.totalSupply = fetchTokenTotalSupply(Address.fromString(token1Address))
    let decimals = fetchTokenDecimals(Address.fromString(token1Address))
    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token 0 was null', [])
      return
    }
    token1.decimals = decimals
    token1.derivedMatic = ZERO_BD
    token1.volume = ZERO_BD
    token1.volumeUSD = ZERO_BD
    token1.untrackedVolumeUSD = ZERO_BD
    token1.feesUSD = ZERO_BD
    token1.totalValueLocked = ZERO_BD
    token1.totalValueLockedUSD = ZERO_BD
    token1.totalValueLockedUSDUntracked = ZERO_BD
    token1.txCount = ZERO_BI
    token1.poolCount = ZERO_BI
    token1.whitelistPools = []
  }

  // update white listed pools
  if (WHITELIST_TOKENS.includes(token0.id)) {
    let newPools = token1.whitelistPools
    newPools.push(pool.id)
    token1.whitelistPools = newPools
  }
  if (WHITELIST_TOKENS.includes(token1.id)) {
    let newPools = token0.whitelistPools
    newPools.push(pool.id)
    token0.whitelistPools = newPools
  }

  pool.deployer = Address.fromString(deployer)
  pool.token0 = token0.id
  pool.token1 = token1.id
  pool.fee = BigInt.fromI32(100)
  pool.pluginConfig = 0
  pool.createdAtTimestamp = timestamp
  pool.createdAtBlockNumber = blockNumber
  pool.liquidityProviderCount = ZERO_BI
  pool.tickSpacing = BigInt.fromI32(60)
  pool.tick = ZERO_BI
  pool.txCount = ZERO_BI
  pool.liquidity = ZERO_BI
  pool.sqrtPrice = ZERO_BI
  pool.communityFee = factory.defaultCommunityFee
  pool.communityVault = Address.fromString(ZERO_ADDRESS)
  pool.token0Price = ZERO_BD
  pool.token1Price = ZERO_BD
  pool.observationIndex = ZERO_BI
  pool.totalValueLockedToken0 = ZERO_BD
  pool.totalValueLockedToken1 = ZERO_BD
  pool.totalValueLockedUSD = ZERO_BD
  pool.lastMintIndex = ZERO_BI
  pool.totalValueLockedMatic = ZERO_BD
  pool.totalValueLockedUSDUntracked = ZERO_BD
  pool.volumeToken0 = ZERO_BD
  pool.volumeToken1 = ZERO_BD
  pool.volumeUSD = ZERO_BD
  pool.feesUSD = ZERO_BD
  pool.feesToken0 = ZERO_BD
  pool.feesToken1 = ZERO_BD
  pool.untrackedVolumeUSD = ZERO_BD
  pool.untrackedFeesUSD = ZERO_BD

  pool.collectedFeesToken0 = ZERO_BD
  pool.collectedFeesToken1 = ZERO_BD
  pool.collectedFeesUSD = ZERO_BD

  pool.communityFeesToken0 = ZERO_BD
  pool.communityFeesToken1 = ZERO_BD
  pool.communityFeesUSD = ZERO_BD
  pool.algebraFeesUSD = ZERO_BD

  pool.save()  // create the tracked contract based on the template
  PoolTemplate.create(Address.fromString(poolAddress))
  token0.save()
  token1.save()
  factory.save()

}

export function handleNewCommunityFee(event: DefaultCommunityFee): void{
  let factory = Factory.load(FACTORY_ADDRESS)
  if (factory == null) {
    factory = new Factory(FACTORY_ADDRESS)
    factory.poolCount = ZERO_BI
    factory.totalVolumeMatic = ZERO_BD
    factory.totalVolumeUSD = ZERO_BD
    factory.untrackedVolumeUSD = ZERO_BD
    factory.totalFeesUSD = ZERO_BD
    factory.totalFeesMatic = ZERO_BD
    factory.totalCommunityFeesUSD = ZERO_BD
    factory.totalCommunityFeesMatic = ZERO_BD
    factory.totalAlgebraFeesUSD = ZERO_BD
    factory.totalValueLockedMatic = ZERO_BD
    factory.totalValueLockedUSD = ZERO_BD
    factory.totalValueLockedUSDUntracked = ZERO_BD
    factory.totalValueLockedMaticUntracked = ZERO_BD
    factory.txCount = ZERO_BI
    factory.owner = ZERO_ADDRESS

    // create new bundle for tracking matic price
    let bundle = new Bundle('1')
    bundle.maticPriceUSD = ZERO_BD
    bundle.save()

    let transferCache = new PositionTransferCache('1')
    transferCache.owner = Address.fromHexString(ZERO_ADDRESS)
    transferCache.save()

  }
  factory.defaultCommunityFee = BigInt.fromI32(event.params.newDefaultCommunityFee)
  factory.save()
}