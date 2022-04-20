
## ScannerRegistry

Registry of scanners. Unlike agents, scanners are addresses that are expected to be able to send transactions. They could either be EOA or smart contracts.

Scanners can either register themselves by calling the `register` function or can be registered by an admin (`SCANNER_ADMIN_ROLE`). Admins are mostly useful for early migration. Registered scanners have an owner that supervises them and can assign managers. The extent of owner and manager positions is unclear for now.

Each scanner has a single "chainId" that multiple scanners can share. There is currently no workflow that allows anyone to update this metadata.

Similar to the agents, scanners can be enabled or disabled by:

- admins (`SCANNER_ADMIN_ROLE`),
- the scanner itself,
- the scanner owner
- any of the scanner managers

If the scanner Id is staked under the minimum stake, it can’t be `enabled()` and `isEnabled()` will return false, regardless of the flags

Similar to agents, each one of these 4 positions has an independent "disable" flag.

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
| __name | string | ERC1155 token name. |
| __symbol | string | ERC1155 token symbol. |

### getScannerState

```solidity
function getScannerState(uint256 scannerId) external view returns (bool registered, address owner, uint256 chainId, string metadata, bool enabled)
```

Gets all scanner properties and state

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | bool | true if scanner exists. |
| owner | address | address. |
| chainId | uint256 | the scanner is monitoring. |
| metadata | string | IPFS pointer for the scanner&#x27;s JSON metadata. |
| enabled | bool |  |

### _scannerUpdate

```solidity
function _scannerUpdate(uint256 scannerId, uint256 chainId, string metadata) internal virtual
```

Inheritance disambiguation for _scannerUpdate internal logic.

_Emits ScannerUpdated(scannerId, chainId, metadata)_

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC1155 token id of the scanner. |
| chainId | uint256 | that the scanner will monitor. |
| metadata | string | IPFS pointer to scanner&#x27;s metadata JSON |

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

