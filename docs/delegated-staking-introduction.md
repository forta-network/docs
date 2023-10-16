# Delegated Staking

Delegated staking is the process by which FORT token holders delegate all or a portion of their FORT to one or more scan node pools to secure the network and earn rewards. Pools are composed of one or more nodes, and can be formed by node runners to enable delegation. 

Just like individual scan nodes, pools earn weekly FORT rewards based on uptime and SLA scores. The difference with pools is a percentage of rewards is distributed to delegators. 

!!! important "Polygon"
    Delegated staking is done by using the staking contract on Polygon. Please check [this guide](bridging-fort.md) to find out how to bridge FORT tokens to Polygon.

Pool owners share rewards with delegators by establishing on-chain parameters, including:

* how much of the delegated stake is allocated,
* percentage of delegators' rewards withheld as commission.

After every reward epoch ends (each epoch is one week, from Monday 00:00:00 UTC to Sunday 23:59:59 UTC), FORT rewards are distributed to node pools. Rewards earned by each pool are written to the reward distribution smart contract and distributed between owners and delegators based on the rewards formula.

To learn more about delegated staking rewards, visit the [Rewards Formula page](delegated-staking-rewards.md).

Also, please be aware that FORT delegated to a pool is subject to pro rata slashing in the event the pool you have delegated to is slashed. Review the [Slashing Policy](slashing-policy.md) for more information.
