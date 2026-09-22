/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x893388ba29248261a0F13371BD4AE3700Ce06EC9'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x4Eb881885FE22D895Ff299f6cdA6e0A8E00E66A0'

export const REFERENCE_TOKEN = '0x0f460A2b3E8ba1Cc4D33E47f207EA03B37A286a7' // WADI
export const STABLE_TOKEN_POOL = '0x04eB5145D296864aC842F5F07CE9409A09d1c3ED' // WADI/USDC.e pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x0f460A2b3E8ba1Cc4D33E47f207EA03B37A286a7', // WADI
  '0x9cb8142aEBBcdc60AF7c97Af897A67A8f3CA71C2' // USDC.e
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x9cb8142aEBBcdc60AF7c97Af897A67A8f3CA71C2' // USDC.e

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x161C886a5ef51c4B20f2F4ca2caDB20c93245705'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1afd3e533278f627891c3D21997514e82B327fEC' // fake
