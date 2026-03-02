/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x3459670786e3ea7aeb1e09518d89eb277a23c68c'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x6dCbcdFE2cBB450BAb3D32BcB5661993D1712732'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // WETH 
export const STABLE_TOKEN_POOL = '0xd3344C884615135E2EC63024A99291C4604ac02c' // WETH/USDC pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913' // USDC
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913' // USDC
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xa744153cd2414ae55D6aEe925d2f791A74d50d2D'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x61C74d608c427b348cDA28943f86B01964eFFd65'


export const ALM_VAULT_FACTORY_ADDRESS = '0x3490e9f5397c081506471b5680f89975598D3233'