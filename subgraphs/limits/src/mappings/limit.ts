import { BigInt, ethereum } from '@graphprotocol/graph-ts';
import {
    Fill,
    Kill,
    Place,
    Withdraw
} from '../types/Limit/Limit';
import { Epoch, EpochAction, LimitOrder, LimitOrderAction } from '../types/schema';

function createLimitOrderAction(event: ethereum.Event, limit: LimitOrder, type: string, liquidity: BigInt): void {
    let action = new LimitOrderAction(event.transaction.hash.toHexString() + "-" + event.logIndex.toString());
    action.limitOrder = limit.id;
    action.type = type;
    action.owner = limit.owner;
    action.pool = limit.pool;
    action.epoch = limit.epoch;
    action.liquidity = liquidity;
    action.initialLiquidity = limit.initialLiquidity;
    action.killedLiquidity = limit.killedLiquidity;
    action.remainingLiquidity = limit.liquidity;
    action.timestamp = event.block.timestamp;
    action.transactionHash = event.transaction.hash;
    action.save();
}

function createEpochAction(event: ethereum.Event, epoch: Epoch, type: string, tickLower: i32, zeroToOne: boolean): void {
    let action = new EpochAction(event.transaction.hash.toHexString() + "-" + event.logIndex.toString());
    action.epoch = epoch.id;
    action.type = type;
    action.pool = epoch.pool;
    action.tickLower = BigInt.fromI32(tickLower);
    action.zeroToOne = zeroToOne;
    action.totalLiquidity = epoch.totalLiquidity;
    action.timestamp = event.block.timestamp;
    action.transactionHash = event.transaction.hash;
    action.save();
}

export function PlaceHandler(event: Place): void{
    let epoch = Epoch.load(event.params.epoch.toString());
    if (epoch == null){
        epoch = new Epoch(event.params.epoch.toString());
        epoch.pool =  event.params.pool;
        epoch.totalLiquidity = BigInt.fromI32(0);
        epoch.fillTimestamp = BigInt.fromI32(0);
        epoch.filled = false;
    }

    epoch.totalLiquidity += event.params.liquidity;
    epoch.save();

    let limit = LimitOrder.load(event.params.owner.toHexString() + "#" + event.params.epoch.toString())
    if( limit == null){
        limit = new LimitOrder(event.params.owner.toHexString() + "#" + event.params.epoch.toString())
        limit.owner = event.params.owner
        limit.pool = event.params.pool
        limit.tickLower = BigInt.fromI32(event.params.tickLower);
        limit.tickUpper = BigInt.fromI32(event.params.tickUpper);
        limit.zeroToOne = event.params.zeroForOne;
        limit.epoch = epoch.id;   
        limit.killedLiquidity = BigInt.fromI32(0);
        limit.initialLiquidity = BigInt.fromI32(0);
        limit.liquidity = BigInt.fromI32(0);
        limit.closeTimestamp = BigInt.fromI32(0);
        limit.placeTimestamp = event.block.timestamp;
    }

    limit.liquidity += event.params.liquidity;
    limit.initialLiquidity += event.params.liquidity;
    limit.killed = false;
    limit.save();

    createLimitOrderAction(event, limit, "Place", event.params.liquidity);
}

export function FillHandler(event: Fill): void{
    let epoch = Epoch.load(event.params.epoch.toString())
    if(epoch != null){
        epoch.filled = true;
        epoch.fillTimestamp = event.block.timestamp;
        epoch.save();

        createEpochAction(event, epoch, "Fill", event.params.tickLower, event.params.zeroForOne);
    }
}

export function KillHandler(event: Kill): void{
    let epoch = Epoch.load(event.params.epoch.toString())
    if( epoch != null){
        epoch.totalLiquidity -= event.params.liquidity;
        epoch.save();
    }

    let limit = LimitOrder.load(event.params.owner.toHexString() + "#" + event.params.epoch.toString())
    if( limit != null){
        limit.liquidity -= event.params.liquidity;
        limit.killedLiquidity += event.params.liquidity;
        if(limit.killedLiquidity == limit.initialLiquidity){
            limit.killed = true;
            limit.closeTimestamp = event.block.timestamp;
        }
        limit.save();

        createLimitOrderAction(event, limit, "Kill", event.params.liquidity);
    }

}

export function WithdrawHandler(event: Withdraw): void{
    let epoch = Epoch.load(event.params.epoch.toString())
    if( epoch != null){
        epoch.totalLiquidity -= event.params.liquidity;
        epoch.save();
    }

    let limit = LimitOrder.load(event.params.owner.toHexString() + "#" + event.params.epoch.toString())
    if( limit != null){
        limit.liquidity -= event.params.liquidity;
        if (limit.liquidity == BigInt.fromI32(0)){
            limit.closeTimestamp = event.block.timestamp;
        }
        limit.save();

        createLimitOrderAction(event, limit, "Withdraw", event.params.liquidity);
    }
}
