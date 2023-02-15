# Manage Your Scanner Pools

## Introduction

A scanner pool contains a group of nodes that scan a specific chain. Each pool belongs to a specific owner and is minted as an NFT (ERC-721) upon registration. These pools require the operators to deposit a total amount of stake which covers the minimum-per-scan-node amount for each node.

When registering any node to a pool, make sure to stake this minimum amount of **2500 FORT** on the pool first.

In addition, the scanner pools allow other FORT token holders (delegators) to stake on your pool and earn rewards. As the pool operator, you can decide

- how much of the delegator or operator stake to be allocated,
- how much commission you want from delegators' rewards.

## Creating a new scanner pool
- In the Forta App navigate to “My Node Pools”

![My Node Pools](MyNodePoolsDropdown.png)

- Click “Add Scanner Pool”
![My Node Pools Tab](MyNodePoolsTab.png)

- Select a chain for your node pool to monitor and register your node pool

![Create Node Pool](CreateNodePool.png)

- Accept the transaction for creating your node pool and wait for it to be confirmed

## Depositing stake

### Depositing on your own pool
- In the Forta App navigate to “My Node Pools”

![My Node Pools](MyNodePoolsDropdown.png)

- Click on node pool you would like to add stake

![My Node Pools Tab](MyNodePoolsTab.png)

- Click “Add Stake”

![Add Stake](AddStakeToPool.png)

- In order to stake, there are two transactions that must be executed:
    - Approve the amount of FORT to stake
    - Stake the approved FORT

- Enter the amount of FORT you want to approve for staking and wait for the transaction to confirm

![Add Stake](ApproveStaking.png)

- Enter the amount of *approved* FORT you want to stake and wait for the transaction to confirm

![Add Stake](ApproveFORTStaking.png)


### Delegating to a pool

- Find a node pool (that you do not own) on the Network Participants page that has a node and enough stake to earn rewards

![Network Participants](NetworkParticipants.png)

- Navigate to the node pool page by clicking on the address

![Delegated Staking](DelegatedStaking.png)

- Click on the “Delegate” button. There are 2 transactions required for delegation
    - Approve the amount of FORT to delegate
    - Delegate the approved FORT

- Enter the amount of FORT you want to approve for delegation. Click “Approve tokens” and approve the transaction. Wait for the transaction to confirm.

![Delegated Staking Approve](DelegatedStakingApprove.png)

- Enter the amount of approved FORT you want to delegate and click “Delegate” and approve the transaction. Wait for the transaction to confirm

![Delegated Staking FORT](DSFORT.png)

- Navigate to “My Stakes” or “Overview” on your profile and you can see your staked FORT

## Creating new nodes

Each node needs to be registered to a specific pool in order to be operational. While one can register many scan nodes on a pool, the pool needs to be populated with more stake first in order to avoid registration issues. This is for preventing pool shutdown conditions that occur when the average per-scanner stake is below minimum.

- In the Forta App navigate to “My Node Pools”

![My Node Pools](MyNodePoolsDropdown.png)

- Click on the node pool you would like to add a node
![My Node Pools List](MyNodePoolsList.png)

- Make sure you have at least 2,500 FORT staked for the new node. Click “Add Scan Node”. Use the Forta node CLI to generate the scanner authorization token (described [here](scanner-quickstart#register-scan-node)) needed to claim a node into a pool.

![Add Scan Node](AddScanNode.png)

## Disabling existing nodes

If a node is no longer used, it should be disabled to free up allocated stake for newer nodes.

- Navigate to the node pool that has the node you want to disable

- Select the disable action on the node you want to disable

![Disable Scan Node](DisableScanNode.png)

## Adjusting stake allocation

While it's always possible to add more stake to a pool, it is allocated proportionally to the amount of scan nodes in the pool. Total allocated stake can only be `node_count × max_stake_per_scan_node`.

For example, if there are two scan nodes in a pool, a total of 35k FORT deposited and only 15k FORT worth of max stake allocation is allowed per scan node, then the pool can allocate a maximum of `15k × 2 = 30k` FORT in total. This is the amount that is effective in calculating the rewards and the rest of `35k - 30k = 5k` remains unallocated until more scan nodes are registered to the pool.

It is up to the pool owner to allocate more from owner stake or more from the delegators so the share of the rewards can be adjusted accordingly.

For each node in a pool:

- The operator needs to allocate at least 2500 FORT.
- The total capacity is 15000 FORT.

When you deposit more stake on your pool as the operator and then register a node, your stake is allocated automatically. It is up to you to decide how much of owner and delegated stake to be allocated.

!!! warning "Risk of shutting down the pool"
    After unallocating owner stake as the operator, if allocated owner stake does not satisfy `node_count × min_stake_per_scan_node`, the pool faces the risk of shutting down and will generate no rewards! Please take into account the warnings and your calculations before proceeding.

    E.g. for a pool with two nodes, 4k FORT stake on the pool means that both of the nodes in the pool are non-operational until it can be topped up to 5k (`2500 × 2`) and allocation of owner stake is adjusted accordingly.

- In the Forta App navigate to “My Node Pools”

![My Node Pools](MyNodePoolsDropdown.png)

- Click on the node pool you would like to adjust the stake allocation

![My Node Pools List](MyNodePoolsList.png)

- Click on "Allocate Stake"

![Allocate Stake On Node](AllocateStakeOnNode.png)

- From here you can either allocate or unallocate stake. To adjust owner stake make sure the subject is *Owner*

![Allocate Modal](AllocationModal.png)

- To adjust the stake of delegators select the *Delegators* subject

![AllocateDelegates](AllocateDelegates.png)

## Changing the commission

In addition to the allocation adjustment, operators can decide how much of the delegators' rewards they would like to keep as commission.

!!! important "Phase II feature"
    These commissions will be effective when Forta App supports claiming the rewards. Meanwhile, the pool owners can still expect delegators to stake on their pools and adjust allocation and commission to get ready for the second phase.

- Click on the node pool you would like to adjust the stake allocation (you must be the owner)

- Click on "Change commission rate"

![Change commission Rate](ChangeCommision.png)

- Enter the commission that you would like to set on your pool

![Update commision](UpdateCommissionModal.png)

## Claiming rewards

!!! important "Phase II feature"
    This feature that will be available in Forta App in the second phase of the transition to delegated staking. Meanwhile, you can claim pool owner rewards from Polygonscan.

After the rewards are calculated at the end of each epoch, they are transferred to the rewards distributor contract. This contract allows the pool owner and the delegators to claim their rewards.

To claim pool owner rewards over Polygonscan **after Monday 00:00:00 UTC**:

- find out the `RewardsDistributor` contract address from the [smart contract addresses page](smart-contracts.md),
- visit it on Polygonscan,
- visit "Contract" tab,
- find "Read as Proxy",
- find the current epoch number from `getCurrentEpochNumber`
- find "Write as Proxy",
- click on "Connect to Web3" to connect your wallet,
- find the `claimRewards` method and fill in:
    - **subjectType:** 2
    - **subjectId:** Your pool ID
    - **epochNumbers:** Do epoch number minus 1 and input like `[2561]` if current is 2562
- click on "Write" to send the transaction.
