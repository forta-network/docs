## RoutedUpgradeable

Since Router is deprecated, we are keeping RoutedUpgradeable in this state to preserve storage
layout in deployed `BaseComponentUpgradeable` contracts.

### _deprecated_router

```solidity
address _deprecated_router
```

### RouterUpdated

```solidity
event RouterUpdated(address router)
```

### disableRouter

```solidity
function disableRouter() public
```

Sets Router instance to address(0).

### __gap

```solidity
uint256[49] __gap
```

