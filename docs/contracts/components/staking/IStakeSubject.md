## IStakeSubject

### StakeThreshold

```solidity
struct StakeThreshold {
  uint256 min;
  uint256 max;
  bool activated;
}
```

### StakeThresholdMaxLessOrEqualMin

```solidity
error StakeThresholdMaxLessOrEqualMin()
```

### isRegistered

```solidity
function isRegistered(uint256 subject) external view returns (bool)
```

### ownerOf

```solidity
function ownerOf(uint256 subject) external view returns (address)
```