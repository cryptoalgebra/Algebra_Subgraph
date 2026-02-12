/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xAbAc6f23fdf1313FC2E9C9244f666157CcD32990'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xA9C02F398B3da32FEbb634Ec4d1ca01d2B1D400a'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x2a9C950cdd4349d19f479CF118C0889B9DDC5935' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb'  // USDC
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb'  // USDC
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xe34ee083B4154F2624ECCb9A80E188b83944c2d5'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0xB8C2125a316429669bD8CE88fB674843E71caDE8'
