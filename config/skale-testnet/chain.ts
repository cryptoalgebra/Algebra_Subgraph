/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x99E317c0099F0fB8C5913db976d00fddeDB69583'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'

export const REFERENCE_TOKEN = '0xF94056BD7f6965Db3757E1B145f200b7346B4Fc0' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x6869452bc3e8a2514488c1905cbe22f7a6f7c4a5' // USDT/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.0001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xF94056BD7f6965Db3757E1B145f200b7346B4Fc0', // WETH
  '0xD2Aaa00700000000000000000000000000000000',
  '0x2e08028E3C4c2356572E096d8EF835cD5C6030bD',  // USDT
  '0x3Ca0A49f511c2c89c4DCbbf1731120d8919050Bf',
  '0x4512eacd4186b025186e1cf6cc0d89497c530e87'
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x2e08028E3C4c2356572E096d8EF835cD5C6030bD',
  '0x3Ca0A49f511c2c89c4DCbbf1731120d8919050Bf'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x49BE8AA6c684b15e0C5450e8Fa0b16Bec1435596'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x34D6F4f7D27B94C157aE3DB2D17C1beCB1bBF89C'

export const ALM_VAULT_FACTORY_ADDRESS = '0x1B3B62B519a60E8927d4FfbB54681871e1Bb6F11'