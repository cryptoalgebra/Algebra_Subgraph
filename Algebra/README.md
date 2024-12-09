# Algebra subgraph

## Configure

Before build you need to make a few changes:

* Update FACTORY_ADDRESS in Algebra/src/utils/constants.ts
* Update WAA_USDT_POOL,  WHITELIST_TOKENS and STABLE_COINS in Algebra/src/utils/pricing.ts, through which the price in usd will be calculated.
* Depending on the order of the tokens in the pool, you must set the required price( token0Price/token1Price) in Algebra/src/utils/pricing.ts#L41
* You can also set the required number of native tokens in the pool to include it when calculating prices by changing MINIMUM_Arthera_LOCKED in Algebra/src/utils/pricing.ts
* Update network, startBlock and addresses in subgraph.yaml

## Install

To install dependencies you need to run:
```
yarn
```
## Build

To build you need to run:
```
yarn codegen
yarn build
```

## Create

To create you need to run:
```
yarn run create
```

## Deploy

To deploy you need to run:
```
yarn run deploy
```
