# Algebra_Subgraph

## Algebra

### Build

Before build you need to make a few changes: 

* Update FACTORY_ADDRESS in Algebra/src/utils/constants.ts
* Update USDC_WMatic_03_POOL,  WHITELIST_TOKENS and STABLE_COINS in Algebra/src/utils/pricing.ts, through which the price in usd will be calculated.
* Depending on the order of the tokens in the pool, you must set the requred price( token0Price/token1Price) in Algebra/src/utils/pricing.ts#L41
* You can also set the required number of native tokens in the pool to include it when calculating prices by changing MINIMUM_Matic_LOCKED in Algebra/src/utils/pricing.ts
* Update network, startBlock and addresses in subgraph.yaml

After that you need to run:
```
$ yarn
$ yarn codegen
$ yarn build 
```

### Deploy

```
$ yarn graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ --access-token <access-token> <graph-name> subgraph.yaml
```

## AlgebraFarming

Update FarmingCenterAddress in AlgebraFarming/src/utils/constants.ts

Update network, startBlock and addresses in subgraph.yaml

```
$ yarn
$ yarn codegen
$ yarn build 
```

### Deploy

```
$ yarn graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ --access-token <access-token> <graph-name> subgraph.yaml
```
