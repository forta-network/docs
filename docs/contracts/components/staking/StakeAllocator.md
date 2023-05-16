## StakeAllocator

This contract also manages the allocation of stake. See SubjectTypeValidator.sol for in depth explanation of Subject Agency

Stake constants:
totalStake = activeStake + inactiveStake
activeStake(delegated) = allocatedStake(delegated) + unallocatedStake(delegated)
activeStake(delegator) = allocatedStake(delegator) + unallocatedStake(delegator)
allocatedStake(managed) = (allocatedStake(delegated) + allocatedStake(delegator)) / totalManagedSubjects(delegated)
activeStake(managed) = inactiveStake(managed) = 0;

### version

```solidity
string version
```

### AllocatedStake

```solidity
event AllocatedStake(uint8 subjectType, uint256 subject, bool increase, uint256 amount, uint256 totalAllocated)
```

### UnallocatedStake

```solidity
event UnallocatedStake(uint8 subjectType, uint256 subject, bool increase, uint256 amount, uint256 totalAllocated)
```

### SenderCannotAllocateFor

```solidity
error SenderCannotAllocateFor(uint8 subjectType, uint256 subject)
```

### CannotDelegateStakeUnderMin

```solidity
error CannotDelegateStakeUnderMin(uint8 subjectType, uint256 subject)
```

### CannotDelegateNoEnabledSubjects

```solidity
error CannotDelegateNoEnabledSubjects(uint8 subjectType, uint256 subject)
```

### constructor

```solidity
constructor(address _forwarder, address __subjectGateway, address _rewardsDistributor) public
```

### allocatedStakeFor

```solidity
function allocatedStakeFor(uint8 subjectType, uint256 subject) public view returns (uint256)
```

Active stake allocated on subject

### allocatedManagedStake

```solidity
function allocatedManagedStake(uint8 subjectType, uint256 subject) public view returns (uint256)
```

Total allocated stake in all managed subjects, both from delegated and delegator. Only returns values from
DELEGATED types, else 0.

### allocatedStakePerManaged

```solidity
function allocatedStakePerManaged(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Returns allocatedManagedStake (own + delegator's) in DELEGATED / total managed subjects, or 0 if not DELEGATED

### allocatedOwnStakePerManaged

```solidity
function allocatedOwnStakePerManaged(uint8 subjectType, uint256 subject) public view returns (uint256)
```

Returns allocatedManagedStake (own only) in DELEGATED / total managed subjects, or 0 if not DELEGATED

### allocatedDelegatorsStakePerManaged

```solidity
function allocatedDelegatorsStakePerManaged(uint8 subjectType, uint256 subject) public view returns (uint256)
```

Returns allocatedManagedStake (delegators only) in DELEGATED / total managed subjects, or 0 if not DELEGATED

### unallocatedStakeFor

```solidity
function unallocatedStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Total active stake not allocated on subjects

### allocateOwnStake

```solidity
function allocateOwnStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

owner of a DELEGATED subject moves tokens from its own unallocated to allocated.
It will fail if allocating more than the max for managed stake.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| amount | uint256 | amount of stake to move from unallocated to allocated. |

### unallocateOwnStake

```solidity
function unallocateOwnStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

owner of a DELEGATED subject moves it's own tokens from allocated to unallocated.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| amount | uint256 | amount of incoming staked token. |

### allocateDelegatorStake

```solidity
function allocateDelegatorStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

owner of a DELEGATED subject moves tokens from DELEGATOR's unallocated to allocated.
It will fail if allocating more than the max for managed stake.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| amount | uint256 | amount of stake to move from unallocated to allocated. |

### unallocateDelegatorStake

```solidity
function unallocateDelegatorStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

owner of a DELEGATED subject moves it's own tokens from allocated to unallocated.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| amount | uint256 | amount of staked token. |

### depositAllocation

```solidity
function depositAllocation(uint256 activeSharesId, uint8 subjectType, uint256 subject, address allocator, uint256 stakeAmount, uint256 sharesAmount) external
```

Allocates stake on deposit (increment of activeStake) for a DELEGATED subject incrementing it's allocatedStake.
If allocatedStake is going to be over the max
for the corresponding MANAGED subject, the excess increments unallocatedStake.

| Name | Type | Description |
| ---- | ---- | ----------- |
| activeSharesId | uint256 | ERC1155 id representing the active shares of a subject / subjectType pair. |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| allocator | address |  |
| stakeAmount | uint256 | amount of incoming staked token. |
| sharesAmount | uint256 | amount of minted active shares for stake |

### withdrawAllocation

```solidity
function withdrawAllocation(uint256 activeSharesId, uint8 subjectType, uint256 subject, address allocator, uint256 stakeAmount, uint256 sharesAmount) external
```

method to call when substracting activeStake. Will burn unallocatedStake (and allocatedStake if amount is bigger than unallocatedStake).
If withdrawal leads to DELEGATED to be below staking minimum, unallocates delegators' stake.

| Name | Type | Description |
| ---- | ---- | ----------- |
| activeSharesId | uint256 | ERC1155 id representing the active shares of a subject / subjectType pair. |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| allocator | address |  |
| stakeAmount | uint256 | amount of outgoing staked token. |
| sharesAmount | uint256 | amount of outgoing active shares |

### didTransferShares

```solidity
function didTransferShares(uint256 sharesId, uint8 subjectType, address from, address to, uint256 sharesAmount) external
```