# Delegated Staking

Forta node runners set up scan nodes and register nodes in pools of their own. While they are required to deposit stake to signal the reliable pools and earn rewards, others can delegate their FORT tokens to these pools and generate rewards for themselves.

!!! important "Polygon"
    Delegated staking is done by using the staking contract on Polygon. Please check [this guide](https://docs.forta.network/en/latest/bridging-fort/) to find out how to bridge FORT tokens to Polygon.

By delegating FORT tokens, participants are increasing the security and reliability of the network and earning rewards as a result. Pool owners share their rewards with delegators by setting up:

- how much of the delegated stake is allocated,
- what percentage of delegators' rewards are withheld as commission.

After every reward epoch ends (1 week, from Monday 00:00:00 UTC to Sunday 23:59:59 UTC), the process to distribute FORT rewards to the pools starts. The rewards for each pool are written to the reward distribution smart contract and that distributes the rewards between owners and delegators following the rewards formulas.

To learn more about rewards, please visit the [Rewards Formula page](delegated-staking-rewards.md).

In accordance with Forta Network's mission of securing Web3, delegated stakes are subject to the possibility of a partial reduction in case the pool they are delegating to is slashed (either because of technical reasons or misconduct). Please check the [Slashing Policy](slashing-policy.md) for more information.

!!! warning "Delays"
    - Delegators are subject to a waiting period of 10 days to reclaim their FORT after initiating a stake withdrawal.
    - When the pool owner changes the commission percentage, it becomes effective in the next epoch.
    - Once the commission is changed, it cannot be changed for two epochs (excluding current epoch).

	These values are subject to change.

# Choosing a Scanner Pool

Please visit the [pools page](https://app.forta.network/network/node-pools) to see the list of available pools for delegating your stake to.

For instructions on how to delegate your stake to a scanner pool and withdraw your stake, please visit the [pool and stake management](scanner-pools.md) page.

Making a careful choice can help you generate more rewards. There are several things to consider before delegating stake to a pool:

- **SLA score of the pool's scanners:** A higher score results in higher rewards.
- **Time online (uptime) of the pool's scanners:** More time online results in higher rewards.
- **Commission set by the pool owner:** A lower commission results in higher rewards for delegators. Be aware that pool owners can modify their commissions periodically.
- **Available stake allocation capacity:** Unallocated stake does not generate rewards. Each node can have up to 15,000 FORT staked, so the capacity of the pool is the number of nodes it has multiplied by 15,000.

All of this variables can change quickly so it’s important to monitor your delegations.

Choosing the right pool operator requires careful consideration, as there are many factors to take into account. We strongly advise you to explore Forta Discord community to identify the Pool Operators who have both a strong social and technical reputation and who consistently reward their Delegators fairly. You’ll find that many Operators are highly engaged in the community and willing to provide answers to any questions you may have.
