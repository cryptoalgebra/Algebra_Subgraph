/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x3B22094a64D3D6801a27Db4e58ac0B859A4C066d'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xAbAc6f23fdf1313FC2E9C9244f666157CcD32990'

export const REFERENCE_TOKEN = '0x0162c4eb1539e0123da26d8a6747f3deb2e01fe2' // WZTH
export const STABLE_TOKEN_POOL = '0x288f954bf7A343887a7856441Fe1A9810ba3120c' // WZTH/USDC pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x0162c4eb1539e0123da26d8a6747f3deb2e01fe2', // WZTH
  '0xA9C02F398B3da32FEbb634Ec4d1ca01d2B1D400a', // USDC
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xA9C02F398B3da32FEbb634Ec4d1ca01d2B1D400a' // USDC

]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '111' // fake
