/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'

export const REFERENCE_TOKEN = '0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0x4538053Fc57d72eb70c6f822A3275531760BC7FD' // WMON/USDC pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A', // WMON
  '0xEE8c0E9f1BFFb4Eb878d8f15f368A02a35481242', // WETH
  '0x754704Bc059F8C67012fEd69BC8A327a5aafb603', // USDC
  '0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a', // AUSD
  '0xe7cd86e13AC4309349F30B3435a9d337750fC82D', // USDT0
  '0x01bFF41798a0BcF287b996046Ca68b395DbC1071', // XAUt0
  '0xAD96C3dffCD6374294e2573A7fBBA96097CC8d7c', // DUST
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x754704Bc059F8C67012fEd69BC8A327a5aafb603', // USDC
  '0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a', // AUSD
  '0xe7cd86e13AC4309349F30B3435a9d337750fC82D', // USDT0
  '0x01bFF41798a0BcF287b996046Ca68b395DbC1071', // XAUt0
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x503D191CaFaB1d097b5F798d850E5897195C1d74'
