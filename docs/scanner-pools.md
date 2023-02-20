# Manage Scanner Pools

## Introduction

A scanner pool contains a group of nodes that scan a specific chain. Each pool belongs to a specific owner and is minted as an NFT (ERC-721) upon registration. These pools require the operators to deposit a total amount of stake which covers the minimum-per-scan-node amount for each node.

When registering any node to a pool, make sure to stake this minimum amount of **2500 FORT** on the pool first.

In addition, the scanner pools allow other FORT token holders (delegators) to stake on your pool and earn rewards. As the pool operator, you can decide

- how much of the delegator or operator stake to be allocated,
- how much commission you want from delegators' rewards.

## Creating a new scanner pool
- In the Forta App navigate to “My Node Pools”

![My Node Pools](delegated-staking/MyNodePoolsDropdown.png)

- Click “Add Scanner Pool”
![My Node Pools Tab](delegated-staking/MyNodePoolsTab.png)

- Select a chain for your node pool to monitor and register your node pool

![Create Node Pool](delegated-staking/CreateNodePool.png)

- Accept the transaction for creating your node pool and wait for it to be confirmed

## Depositing stake

In order to make scan nodes operational and generate rewards, a node pool must have stake. While there is no upper bound on the stake:

- Both the pool owner and delegators can stake on a pool.
- More nodes in a pool means more of the deposited stake can be allocated.
- The pool owner decides how much of the owner and delegated stake should be allocated.

!!! danger "Density affects the rewards"
    When staking on a pool, please prefer the ones that have allocation capacity or have low amount of unallocated stake. While all depositors share the pool rewards proportionally to their stake amount, the rewards are generated based only on allocated stake.

Please also see the [Adjusting stake allocation](adjusting-stake-allocation) section before depositing any stake.

### Depositing on your own pool
- In the Forta App navigate to “My Node Pools”

![My Node Pools](delegated-staking/MyNodePoolsDropdown.png)

- Click on node pool you would like to add stake

![My Node Pools Tab](delegated-staking/MyNodePoolsTab.png)

- Click “Add Stake”

![Add Stake](delegated-staking/AddStakeToPool.png)

- In order to stake, there are two transactions that must be executed:
    - Approve the amount of FORT to stake
    - Stake the approved FORT

- Enter the amount of FORT you want to approve for staking and wait for the transaction to confirm

![Add Stake](delegated-staking/ApproveStaking.png)

- Enter the amount of *approved* FORT you want to stake and wait for the transaction to confirm

![Add Stake](delegated-staking/ApproveFORTStaking.png)


### Delegating to a pool

- Find a node pool (that you do not own) on the Network Participants page that has a node and enough stake to earn rewards

![Network Participants](delegated-staking/NetworkParticipants.png)

- Navigate to the node pool page by clicking on the address

![Delegated Staking](delegated-staking/DelegatedStaking.png)

- Click on the “Delegate” button. There are 2 transactions required for delegation
    - Approve the amount of FORT to delegate
    - Delegate the approved FORT

- Enter the amount of FORT you want to approve for delegation. Click “Approve tokens” and approve the transaction. Wait for the transaction to confirm.

![Delegated Staking Approve](delegated-staking/DelegatedStakingApprove.png)

- Enter the amount of approved FORT you want to delegate and click “Delegate” and approve the transaction. Wait for the transaction to confirm

![Delegated Staking FORT](delegated-staking/DSFORT.png)

- Navigate to “My Stakes” or “Overview” on your profile and you can see your staked FORT

## Creating new nodes

Each node needs to be registered to a specific pool in order to be operational. While one can register many scan nodes on a pool, the pool needs to be populated with more stake first in order to avoid registration issues. This is for preventing pool shutdown conditions that occur when the average per-scanner stake is below minimum.

- In the Forta App navigate to “My Node Pools”

![My Node Pools](delegated-staking/MyNodePoolsDropdown.png)

- Click on the node pool you would like to add a node
![My Node Pools List](delegated-staking/MyNodePoolsList.png)

- Make sure you have at least 2,500 FORT staked for the new node. Click “Add Scan Node”. Use the Forta node CLI to generate the scanner authorization token (described [here](scanner-quickstart#register-scan-node)) needed to claim a node into a pool.

![Add Scan Node](delegated-staking/AddScanNode.png)

## Disabling existing nodes

If a node is no longer used, it should be disabled to free up allocated stake for newer nodes.

- Navigate to the node pool that has the node you want to disable

- Select the disable action on the node you want to disable

![Disable Scan Node](delegated-staking/DisableScanNode.png)

## Adjusting stake allocation

While it's always possible to add more stake to a pool, it is allocated proportionally to the amount of scan nodes in the pool. Total allocated stake can only be `node_count × max_stake_per_scan_node`.

- The operator needs to allocate at least 2500 FORT for each node in a pool.
- The total allocation capacity is 15000 FORT for each node in a pool.

When you deposit more stake on your pool as the owner of the pool and then register a node to it, your stake is allocated automatically. It is up to the pool owner to allocate more from owner stake or more from the delegators so the partitioning of pool rewards (owner vs. delegator) can be adjusted accordingly.

!!! note "Subject to change"
    These limits are subject to change over time.

**For example**, let's assume that at a given time frame:

- The minimum stake allocation required per node is 2500 FORT.
- The maximum stake allocation allowed per node is 5000 FORT.

In this **example** case, then this is how allocation and node registration plays together:

![Stake Allocation Flow](delegated-staking/StakeAllocationFlow.png)

!!! danger "Risk of shutting down the pool"
    After unallocating owner stake as the operator, if allocated owner stake does not satisfy `node_count × min_stake_per_scan_node`, the pool faces the risk of shutting down and will generate no rewards! Please take into account the warnings and your calculations before proceeding.

    E.g. for a pool with two nodes, 4k FORT stake on the pool means that both of the nodes in the pool are non-operational until it can be topped up to 5k (`2500 × 2`) by the pool owner and allocation of owner stake is adjusted accordingly.

- In the Forta App navigate to “My Node Pools”

![My Node Pools](delegated-staking/MyNodePoolsDropdown.png)

- Click on the node pool you would like to adjust the stake allocation

![My Node Pools List](delegated-staking/MyNodePoolsList.png)

- Click on "Allocate Stake"

![Allocate Stake On Node](delegated-staking/AllocateStakeOnNode.png)

- From here you can either allocate or unallocate stake. To adjust owner stake make sure the subject is *Owner*

![Allocate Modal](delegated-staking/AllocationModal.png)

- To adjust the stake of delegators select the *Delegators* subject

![AllocateDelegates](delegated-staking/AllocateDelegates.png)

## Changing the commission

In addition to the allocation adjustment, operators can decide how much of the delegators' rewards they would like to keep as commission.

By default, all pools start with 100% commission, meaning that all delegator rewards will be received by the pool owners. This should be adjusted to a desired number by the pool owner if delegators are expected.

For example, let's assume:

- Delegator 1 deposits 12000 FORT.
- Delegator 2 deposits 6000 FORT.
- Pool commission is 10% (1000 BPS).
- The pool delegators are rewarded 2000 FORT in total.

In this case, `2000 × 0.1 = 200` FORT is credited to the pool owner as commission. From the remaining 1800 FORT,
 each of the delegators earn proportionally to their deposited stake:

- Delegator 1: 12000 => 1200
- Delegator 2: 6000  => 600 

- Click on the node pool you would like to adjust the stake allocation (you must be the owner)

- Click on "Change commission rate"

![Change commission Rate](delegated-staking/ChangeCommision.png)

- Enter the commission that you would like to set on your pool

![Update commision](delegated-staking/UpdateCommissionModal.png)

## Claiming rewards

After the end of each epoch (**Monday 00:00:00 UTC**), reward calculation starts. The rewards are written to the rewards distributor contract as soon as the calculation is completed. When the rewards are avaialble in the contract, pool owners and delegators can claim their portion of the rewards.

To claim pool owner rewards over Polygonscan:

- visit the [`getCurrentEpochNumber`](https://polygonscan.com/address/0xf7239f26b79145297737166b0c66f4919af9c507#readProxyContract#F7) and take a note of the epoch number,
- visit the [`claimRewards`](https://polygonscan.com/address/0xf7239f26b79145297737166b0c66f4919af9c507#writeProxyContract#F1) method
- click on "Connect to Web3" on the top and connect your wallet,
- and fill in:
    - **subjectType:** 2
    - **subjectId:** Your pool ID
    - **epochNumbers:** Do number from first step minus 1 and input e.g. `[2561]` if the number was 2562
- click on "Write" to send the transaction.
