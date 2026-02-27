/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x44b7fbd4d87149efa5347c451e74b9fd18e89c55'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x00d5BbD0Fe275EFEE371a2B34d0a4b95B0C8aaaa'

export const REFERENCE_TOKEN = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xde758db54c1b4a87b06b34b30ef0a710dc35388f' // WMON/USDC pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.1')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // wavax
  '0xdac17f958d2ee523a2206206994597c13d831ec7', // WETH
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
  '0x9d39a5de30e57443bff2a8307a4256c8797a3497', // AUSD
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // USDT0
  '0x059ff12b18e628af46c5ab83e0318a6f22c6ea4e', // XAUt0
  '0x0fd4a527a4422aca27f48cd79e4093867544a616', // DUST
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDC
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // AUSD
  '0x9d39a5de30e57443bff2a8307a4256c8797a3497'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x503D191CaFaB1d097b5F798d850E5897195C1d74'
