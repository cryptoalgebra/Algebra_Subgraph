/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xD637cbc214Bc3dD354aBb309f4fE717ffdD0B28C'

export const REFERENCE_TOKEN = '0xcc788DC0486CD2BaacFf287eea1902cc09FbA570' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xfB971C3200c3DB4Ef23F991D2d1F0D329A1Bf036' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('10')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xcc788DC0486CD2BaacFf287eea1902cc09FbA570', // WKITE
  '0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e', // USDC

]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e', // USDC

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x28DeD2af752655Df5Ee92450DC259F92a5ABe449'

export const ALM_VAULT_FACTORY_ADDRESS = '0x5AeFBA317BAba46EAF98Fd6f381d07673bcA6467'

// Blacklisted pools that should be excluded from indexing
export const BLACKLISTED_POOLS: string[] = []
