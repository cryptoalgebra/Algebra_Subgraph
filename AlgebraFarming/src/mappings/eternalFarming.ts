import { ethereum, crypto, BigInt } from '@graphprotocol/graph-ts';
import {
  EternalFarmingCreated,
  FarmEntered,
  RewardAmountsDecreased,
  FarmEnded,
  RewardClaimed,
  IncentiveDeactivated,
  RewardsRatesChanged,
  RewardsAdded,
  RewardsCollected
} from '../types/EternalFarming/EternalFarming';
import { Deposit, Reward, EternalFarming } from '../types/schema';
import { createTokenEntity } from '../utils/token'

export function handleIncentiveCreated(event: EternalFarmingCreated): void {
  let incentiveIdTuple: Array<ethereum.Value> = [
    ethereum.Value.fromAddress(event.params.rewardToken),
    ethereum.Value.fromAddress(event.params.bonusRewardToken),
    ethereum.Value.fromAddress(event.params.pool),
    ethereum.Value.fromUnsignedBigInt(event.params.nonce)
  ];

  createTokenEntity(event.params.rewardToken)
  createTokenEntity(event.params.bonusRewardToken)
  
  let _incentiveTuple = changetype<ethereum.Tuple>(incentiveIdTuple);

  let incentiveIdEncoded = ethereum.encode(
    ethereum.Value.fromTuple(_incentiveTuple)
  )!;
  let incentiveId = crypto.keccak256(incentiveIdEncoded);

  let entity = EternalFarming.load(incentiveId.toHex()); 
  if (entity == null) {
    entity = new EternalFarming(incentiveId.toHex());
    entity.reward = BigInt.fromString("0");
    entity.bonusReward = BigInt.fromString("0");
    entity.rewardRate = BigInt.fromString("0");
    entity.bonusRewardRate = BigInt.fromString("0");
  }
  
  entity.rewardToken = event.params.rewardToken;
  entity.bonusRewardToken = event.params.bonusRewardToken;
  entity.pool = event.params.pool;
  entity.nonce = event.params.nonce;
  entity.virtualPool = event.params.virtualPool;

  entity.isDeactivated = false;
  entity.minRangeLength = BigInt.fromI32(event.params.minimalAllowedPositionWidth)
  entity.save();
}


export function handleTokenStaked(event: FarmEntered): void {
  let entity = Deposit.load(event.params.tokenId.toString());
  if (entity != null) {
    entity.eternalFarming = event.params.incentiveId;
    entity.save();
  }

}

export function handleRewardClaimed(event: RewardClaimed): void {
  let id = event.params.rewardAddress.toHexString() + event.params.owner.toHexString();
  let rewardEntity = Reward.load(id);
  if (rewardEntity != null){
      rewardEntity.owner = event.params.owner;
      rewardEntity.rewardAddress = event.params.rewardAddress;
      rewardEntity.amount = rewardEntity.amount.minus(event.params.reward);
      rewardEntity.save();
  }
}

export function handleTokenUnstaked(event: FarmEnded): void {
  
  let entity = Deposit.load(event.params.tokenId.toString());
  
  if(entity){
    let eternalFarming = EternalFarming.load(entity.eternalFarming! .toHexString())

    if(eternalFarming){
      eternalFarming.reward -= event.params.reward
      eternalFarming.bonusReward -= event.params.bonusReward
      eternalFarming.save()
    }
  }

  if (entity != null) {
    entity.eternalFarming = null;  
    entity.save();
  }

  let id = event.params.rewardAddress.toHexString() + event.params.owner.toHexString()
  let rewardEntity = Reward.load(id)

  if (rewardEntity == null){
      rewardEntity = new Reward(id)
      rewardEntity.amount = BigInt.fromString('0')
  }

  rewardEntity.owner = event.params.owner
  rewardEntity.rewardAddress = event.params.rewardAddress
  rewardEntity.amount = rewardEntity.amount.plus(event.params.reward)
  rewardEntity.save();  


  id =  event.params.bonusRewardToken.toHexString() + event.params.owner.toHexString()
  rewardEntity = Reward.load(id)

  if (rewardEntity == null){
    rewardEntity = new Reward(id)
    rewardEntity.amount = BigInt.fromString('0')
  }

  rewardEntity.owner = event.params.owner
  rewardEntity.rewardAddress = event.params.bonusRewardToken
  rewardEntity.amount = rewardEntity.amount.plus(event.params.bonusReward)
  rewardEntity.save();

}

export function handleDeactivate( event: IncentiveDeactivated): void{

  let entity = EternalFarming.load(event.params.incentiveId.toHex());

  if(entity){
    entity.isDeactivated = true
    entity.save()
  } 

}


export function handleRewardsRatesChanged( event: RewardsRatesChanged): void{
  let eternalFarming = EternalFarming.load(event.params.incentiveId.toHexString())
  if(eternalFarming){
    eternalFarming.rewardRate = event.params.rewardRate
    eternalFarming.bonusRewardRate = event.params.bonusRewardRate
    eternalFarming.save()
  }
}

export function handleRewardsAdded( event: RewardsAdded): void{
  let eternalFarming = EternalFarming.load(event.params.incentiveId.toHexString())
  if(eternalFarming){
    eternalFarming.reward += event.params.rewardAmount
    eternalFarming.bonusReward += event.params.bonusRewardAmount 
    eternalFarming.save()
  }
}

export function handleRewardDecreased( event: RewardAmountsDecreased): void{
  let eternalFarming = EternalFarming.load(event.params.incentiveId.toHexString())
  if(eternalFarming){
    eternalFarming.reward -= event.params.rewardAmount
    eternalFarming.bonusReward -= event.params.bonusRewardAmount 
    eternalFarming.save()
  }
}

export function handleCollect( event: RewardsCollected): void{

  let entity = Deposit.load(event.params.tokenId.toString());
  
  if(entity){
    let eternalFarmingID = entity.eternalFarming!.toHexString()
    let eternalFarming = EternalFarming.load(eternalFarmingID)

    if(eternalFarming){
      eternalFarming.reward -= event.params.rewardAmount
      eternalFarming.bonusReward -= event.params.bonusRewardAmount
      eternalFarming.save()
    

  let id = eternalFarming.rewardToken.toHexString() + entity.owner.toHexString()
  let rewardEntity = Reward.load(id)

  if (rewardEntity == null){
      rewardEntity = new Reward(id)
      rewardEntity.amount = BigInt.fromString('0')
  }

  rewardEntity.owner = entity.owner
  rewardEntity.rewardAddress = eternalFarming.rewardToken
  rewardEntity.amount = rewardEntity.amount.plus(event.params.rewardAmount)
  rewardEntity.save();  


  id =  eternalFarming.bonusRewardToken.toHexString() + entity.owner.toHexString()
  rewardEntity = Reward.load(id)

  if (rewardEntity == null){
    rewardEntity = new Reward(id)
    rewardEntity.amount = BigInt.fromString('0')
  }

  rewardEntity.owner = entity.owner
  rewardEntity.rewardAddress = eternalFarming.bonusRewardToken
  rewardEntity.amount = rewardEntity.amount.plus(event.params.bonusRewardAmount)
  rewardEntity.save();
}
}
} 

