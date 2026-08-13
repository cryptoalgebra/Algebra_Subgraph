/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xD637cbc214Bc3dD354aBb309f4fE717ffdD0B28C'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x344A0AaC7D31aD153b5Bf7b416e83f1bb8dDf14D' // WETH/USDC.e pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0xAA40c0c7644e0b2B224509571e10ad20d9C4ef28', // hemiBTC
  '0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3', // WBTC
  '0xad11a8BEb98bbf61dbb1aa0F6d6F2ECD87b35afA', // USDC.e
  '0xD3599AE62EE280709A22268a46d23164214e345B'  // VUSD
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xad11a8BEb98bbf61dbb1aa0F6d6F2ECD87b35afA', // USDC.e
  '0xD3599AE62EE280709A22268a46d23164214e345B'  // VUSD
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x2fe01f9c672d24D2d4315d2bA980B141B0159489'
