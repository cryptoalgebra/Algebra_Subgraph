/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xD637cbc214Bc3dD354aBb309f4fE717ffdD0B28C'

export const REFERENCE_TOKEN = '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x249c7Cb82AcE314617f333d9e365aD99e9a56EeF' // WETH/USDG pool

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
export const ETERNAL_FARMING_ADDRESS = '0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1B3B62B519a60E8927d4FfbB54681871e1Bb6F11'
