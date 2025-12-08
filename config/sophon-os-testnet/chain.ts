/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'

export const REFERENCE_TOKEN = '0x577bdFf849E65C1eFfeb8114e9cd243C1180F158' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xb30bab619f6726593c8486d1883e602e6c0859a1' // WSOPH/LTK pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x577bdFf849E65C1eFfeb8114e9cd243C1180F158', // WSOPH
  '0x7dE02A91a8a2738e6c4B9D6C702b7B1aCdfA818c', // LTK
  '0x78f6d78c92d3637B17b14c266e1D25274222DAAf'  // MTK2
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x7dE02A91a8a2738e6c4B9D6C702b7B1aCdfA818c' // LTK
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
