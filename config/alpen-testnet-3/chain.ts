/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x4439199c3743161ca22bB8F8B6deC5bF6fF65b04'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xD637cbc214Bc3dD354aBb309f4fE717ffdD0B28C'

export const REFERENCE_TOKEN = '0x10253594A832f967994b44f33411940533302ACb' // WsBTC
export const STABLE_TOKEN_POOL = '0x25547a75818577AF0579308bDDC59Cb3E9E26d5b' // WsBTC/USDC pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x10253594A832f967994b44f33411940533302ACb', // WsBTC
  '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A', // USDC
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A', // USDC

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '11111' // fake
