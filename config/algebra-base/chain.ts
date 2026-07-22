import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x3459670786E3ea7AEB1e09518D89eB277A23C68c'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x6dCbcdFE2cBB450BAb3D32BcB5661993D1712732'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xfae2188dcde80c53bcae09a2b0a5bbb6873f3a56' // USDT/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x4200000000000000000000000000000000000006', // WETH
  '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2', // USDT
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'  // USDC
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2', // USDT
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'  // USDC
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xa744153cd2414ae55D6aEe925d2f791A74d50d2D'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x61C74d608c427b348cDA28943f86B01964eFFd65'

// Addresses for ALM subgraph
// ALM Vault Factory contract
export const ALM_VAULT_FACTORY_ADDRESS = '0x3490e9f5397c081506471b5680f89975598D3233'

export const ERC20_FACTORY_ADDRESS = '0xfa6980Ca4698D1F910CC76Fe8B8c404cD9209e31'

// Blacklisted pools that should be excluded from indexing
export const BLACKLISTED_POOLS: string[] = []
