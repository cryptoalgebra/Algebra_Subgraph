/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'

export const REFERENCE_TOKEN = '0xD2Aaa00700000000000000000000000000000000' // ETH
export const STABLE_TOKEN_POOL = '0xD48539D644Aaf1A84194dd1d50A28132521Ff313' // USDT/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.0001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xD2Aaa00700000000000000000000000000000000', // ETH
  '0xC8EEde488d7152CED970D9e9621D9330b64Cfd24'  // USDT
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xC8EEde488d7152CED970D9e9621D9330b64Cfd24'  // USDT
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0xE94de02e52Eaf9F0f6Bf7f16E4927FcBc2c09bC7'

export const ALM_VAULT_FACTORY_ADDRESS = '1111111111111111111111111111111111111111111111' // Placeholder address for ALM Vault Factory, update when available