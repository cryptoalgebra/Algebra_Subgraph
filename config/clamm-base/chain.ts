/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x51a744E9FEdb15842c3080d0937C99A365C6c358'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x8aD26dc9f724c9A7319E0E25b907d15626D9a056'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xabff72aee1ba72fc459acd5222dd84a3182411bb' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.0001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
  '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2', // USDT
  '0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A', // sparkUSDC
  '0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1'  // mwETH
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
  '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2'  // USDT
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0000000000000000000000000000000000000000'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
