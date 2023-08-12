/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { Factory as FactoryContract } from '../types/templates/Pool/Factory'


export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const FACTORY_ADDRESS = '0xa37359E63D1aa44C0ACb2a4605D3B45785C97eE3'
export const SYNTH_ADDRESS = '0xbd2dbb8ecea9743ca5b16423b4eaa26bdcfe5ed2'
export const XSYNTH_ADDRESS = Address.fromString('0x01cc6b33c63cee896521d63451896c14d42d05ea')

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export let TICK_SPACING = BigInt.fromI32(60)

export let factoryContract = FactoryContract.bind(Address.fromString(FACTORY_ADDRESS))

export let pools_list = [""]