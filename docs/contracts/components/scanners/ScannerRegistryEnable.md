## ScannerRegistryEnable

_ScannerRegistry methods and state handling disabling and enabling scanners, and
recognizing stake changes that might disable a scanner.
NOTE: This contract was deployed before StakeAwareUpgradeable was created, so __StakeAwareUpgradeable_init
is not called._

### Permission

```solidity
enum Permission {
  ADMIN,
  SELF,
  OWNER,
  MANAGER,
  length
}
```

### ScannerEnabled

```solidity
event ScannerEnabled(uint256 scannerId, bool enabled, enum ScannerRegistryEnable.Permission permission, bool value)
```

### isEnabled

```solidity
function isEnabled(uint256 scannerId) public view virtual returns (bool)
```

Check if scanner is enabled

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the scanner is registered, has not been disabled, and is staked over minimum value. Returns false if otherwise |

### enableScanner

```solidity
function enableScanner(uint256 scannerId, enum ScannerRegistryEnable.Permission permission) public virtual
```

Public method to enable a scanner, if caller has permission. Scanner must be staked over minimum defined
for the scanner's chainId.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the caller claims to have. |

### disableScanner

```solidity
function disableScanner(uint256 scannerId, enum ScannerRegistryEnable.Permission permission) public virtual
```

Public method to disable a scanner, if caller has permission.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the caller claims to have. |

### _getDisableFlags

```solidity
function _getDisableFlags(uint256 scannerId) internal view returns (uint256)
```

Get the disabled flags for an agentId. Permission (uint8) is used for indexing, so we don't
need to loop. 
If not disabled, all flags will be 0

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 containing the byte flags. |

### _hasPermission

```solidity
function _hasPermission(uint256 scannerId, enum ScannerRegistryEnable.Permission permission) internal view returns (bool)
```

Method that does permission checks.

_AccessManager is not used since the permission is specific for scannerId_

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the caller claims to have. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if (ADMIN and _msgSender() has SCANNER_ADMIN_ROLE), if _msgSender() is the scanner itself, its owner or manager for each respective permission, false otherwise. |

### _enable

```solidity
function _enable(uint256 scannerId, enum ScannerRegistryEnable.Permission permission, bool enable) internal
```

Internal method to enable a scanner.

_will trigger _before and _after enable hooks within the inheritance tree._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the caller claims to have. |
| enable | bool | true for enabling, false for disabling |

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Obligatory inheritance dismambiguation of ForwardedContext's _msgSender()

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | msg.sender if not a meta transaction, signer of forwarder metatx if it is. |

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Obligatory inheritance dismambiguation of ForwardedContext's _msgSender()

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | sender msg.data if not a meta transaction, forwarder data in metatx if it is. |

### __gap

```solidity
uint256[49] __gap
```

