import {
  DefaultCommunityFee as DefaultCommunityFeeEvent,
  DefaultFee as DefaultFeeEvent,
  DefaultPluginFactory as DefaultPluginFactoryEvent,
  DefaultTickspacing as DefaultTickspacingEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Pool as PoolEvent,
  RenounceOwnershipFinish as RenounceOwnershipFinishEvent,
  RenounceOwnershipStart as RenounceOwnershipStartEvent,
  RenounceOwnershipStop as RenounceOwnershipStopEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  VaultFactory as VaultFactoryEvent
} from "../generated/Factory/Factory"
import {
  DefaultCommunityFee,
  DefaultFee,
  DefaultPluginFactory,
  DefaultTickspacing,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Pool,
  RenounceOwnershipFinish,
  RenounceOwnershipStart,
  RenounceOwnershipStop,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  VaultFactory
} from "../generated/schema"

export function handleDefaultCommunityFee(
  event: DefaultCommunityFeeEvent
): void {
  let entity = new DefaultCommunityFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newDefaultCommunityFee = event.params.newDefaultCommunityFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDefaultFee(event: DefaultFeeEvent): void {
  let entity = new DefaultFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newDefaultFee = event.params.newDefaultFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDefaultPluginFactory(
  event: DefaultPluginFactoryEvent
): void {
  let entity = new DefaultPluginFactory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.defaultPluginFactoryAddress = event.params.defaultPluginFactoryAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDefaultTickspacing(event: DefaultTickspacingEvent): void {
  let entity = new DefaultTickspacing(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newDefaultTickspacing = event.params.newDefaultTickspacing

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePool(event: PoolEvent): void {
  let entity = new Pool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.pool = event.params.pool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRenounceOwnershipFinish(
  event: RenounceOwnershipFinishEvent
): void {
  let entity = new RenounceOwnershipFinish(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRenounceOwnershipStart(
  event: RenounceOwnershipStartEvent
): void {
  let entity = new RenounceOwnershipStart(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.timestamp = event.params.timestamp
  entity.finishTimestamp = event.params.finishTimestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRenounceOwnershipStop(
  event: RenounceOwnershipStopEvent
): void {
  let entity = new RenounceOwnershipStop(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVaultFactory(event: VaultFactoryEvent): void {
  let entity = new VaultFactory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newVaultFactory = event.params.newVaultFactory

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
