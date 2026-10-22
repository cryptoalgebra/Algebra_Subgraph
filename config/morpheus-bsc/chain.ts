/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x2D071bA94C32A8a9bA594771EbF628b2b48b4389'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x348F5E05B7c778F3467F07CEa0088841481C622d'

export const REFERENCE_TOKEN = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x1adDDc243Ad989e34625517CCFe8a1a2E6dD2754' // USDT/WBNB pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  '0x55d398326f99059fF775485246999027B3197955'  // USDT
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x55d398326f99059fF775485246999027B3197955'  // USDT
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xD2BeD99625cbCD288985C610C2aC56E295FCeB44'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0xf494e400e924188D9BE68d128Fa4a49606e5f1d8'
