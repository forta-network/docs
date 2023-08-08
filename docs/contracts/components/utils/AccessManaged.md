## AccessManagedUpgradeable

### _accessControl

```solidity
contract IAccessControl _accessControl
```

### AccessManagerUpdated

```solidity
event AccessManagerUpdated(address newAddressManager)
```

### MissingRole

```solidity
error MissingRole(bytes32 role, address account)
```

### onlyRole

```solidity
modifier onlyRole(bytes32 role)
```

Checks if _msgSender() has `role`, reverts if not.

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | the role to be tested, defined in Roles.sol and set in AccessManager instance. |

### __AccessManaged_init

```solidity
function __AccessManaged_init(address manager) internal
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| manager | address | address of AccessManager. |

### hasRole

```solidity
function hasRole(bytes32 role, address account) internal view returns (bool)
```

Checks if `account has `role` assigned.

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | the role to be tested, defined in Roles.sol and set in AccessManager instance. |
| account | address | the address to be tested for the role. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | return true if account has role, false otherwise. |

### setAccessManager

```solidity
function setAccessManager(address newManager) public
```

Sets AccessManager instance. Restricted to DEFAULT_ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| newManager | address | address of the new instance of AccessManager. |

### __gap

```solidity
uint256[49] __gap
```

