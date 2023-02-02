# Stake Delegation

Forta Network introduces Stake Delegation to increase the security of the network while improving the experience of Scanner Pool owners.

Scanner Pool owners allocate their stake among the scanners registered to their pool, which will be distributed evenly between all the scanners. Those who allocate at least the minimum amount required per scanner for their monitored chain, may allow delegation to their pools (up to the max stake allowed). 

Delegators can delegate FORT to scanner pool owners, allowing them to allocate the delegated stakes on their pooled scanners.

```
Sa = Scanner Pool's total allocated stake
Soa = Pool owner's allocated stake
Sda = Delegators allocated stake
Ssa = Allocated stake per scanner.
Ns = Number of non disabled scanners in a pool.

Sa = Soa + Sda
Ssa = Sa / Ns

Ssa >= Min Stake per scanner
Ssa <= Max Stake per scanner

To activate delegation:
Soa >= Min Stake per scanner

```

!!! important "Staking limits"
    Currently, the allocated stake limits per scanner are: 

    - **min**: 2.500 FORT 
    - **max**: 15.000 FORT
    
    These values are subject to change.

Example with current limits:

```
Pool has:
  - 4 non disabled scanners
  - To enable the pool, owner's allocated stake must be at least
   4 * 2.500 = 10.000 FORT
  - If the pool owner staked the minimum, she could allocate delegated stake up to
   (15.000 - 2.500) * 4 = 50.000 FORT
```
    
Every reward epoch, SLA scores for scanners of the pool will be measured, along with the variations on stake allocation. After the end of the epoch, a reward in FORT will be assigned to the pool in the reward distribution smart contract, where the rewarded parties may claim.

To learn more about rewards, visit the [Rewards Formula page](/rewards).

Network rewards for Scanner Pools will be shared among pool owners and delegators proportional to the percentage of stake supplied and the moment when it was allocated. Pool owners will be able to specify a commission percentage that they will keep from delegator rewards. Changes in the commission (or fee) will take effect on the next reward epoch, and subsequent changes will have to wait for a lockdown period.

!!! important "Reward epochs"
    - **epoch duration**: 1 week, from Monday 00:00:00 UTC to Sunday 23:59:59 UTC
    - **lockdown to set a different delegation fee after a change**: 2 epochs.

    Values subject to change.

In accordance with Forta Network's mission of securing web3, delegated stakes will be subject to a proportional slashing in case the pool they are delegated in is slashed, and they will be subject to waiting periods for withdrawals.

!!! warning "Delegated Stake"
    Current parameters

    - **Stake % for delegated shares**: TBD
    - **Withdrawal delay**: 10 days
    
    These values are subject to change.