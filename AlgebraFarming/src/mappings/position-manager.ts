import {
  IncreaseLiquidity,
  DecreaseLiquidity,
  NonfungiblePositionManager,
  Transfer
} from '../types/NonfungiblePositionManager/NonfungiblePositionManager'
import {  Deposit } from '../types/schema'
import { BigInt, Address } from '@graphprotocol/graph-ts'

export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  let entity = Deposit.load(event.params.tokenId.toString());

  if (entity == null) {
    entity = new Deposit(event.params.tokenId.toString());
    entity.owner = event.transaction.from;
    entity.pool = event.params.pool;
    entity.liquidity = BigInt.fromString("0")
    entity.rangeLength = getRangeLength(event.params.tokenId, event.address)
  }
  entity.liquidity = entity.liquidity.plus(event.params.actualLiquidity);
  entity.save();

}

export function handleDecreaseLiquidity(event: DecreaseLiquidity): void{

  let deposit = Deposit.load(event.params.tokenId.toString());
  if (deposit){
    deposit.liquidity = deposit.liquidity.minus(event.params.liquidity)
    deposit.save()
  }
}


export function handleTransfer(event: Transfer): void {

  let entity = Deposit.load(event.params.tokenId.toString());
  
  if (entity != null) {
    entity.owner = event.params.to;
    entity.save(); 
  }
 
}

function getRangeLength(tokenId: BigInt, eventAddress: Address): BigInt {
  let contract = NonfungiblePositionManager.bind(eventAddress)
    let positionCall = contract.try_positions(tokenId)

    // the following call reverts in situations where the position is minted
    // and deleted in the same block 
    const stringBoolean = `${positionCall.reverted}`
    if (!positionCall.reverted) {
      let positionResult = positionCall.value
      return BigInt.fromI32(positionResult.value6 - positionResult.value5)
    }
    else{
      return BigInt.fromString('0')
    }
}