/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x3B22094a64D3D6801a27Db4e58ac0B859A4C066d'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x28DeD2af752655Df5Ee92450DC259F92a5ABe449'

export const REFERENCE_TOKEN = '0x838800b758277cc111b2d48ab01e5e164f8e9471' // WPHRS 
export const STABLE_TOKEN_POOL = '0x02c58a4EC8932a7FF30689AAAC149CC5d565580E' // WPHRS/USDC pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x838800b758277cc111b2d48ab01e5e164f8e9471', // WPHRS
  '0x95e325a85b9e6cb4dea2ccd96218e5f8365e0b0f' // USDC
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x95e325a85b9e6cb4dea2ccd96218e5f8365e0b0f' // USDC
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x0105fA46539565C66Cb1203F663489f93c773C4c'
