/* eslint-disable prefer-const */
import { ethereum } from '@graphprotocol/graph-ts'
import { TokenAdded, TokenRemoved } from '../types/TokenWhitelistRegistry/TokenWhitelistRegistry'
import { Token, WhitelistToken } from '../types/schema'
import { isWhitelisted } from '../utils/pricing'

export function handleTokenAdded(event: TokenAdded): void {
  setWhitelistStatus(event.params.token.toHexString(), true, event)
}

export function handleTokenRemoved(event: TokenRemoved): void {
  setWhitelistStatus(event.params.token.toHexString(), false, event)
}

function setWhitelistStatus(tokenId: string, isActive: boolean, event: ethereum.Event): void {
  let wasActive = isWhitelisted(tokenId)

  let entry = WhitelistToken.load(tokenId)
  if (entry === null) {
    entry = new WhitelistToken(tokenId)
  }
  entry.isActive = isActive
  entry.updatedAtBlockNumber = event.block.number
  entry.updatedAtTimestamp = event.block.timestamp
  entry.updatedAtTransaction = event.transaction.hash
  entry.save()

  if (wasActive == isActive) {
    return
  }

  let token = Token.load(tokenId)
  if (token === null) {
    return
  }

  // a pool is in the counterpart token's whitelistPools iff this token is whitelisted,
  // so sync that for every existing pool with this token
  let pools0 = token.poolsAsToken0.load()
  for (let i = 0; i < pools0.length; i++) {
    syncCounterpartWhitelistPools(pools0[i].token1, pools0[i].id, isActive)
  }
  let pools1 = token.poolsAsToken1.load()
  for (let i = 0; i < pools1.length; i++) {
    syncCounterpartWhitelistPools(pools1[i].token0, pools1[i].id, isActive)
  }
}

function syncCounterpartWhitelistPools(tokenId: string, poolId: string, isActive: boolean): void {
  let token = Token.load(tokenId)!
  let whitelistPools = token.whitelistPools
  let index = whitelistPools.indexOf(poolId)
  if (isActive && index == -1) {
    whitelistPools.push(poolId)
  } else if (!isActive && index != -1) {
    whitelistPools.splice(index, 1)
  } else {
    return
  }
  token.whitelistPools = whitelistPools
  token.save()
}
