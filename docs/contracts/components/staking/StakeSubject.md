


### _stakeController

```solidity
contract IStakeController _stakeController
```

### StakeControllerUpdated

```solidity
event StakeControllerUpdated(address newstakeController)
```

### StakeThresholdMaxLessOrEqualMin

```solidity
error StakeThresholdMaxLessOrEqualMin()
```

### StakedUnderMinimum

```solidity
error StakedUnderMinimum(uint256 subject)
```

### __StakeAwareUpgradeable_init

```solidity
function __StakeAwareUpgradeable_init(address stakeController) internal
```

### setStakeController

```solidity
function setStakeController(address stakeController) public
```

Stake controller setter, restricted to DEFAULT_ADMIN_ROLE

### getStakeController

```solidity
function getStakeController() public view returns (contract IStakeController)
```

Getter for stakeController

### _setStakeController

```solidity
function _setStakeController(address stakeController) private
```

Internal setter for StakeController, emits StakeControllerUpdated

### isStakedOverMin

```solidity
function isStakedOverMin(uint256 subject) external view virtual returns (bool)
```

Returns true if &#x60;subject&#x60; amount of staked tokens is bigger or equal the minimum stake set
for it. It&#x27;s for contracts implementing &#x60;StakeSubjectUpgradeable&#x60; to decide what that means.

### _isStakedOverMin

```solidity
function _isStakedOverMin(uint256 subject) internal view virtual returns (bool)
```

### __gap

```solidity
uint256[4] __gap
```

