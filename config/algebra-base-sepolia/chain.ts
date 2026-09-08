/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x285C74f3d01296F96c5d3858ab482f707e8Bfdfc'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xF207b9E74Ff3943eC0Fc371C2607A7a1Bfb0eDCd'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x671dDf7E29272c5Bf6996F765fABf58351cfF137' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0xABAC6F23FDF1313FC2E9C9244F666157CCD32990', // USDC
  '0x6045450424c527bee1a2638d822d11bbca4f2a46', // AVUSDC
  '0xf115d73823b3268aaaa58691a3778c08dee77a91',  // AVETH
  '0x0AcaE280cC7695E5bbBd6fB4b5B1B39C9594638D',
  '0x4db3fBA9958F7eE9715875E485cEae299714029C',
  '0x980447AbF3B26B41c7f1777C2A8dF41cCd62ace6',
  '0xdDC1FD535E7243f43465094f43Ee8a03A5189acd'
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xabac6f23fdf1313fc2e9c9244f666157ccd32990',
  '0x0AcaE280cC7695E5bbBd6fB4b5B1B39C9594638D', // USDC
  '0xdDC1FD535E7243f43465094f43Ee8a03A5189acd'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xB50E639E23C954546C75d9C15363FC0375E5E95E'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0xdA9c1AF6498583Ae548CAd31c47eFde061569789'

// Addresses for ALM subgraph
// ALM Vault Factory contract
export const ALM_VAULT_FACTORY_ADDRESS = '0xAb87BB2cd5a370b685313daf699FA168EE74099D'
