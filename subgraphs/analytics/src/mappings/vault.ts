/* eslint-disable prefer-const */
import { BigInt, Address } from '@graphprotocol/graph-ts'
import { AlgebraCommunityVault, VaultWithdrawal, Token, Bundle } from '../types/schema'
import {
  TokensWithdrawal,
  AlgebraTokensWithdrawal,
  AlgebraFee,
  CommunityFeeReceiver,
  AlgebraFeeReceiver
} from '../types/templates/CommunityVault/AlgebraCommunityVault'
import { convertTokenToDecimal, loadTransaction } from '../utils'
import { ZERO_BI, ZERO_BD, ZERO_ADDRESS } from '../utils/constants'

export function handleTokensWithdrawal(event: TokensWithdrawal): void {
  let vaultAddress = event.address.toHexString()
  let vault = AlgebraCommunityVault.load(vaultAddress)
  if (vault === null) return

  let token = Token.load(event.params.token.toHexString())
  if (token === null) return

  let amount = convertTokenToDecimal(event.params.amount, token.decimals)

  let bundle = Bundle.load('1')!
  let amountUSD = amount.times(token.derivedMatic).times(bundle.maticPriceUSD)

  // Accumulate total community withdrawn USD on vault
  vault.totalWithdrawnUSD = vault.totalWithdrawnUSD.plus(amountUSD)
  vault.save()

  let transaction = loadTransaction(event)
  let withdrawal = new VaultWithdrawal(
    transaction.id + '#' + event.logIndex.toString()
  )
  withdrawal.vault = vault.id
  withdrawal.token = token.id
  withdrawal.to = event.params.to
  withdrawal.amount = amount
  withdrawal.amountUSD = amountUSD
  withdrawal.isAlgebra = false
  withdrawal.timestamp = event.block.timestamp
  withdrawal.blockNumber = event.block.number
  withdrawal.save()
}

export function handleAlgebraTokensWithdrawal(event: AlgebraTokensWithdrawal): void {
  let vaultAddress = event.address.toHexString()
  let vault = AlgebraCommunityVault.load(vaultAddress)
  if (vault === null) return

  let token = Token.load(event.params.token.toHexString())
  if (token === null) return

  let amount = convertTokenToDecimal(event.params.amount, token.decimals)

  let bundle = Bundle.load('1')!
  let amountUSD = amount.times(token.derivedMatic).times(bundle.maticPriceUSD)

  // Accumulate total Algebra protocol withdrawn USD on vault
  vault.totalAlgebraWithdrawnUSD = vault.totalAlgebraWithdrawnUSD.plus(amountUSD)
  vault.save()

  let transaction = loadTransaction(event)
  let withdrawal = new VaultWithdrawal(
    transaction.id + '#' + event.logIndex.toString()
  )
  withdrawal.vault = vault.id
  withdrawal.token = token.id
  withdrawal.to = event.params.to
  withdrawal.amount = amount
  withdrawal.amountUSD = amountUSD
  withdrawal.isAlgebra = true
  withdrawal.timestamp = event.block.timestamp
  withdrawal.blockNumber = event.block.number
  withdrawal.save()
}

export function handleAlgebraFee(event: AlgebraFee): void {
  let vaultAddress = event.address.toHexString()
  let vault = AlgebraCommunityVault.load(vaultAddress)
  if (vault === null) {
    vault = new AlgebraCommunityVault(vaultAddress)
    vault.communityFeeReceiver = Address.fromHexString(ZERO_ADDRESS)
    vault.algebraFeeReceiver = Address.fromHexString(ZERO_ADDRESS)
    vault.totalWithdrawnUSD = ZERO_BD
    vault.totalAlgebraWithdrawnUSD = ZERO_BD
    vault.pools = []
  }
  vault.algebraFee = BigInt.fromI32(event.params.newAlgebraFee)
  vault.save()
}

export function handleCommunityFeeReceiver(event: CommunityFeeReceiver): void {
  let vaultAddress = event.address.toHexString()
  let vault = AlgebraCommunityVault.load(vaultAddress)
  if (vault === null) {
    vault = new AlgebraCommunityVault(vaultAddress)
    vault.algebraFee = ZERO_BI
    vault.algebraFeeReceiver = Address.fromHexString(ZERO_ADDRESS)
    vault.totalWithdrawnUSD = ZERO_BD
    vault.totalAlgebraWithdrawnUSD = ZERO_BD
    vault.pools = []
  }
  vault.communityFeeReceiver = event.params.newCommunityFeeReceiver
  vault.save()
}

export function handleAlgebraFeeReceiver(event: AlgebraFeeReceiver): void {
  let vaultAddress = event.address.toHexString()
  let vault = AlgebraCommunityVault.load(vaultAddress)
  if (vault === null) {
    vault = new AlgebraCommunityVault(vaultAddress)
    vault.algebraFee = ZERO_BI
    vault.communityFeeReceiver = Address.fromHexString(ZERO_ADDRESS)
    vault.totalWithdrawnUSD = ZERO_BD
    vault.totalAlgebraWithdrawnUSD = ZERO_BD
    vault.pools = []
  }
  vault.algebraFeeReceiver = event.params.newAlgebraFeeReceiver
  vault.save()
}
