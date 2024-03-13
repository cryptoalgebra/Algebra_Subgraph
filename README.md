# Algebra_Subgraph

## Algebra

### Configure

Before build you need to make a few changes: 

* Update FACTORY_ADDRESS in Algebra/src/utils/constants.ts
* Update USDC_WMatic_03_POOL,  WHITELIST_TOKENS and STABLE_COINS in Algebra/src/utils/pricing.ts, through which the price in usd will be calculated.
* Depending on the order of the tokens in the pool, you must set the required price( token0Price/token1Price) in Algebra/src/utils/pricing.ts#L41
* You can also set the required number of native tokens in the pool to include it when calculating prices by changing MINIMUM_Matic_LOCKED in Algebra/src/utils/pricing.ts
* Update network, startBlock and addresses in subgraph.yaml

### Install

To install dependencies you need to run:
```
yarn
```
### Build

To build you need to run:
```
yarn codegen
yarn build
```

### Create

To create you need to run:
```
yarn run create
```

### Deploy

To deploy you need to run:
```
yarn run deploy
```

## AlgebraFarming

### Configure

Before build you need to make a few changes:

* Update FarmingCenterAddress in AlgebraFarming/src/utils/constants.ts
* Update network, startBlock and addresses in subgraph.yaml

### Install

To install dependencies you need to run:
```
yarn
```
### Build

To build you need to run:
```
yarn codegen
yarn build
```

### Create

To create you need to run:
```
yarn run create
```

### Deploy

To deploy you need to run:
```
yarn run deploy
```

## Blocklytics

### Configure

Before build you need to make a few changes:

* Update network, startBlock and address in subgraph.yaml

### Install

To install dependencies you need to run:
```
yarn
```
### Build

To build you need to run:
```
yarn codegen
yarn build
```

### Create

To create you need to run:
```
yarn run create
```

### Deploy

To deploy you need to run:
```
yarn run deploy
```
