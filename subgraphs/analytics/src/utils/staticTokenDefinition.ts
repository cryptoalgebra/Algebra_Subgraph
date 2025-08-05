import { Address, BigInt } from '@graphprotocol/graph-ts'

// Initialize a Token Definition with the attributes
export class StaticTokenDefinition {
  address: Address
  symbol: string
  name: string
  decimals: BigInt

  // Get all tokens with a static defintion
  static getStaticDefinitions(): Array<StaticTokenDefinition> {
    const staticDefinitions: Array<StaticTokenDefinition> = [
      {
        address: Address.fromString('0x96b86cce868fcc6681d8ab2c8e53c93e9750ba3a'),
        symbol: 'PKEY',
        name: 'PuzzleKey',
        decimals: BigInt.fromI32(18)
      },
      {
        address: Address.fromString('0xacB8b71500B616c20fE18c48fc965D0981538D54'),
        symbol: 'GRUMPY',
        name: 'GRUMPY ON TARA',
        decimals: BigInt.fromI32(18)
      },
      {
        address: Address.fromString('0x69D411CbF6dBaD54Bfe36f81d0a39922625bC78c'),
        symbol: 'USDT',
        name: ' Tether USD',
        decimals: BigInt.fromI32(6)
      },
      {
        address: Address.fromString('0x9f3f1fa0822463f592c1725ED08a9cF261958627'),
        symbol: 'WTARA',
        name: 'Wrapped Taraxa',
        decimals: BigInt.fromI32(18)
      },
    ]
    return staticDefinitions
  }

  // Helper for hardcoded tokens
  static fromAddress(tokenAddress: Address): StaticTokenDefinition | null {
    let staticDefinitions = this.getStaticDefinitions()
    let tokenAddressHex = tokenAddress.toHexString()

    // Search the definition using the address
    for (let i = 0; i < staticDefinitions.length; i++) {
      let staticDefinition = staticDefinitions[i]
      if (staticDefinition.address.toHexString() == tokenAddressHex) {
        return staticDefinition
      }
    }

    // If not found, return null
    return null
  }
}