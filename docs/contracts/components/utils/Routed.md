## RoutedUpgradeable

### _router

```solidity
contract IRouter _router
```

### RouterUpdated

```solidity
event RouterUpdated(address router)
```

### __Routed_init

```solidity
function __Routed_init(address router) internal
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | address | address of Routed. |

### _emitHook

```solidity
function _emitHook(bytes data) internal
```

_Routed contracts can use this method to notify the subscribed observers registered
in Router routing table. Hooks may revert on failure or not, as set when calling
Router.setRoutingTable(bytes4 sig, address target, bool enable, bool revertsOnFail)_

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | bytes | keccak256 of the method signature and param values the listener contracts. will execute. |

### setRouter

```solidity
function setRouter(address newRouter) public
```

Sets new Router instance. Restricted to DEFAULT_ADMIN_ROLE.

### __gap

```solidity
uint256[49] __gap
```

