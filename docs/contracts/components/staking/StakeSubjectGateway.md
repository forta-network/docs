## StakeSubjectGateway

Formerly FortaStakingParameters.

This contract manages the relationship between the staking contracts and the several affected staking subjects,
who hold the responsibility of defining staking thresholds, managed subjects, and related particularities.

### NonIDelegatedSubjectHandler

```solidity
error NonIDelegatedSubjectHandler(uint8 subjectType, address stakeSubject)
```

### version

```solidity
string version
```

### setStakeSubject

```solidity
function setStakeSubject(uint8 subjectType, address subject) external
```

Sets stake subject for subject type.

### unsetStakeSubject

```solidity
function unsetStakeSubject(uint8 subjectType) external
```

### getStakeSubject

```solidity
function getStakeSubject(uint8 subjectType) external view returns (address)
```

### maxStakeFor

```solidity
function maxStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get max stake for that `subjectType` and `subject`

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | if subject is DIRECT, returns stakeThreshold.max, if not MAX_UINT. If subject not set, it will return 0. |

### minStakeFor

```solidity
function minStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get min stake for that `subjectType` and `subject`

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | if subject is DIRECT, returns stakeThreshold.min, if not 0. If subject not set, it will return MAX_UINT. |

### maxManagedStakeFor

```solidity
function maxManagedStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### minManagedStakeFor

```solidity
function minManagedStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### totalManagedSubjects

```solidity
function totalManagedSubjects(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### isStakeActivatedFor

```solidity
function isStakeActivatedFor(uint8 subjectType, uint256 subject) external view returns (bool)
```

Get if staking is activated for that `subjectType` and `subject`. If not set, will return false.

### activeStakeFor

```solidity
function activeStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Gets active stake (amount of staked tokens) on `subject` id for `subjectType`

### totalStakeFor

```solidity
function totalStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Gets active and inactive stake (amount of staked tokens) on `subject` id for `subjectType`

### isRegistered

```solidity
function isRegistered(uint8 subjectType, uint256 subject) external view returns (bool)
```

Checks if subject, subjectType is registered

### canManageAllocation

```solidity
function canManageAllocation(uint8 subjectType, uint256 subject, address allocator) external view returns (bool)
```

Returns true if allocator owns the subject, or is the subject contract itself

### ownerOf

```solidity
function ownerOf(uint8 subjectType, uint256 subject) external view returns (address)
```