/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xd9A0ffa58143CdC5C1767208dDdB64a1889D78ae'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xA20259cC9bb227992240f7Dc9b5B02D3324d9eD4'

export const REFERENCE_TOKEN = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' // WBNB
export const STABLE_TOKEN_POOL = '0x3FBa07bd4B949Ea5Ce805d0CDE22d3A343255aEB' // USDC/WBNB pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', // BTCB
  '0x2170ed0880ac9a755fd29b2688956bd959f933f8', // ETH
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
  '0x55d398326f99059ff775485246999027b3197955', // USDT
  '0xe9e7cea3dedca5984780bafc599bd69add087d56'  // BUSD
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
  '0x55d398326f99059ff775485246999027b3197955', // USDT
  '0xe9e7cea3dedca5984780bafc599bd69add087d56'  // BUSD

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x211BD8917d433B7cC1F4497AbA906554Ab6ee479'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1afd3e533278f627891c3D21997514e82B327fEC'
