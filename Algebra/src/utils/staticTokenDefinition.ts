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
        address: Address.fromString("0x3a98250f98dd388c211206983453837c8365bdc1"),
        symbol: "shMON",
        decimals: BigInt.fromI32(18),
        name: "ShMonad"
      },
      {
        address: Address.fromString("0xb2f82d0f38dc453d596ad40a37799446cc89274a"),
        symbol: "aprMON",
        decimals: BigInt.fromI32(18),
        name: "aPriori Monad LST"
      },
      {
        address: Address.fromString("0xb38bb873cca844b20a9ee448a87af3626a6e1ef5"),
        symbol: "MIST",
        decimals: BigInt.fromI32(18),
        name: "MistToken"
      },
      {
        address: Address.fromString("0x0f0bdebf0f83cd1ee3974779bcb7315f9808c714"),
        symbol: "DAK",
        decimals: BigInt.fromI32(18),
        name: "Molandak"
      },
      {
        address: Address.fromString("0x6593f49ca8d3038ca002314c187b63dd348c2f94"),
        symbol: "USDT",
        decimals: BigInt.fromI32(18),
        name: "MockUSDT"
      },
      {
        address: Address.fromString("0xa504d654ae9b08dc9c7ef9c563d90de13ac06daa"),
        symbol: "MDOG",
        decimals: BigInt.fromI32(18),
        name: "MonadDog"
      },
      {
        address: Address.fromString("0xb820bf0dede889662675a09c4fd2a6998e3c8310"),
        symbol: "USDT",
        decimals: BigInt.fromI32(6),
        name: "peg usd for kiloex"
      },
      {
        address: Address.fromString("0xe0590015a873bf326bd645c3e1266d4db41c4e6b"),
        symbol: "CHOG",
        decimals: BigInt.fromI32(18),
        name: "Chog"
      },
      {
        address: Address.fromString("0xfe140e1dce99be9f4f15d657cd9b7bf622270c50"),
        symbol: "YAKI",
        decimals: BigInt.fromI32(18),
        name: "Moyaki"
      },
      {
        address: Address.fromString('0x1ea9099e3026e0b3f8dd6fbacaa45f30fce67431'),
        symbol: 'ATL',
        name: 'Atlantis',
        decimals: BigInt.fromI32(18)
      },
      {
        address: Address.fromString('0x3f23d172e0b0497b6aab290b4207b58c1b4ad8e0'),
        symbol: 'USDC.a',
        name: 'USDC Atlantis',
        decimals: BigInt.fromI32(6)
      },
      {
        address: Address.fromString('0x7777b6562950c7ad54d0e707aac1f4dca8a8e95a'),
        symbol: 'USDT.a',
        name: 'USDT Atlantis',
        decimals: BigInt.fromI32(6)
      },
      {
        address: Address.fromString('0xce111b02d20ad2250dcec6b71531d404fabef3e7'),
        symbol: 'WETH.a',
        name: 'WETH Atlantis',
        decimals: BigInt.fromI32(18)
      },
      {
        address: Address.fromString('0x617e6c7697cff44f2545025a8fc0199dfa6939d0'),
        symbol: 'WBTC.a',
        name: 'WBTC Atlantis',
        decimals: BigInt.fromI32(8)
      },
      {
        address: Address.fromString('0x760afe86e5de5fa0ee542fc7b7b713e1c5425701'),
        symbol: 'WMON',
        name: 'Wrapped Monad',
        decimals: BigInt.fromI32(18)
      },
      {
        address: Address.fromString('0xb5a30b0fdc5ea94a52fdc42e3e9760cb8449fb37'),
        symbol: 'WETH',
        name: 'Wrapped ETH',
        decimals: BigInt.fromI32(18)
      },
      {
        address: Address.fromString('0xf817257fed379853cde0fa4f97ab987181b1e5ea'),
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: BigInt.fromI32(6)
      },
      {
        address: Address.fromString('0x38a5c36fa8c8c9e4649b51fcd61810b14e7ce047'),
        symbol: 'USDC',
        name: 'USDC',
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