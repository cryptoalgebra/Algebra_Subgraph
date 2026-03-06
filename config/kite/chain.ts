/* eslint-disable prefer-const */
import { BigDecimal} from '@graphprotocol/graph-ts'

// Addresses for analytics subgraph 
export const FACTORY_ADDRESS = '0x10253594A832f967994b44f33411940533302ACb'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F'

export const REFERENCE_TOKEN = '0x3bC8f037691Ce1d28c0bB224BD33563b49F99dE8' // Wrapped Native Token
export const STABLE_TOKEN_POOL = '0xBeD0EAd547720BC2d3dBB9FA43Ef5010d165560c' // USDC/WETH pool

// Minimum reference token locked in pool for pricing calculations
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('0')

// Token lists for tracking volume and liquidity
export const WHITELIST_TOKENS: string[] = [
  '0x3bC8f037691Ce1d28c0bB224BD33563b49F99dE8',
  '0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63', 
  '0x5aefba317baba46eaf98fd6f381d07673bca6467',
  '0x49A390A3DFD2D01389F799965F3AF5961F87D228',
  '0xd98F5A16DE519866980f2e3389967Ea01Dc3822d',
  '0x2d16C0dc617dCF743f55A3bB42fDE4A0E640A5b5',
  '0x2746B1a7B780f128F0db99d9fc60C2DB3E4a7bd5' 
]

// Stable coins for USD pricing (tokens with stable $1 value)
export const STABLE_COINS: string[] = [
  '0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63',
  '0xd98F5A16DE519866980f2e3389967Ea01Dc3822d',
  '0x2d16C0dc617dCF743f55A3bB42fDE4A0E640A5b5' 
]

// Addresses for farming subgraph
// Farming contracts
export const ETERNAL_FARMING_ADDRESS = '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA'  

// Addresses for limit order subgraph
// Limit order contract
export const LIMIT_ORDER_ADDRESS = '0x7a92fCFB8ddDa89ad75ce1D3677CC3e254486493'

export const ALM_VAULT_FACTORY_ADDRESS = '0x7064C7Bb85979f008212877c4CE41285ddf5374C'