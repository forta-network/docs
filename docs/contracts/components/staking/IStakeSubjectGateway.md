## IStakeSubjectGateway

### StakeSubjectChanged

```solidity
event StakeSubjectChanged(address newHandler, address oldHandler)
```

### setStakeSubject

```solidity
function setStakeSubject(uint8 subjectType, address subject) external
```

### getStakeSubject

```solidity
function getStakeSubject(uint8 subjectType) external view returns (address)
```

### activeStakeFor

```solidity
function activeStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### maxStakeFor

```solidity
function maxStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### minStakeFor

```solidity
function minStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### totalStakeFor

```solidity
function totalStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### isStakeActivatedFor

```solidity
function isStakeActivatedFor(uint8 subjectType, uint256 subject) external view returns (bool)
```

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

### canManageAllocation

```solidity
function canManageAllocation(uint8 subjectType, uint256 subject, address allocator) external view returns (bool)
```

### ownerOf

```solidity
function ownerOf(uint8 subjectType, uint256 subject) external view returns (address)
```