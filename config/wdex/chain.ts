/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x215fDE4B415B9Ce21DEE6CAcEfc27Aa92441C4AA'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x4e98d43D5FFcA0Ee48C5F406EE617341D9137643'

export const REFERENCE_TOKEN = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xc855279394223bef22a9db7a27f8c2bb6c6c0c34' // WPOL/DAI pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('100')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WPOL
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x2FF516d41A4C1655a82C2584a21276e119FdD3FC'

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x94dbc4e017415885E65E45AC984A62Cb87465900'
