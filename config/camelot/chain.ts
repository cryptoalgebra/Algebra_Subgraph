/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xfb8Ed3485EfA29a0e4bed93351dD51B59fC4b0f0'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x0a984a446A116335ac90425d2D1E69A7199A2f7c'

export const REFERENCE_TOKEN = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x915fD34CadD63907b51Eb64DDdC2eadd114A0bEd' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.1')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3',
  '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0'
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xB50E639E23C954546C75d9C15363FC0375E5E95E'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x05F9E353559da6f2Bfe9A0980D5C3e84eA5d4238'

// Addresses for ALM subgraph
// ALM Vault Factory contract
export const ALM_VAULT_FACTORY_ADDRESS = '0xAb87BB2cd5a370b685313daf699FA168EE74099D'
