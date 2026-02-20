/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x512eb749541B7cf294be882D636218c84a5e9E5F'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'

export const REFERENCE_TOKEN = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xA02Ec3Ba8d17887567672b2CDCAF525534636Ea0' // WMON/USDC pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('10')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // wavax
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // WETH
  '0x152b9d0FdC40C096757F570A51E494bd4b943E50', // USDC
  '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', // AUSD
  '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', // USDT0
  '0xcd94a87696FAC69Edae3a70fE5725307Ae1c43f6', // XAUt0
  '0xAD96C3dffCD6374294e2573A7fBBA96097CC8d7c', // DUST
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // USDC
  '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', // AUSD
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x503D191CaFaB1d097b5F798d850E5897195C1d74'
