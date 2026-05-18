/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x3f912b39A89708Db8E10205421d3726e2DF4984D'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x2650e9EFe6D841622aA627cb9e493a8B8b2f9D7A'

export const REFERENCE_TOKEN = '0x07e17E17e17E17e17e17e17E17E17E17E17e17EA' // RLS
export const STABLE_TOKEN_POOL = '0x07BEBED47383E1BF3eC4f75EaB2c65a0efF00Fa1' // USDr/RLS pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('2500') // equals $9, as RLS price is 0.0036 at the time.

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
export const ETERNAL_FARMING_ADDRESS = '0x8FFf6402215870Cbb8CB216C7A587Cb17D524B81'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1afd3e533278f627891c3D21997514e82B327fEC' // fake
