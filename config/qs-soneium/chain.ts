/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x8Ff309F68F6Caf77a78E9C20d2Af7Ed4bE2D7093'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x0629B3c6E1cCfF2e31e3A9Bd67ec96b23BE6f1e9'

export const REFERENCE_TOKEN = '0x046ede9564a72571df6f5e44d0405360c0f4dcab' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xe5467be8b8db6b074904134e8c1a581f5565e2c3' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('100')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x046ede9564a72571df6f5e44d0405360c0f4dcab',
  '0x28bec7e30e6faee657a03e19bf1128aad7632a00', 
  '0x67b302e35aef5eee8c32d934f5856869ef428330',
  '0x936ab8c674bcb567cd5deb85d8a216494704e9d8',
  '0xffffffff1fcacbd218edc0eba20fc2308c778080',
  '0xFFfffffF7D2B0B761Af01Ca8e25242976ac0aD7D',
  '0xffffffffea09fb06d082fd1275cd48b191cbcd1d' 
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x28bec7e30e6faee657a03e19bf1128aad7632a00',
  '0x67b302e35aef5eee8c32d934f5856869ef428330'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0987A3dC376a33ED720e15D2eC62eA6179D51141'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
