/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x6e606Cf94A4DDc01aEed2Fce16d1b4f5B33e0A31'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x48459ABC42e5f5490169D26e1c6cc5eeB5905F07'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x256f399754F7eD5BAA75b911Ae6FD3c1A63b169c' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.05')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC
  '0xdd2fc771ddab2b787aedfd100a67d8a4754a380c', // TREB
  '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf', // cbBTC
  '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22', // cbETH
  '0xcb17C9Db87B595717C857a08468793f5bAb6445F', // cbLTC
  '0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b'  // VIRTUAL
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x346321EECe97AE9858FbD441FE895Ba559B38eAb'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x07f6619d6295153a2E2641A133f6aeC12691177d'
