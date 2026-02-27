/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xEFCB993e113ea8197C17c6f4959495929Be0B68e'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x03EE5b540FD1523c1e9886D60fbB260380E24209'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x22e7e0885ea2ffa1e189d36f60f0c4c097378de5' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006',
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', 
  '0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b',
  '0xb2aca4ca8b7bbd9a5388ccb044c87dedf8a51c7c',
  '0xffffffff1fcacbd218edc0eba20fc2308c778080',
  '0xFFfffffF7D2B0B761Af01Ca8e25242976ac0aD7D',
  '0xffffffffea09fb06d082fd1275cd48b191cbcd1d' 
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  '0xffffffffea09fb06d082fd1275cd48b191cbcd1d'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0987A3dC376a33ED720e15D2eC62eA6179D51141'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
