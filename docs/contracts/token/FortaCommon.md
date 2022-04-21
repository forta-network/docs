


Contract that contains the common functionality for all FORT versions in different chains.

This contracts and inheriting contracts do not use `AccessManager` so they must define their roles.

FortaCommon is an upgradeable ERC20 currently not open to the public, so transfers are restricted via check if the sender has `WHITELIST_ROLE` in `_beforeTokenTransfer` hook. Access to the whitelist is granted by `WHITELISTER_ROLE`

This restriction will be removed at a later date via upgrade.

FortaCommon supports Compound-like on-chain governance inheriting from `ERC20VotesUpgradeable`

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

### whitelistDisabled

```solidity
bool whitelistDisabled
```

### NotWhitelisted

```solidity
error NotWhitelisted(string name, address guilty)
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

### grantWhitelister

```solidity
function grantWhitelister(address to) public
```

Allow whitelister to assign other whitelisters

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual
```

Only allow transfer to whitelisted accounts

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal virtual
```

Access control for the upgrade process

### setName

```solidity
function setName(address ensRegistry, string ensName) external
```

### disableWhitelist

```solidity
function disableWhitelist() public
```

### enableWhitelist

```solidity
function enableWhitelist() public
```

### __gap

```solidity
uint256[49] __gap
```

