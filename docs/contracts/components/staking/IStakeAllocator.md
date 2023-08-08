## IStakeAllocator

### depositAllocation

```solidity
function depositAllocation(uint256 activeSharesId, uint8 subjectType, uint256 subject, address allocator, uint256 stakeAmount, uint256 sharesAmount) external
```

### withdrawAllocation

```solidity
function withdrawAllocation(uint256 activeSharesId, uint8 subjectType, uint256 subject, address allocator, uint256 stakeAmount, uint256 sharesAmount) external
```

### allocatedStakeFor

```solidity
function allocatedStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### allocatedManagedStake

```solidity
function allocatedManagedStake(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### allocatedStakePerManaged

```solidity
function allocatedStakePerManaged(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### unallocatedStakeFor

```solidity
function unallocatedStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### allocateOwnStake

```solidity
function allocateOwnStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

### unallocateOwnStake

```solidity
function unallocateOwnStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

### unallocateDelegatorStake

```solidity
function unallocateDelegatorStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

### didTransferShares

```solidity
function didTransferShares(uint256 sharesId, uint8 subjectType, address from, address to, uint256 sharesAmount) external
```

## IStakeAllocator

### depositAllocation

```solidity
function depositAllocation(uint256 activeSharesId, uint8 subjectType, uint256 subject, address allocator, uint256 stakeAmount, uint256 sharesAmount) external
```

### withdrawAllocation

```solidity
function withdrawAllocation(uint256 activeSharesId, uint8 subjectType, uint256 subject, address allocator, uint256 stakeAmount, uint256 sharesAmount) external
```

### allocatedStakeFor

```solidity
function allocatedStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### allocatedStakePerManaged

```solidity
function allocatedStakePerManaged(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### unallocatedStakeFor

```solidity
function unallocatedStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

### allocateOwnStake

```solidity
function allocateOwnStake(uint8 subjectType, uint256 subject, uint256 amount) external
```

### didTransferShares

```solidity
function didTransferShares(uint256 sharesId, uint8 subjectType, address from, address to, uint256 sharesAmount) external
```