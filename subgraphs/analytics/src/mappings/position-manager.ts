/* eslint-disable prefer-const */
import {
  Collect,
  IncreaseLiquidity,
  DecreaseLiquidity,
  Transfer,
  NonfungiblePositionManager
} from '../types/NonfungiblePositionManager/NonfungiblePositionManager'
import { Bundle, Pool, Position, PositionSnapshot, PositionTransferCache, Token, Mint} from '../types/schema'
import { ZERO_ADDRESS, ZERO_BD, ZERO_BI} from '../utils/constants'
import { BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { convertTokenToDecimal, loadTransaction } from '../utils'



function getPosition(tokenId: BigInt): Position | null {
  let position = Position.load(tokenId.toString())
  return position
}

function createPositionIfNeccessary(event: ethereum.Event, tokenId: BigInt, poolAddress: string): Position{
  let position = Position.load(tokenId.toString())
  if (position === null ) {
    let transferCache = PositionTransferCache.load('1')!

    position = new Position(tokenId.toString())
    position.owner = transferCache.owner
    position.pool = poolAddress
    let pool = Pool.load(poolAddress)!
    position.token0 = pool.token0
    position.token1 = pool.token1
    let transaction = loadTransaction(event)

    let mint = Mint.load(transaction.id.toString() + '#' + (pool.lastMintIndex).toString())
    if(mint !== null) {
      position.tickLower = position.pool.concat('#').concat(mint.tickLower.toString())
      position.tickUpper = position.pool.concat('#').concat(mint.tickUpper.toString())
    } else {
      let contract = NonfungiblePositionManager.bind(event.address)
      let positionCall = contract.try_positions(tokenId)

      // the following call reverts in situations where the position is minted
      // and deleted in the same block
      if (!positionCall.reverted) {
        let positionResult = positionCall.value
        position.tickLower = position.pool.concat('#').concat(positionResult.value5.toString())
        position.tickUpper = position.pool.concat('#').concat(positionResult.value6.toString())
      }
    }
    position.liquidity = ZERO_BI
    position.depositedToken0 = ZERO_BD
    position.depositedToken1 = ZERO_BD
    position.withdrawnToken0 = ZERO_BD
    position.withdrawnToken1 = ZERO_BD
    position.collectedToken0 = ZERO_BD
    position.collectedToken1 = ZERO_BD
    position.collectedFeesToken0 = ZERO_BD
    position.collectedFeesToken1 = ZERO_BD
    position.createdAtTimestamp = event.block.timestamp
    position.depositedUSD = ZERO_BD
    position.collectedUSD = ZERO_BD
    position.collectedFeesUSD = ZERO_BD
    position.uncollectedPrincipalToken0 = ZERO_BD
    position.uncollectedPrincipalToken1 = ZERO_BD
    // the history is complete only if the NFT mint was indexed in this tx,
    // otherwise the position was minted before the indexed range and earlier events are missing
    let mintTokenId = transferCache.mintTokenId
    let mintTransaction = transferCache.mintTransaction
    position.usdHistoryComplete =
      mintTokenId !== null &&
      mintTransaction !== null &&
      mintTokenId.equals(tokenId) &&
      mintTransaction.equals(event.transaction.hash)
    position.transaction = transaction.id

  }
  return position
}

function savePositionSnapshot(position: Position, event: ethereum.Event): void {

  // several operations on one NFT can happen in a single block (e.g. decrease + collect in a multicall)
  let positionSnapshot = new PositionSnapshot(
    position.id.concat('#').concat(event.block.number.toString()).concat('#').concat(event.logIndex.toString())
  )
  positionSnapshot.owner = position.owner
  positionSnapshot.pool = position.pool
  positionSnapshot.position = position.id
  positionSnapshot.blockNumber = event.block.number
  positionSnapshot.timestamp = event.block.timestamp
  positionSnapshot.liquidity = position.liquidity
  positionSnapshot.depositedToken0 = position.depositedToken0
  positionSnapshot.depositedToken1 = position.depositedToken1
  positionSnapshot.withdrawnToken0 = position.withdrawnToken0
  positionSnapshot.withdrawnToken1 = position.withdrawnToken1
  positionSnapshot.collectedFeesToken0 = position.collectedFeesToken0
  positionSnapshot.collectedFeesToken1 = position.collectedFeesToken1
  positionSnapshot.transaction = loadTransaction(event).id


  positionSnapshot.save()
}

function tokenPriceUSD(token: Token, bundle: Bundle): BigDecimal {
  return token.derivedMatic.times(bundle.maticPriceUSD)
}

// a non-zero amount of a token without a USD price makes the USD history of the position incomplete
function hasPrice(amount: BigDecimal, price: BigDecimal): boolean {
  return amount.equals(ZERO_BD) || !price.equals(ZERO_BD)
}

function minBD(a: BigDecimal, b: BigDecimal): BigDecimal {
  return a.lt(b) ? a : b
}

export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {

  let position = createPositionIfNeccessary(event, event.params.tokenId, event.params.pool.toHexString())

  // position was not able to be fetched
  if (position == null) {
    return
  }

  let bundle = Bundle.load('1')!
  let token0 = Token.load(position.token0)!
  let token1 = Token.load(position.token1)!

  let amount0 = convertTokenToDecimal(event.params.amount0, token0.decimals)
  let amount1 = convertTokenToDecimal(event.params.amount1, token1.decimals)

  let price0 = tokenPriceUSD(token0, bundle)
  let price1 = tokenPriceUSD(token1, bundle)

  position.liquidity = position.liquidity.plus(event.params.actualLiquidity)
  position.depositedToken0 = position.depositedToken0.plus(amount0)
  position.depositedToken1 = position.depositedToken1.plus(amount1)
  position.depositedUSD = position.depositedUSD.plus(amount0.times(price0)).plus(amount1.times(price1))
  position.liquidityClosedAtTimestamp = null

  if (!hasPrice(amount0, price0) || !hasPrice(amount1, price1)) {
    position.usdHistoryComplete = false
  }

  position.save()

  savePositionSnapshot(position, event)

}

export function handleDecreaseLiquidity(event: DecreaseLiquidity): void {
  let position = getPosition(event.params.tokenId)

  // position was not able to be fetched
  if (position == null) {
    return
  }

  let token0 = Token.load(position.token0)
  let token1 = Token.load(position.token1)

  let amount0 = convertTokenToDecimal(event.params.amount0, token0!.decimals)
  let amount1 = convertTokenToDecimal(event.params.amount1, token1!.decimals)

  position.liquidity = position.liquidity.minus(event.params.liquidity)
  position.withdrawnToken0 = position.withdrawnToken0.plus(amount0)
  position.withdrawnToken1 = position.withdrawnToken1.plus(amount1)
  position.uncollectedPrincipalToken0 = position.uncollectedPrincipalToken0.plus(amount0)
  position.uncollectedPrincipalToken1 = position.uncollectedPrincipalToken1.plus(amount1)

  // a zero-liquidity decrease (fee poke) is not a transition to zero
  if (event.params.liquidity.gt(ZERO_BI) && position.liquidity.equals(ZERO_BI)) {
    position.liquidityClosedAtTimestamp = event.block.timestamp
  }

  position.save()

  savePositionSnapshot(position, event)
}


export function handleCollect(event: Collect): void {
  let position = getPosition(event.params.tokenId)

  // position was not able to be fetched
  if (position == null) {
    return
  }

  let bundle = Bundle.load('1')!
  let token0 = Token.load(position.token0)!
  let token1 = Token.load(position.token1)!

  let amount0 = convertTokenToDecimal(event.params.amount0, token0.decimals)
  let amount1 = convertTokenToDecimal(event.params.amount1, token1.decimals)

  let price0 = tokenPriceUSD(token0, bundle)
  let price1 = tokenPriceUSD(token1, bundle)

  // a partial collect pays out the uncollected principal first, the rest are fees (per token)
  let principal0 = minBD(amount0, position.uncollectedPrincipalToken0)
  let principal1 = minBD(amount1, position.uncollectedPrincipalToken1)
  let fees0 = amount0.minus(principal0)
  let fees1 = amount1.minus(principal1)

  position.uncollectedPrincipalToken0 = position.uncollectedPrincipalToken0.minus(principal0)
  position.uncollectedPrincipalToken1 = position.uncollectedPrincipalToken1.minus(principal1)

  position.collectedToken0 = position.collectedToken0.plus(amount0)
  position.collectedToken1 = position.collectedToken1.plus(amount1)

  position.collectedFeesToken0 = position.collectedFeesToken0.plus(fees0)
  position.collectedFeesToken1 = position.collectedFeesToken1.plus(fees1)

  position.collectedUSD = position.collectedUSD.plus(amount0.times(price0)).plus(amount1.times(price1))
  position.collectedFeesUSD = position.collectedFeesUSD.plus(fees0.times(price0)).plus(fees1.times(price1))

  if (!hasPrice(amount0, price0) || !hasPrice(amount1, price1)) {
    position.usdHistoryComplete = false
  }

  position.save()

  savePositionSnapshot(position, event)
}

export function handleTransfer(event: Transfer): void {
  let position = getPosition(event.params.tokenId)

  let transferCache = PositionTransferCache.load('1')!
  transferCache.owner = event.params.to
  // the NFT mint is emitted before IncreaseLiquidity, which creates the position in the same tx
  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    transferCache.mintTokenId = event.params.tokenId
    transferCache.mintTransaction = event.transaction.hash
  }
  transferCache.save()

  // position was not able to be fetched
  if (position == null) {
    return
  }

  position.owner = event.params.to
  position.save()

  savePositionSnapshot(position, event)
}
