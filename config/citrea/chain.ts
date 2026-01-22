/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'

export const REFERENCE_TOKEN = '0x3100000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xa82EeE40f1c88D773c93771d5B1fAC61DB311945' // WCBTC/USDC.e pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.0001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x3100000000000000000000000000000000000006', // WCBTC
  '0xE045e6c36cF77FAA2CfB54466D71A3aEF7bbE839', // USDC.e
  '0x9f3096Bac87e7F03DC09b0B416eB0DF837304dc4' // USDT.e
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xE045e6c36cF77FAA2CfB54466D71A3aEF7bbE839', // USDC.e
  '0x9f3096Bac87e7F03DC09b0B416eB0DF837304dc4' // USDT.e
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '111111111111111111111111111111111111111'
