/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x215fDE4B415B9Ce21DEE6CAcEfc27Aa92441C4AA'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x4e98d43D5FFcA0Ee48C5F406EE617341D9137643'

export const REFERENCE_TOKEN = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xc855279394223bef22a9db7a27f8c2bb6c6c0c34' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('100')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 
  '0xD3A9331A654444F9fe7DdbaEC6678C2Dc9113197',
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  '0xD3A9331A654444F9fe7DdbaEC6678C2Dc9113197'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0987A3dC376a33ED720e15D2eC62eA6179D51141'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
