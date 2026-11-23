/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x3012E9049d05B4B5369D690114D5A5861EbB85cb'

export const REFERENCE_TOKEN = '0x96fD4a3dE493316c7bf02A8BC29e3bA559f769Ee' // AUZ
export const STABLE_TOKEN_POOL = '0x8a7676f75e558d3Ca82c35A534C33A4C7Fb4a84C' // USDA/AUZ pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x96fD4a3dE493316c7bf02A8BC29e3bA559f769Ee', // AUZ
  '0x658E287E9C820484f5808f687dC4863B552de37D'  // USDA
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x658E287E9C820484f5808f687dC4863B552de37D'  // USDA
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x6AD6A4f233F1E33613e996CCc17409B93fF8bf5f'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x5AeFBA317BAba46EAF98Fd6f381d07673bcA6467'
