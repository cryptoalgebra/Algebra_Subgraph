import { ethereum, crypto, BigInt, Address } from '@graphprotocol/graph-ts';
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
import { Deposit, Reward, EternalFarming, TokenReward } from '../types/schema';

// Helper function to add reward to tracking system
function addRewardForToken(
  owner: Address,
  rewardAddress: Address,
  tokenId: BigInt,
  amount: BigInt
): void {
  // Update main Reward entity
  let rewardId = rewardAddress.toHexString() + owner.toHexString();
  let rewardEntity = Reward.load(rewardId);
  
  if (rewardEntity == null) {
    rewardEntity = new Reward(rewardId);
    rewardEntity.amount = BigInt.fromString('0');
    rewardEntity.owner = owner;
    rewardEntity.rewardAddress = rewardAddress;
    rewardEntity.tokenIds = [];
    rewardEntity.tokenAmounts = [];
  }
  
  rewardEntity.amount = rewardEntity.amount.plus(amount);
  
  // Initialize arrays if they don't exist (for backward compatibility)
  let tokenIds = rewardEntity.tokenIds;
  let tokenAmounts = rewardEntity.tokenAmounts;
  
  if (tokenIds == null) {
    tokenIds = [];
  }
  if (tokenAmounts == null) {
    tokenAmounts = [];
  }
  
  // Add tokenId and amount to arrays
  tokenIds.push(tokenId);
  tokenAmounts.push(amount);
  rewardEntity.tokenIds = tokenIds;
  rewardEntity.tokenAmounts = tokenAmounts;
  
  rewardEntity.save();
  
  // Create TokenReward entity for this specific token
  let tokenRewardId = rewardAddress.toHexString() + owner.toHexString() + tokenId.toString();
  let tokenRewardEntity = TokenReward.load(tokenRewardId);
  
  if (tokenRewardEntity == null) {
    tokenRewardEntity = new TokenReward(tokenRewardId);
    tokenRewardEntity.tokenId = tokenId;
    tokenRewardEntity.rewardAddress = rewardAddress;
    tokenRewardEntity.owner = owner;
    tokenRewardEntity.amount = BigInt.fromString('0');
  }
  
  tokenRewardEntity.amount = tokenRewardEntity.amount.plus(amount);
  tokenRewardEntity.save();
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
  
  if (rewardEntity != null) {
    let remainingToClaim = event.params.reward;
    let tokenIds = rewardEntity.tokenIds;
    let tokenAmounts = rewardEntity.tokenAmounts;
    
    // Backward compatibility: if arrays don't exist, just update total amount
    if (tokenIds == null || tokenAmounts == null || tokenIds.length == 0) {
      rewardEntity.amount = rewardEntity.amount.minus(event.params.reward);
      rewardEntity.save();
      return;
    }
    
    let newTokenIds: BigInt[] = [];
    let newTokenAmounts: BigInt[] = [];
    
    // Claim rewards in order by tokenID
    for (let i = 0; i < tokenIds.length; i++) {
      if (remainingToClaim.equals(BigInt.fromString('0'))) {
        // No more to claim, keep remaining entries
        newTokenIds.push(tokenIds[i]);
        newTokenAmounts.push(tokenAmounts[i]);
      } else {
        let tokenRewardId = event.params.rewardAddress.toHexString() + event.params.owner.toHexString() + tokenIds[i].toString();
        let tokenRewardEntity = TokenReward.load(tokenRewardId);
        
        if (tokenRewardEntity != null) {
          if (tokenAmounts[i].le(remainingToClaim)) {
            // Claim entire amount for this token
            remainingToClaim = remainingToClaim.minus(tokenAmounts[i]);
            // Remove TokenReward entity (fully claimed)
            tokenRewardEntity.amount = BigInt.fromString('0');
            tokenRewardEntity.save();
          } else {
            // Partially claim from this token
            let claimedAmount = remainingToClaim;
            let leftoverAmount = tokenAmounts[i].minus(remainingToClaim);
            remainingToClaim = BigInt.fromString('0');
            
            // Update TokenReward entity with remaining amount
            tokenRewardEntity.amount = leftoverAmount;
            tokenRewardEntity.save();
            
            // Keep this entry with updated amount
            newTokenIds.push(tokenIds[i]);
            newTokenAmounts.push(leftoverAmount);
          }
        }
      }
    }
    
    // Update Reward entity
    rewardEntity.amount = rewardEntity.amount.minus(event.params.reward);
    rewardEntity.tokenIds = newTokenIds;
    rewardEntity.tokenAmounts = newTokenAmounts;
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

  // Add rewards with tokenId tracking for main reward
  if (event.params.reward.gt(BigInt.fromString('0'))) {
    addRewardForToken(
      event.params.owner,
      event.params.rewardAddress,
      event.params.tokenId,
      event.params.reward
    );
  }

  // Add rewards with tokenId tracking for bonus reward
  if (event.params.bonusReward.gt(BigInt.fromString('0'))) {
    addRewardForToken(
      event.params.owner,
      event.params.bonusRewardToken,
      event.params.tokenId,
      event.params.bonusReward
    );
  }
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
    
      // Add rewards with tokenId tracking
      if (event.params.rewardAmount.gt(BigInt.fromString('0'))) {
        addRewardForToken(
          entity.owner,
          eternalFarming.rewardToken,
          event.params.tokenId,
          event.params.rewardAmount
        );
      }
      
      if (event.params.bonusRewardAmount.gt(BigInt.fromString('0'))) {
        addRewardForToken(
          entity.owner,
          eternalFarming.bonusRewardToken,
          event.params.tokenId,
          event.params.bonusRewardAmount
        );
      }
    }
  }
} 

