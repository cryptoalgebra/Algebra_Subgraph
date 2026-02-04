/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0xEdbBc263C74865e67C6b16F47740Fa3901b95Ae1'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x1851cf3Ef0e0427948E16de79740A873189E9373'

export const REFERENCE_TOKEN = '0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xf89c918f0ee8a2f752fedcca012acf930bda2905' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('500')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xe30fedd158a2e3b13e9badaeabafc5516e95e8c7',
  '0xb75d0b03c06a926e488e2659df1a861f860bd3d1',
  '0x3894085ef7ff0f0aedf52e2a2704928d1ec074f1',
  '0x5cf6826140c1c56ff49c808a1a75407cd1df9423',
  '0x51121bcae92e302f19d06c193c95e1f7b81a444b',
  '0x160345fc359604fc6e70e3c5facbde5f7a9342d8',
  '0x0555e30da8f98308edb960aa94c0db47230d2b9c',
  '0x37a4dd9ced2b19cfe8fac251cd727b5787e45269',
  '0x059a6b0ba116c63191182a0956cf697d0d2213ec',
  '0x541fd749419ca806a8bc7da8ac23d346f2df8b77',
  '0x9151434b16b9763660705744891fa906f660ecc5',
  '0x5f0e07dfee5832faa00c63f2d33a0d79150e8598',
  '0x95597eb8d227a7c4b4f5e807a815c5178ee6dbe1',
  '0xf9bdbf259ece5ae17e29bf92eb7abd7b8b465db9',
  '0x80eede496655fb9047dd39d9f418d5483ed600df',
  '0x93919784c523f39cacaa98ee0a9d96c3f32b593e',
  '0x9bfa177621119e64cecbeabe184ab9993e2ef727'
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x3894085ef7ff0f0aedf52e2a2704928d1ec074f1',
  '0x9151434b16b9763660705744891fA906F660EcC5', 
  '0x059a6b0ba116c63191182a0956cf697d0d2213ec'
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x0000000000000000000000000000000000000000'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
