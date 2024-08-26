/* eslint-disable prefer-const */
import { BigInt, BigDecimal, ethereum, log } from '@graphprotocol/graph-ts'
import { Transaction } from '../types/schema'
import { ONE_BI, ZERO_BI, ZERO_BD, ONE_BD} from '../utils/constants'

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

// return 0 if denominator is 0 in division
export function safeDiv(amount0: BigDecimal, amount1: BigDecimal): BigDecimal {
  if (amount1.equals(ZERO_BD)) {
    return ZERO_BD
  } else {
    return amount0.div(amount1)
  }
}

export function bigDecimalExponated(value: BigDecimal, power: BigInt): BigDecimal {
  if (power.equals(ZERO_BI)) {
    return ONE_BD
  }
  let negativePower = power.lt(ZERO_BI)
  let result = ZERO_BD.plus(value)
  let powerAbs = power.abs()
  for (let i = ONE_BI; i.lt(powerAbs); i = i.plus(ONE_BI)) {
    result = result.times(value)
  }

  if (negativePower) {
    result = safeDiv(ONE_BD, result)
  }

  return result
}

export function tokenAmountToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function priceToDecimal(amount: BigDecimal, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return amount
  }
  return safeDiv(amount, exponentToBigDecimal(exchangeDecimals))
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString())
  const zero = parseFloat(ZERO_BD.toString())
  if (zero == formattedVal) {
    return true
  }
  return false
}

export function isNullEthValue(value: string): boolean {
  return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
}

export function bigDecimalExp18(): BigDecimal {
  return BigDecimal.fromString('1000000000000000000')
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function convertEthToDecimal(bnb: BigInt): BigDecimal {
  return bnb.toBigDecimal().div(exponentToBigDecimal(18))
}

export function loadTransaction(event: ethereum.Event): Transaction {
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString())
  }
  transaction.blockNumber = event.block.number
  transaction.timestamp = event.block.timestamp
  transaction.gasLimit = event.transaction.gasLimit
  transaction.gasPrice = event.transaction.gasPrice
  transaction.save()
  return transaction as Transaction
}

export function tickToSqrtPrice(tick: BigInt): BigDecimal{
    return bigDecimalExponated(BigDecimal.fromString('1.0001'), tick.div(BigInt.fromI32(2)))
}

export function getAmounts(liquidity: BigInt, tickLower: BigInt, tickUpper: BigInt, tick: BigInt, token0: boolean): BigDecimal{
  if(tickLower < BigInt.fromI32(-887272) || tickUpper > BigInt.fromI32(887272))
    return ZERO_BD
  let lowerPrice = tickToSqrtPrice(tickLower)
  let upperPrice = tickToSqrtPrice(tickUpper)
  let currentPrice = tickToSqrtPrice(tick)
  let amount0 = ZERO_BD
  let amount1 = ZERO_BD
  if (currentPrice < lowerPrice){
      amount0 = liquidity.toBigDecimal().times(ONE_BD.div(lowerPrice).minus(ONE_BD.div(upperPrice)))
  } else {
      if (lowerPrice <= currentPrice && currentPrice <= upperPrice){
        amount1 = liquidity.toBigDecimal().times(currentPrice - lowerPrice)
        amount0 = liquidity.toBigDecimal().times(ONE_BD.div(currentPrice) - ONE_BD.div(upperPrice))
      }
      else{
        amount1 = liquidity.toBigDecimal().times(upperPrice - lowerPrice)

      }
    }
  
  return token0 ? amount0 : amount1
}
