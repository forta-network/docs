## FortaCommon

Contract with the common functionality for both L1 FORT and L2 FortaBridgedPolygon.
NOTE: Whitelisting functionality, used before the token was public, is deprecated.
The whitelist was disabled setting whitelistDisabled = true, the current code keeps that storage
layout for compatibility and removes whitelist code from _beforeTokenTransfer() to save gas.
We are keeping the related roles to not break StakingEscrowFactory (already deployed), and the 
_setRoleAdmin() in the initializer for historical context.

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### WHITELISTER_ROLE

```solidity
bytes32 WHITELISTER_ROLE
```

### WHITELIST_ROLE

```solidity
bytes32 WHITELIST_ROLE
```

### deprecated_whitelistDisabled

```solidity
bool deprecated_whitelistDisabled
```

### constructor

```solidity
constructor() internal
```

### __FortaCommon_init

```solidity
function __FortaCommon_init(address admin) internal
```

Initializer method, access point to initialize inheritance tree.

_sets token name and symbol, permit init and RBAC structure._

| Name | Type | Description |
| ---- | ---- | ----------- |
| admin | address | address for the ADMIN_ROLE of the token. |

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal virtual
```

Access control for the upgrade process

### setName

```solidity
function setName(address ensRegistry, string ensName) external
```

### __gap

```solidity
uint256[49] __gap
```