## ScannerRegistryCore

### ScannerUpdated

```solidity
event ScannerUpdated(uint256 scannerId, uint256 chainId, string metadata)
```

### StakeThresholdChanged

```solidity
event StakeThresholdChanged(uint256 chainId, uint256 min, uint256 max, bool activated)
```

### ScannerNotRegistered

```solidity
error ScannerNotRegistered(address scanner)
```

### onlyOwnerOf

```solidity
modifier onlyOwnerOf(uint256 scannerId)
```

Checks sender (or metatx signer) is owner of the scanner token.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |

### isRegistered

```solidity
function isRegistered(uint256 scannerId) public view returns (bool)
```

Checks if scannerId has been registered (minted).

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if scannerId exists, false otherwise. |

### scannerAddressToId

```solidity
function scannerAddressToId(address scanner) public pure returns (uint256)
```

Converts scanner address to uint256 for ERC721 Token Id.

### setStakeThreshold

```solidity
function setStakeThreshold(struct IStakeSubject.StakeThreshold newStakeThreshold, uint256 chainId) external
```

Sets stake parameters (min, max, activated) for a `chainId`. Restricted to SCANNER_ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| newStakeThreshold | struct IStakeSubject.StakeThreshold | struct with stake parameters. |
| chainId | uint256 | chain the parameters will affect. |

### getStakeThreshold

```solidity
function getStakeThreshold(uint256 subject) external view returns (struct IStakeSubject.StakeThreshold)
```

Getter for StakeThreshold for the scanner with id `subject`

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Helper to get either msg msg.sender if not a meta transaction, signer of forwarder metatx if it is.

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Helper to get msg.data if not a meta transaction, forwarder data in metatx if it is.

### ownerOf

```solidity
function ownerOf(uint256 subject) public view virtual returns (address)
```

disambiguation of ownerOf.

_See {IERC721-ownerOf}._

### __gap

```solidity
uint256[44] __gap
```

