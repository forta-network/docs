


### StakeSubjectHandlerChanged

```solidity
event StakeSubjectHandlerChanged(address newHandler, address oldHandler)
```

### setStakeSubjectHandler

```solidity
function setStakeSubjectHandler(uint8 subjectType, contract IStakeSubject subjectHandler) external
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

### isStakeActivatedFor

```solidity
function isStakeActivatedFor(uint8 subjectType, uint256 subject) external view returns (bool)
```

