/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x90dD87C994959A36d725bB98F9008B0b3C3504A0'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x26c48519bBCf6df3E39d4C724ff82B6F060D3Bbe'

export const REFERENCE_TOKEN = '0xacc15dc74880c9944775448304b263d191c6077f' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x8b86404faa0269fc18c6abb091e551454b29bc30' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xacc15dc74880c9944775448304b263d191c6077f',
  '0x0e358838ce72d5e61e0018a2ffac4bec5f4c88d2', 
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0xffffffff1fcacbd218edc0eba20fc2308c778080',
  '0xFFfffffF7D2B0B761Af01Ca8e25242976ac0aD7D',
  '0xffffffffea09fb06d082fd1275cd48b191cbcd1d' 
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xFFfffffF7D2B0B761Af01Ca8e25242976ac0aD7D',
  '0xffffffffea09fb06d082fd1275cd48b191cbcd1d'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0987A3dC376a33ED720e15D2eC62eA6179D51141'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
