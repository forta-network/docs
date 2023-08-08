## Staking

All nodes need to be registered to run within a specific pool. Scan nodes in a pool become operational in the network when their pool has enough stake i.e. FORT token allocation.

Please visit the [pool management guide](../scanner-pools.md) to find out how you can create, manage and stake on a pool. If you have not created a pool so far, please make sure you have created one. The pool you create needs to scan the same chain as the scan node you are about to register.

!!! info "All pools require stake"
    It is not possible to register a new node without staking more on it to satisfy the minimum first. Scan nodes in the unstaked or understaked pools will not be assigned any detection bots and will not generate any rewards.

!!! question "Why do scan nodes require stake?"
    Forta Network ensure network reliability by enforcing two main mechanisms that use the stake:

    - **Rewarding:** Node operators are incentivized with rewards to ensure that their Forta nodes are running with good health and as expected. The stake amount is used in reward calculations.
    - **Slashing:** Node operators are discouraged from harmful actions. Upon detection, they lose rewards and a specific portion is removed from the deposited pool stake. This can cause the staked amount to go under minimum required and all nodes in the pool to enter into disabled state.

    Please see the [formula](../delegated-staking-rewards.md#formula) and the [slashing policy](../slashing-policy.md) if you are interested in more details.

## Registration

Each scan node has an Ethereum private key that makes some features possible:

- Receiving detection bots to run
- Asserting authority on the outputted alerts
- Identification for rewards and slashing
  
The private key for the scan node is generated at the `forta init` step. Please prefer continuing with this private key and do not replace it with your custom private key in order to avoid confusion and security risks.

!!! warning "Use correct chain ID"
    Make sure you have set the `chainId` in your config.yml correctly before registering your node. Your scan node can be registered only once and to scan a specific chain.

### Forta App

- doing `forta authorize pool --passphrase <your-passphrase> --id <your-pool-id>`,
- copying the token over to Forta App as described in the [pool management](../scanner-pools.md) page of the docs.

### Polygonscan

- do `forta authorize pool --passphrase <your-passphrase> --id <your-pool-id> --polygonscan`,
- visit the [`registerScannerNode`](https://polygonscan.com/address/0x90ff9c193d6714e0e7a923b2bd481fb73fec731d#writeProxyContract#F9) method,
- click on "Connect to Web3" on the top and connect your wallet,
- copy the values from the first step, click on "Write".
