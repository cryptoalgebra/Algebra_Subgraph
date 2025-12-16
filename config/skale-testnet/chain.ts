/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x99E317c0099F0fB8C5913db976d00fddeDB69583'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'

export const REFERENCE_TOKEN = '0x955B95b8532fe75DDCf2161f61127Be74A768158' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.001')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  "0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A", //wnative
  "0x955B95b8532fe75DDCf2161f61127Be74A768158", // usdc.e
  "0x325eeb3aa50014f35861e3374f54b3997aa8357d" // usdc
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xd7cB0E0692f2D55A17bA81c1fE5501D66774fC4A', // usdc.e
  '0x325eeb3aa50014f35861e3374f54b3997aa8357d' // usdc
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x49BE8AA6c684b15e0C5450e8Fa0b16Bec1435596'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x34D6F4f7D27B94C157aE3DB2D17C1beCB1bBF89C'

export const ALM_VAULT_FACTORY_ADDRESS = '0x1B3B62B519a60E8927d4FfbB54681871e1Bb6F11'