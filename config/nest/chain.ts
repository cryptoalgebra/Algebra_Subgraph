/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xF77Bd082c627aA54591cF2f2EaA811fd1AB3b1F3'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xEAF58788a405F3253814b4559391a22bE8616250'

export const REFERENCE_TOKEN = '0x5555555555555555555555555555555555555555' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x20e6E73C91a29d21BdE672562a4B16649D66623E' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('10')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xBe6727B535545C67d5cAa73dEa54865B92CF7907', // WETH
  '0x9fdbda0a5e284c32744d2f17ee5c74b284993463', // USDC
  '0xfD739d4e423301CE9385c1fb8850539D657C296D', // cbBTC
  '0x5555555555555555555555555555555555555555', // HYDX
  '0xb88339CB7199b77E23DB6E890353E22632Ba630f', // AZUSD
  '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb', // frxUSD
  '0x55380fe7a1910dff29a47b622057ab4139da42c5'  // fxUSD

]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xb88339CB7199b77E23DB6E890353E22632Ba630f', // USDC
  '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xdFEB2C88C32311792665b8626093193b959138D3'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
