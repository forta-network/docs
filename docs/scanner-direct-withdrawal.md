# Direct Withdrawal

If you wish to withdraw directly from your non-migrated scan node that still exists in the ScannerRegistry contract, you can follow the old steps to do this.

!!! warning "Delay"
    Please take into account the 10 days of **withdrawal delay** while completing this. This is the time to wait after initiating a withdrawal.

!!! warning "Deprecated"
    This is a deprecated way of withdrawing stake. Please see [this guide](scanner-pools.md) to manage your own or delegated stake on a scanner pool.

## Initiating a stake withdrawal

When this action is executed (`initiateWithdrawal()`), active stake becomes inactive i.e. active shares are burned and inactive shares minted.

After _staking delay_ is over, you will be able to `withdraw()` FORT, as described in the next section.

!!! note "Permissions"
    Only active shareholders can initiate a withdrawal.

![staking init withdrawal](stake-images/staking-init-withdrawal.png)

### Initiate the withdrawal using Polygonscan

1. Go to Forta staking contract page, [section _Write as Proxy_](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874#writeProxyContract)

2. Connect your scan node owner wallet and make sure that you have selected the Polygon network. ![connect](stake-images/1-connect.png)

3. Go to `4. initiateWithdrawal` and input the following:

    - **subjectType:** 0

    - **subject:** Your scan node address **(not the owner address).**

    - **stakeValue:** Amount of shares to unstake, in wei. If the node has not been slashed, the proportion is `1 Share : 1 FORT`. If you are unsure about the amount in wei, you can use a converter like [https://eth-converter.com/](https://eth-converter.com/). ![initiate withdrawal](stake-images/4-initiate-withdrawal.png)

4. Click _Write_ and approve the transaction in your wallet.

5. After confirmation, the _staking delay_ starts. If the current active shares are under the minimum stake threshold, the node enters into disabled state.

## Withdrawal

Burn inactive shares after _staking delay_ to get staked FORT.

![staking withdrawal](stake-images/staking-withdrawal.png)

### Withdrawal using Polygonscan

1. When the _staking delay_ is over, go to Forta staking contract page, [section _Write as Proxy_](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874#writeProxyContract)

2. Connect your scan node owner wallet and make sure that you have selected the Polygon network. ![connect](stake-images/1-connect.png)

3. Go to `23. withdraw` and input the following:

    - **subjectType:** 0

    - **subject:** Your scan node address **(not the owner address).** ![withdraw](stake-images/5-withdraw.png)

4. Click _Write_ and approve the transaction in your wallet.

5. When the transaction is confirmed, you will receive the FORT amount you specified in `initiateWithdrawal()` step.
