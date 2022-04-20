
## ScannerRegistryManaged

### _managers

```solidity
mapping(uint256 &#x3D;&gt; struct EnumerableSet.AddressSet) _managers
```

### ManagerEnabled

```solidity
event ManagerEnabled(uint256 scannerId, address manager, bool enabled)
```

### SenderNotManager

```solidity
error SenderNotManager(address sender, uint256 scannerId)
```

### onlyManagerOf

```solidity
modifier onlyManagerOf(uint256 scannerId)
```

Checks sender (or metatx signer) is manager of the scanner token.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |

### isManager

```solidity
function isManager(uint256 scannerId, address manager) public view virtual returns (bool)
```

Checks if address is defined as a manager for a scanner.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| manager | address | address to check. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if defined as manager for scanner, false otherwise. |

### getManagerCount

```solidity
function getManagerCount(uint256 scannerId) public view virtual returns (uint256)
```

Gets total managers defined for a scanner.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total managers defined for a scanner. |

### getManagerAt

```solidity
function getManagerAt(uint256 scannerId, uint256 index) public view virtual returns (address)
```

Gets manager address at certain position of the scanner&#x27;s manager set.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| index | uint256 | position in the set. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the manager at index. |

### setManager

```solidity
function setManager(uint256 scannerId, address manager, bool enable) public
```

Adds or removes a manager to a certain scanner. Restricted to scanner owner.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| manager | address | address to be added or removed fromm manager list for the scanner. |
| enable | bool | true for adding, false for removing. |

### __gap

```solidity
uint256[49] __gap
```

