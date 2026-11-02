/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x4439199c3743161ca22bB8F8B6deC5bF6fF65b04'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x6838becEdaFCd01e5f447B89aaf9d21FDe04c5d1'

export const REFERENCE_TOKEN = '0xe538905cf8410324e03a5a23c1c177a474d59b2b' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x7a1714eee2caa7450a39ac01e0667a61f6cb8cac' // USDG/WOKB pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xe538905cf8410324e03a5a23c1c177a474d59b2b', // WOKB
  '0x4ae46a509f6b1d9056937ba4500cb143933d2dc8'  // USDG
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x4ae46a509f6b1d9056937ba4500cb143933d2dc8'  // USDG
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0xe1909bcA4E528f7361b63F82330269d3001011e1'
