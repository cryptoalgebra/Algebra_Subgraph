/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x36077D39cdC65E1e3FB65810430E5b2c4D5fA29E'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0xC63E9672f8e93234C73cE954a1d1292e4103Ab86'

export const REFERENCE_TOKEN = '0x4200000000000000000000000000000000000006' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x82dbe18346a8656dbb5e76f74bf3ae279cc16b29' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0.01')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  "0x4200000000000000000000000000000000000006", // WETH
  "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // USDC
  "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf", // cbBTC
  "0x00000e7efa313f4e11bfff432471ed9423ac6b30", // HYDX
  "0x3595ca37596D5895B70EFAB592ac315D5B9809B2", // AZUSD
  "0xe5020a6d073a794b6e7f05678707de47986fb0b6", // frxUSD
  "0x55380fe7a1910dff29a47b622057ab4139da42c5"  // fxUSD

]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC
  "0x3595ca37596D5895B70EFAB592ac315D5B9809B2", // AZUSD
  "0xe5020a6d073a794b6e7f05678707de47986fb0b6", // frxUSD
  "0x55380fe7a1910dff29a47b622057ab4139da42c5"  // fxUSD
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0xdFEB2C88C32311792665b8626093193b959138D3'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x822ddb9EECc3794790B8316585FebA5b8F7C7507'
