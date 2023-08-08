## ScannerPoolRegistryManaged

### ManagerEnabled

```solidity
event ManagerEnabled(uint256 scannerPoolId, address manager, bool enabled)
```

### SenderNotManager

```solidity
error SenderNotManager(address sender, uint256 scannerPoolId)
```

### onlyManagerOf

```solidity
modifier onlyManagerOf(uint256 scannerPoolId)
```

Checks sender (or metatx signer) is manager of the scanner pool token.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool |

### isManager

```solidity
function isManager(uint256 scannerPoolId, address manager) public view returns (bool)
```

Checks if address is defined as a manager for a ScannerPool's registered Scanner Nodes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool |
| manager | address | address to check. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if defined as manager for ScannerPool, false otherwise. |

### getManagerCount

```solidity
function getManagerCount(uint256 scannerPoolId) public view virtual returns (uint256)
```

Gets total managers defined for a ScannerPool's registered Scanner Nodes.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total managers defined for a ScannerPool. |

### getManagerAt

```solidity
function getManagerAt(uint256 scannerPoolId, uint256 index) public view virtual returns (address)
```

Gets manager address at certain position of the ScannerPool's registered Scanner Nodes.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool |
| index | uint256 | position in the set. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the manager at index. |

### setManager

```solidity
function setManager(uint256 scannerPoolId, address manager, bool enable) public
```

Adds or removes a manager to a certain ScannerPool's registered Scanner Nodes. Restricted to ScannerPoolRegistry owner.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool |
| manager | address | address to be added or removed from manager list for the ScannerPool. |
| enable | bool | true for adding, false for removing. |

### __gap

```solidity
uint256[49] __gap
```