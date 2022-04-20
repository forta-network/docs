
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

### _disabled

```solidity
mapping(uint256 &#x3D;&gt; struct BitMaps.BitMap) _disabled
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
| scannerId | uint256 | ERC1155 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the scanner is registered, has not been disabled, and is staked over minimum value. Returns false if otherwise |

### enableScanner

```solidity
function enableScanner(uint256 scannerId, enum ScannerRegistryEnable.Permission permission) public virtual
```

Public method to enable a scanner, if caller has permission. Scanner must be staked over minimum defined
for the scanner&#x27;s chainId.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the caller claims to have. |

### disableScanner

```solidity
function disableScanner(uint256 scannerId, enum ScannerRegistryEnable.Permission permission) public virtual
```

Public method to disable a scanner, if caller has permission.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the caller claims to have. |

### _hasPermission

```solidity
function _hasPermission(uint256 scannerId, enum ScannerRegistryEnable.Permission permission) internal view returns (bool)
```

Method that does permission checks.

_AccessManager is not used since the permission is specific for scannerId_

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
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
| scannerId | uint256 | ERC1155 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the caller claims to have. |
| enable | bool | true for enabling, false for disabling |

### _getDisableFlags

```solidity
function _getDisableFlags(uint256 scannerId) internal view returns (uint256)
```

Get the disabled flags for an agentId. Permission (uint8) is used for indexing, so we don&#x27;t
need to loop. 
If not disabled, all flags will be 0

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 containing the byte flags. |

### _beforeScannerEnable

```solidity
function _beforeScannerEnable(uint256 scannerId, enum ScannerRegistryEnable.Permission permission, bool value) internal virtual
```

Hook _before scanner enable

_does nothing in this contract_

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the sender claims to have to enable the agent. |
| value | bool | true if enabling, false if disabling. |

### _scannerEnable

```solidity
function _scannerEnable(uint256 scannerId, enum ScannerRegistryEnable.Permission permission, bool value) internal virtual
```

Logic for enabling or disabling the scanner.

_sets the corresponding byte in _disabled bitmap for scannerId. Emits ScannerEnabled event._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the sender claims to have to enable the agent. |
| value | bool | true if enabling, false if disabling. |

### _afterScannerEnable

```solidity
function _afterScannerEnable(uint256 scannerId, enum ScannerRegistryEnable.Permission permission, bool value) internal virtual
```

Hook _after scanner enable

_emits Router hook._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| permission | enum ScannerRegistryEnable.Permission | the sender claims to have to enable the agent. |
| value | bool | true if enabling, false if disabling. |

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Obligatory inheritance dismambiguation of ForwardedContext&#x27;s _msgSender()

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | msg.sender if not a meta transaction, signer of forwarder metatx if it is. |

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Obligatory inheritance dismambiguation of ForwardedContext&#x27;s _msgSender()

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | sender msg.data if not a meta transaction, forwarder data in metatx if it is. |

### __gap

```solidity
uint256[49] __gap
```

