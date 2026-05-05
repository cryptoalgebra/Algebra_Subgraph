/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x161C886a5ef51c4B20f2F4ca2caDB20c93245705'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xE416C0C29DBDb4Fa25870b835ad904c1E8478CDc'

export const REFERENCE_TOKEN = '0xf03875b5Ec5eAc83cab83A6c2ab17844304AA7a0' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xFd170cb6113BFecebFD14aaC571c585Ebc9A92A3' // WETH/USDA pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x0000000000000000000000000000000000000400', // USDR
  '0xf03875b5Ec5eAc83cab83A6c2ab17844304AA7a0', // WETH
  '0x9F068C81ab7743EA7B2D48C0FecEAdaFcAD2c95C'  // USDA
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x0000000000000000000000000000000000000400', // USDR
  '0xf03875b5Ec5eAc83cab83A6c2ab17844304AA7a0'  // WETH

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x9fad6Fd657ffD9045a1377C692F8Bb2d3d57C7B6'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507' // fake
