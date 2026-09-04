/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xf03875b5Ec5eAc83cab83A6c2ab17844304AA7a0'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xf2c72D4EA4b3d54652Df182edA49b082678d02e3'

export const REFERENCE_TOKEN = '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x49FFa9B5cb6C94b2fc99E8649C3e4c18F619E149' // WETH/USDG pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73', // WETH
  '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168'  // USDG
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168'  // USDG
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xc8A85FD6511bf875646B3632Aedd60d5752610BC'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '1111'
