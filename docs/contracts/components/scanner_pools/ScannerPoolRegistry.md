## ScannerPoolRegistry

ERC721 Registry of Scanner Pools. Each scanner ScannerPool EOA controls a number of Scanner Nodes through the ownership of this NFT,
represented by their EOA address.
The Scanner Pool must register themselves, then register scanner addresses to be controlled by their scannerPoolId (incremental uint).
Registered Scanner Pools can also assign managers to manage the scanners.
Each Scanner Pool has a single "chainId" for all the scanners, and each scanner has metadata (string that can point to a URL, IPFS…).
Scanner Pool owners and managers can update said metadata.
Scanner Nodes can be enabled or disabled by:
- the Scanner itself,
- the ScannerPool owner
- any of the scanner managers

If the scannerId is staked under the minimum stake, it can’t be `enabled()` and `isEnabled()` will return false, regardless of the disabled flag.
If the scanner is not registered, `isEnabled()` will return false.
A Scanner Node that is not enabled will not receive work (bot assignments)

### version

```solidity
string version
```

### constructor

```solidity
constructor(address forwarder, address stakeAllocator) public
```

### registerMigratedScannerPool

```solidity
function registerMigratedScannerPool(address scannerPoolAddress, uint256 chainId) external returns (uint256 scannerPoolId)
```

### registerMigratedScannerNode

```solidity
function registerMigratedScannerNode(struct ScannerPoolRegistryCore.ScannerNodeRegistration req, bool disabled) external
```

### _canSetEnableState

```solidity
function _canSetEnableState(address scanner) internal view virtual returns (bool)
```

disambiguation of _canSetEnableState, adding SCANNER_2_SCANNER_POOL_MIGRATOR_ROLE to the allowed setters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanner | address | address |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if _msgSender() is the ScannerPool owning the Scanner or the Scanner Node itself |

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