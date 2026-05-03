/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xD637cbc214Bc3dD354aBb309f4fE717ffdD0B28C'

export const REFERENCE_TOKEN = '0x07e17E17e17E17e17e17e17E17E17E17E17e17EA' // RLS
export const STABLE_TOKEN_POOL = '0x9aF549F76Db545b77FEB12E477fe9313a6D28dDe' // USDr/RLS pool

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
export const ETERNAL_FARMING_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1afd3e533278f627891c3D21997514e82B327fEC' // fake
