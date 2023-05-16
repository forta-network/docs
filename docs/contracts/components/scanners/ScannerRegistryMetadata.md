## ScannerRegistryMetadata

### ScannerMetadata

```solidity
struct ScannerMetadata {
  uint256 chainId;
  string metadata;
}
```

### _scannerMetadata

```solidity
mapping(uint256 => struct ScannerRegistryMetadata.ScannerMetadata) _scannerMetadata
```

### getScanner

```solidity
function getScanner(uint256 scannerId) public view virtual returns (bool registered, address owner, uint256 chainId, string metadata)
```

Gets all scanner properties.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | bool | true if scanner exists. |
| owner | address | address. |
| chainId | uint256 | the scanner is monitoring. |
| metadata | string | IPFS pointer for the scanner's JSON metadata. |

### getScannerChainId

```solidity
function getScannerChainId(uint256 scannerId) public view returns (uint256)
```

Gets scanner chain Ids.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | chainId the scanner is monitoring. |

### _getStakeThreshold

```solidity
function _getStakeThreshold(uint256 subject) internal view virtual returns (struct IStakeSubject.StakeThreshold)
```

_checks the StakeThreshold for the chainId the scanner with id `subject` was registered to monitor._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subject | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IStakeSubject.StakeThreshold | StakeThreshold registered for `chainId`, or StakeThreshold(0,0,false) if `chainId` not found. |

### __gap

```solidity
uint256[49] __gap
```

