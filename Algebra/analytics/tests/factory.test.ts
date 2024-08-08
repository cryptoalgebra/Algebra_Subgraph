import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { DefaultCommunityFee } from "../generated/schema"
import { DefaultCommunityFee as DefaultCommunityFeeEvent } from "../generated/Factory/Factory"
import { handleDefaultCommunityFee } from "../src/factory"
import { createDefaultCommunityFeeEvent } from "./factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newDefaultCommunityFee = 123
    let newDefaultCommunityFeeEvent = createDefaultCommunityFeeEvent(
      newDefaultCommunityFee
    )
    handleDefaultCommunityFee(newDefaultCommunityFeeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DefaultCommunityFee created and stored", () => {
    assert.entityCount("DefaultCommunityFee", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DefaultCommunityFee",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newDefaultCommunityFee",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
