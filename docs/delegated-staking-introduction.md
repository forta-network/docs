# Delegated Staking

Delegated staking is a critical mechanism for securing the integrity of the Network. Staking FORT Tokens provides economic security for the work performed by nodes in the Network, since the staked FORT can be slashed if a node fails to execute their assigned work or performs their work maliciously. Once FORT is staked, it may only be withdrawn subject to a thawing period, which provides ample opportunity for verification and dispute resolution.

For FORT holders, delegated staking allows them to contribute to the network’s security and earn rewards. This is all made possible by independent Forta node runners, who set up scan nodes and register nodes in pools of their own. While nodes are required to deposit stake to participate in the Network, signal the reliable pools and earn rewards, FORT holders can delegate their tokens to said pools and earn a percentage of the rewards earned, if any.

!!! important "Polygon"
    Delegated staking is done by using the staking contract on Polygon. Please check [this guide](https://docs.forta.network/en/latest/bridging-fort/) to find out how to bridge FORT tokens to Polygon.

By delegating FORT tokens, participants are increasing the security and reliability of the network and may earn rewards as a result. Pool owners share their rewards with delegators by setting up on-chain parameters, including:

- how much of the delegated stake is allocated,
- what percentage of delegators' rewards are withheld as commission.

After every reward epoch ends (1 week, from Monday 00:00:00 UTC to Sunday 23:59:59 UTC), FORT rewards are distributed to node pools. The rewards for each pool are written to the reward distribution smart contract and that distributes the rewards between owners and delegators following the rewards formulas.


To learn more about rewards, please visit the [Rewards Formula page](delegated-staking-rewards.md).

In accordance with Forta Network's mission of securing Web3, delegated stakes are subject to the possibility of a partial reduction of stake in the event that the pool they are delegating to is slashed. Review the [Slashing Policy](slashing-policy.md) for more information.

## Delegate Your FORT

Delegated staking is an essential part of the Forta Network, and choosing the right scanner pool is crucial if you want to maximize your potential for rewards (and reduce the odds of being slashed). Below are some factors that can be considered when choosing a scanner pool and the Forta App staking guide will also walk you through the process of choosing a scanner pool, depositing stake, and withdrawing stake using the Forta App. As always, you can also interact with the smart contracts directly on Polygon.

### Choosing a Scanner Pool

To choose a scanner pool, you can visit the [pools page](https://app.forta.network/network/node-pools) in the Forta App. You can consider the following factors that may be helpful in evaluating pools, however they are based on past performance and don’t dictate future pool performance. Historical rewards for each chain can be found [here](https://www.notion.so/forta/Rewards-2152a115a3df4f70ae05971a6fa6ac3e) and the formula which derives all node rewards is available [here](https://docs.forta.network/en/latest/delegated-staking-rewards/).

1. **Yield Score:** This is the output of a formula (APY Pool_i = {1 + ( LastEpochRewardsForDelegators_i / LastEpochDelegatorsTotalStake_i )} ^ 52 -1) nodes and other community members have found helpful when thinking about potential rewards from delegation. The formula extrapolates potential rewards on an annual basis, based on the pool’s rewards from the last epoch. 

2. **SLA Score:** Higher SLA scores in an epoch result in higher rewards. This metric is viewable in each pool profile.

3. **Uptime:** More time online in an epoch results in higher rewards. This metric is viewable in each pool profile.

4. **Commission:** Lower node commissions result in higher rewards for delegators. Note that pool owners can modify their commissions periodically each epoch.

5. **Available stake allocation capacity:** Unallocated stake does not generate rewards. Each node has a maximum stake (15,000 FORT), if the stake in a given pool is above this limit (given the number of nodes in the pool), any further stake will be unallocated. In addition, node operators can choose to unallocate stake from any delegator.