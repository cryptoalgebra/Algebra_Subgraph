import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/Factory/Factory"

export function createDefaultCommunityFeeEvent(
  newDefaultCommunityFee: i32
): DefaultCommunityFee {
  let defaultCommunityFeeEvent = changetype<DefaultCommunityFee>(newMockEvent())

  defaultCommunityFeeEvent.parameters = new Array()

  defaultCommunityFeeEvent.parameters.push(
    new ethereum.EventParam(
      "newDefaultCommunityFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newDefaultCommunityFee))
    )
  )

  return defaultCommunityFeeEvent
}

export function createDefaultFeeEvent(newDefaultFee: i32): DefaultFee {
  let defaultFeeEvent = changetype<DefaultFee>(newMockEvent())

  defaultFeeEvent.parameters = new Array()

  defaultFeeEvent.parameters.push(
    new ethereum.EventParam(
      "newDefaultFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newDefaultFee))
    )
  )

  return defaultFeeEvent
}

export function createDefaultPluginFactoryEvent(
  defaultPluginFactoryAddress: Address
): DefaultPluginFactory {
  let defaultPluginFactoryEvent = changetype<DefaultPluginFactory>(
    newMockEvent()
  )

  defaultPluginFactoryEvent.parameters = new Array()

  defaultPluginFactoryEvent.parameters.push(
    new ethereum.EventParam(
      "defaultPluginFactoryAddress",
      ethereum.Value.fromAddress(defaultPluginFactoryAddress)
    )
  )

  return defaultPluginFactoryEvent
}

export function createDefaultTickspacingEvent(
  newDefaultTickspacing: i32
): DefaultTickspacing {
  let defaultTickspacingEvent = changetype<DefaultTickspacing>(newMockEvent())

  defaultTickspacingEvent.parameters = new Array()

  defaultTickspacingEvent.parameters.push(
    new ethereum.EventParam(
      "newDefaultTickspacing",
      ethereum.Value.fromI32(newDefaultTickspacing)
    )
  )

  return defaultTickspacingEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPoolEvent(
  token0: Address,
  token1: Address,
  pool: Address
): Pool {
  let poolEvent = changetype<Pool>(newMockEvent())

  poolEvent.parameters = new Array()

  poolEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  poolEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  poolEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )

  return poolEvent
}

export function createRenounceOwnershipFinishEvent(
  timestamp: BigInt
): RenounceOwnershipFinish {
  let renounceOwnershipFinishEvent = changetype<RenounceOwnershipFinish>(
    newMockEvent()
  )

  renounceOwnershipFinishEvent.parameters = new Array()

  renounceOwnershipFinishEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return renounceOwnershipFinishEvent
}

export function createRenounceOwnershipStartEvent(
  timestamp: BigInt,
  finishTimestamp: BigInt
): RenounceOwnershipStart {
  let renounceOwnershipStartEvent = changetype<RenounceOwnershipStart>(
    newMockEvent()
  )

  renounceOwnershipStartEvent.parameters = new Array()

  renounceOwnershipStartEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  renounceOwnershipStartEvent.parameters.push(
    new ethereum.EventParam(
      "finishTimestamp",
      ethereum.Value.fromUnsignedBigInt(finishTimestamp)
    )
  )

  return renounceOwnershipStartEvent
}

export function createRenounceOwnershipStopEvent(
  timestamp: BigInt
): RenounceOwnershipStop {
  let renounceOwnershipStopEvent = changetype<RenounceOwnershipStop>(
    newMockEvent()
  )

  renounceOwnershipStopEvent.parameters = new Array()

  renounceOwnershipStopEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return renounceOwnershipStopEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createVaultFactoryEvent(
  newVaultFactory: Address
): VaultFactory {
  let vaultFactoryEvent = changetype<VaultFactory>(newMockEvent())

  vaultFactoryEvent.parameters = new Array()

  vaultFactoryEvent.parameters.push(
    new ethereum.EventParam(
      "newVaultFactory",
      ethereum.Value.fromAddress(newVaultFactory)
    )
  )

  return vaultFactoryEvent
}
