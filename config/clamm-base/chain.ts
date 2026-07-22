/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph
export const FACTORY_ADDRESS = '0x53400eD24c77515397fC3A559fF1363DaB81B5c7'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x62a314428455600a7fDf1D4F250a475121356E67'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // WETH
export const STABLE_TOKEN_POOL = '0x29181eca1cab0091f30610f73dfeae7e85177dbb' // WETH/USDC pool (computed via AlgebraFactory.computePoolAddress, pool not created on-chain yet)

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
export const ETERNAL_FARMING_ADDRESS = '0xF58F0C2c87b09E3Cd18e3cFF907CEd04A5b39c4e'

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x1111111111111111111111111111111111111111' // not deployed on this network
