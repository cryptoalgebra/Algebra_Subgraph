import { ethereum, crypto, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  EternalFarmingCreated,
  FarmEntered,
  RewardAmountsDecreased,
  FarmEnded,
  RewardClaimed,
  IncentiveDeactivated,
  RewardsRatesChanged,
  RewardsAdded,
  RewardsCollected,
  PoolFarmingBuffer,
  RewardsForfeited,
  ForfeitedRewardsWithdrawn
} from '../types/EternalFarming/EternalFarming';
import { Deposit, Reward, EternalFarming, FarmingBuffer, RewardsForfeitedEvent } from '../types/schema';

// The protocol tracks forfeited (anti-JIT-buffer) rewards in the same `rewards`
// mapping used for owner balances, keyed by the zero address - no real position
// owner can ever hold it. Mirror that here instead of inventing a new bucket.
function forfeitedBucketOwner(): Address {
  return Address.zero();
}

// RewardsForfeited fires before FarmEnded, in the same tx, when exitFarming's
// accrued reward is forfeited. Keying by tx+tokenId+incentiveId lets the
// FarmEnded handler detect that case and avoid double-decrementing or paying
// the owner for an amount that actually went to the forfeited bucket.
function forfeitEventId(event: RewardsForfeited): string {
  return (
    event.transaction.hash.toHexString() +
    '-' +
    event.params.tokenId.toString() +
    '-' +
    event.params.incentiveId.toHexString()
  );
}

function creditForfeitedBucket(rewardAddress: Bytes, amount: BigInt): void {
  let id = rewardAddress.toHexString() + forfeitedBucketOwner().toHexString();
  let rewardEntity = Reward.load(id);

  if (rewardEntity == null) {
    rewardEntity = new Reward(id);
    rewardEntity.amount = BigInt.fromString('0');
  }

  rewardEntity.owner = forfeitedBucketOwner();
  rewardEntity.rewardAddress = rewardAddress;
  rewardEntity.amount = rewardEntity.amount.plus(amount);
  rewardEntity.save();
}

export function handleIncentiveCreated(event: EternalFarmingCreated): void {
  let incentiveIdTuple: Array<ethereum.Value> = [
    ethereum.Value.fromAddress(event.params.rewardToken),
    ethereum.Value.fromAddress(event.params.bonusRewardToken),
    ethereum.Value.fromAddress(event.params.pool),
    ethereum.Value.fromUnsignedBigInt(event.params.nonce)
  ];

  
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

  // FarmEnded always fires with the real accrued amount, even when it was
  // forfeited to the protocol bucket rather than paid to the owner. If a
  // RewardsForfeited for this tokenId/incentiveId already ran earlier in this
  // tx, that handler already did the reward/bonusReward accounting and
  // credited the forfeited bucket - don't double it here, and don't pay the
  // owner for an amount they never actually received.
  let forfeitCacheId =
    event.transaction.hash.toHexString() +
    '-' +
    event.params.tokenId.toString() +
    '-' +
    event.params.incentiveId.toHexString()
  let wasForfeited = RewardsForfeitedEvent.load(forfeitCacheId) != null

  if(entity){
    let eternalFarming = EternalFarming.load(entity.eternalFarming! .toHexString())

    if(eternalFarming && !wasForfeited){
      eternalFarming.reward -= event.params.reward
      eternalFarming.bonusReward -= event.params.bonusReward
      eternalFarming.save()
    }
  }

  if (entity != null) {
    entity.eternalFarming = null;
    entity.save();
  }

  if (wasForfeited) {
    return
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

export function handleFarmingBuffer(event: PoolFarmingBuffer): void {
  let id = event.params.pool.toHexString()
  let entity = FarmingBuffer.load(id)

  if (entity == null) {
    entity = new FarmingBuffer(id)
    entity.pool = event.params.pool
  }

  entity.buffer = event.params.buffer
  entity.save()
}

export function handleForfeited(event: RewardsForfeited): void {
  let deposit = Deposit.load(event.params.tokenId.toString())

  if (deposit) {
    let eternalFarming = EternalFarming.load(event.params.incentiveId.toHexString())

    if (eternalFarming) {
      eternalFarming.reward -= event.params.reward
      eternalFarming.bonusReward -= event.params.bonusReward
      eternalFarming.save()

      creditForfeitedBucket(eternalFarming.rewardToken, event.params.reward)
      creditForfeitedBucket(eternalFarming.bonusRewardToken, event.params.bonusReward)
    }
  }

  let cache = new RewardsForfeitedEvent(forfeitEventId(event))
  cache.tokenId = event.params.tokenId
  cache.incentiveId = event.params.incentiveId
  cache.owner = event.params.owner
  cache.reward = event.params.reward
  cache.bonusReward = event.params.bonusReward
  cache.timestamp = event.block.timestamp
  cache.save()
}

export function handleForfeitedWithdrawn(event: ForfeitedRewardsWithdrawn): void {
  let id = event.params.token.toHexString() + forfeitedBucketOwner().toHexString()
  let rewardEntity = Reward.load(id)

  if (rewardEntity == null) {
    rewardEntity = new Reward(id)
    rewardEntity.amount = BigInt.fromString('0')
    rewardEntity.owner = forfeitedBucketOwner()
    rewardEntity.rewardAddress = event.params.token
  }

  rewardEntity.amount = rewardEntity.amount.minus(event.params.amount)
  rewardEntity.save()
}

