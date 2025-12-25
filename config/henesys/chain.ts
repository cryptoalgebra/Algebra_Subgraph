/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xab49321DF952315E208a2B7046A00d2015E39cba'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x658E287E9C820484f5808f687dC4863B552de37D'

export const REFERENCE_TOKEN = '0x150869eac5C58d3655f860C4316107fB626244d0' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xabff72aee1ba72fc459acd5222dd84a3182411bb' // USDC/WETH pool, fake, to change

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x150869eac5C58d3655f860C4316107fB626244d0'
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // fake, to change
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xAbAc6f23fdf1313FC2E9C9244f666157CcD32990'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
