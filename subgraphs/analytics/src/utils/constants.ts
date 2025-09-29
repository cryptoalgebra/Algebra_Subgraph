/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

export const TREB_ADDRESS = '0xb96450dcb16e4a30b999cb5f4087bae9c0ffac4e'
export const XTREB_ADDRESS = Address.fromString('0xa74b08ea836d9b07809241fbb128c6d871174681')
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const FEE_DENOMINATOR = BigDecimal.fromString('1000000') 
export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export const Q192 = BigInt.fromI32(2).pow(192)
