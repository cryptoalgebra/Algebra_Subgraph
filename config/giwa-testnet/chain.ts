/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x5fbB3b8A6D61634584F4C10c18243DE5a4081225'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x77e7f2d99C7E6dE6779737806d6d2e49d2bF1273'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // WETH
export const STABLE_TOKEN_POOL = '0x376f33cfE718E178eC87980F96df3038A2510975' // WETH/USDA pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0xBCdB22f56642DE57624CfC2fBb9eE398cF3CA268', // TEST
  '0x6287824D5A6D88C363291D5353cb123693ce65A4', // USDA
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x6287824D5A6D88C363291D5353cb123693ce65A4', // USDA

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x4254809D0192495578611A41C1ac7C16a969B48B'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1afd3e533278f627891c3D21997514e82B327fEC' // fake
