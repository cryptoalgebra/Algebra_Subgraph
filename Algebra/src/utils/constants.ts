/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { Factory as FactoryContract } from '../types/templates/Pool/Factory'


export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const FACTORY_ADDRESS = '0x9b05452f4eda703744f2750258714377ef765f7b'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export let factoryContract = FactoryContract.bind(Address.fromString(FACTORY_ADDRESS))
// "0x49c1c3ac4f301ad71f788398c0de919c35eaf565","0xc3c4074fbc2d504fb8ccd28e3ae46914a1ecc5ed"
export let pools_list = ["0x49c1c3ac4f301ad71f788398c0de919c35eaf565","0xc3c4074fbc2d504fb8ccd28e3ae46914a1ecc5ed"]