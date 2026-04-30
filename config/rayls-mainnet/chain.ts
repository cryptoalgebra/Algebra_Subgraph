/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xa77aD9f635a3FB3bCCC5E6d1A87cB269746Aba17'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x37A4950b4ea0C46596404895c5027B088B0e70e7'

export const REFERENCE_TOKEN = '0x07e17E17e17E17e17e17e17E17E17E17E17e17EA' // RLS
export const STABLE_TOKEN_POOL = '0xE4D710668E52fD5e4178c107AD564EBBBb57C36A' // USDr/RLS pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('2500') // equals $20, as RLS price is 0.008 at the time.

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x0000000000000000000000000000000000000400', // USDr
  '0x07e17E17e17E17e17e17e17E17E17E17E17e17EA'  // RLS
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x0000000000000000000000000000000000000400'  // USDr
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0f460A2b3E8ba1Cc4D33E47f207EA03B37A286a7'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1afd3e533278f627891c3D21997514e82B327fEC' // fake
