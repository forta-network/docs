## ScannerRegistry

### version

```solidity
string version
```

### constructor

```solidity
constructor(address forwarder) public
```

### initialize

```solidity
function initialize(address __manager, address __router, string __name, string __symbol) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |
| __router | address | address of Router. |
| __name | string | ERC721 token name. |
| __symbol | string | ERC721 token symbol. |

### getScannerState

```solidity
function getScannerState(uint256 scannerId) external view returns (bool registered, address owner, uint256 chainId, string metadata, bool enabled, uint256 disabledFlags)
```

Gets all scanner properties and state

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | bool | true if scanner exists. |
| owner | address | address. |
| chainId | uint256 | the scanner is monitoring. |
| metadata | string | IPFS pointer for the scanner's JSON metadata. |
| enabled | bool | true if staked over minimum and not disabled. |
| disabledFlags | uint256 | 0 if not disabled, Permission if disabled. |

### _scannerUpdate

```solidity
function _scannerUpdate(uint256 scannerId, uint256 chainId, string metadata) internal virtual
```

Inheritance disambiguation for _scannerUpdate internal logic.

_Emits ScannerUpdated(scannerId, chainId, metadata)_

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |
| chainId | uint256 | that the scanner will monitor. |
| metadata | string | IPFS pointer to scanner's metadata JSON |

### _getStakeThreshold

```solidity
function _getStakeThreshold(uint256 subject) internal view virtual returns (struct IStakeSubject.StakeThreshold)
```

_inheritance disambiguation for _getStakeThreshold
see ScannerRegistryMetadata_

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

### __gap

```solidity
uint256[50] __gap
```

