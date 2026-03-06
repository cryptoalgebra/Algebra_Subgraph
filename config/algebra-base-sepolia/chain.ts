/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x285C74f3d01296F96c5d3858ab482f707e8Bfdfc'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xCcD3A4AB7bD75bab509d25101eDDc37778cA49A4'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x671dDf7E29272c5Bf6996F765fABf58351cfF137' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0xABAC6F23FDF1313FC2E9C9244F666157CCD32990'  // USDC
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xabac6f23fdf1313fc2e9c9244f666157ccd32990' // USDC
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xB50E639E23C954546C75d9C15363FC0375E5E95E'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0xdA9c1AF6498583Ae548CAd31c47eFde061569789'

// Addresses for ALM subgraph
// ALM Vault Factory contract
export const ALM_VAULT_FACTORY_ADDRESS = '0xAb87BB2cd5a370b685313daf699FA168EE74099D'

export const ERC20_FACTORY_ADDRESS = '0xAb87BB2cd5a370b685313daf699FA168EE74099D'

// Blacklisted pools that should be excluded from indexing
export const BLACKLISTED_POOLS: string[] = []
