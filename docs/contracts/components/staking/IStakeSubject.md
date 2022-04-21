


### StakeThreshold

```solidity
struct StakeThreshold {
  uint256 min;
  uint256 max;
  bool activated;
}
```

### getStakeThreshold

```solidity
function getStakeThreshold(uint256 subject) external view returns (struct IStakeSubject.StakeThreshold)
```

### isStakedOverMin

```solidity
function isStakedOverMin(uint256 subject) external view returns (bool)
```

