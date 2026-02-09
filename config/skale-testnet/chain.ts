/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x99E317c0099F0fB8C5913db976d00fddeDB69583'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'

export const REFERENCE_TOKEN = '0x9fad6Fd657ffD9045a1377C692F8Bb2d3d57C7B6' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xe90dfd31c0d8c2adfa996e5ba175bad077a598bf' // USDT/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.00001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xD2Aaa00700000000000000000000000000000000', // WETH
  '0x3Ca0A49f511c2c89c4DCbbf1731120d8919050Bf'  // USDT
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x3Ca0A49f511c2c89c4DCbbf1731120d8919050Bf'  // USDT
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x49BE8AA6c684b15e0C5450e8Fa0b16Bec1435596'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x34D6F4f7D27B94C157aE3DB2D17C1beCB1bBF89C'

export const ALM_VAULT_FACTORY_ADDRESS = '0x4b36b366f262E5418Ba2D49C3Eb7C546cc48Fa65'