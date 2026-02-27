/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xfb8Ed3485EfA29a0e4bed93351dD51B59fC4b0f0'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x0a984a446A116335ac90425d2D1E69A7199A2f7c'

export const REFERENCE_TOKEN = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x915fd34cadd63907b51eb64dddc2eadd114a0bed' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.1')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006',
  '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', 
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  '0xa279ca693d66fe65ba0062d0218578f424249dfd' 
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0987A3dC376a33ED720e15D2eC62eA6179D51141'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
