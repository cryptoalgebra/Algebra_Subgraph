/* eslint-disable prefer-const */
import { BigInt, BigDecimal} from '@graphprotocol/graph-ts'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const FEE_DENOMINATOR = BigDecimal.fromString('1000000') 
export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export const Q192 = BigInt.fromI32(2).pow(192)
export const MAX_TICK_DEVIATION_FOR_PRICING = BigInt.fromI32(50000)
