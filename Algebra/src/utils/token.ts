/* eslint-disable prefer-const */
import { ERC20 } from '../types/Factory/ERC20'
import { ERC20SymbolBytes } from '../types/Factory/ERC20SymbolBytes'
import { ERC20NameBytes } from '../types/Factory/ERC20NameBytes'
import { StaticTokenDefinition } from './staticTokenDefinition'
import {BigInt, Address, BigDecimal} from '@graphprotocol/graph-ts'
import { isNullEthValue } from '.'
import {Token} from "../types/schema";
const ZERO_BI = BigInt.fromI32(0)
const ZERO_BD = BigDecimal.fromString("0")

export function getOrCreateToken(tokenAddress: Address): Token | null {
  let tokenId = tokenAddress.toHexString()
  let token = Token.load(tokenId)

  if (token == null) {
    token = new Token(tokenId)

    // Bind the contract to call methods
    let contract = ERC20.bind(tokenAddress)

    // Fetch symbol
    let symbol = "unknown"
    let symbolResult = contract.try_symbol()
    if (!symbolResult.reverted) {
      symbol = symbolResult.value
    }
    token.symbol = symbol

    // Fetch name
    let name = "unknown"
    let nameResult = contract.try_name()
    if (!nameResult.reverted) {
      name = nameResult.value
    }
    token.name = name

    // Fetch total supply
    let totalSupply = ZERO_BI
    let totalSupplyResult = contract.try_totalSupply()
    if (!totalSupplyResult.reverted) {
      totalSupply = totalSupplyResult.value
    }
    token.totalSupply = totalSupply

    // Fetch decimals - bail if null
    let decimalsResult = contract.try_decimals()
    if (decimalsResult.reverted) {
      token.decimals = BigInt.fromI32(18);
    }
    else {
      token.decimals = BigInt.fromI32(decimalsResult.value)
    }

    // Initialize zero/default fields
    token.derivedMatic = ZERO_BD
    token.volume = ZERO_BD
    token.volumeUSD = ZERO_BD
    token.untrackedVolumeUSD = ZERO_BD
    token.feesUSD = ZERO_BD
    token.totalValueLocked = ZERO_BD
    token.totalValueLockedUSD = ZERO_BD
    token.totalValueLockedUSDUntracked = ZERO_BD
    token.txCount = ZERO_BI
    token.poolCount = ZERO_BI
    token.whitelistPools = []

    // Save the new token entity
    token.save()
  }

  return token
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress)
  let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress)

  // try types string and bytes32 for symbol
  let symbolValue = 'unknown'
  let symbolResult = contract.try_symbol()
  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol()
    if (!symbolResultBytes.reverted) {
      // for broken pairs that have no symbol function exposed
      if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
        symbolValue = symbolResultBytes.value.toString()
      } else {
        // try with the static definition
        let staticTokenDefinition = StaticTokenDefinition.fromAddress(tokenAddress)
        if(staticTokenDefinition != null) {
          symbolValue = staticTokenDefinition.symbol
        }
      }
    }
  } else {
    symbolValue = symbolResult.value
  }

  return symbolValue
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress)
  let contractNameBytes = ERC20NameBytes.bind(tokenAddress)

  // try types string and bytes32 for name
  let nameValue = 'unknown'
  let nameResult = contract.try_name()
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name()
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString()
      } else {
        // try with the static definition
        let staticTokenDefinition = StaticTokenDefinition.fromAddress(tokenAddress)
        if(staticTokenDefinition != null) {
          nameValue = staticTokenDefinition.name
        }
      }
    }
  } else {
    nameValue = nameResult.value
  }

  return nameValue
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress)
  let totalSupplyValue = BigInt.fromString("1")
  let totalSupplyResult = contract.try_totalSupply() 
  if (!totalSupplyResult.reverted) {
    let totalSupply = contract.totalSupply()
    totalSupplyValue = totalSupply
  }
  return totalSupplyValue as BigInt
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress)
  // try types uint8 for decimals
  let decimalValue = BigInt.fromString("1")
  let decimalResult = contract.try_decimals()
  if (!decimalResult.reverted) {
    decimalValue = BigInt.fromI32(decimalResult.value as i32)
  } else {
    // try with the static definition
    let staticTokenDefinition = StaticTokenDefinition.fromAddress(tokenAddress)
    if(staticTokenDefinition != null) {
      return staticTokenDefinition.decimals
    }
  }

  return decimalValue
}
