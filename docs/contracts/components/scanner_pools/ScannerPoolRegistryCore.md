## ScannerPoolRegistryCore

### ScannerUpdated

```solidity
event ScannerUpdated(uint256 scannerId, uint256 chainId, string metadata, uint256 scannerPool)
```

### ManagedStakeThresholdChanged

```solidity
event ManagedStakeThresholdChanged(uint256 chainId, uint256 min, uint256 max, bool activated)
```

### RegistrationDelaySet

```solidity
event RegistrationDelaySet(uint256 delay)
```

### ScannerEnabled

```solidity
event ScannerEnabled(uint256 scannerId, bool enabled, address sender, bool disableFlag)
```

### EnabledScannersChanged

```solidity
event EnabledScannersChanged(uint256 scannerPoolId, uint256 enabledScanners)
```

### ScannerPoolRegistered

```solidity
event ScannerPoolRegistered(uint256 scannerPoolId, uint256 chainId)
```

### ScannerPoolNotRegistered

```solidity
error ScannerPoolNotRegistered(uint256 scannerPoolId)
```

### ScannerExists

```solidity
error ScannerExists(address scanner)
```

### ScannerNotRegistered

```solidity
error ScannerNotRegistered(address scanner)
```

### PublicRegistrationDisabled

```solidity
error PublicRegistrationDisabled(uint256 chainId)
```

### RegisteringTooLate

```solidity
error RegisteringTooLate()
```

### SignatureDoesNotMatch

```solidity
error SignatureDoesNotMatch()
```

### CannotSetScannerActivation

```solidity
error CannotSetScannerActivation()
```

### SenderNotScannerPool

```solidity
error SenderNotScannerPool(address sender, uint256 scannerPoolId)
```

### ChainIdMismatch

```solidity
error ChainIdMismatch(uint256 expected, uint256 provided)
```

### ActionShutsDownPool

```solidity
error ActionShutsDownPool()
```

### ScannerPreviouslyEnabled

```solidity
error ScannerPreviouslyEnabled(address scanner)
```

### ScannerPreviouslyDisabled

```solidity
error ScannerPreviouslyDisabled(address scanner)
```

### constructor

```solidity
constructor(address __stakeAllocator) internal
```

### __ScannerPoolRegistryCore_init

```solidity
function __ScannerPoolRegistryCore_init(string __name, string __symbol, address __stakeSubjectGateway, uint256 __registrationDelay) internal
```

Initializer method

| Name | Type | Description |
| ---- | ---- | ----------- |
| __name | string | ERC721 token name. |
| __symbol | string | ERC721 token symbol. |
| __stakeSubjectGateway | address | address of StakeSubjectGateway |
| __registrationDelay | uint256 | amount of time allowed from scanner signing a ScannerNodeRegistration and it's execution by ScannerPool |

### isRegistered

```solidity
function isRegistered(uint256 scannerPoolId) public view returns (bool)
```

Checks if scannerPoolId has been registered (minted).

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if scannerPoolId exists, false otherwise. |

### registerScannerPool

```solidity
function registerScannerPool(uint256 chainId) external returns (uint256 scannerPoolId)
```

mints a ScannerPoolRegistry ERC721 NFT to sender
Transferring ownership of a ScannerPoolRegistry NFT will transfer ownership of all its registered
Scanner Node addresses

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | (autoincremented uint) |

### monitoredChainId

```solidity
function monitoredChainId(uint256 scannerPoolId) public view returns (uint256)
```

### isScannerRegistered

```solidity
function isScannerRegistered(address scanner) public view returns (bool)
```

Checks if scanner address has been registered

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanner | address | address. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if scanner is registered, false otherwise. |

### isScannerRegisteredTo

```solidity
function isScannerRegisteredTo(address scanner, uint256 scannerPoolId) public view returns (bool)
```

Checks if scanner address has been registered to a specific scannerPoolId

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanner | address | address. |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if scanner is registered to scannerPoolId, false otherwise. |

### registerScannerNode

```solidity
function registerScannerNode(struct ScannerPoolRegistryCore.ScannerNodeRegistration req, bytes signature) external
```

Method to register a Scanner Node and associate it with a scannerPoolId. Before executing this method,
make sure to have enough FORT staked by the owner of the Scanner Pool to be allocated to the new scanner,
then register a scanner with Forta Scan Node CLI and obtain the parameters for this methods by executing forta auth.
Follow the instructions here https://docs.forta.network/en/latest/scanner-quickstart/
This method will try to allocate stake from unallocated stake if necessary.
Individual ownership of a scaner node is not transferrable.
A scanner node can be disabled, but not unregistered

| Name | Type | Description |
| ---- | ---- | ----------- |
| req | struct ScannerPoolRegistryCore.ScannerNodeRegistration | ScannerNodeRegistration struct with the Scanner Node data. |
| signature | bytes | ERC712 signature, result from signed req by the scanner. |

### updateScannerMetadata

```solidity
function updateScannerMetadata(address scanner, string metadata) external
```

Method to update a registered Scanner Node metadata string. Only the ScannerPool that owns the scanner can update.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanner | address | address. |
| metadata | string | IPFS string pointing to Scanner Node metadata. |

### totalScannersRegistered

```solidity
function totalScannersRegistered(uint256 scannerPoolId) public view returns (uint256)
```

gets the amount of Scanner Nodes ever registered to a ScannerPool Id.
Useful for external iteration.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool. |

### registeredScannerAtIndex

```solidity
function registeredScannerAtIndex(uint256 scannerPoolId, uint256 index) external view returns (struct ScannerPoolRegistryCore.ScannerNode)
```

gets the Scanner Node address at index registered to scannerPoolId
Useful for external iteration.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool. |
| index | uint256 | of the registered Scanner Node. Must be lower than totalScannersRegistered(scannerPoolId) |

### registeredScannerAddressAtIndex

```solidity
function registeredScannerAddressAtIndex(uint256 scannerPoolId, uint256 index) external view returns (address)
```

gets the Scanner Node data struct at index registered to scannerPoolId
Useful for external iteration.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool. |
| index | uint256 | of the registered Scanner Node. Must be lower than totalScannersRegistered(scannerPoolId) |

### scannerAddressToId

```solidity
function scannerAddressToId(address scanner) public pure returns (uint256)
```

Converts scanner address to uint256 for FortaStaking Token Id.

### scannerIdToAddress

```solidity
function scannerIdToAddress(uint256 scannerId) public pure returns (address)
```

Converts FortaStaking uint256 id to address.

### isScannerDisabled

```solidity
function isScannerDisabled(address scanner) public view returns (bool)
```

Gets if the disabled flag has been set for a Scanner Node Address

### isScannerOperational

```solidity
function isScannerOperational(address scanner) public view returns (bool)
```

Checks if the Scanner Node is considered operational by the Forta Network, and is thus eligible for bot (Agent) assignment.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanner | address | address |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if: - Scanner Node is registered AND - Scanner Node's disabled flag is not set (is false) AND - (Scanner Node has more than minimum stake allocated to it OR staking is not activated for the Scanner Node's chain) |

### willNewScannerShutdownPool

```solidity
function willNewScannerShutdownPool(uint256 scannerPoolId) public view returns (bool)
```

returns true if one more enabled scanner (or one registration) would put ALL scanners under min threshold, (not operational)

### enableScanner

```solidity
function enableScanner(address scanner) public
```

Sets Scanner Node disabled flag to false.
It's not possible to re-enable a Scanner Node if allocatedStake / enabled scanners < min.
If there is enough unallocated stake, this method will allocate it. If not, it will revert.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanner | address | address |

### disableScanner

```solidity
function disableScanner(address scanner) public
```

Sets Scanner Node disabled flag to true. This will result in the scanner unlinking from assigned bots (process happens off-chain
in Assigner software) and not being able to be linked to any bot until re-enabled.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanner | address | address |

### updateEnabledScanners

```solidity
function updateEnabledScanners(uint256 scannerPoolId, uint256 count) external
```

Updates enabled scanner count of a pool

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerPoolId | uint256 | ERC721 token id of the ScannerPool |
| count | uint256 |  |

### getScanner

```solidity
function getScanner(address scanner) public view returns (struct ScannerPoolRegistryCore.ScannerNode)
```

Gets ScannerNode struct for address

### getScannerState

```solidity
function getScannerState(address scanner) external view returns (bool registered, address owner, uint256 chainId, string metadata, bool operational, bool disabled)
```

Gets ScannerNode data for address

### setManagedStakeThreshold

```solidity
function setManagedStakeThreshold(struct IStakeSubject.StakeThreshold newStakeThreshold, uint256 chainId) external
```

Sets stake parameters (min, max, activated) for scanners. Restricted to SCANNER_POOL_ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| newStakeThreshold | struct IStakeSubject.StakeThreshold | struct with stake parameters. |
| chainId | uint256 | scanned chain the thresholds applies to. |

### getManagedStakeThreshold

```solidity
function getManagedStakeThreshold(uint256 managedId) public view returns (struct IStakeSubject.StakeThreshold)
```

Getter for StakeThreshold for the scanner with id `subject`

### getTotalManagedSubjects

```solidity
function getTotalManagedSubjects(uint256 subject) public view virtual returns (uint256)
```

Total scanners registered to a ScannerPool

### setRegistrationDelay

```solidity
function setRegistrationDelay(uint256 delay) external
```

Sets maximum delay between execution of forta auth in Scan Node CLI and execution of registerScanner() in this contract

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
uint256[38] __gap
```