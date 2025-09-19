/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x2fB84Ae4b1B6aeEc5627268070cF44C678Cd9728'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x9026d1c84f5834968FE80368b216D7C34109Cf97'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x5500c2FfEBB0B0D03C39F6F39F31000C5ADA3bCA' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006',
  '0xABAC6F23FDF1313FC2E9C9244F666157CCD32990', 
  '0x5aefba317baba46eaf98fd6f381d07673bca6467',
  '0x49A390A3DFD2D01389F799965F3AF5961F87D228' 
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xabac6f23fdf1313fc2e9c9244f666157ccd32990'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xc709aCDA0dBF1a70189bd850e8E8b2659017Fa62'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0xe578551955EA80F001DD5C1d1db3F4652a049C5D'
