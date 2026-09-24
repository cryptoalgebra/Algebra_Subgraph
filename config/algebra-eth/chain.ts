/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xd265f57c36AC60d3F7931eC5c7396966F0C246A7'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x28DeD2af752655Df5Ee92450DC259F92a5ABe449'

export const REFERENCE_TOKEN = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH
export const STABLE_TOKEN_POOL = '0xb3dE912462955182f7C7F9cA5d9573Cdb38512C1' // USDT/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  '0x2a38E8B8bed38Ebd296e94c16D2542e205254856', // USDC
  '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x2a38E8B8bed38Ebd296e94c16D2542e205254856', // USDC
  '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x9500125Bdec4aF1562B4e914701E4529dBb3eD02'
