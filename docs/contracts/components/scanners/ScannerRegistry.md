## ScannerRegistry

### DeregisteredScanner

```solidity
event DeregisteredScanner(uint256 scannerId)
```

### ConfiguredMigration

```solidity
event ConfiguredMigration(uint256 sunsettingTime, address scannerPoolRegistry)
```

### version

```solidity
string version
```

### constructor

```solidity
constructor(address forwarder) public
```

### CannotDeregister

```solidity
error CannotDeregister(uint256 scannerId)
```

### initialize

```solidity
function initialize(address __manager, string __name, string __symbol) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |
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

### hasMigrationEnded

```solidity
function hasMigrationEnded() public view returns (bool)
```

### deregisterScannerNode

```solidity
function deregisterScannerNode(uint256 scannerId) external
```

### setMigrationPrefrence

```solidity
function setMigrationPrefrence(uint256 scannerId, bool isOut) external
```

Declares preference for migration from ScanerRegistry to ScannerPoolRegistry. Default is yes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 id |
| isOut | bool | true if the scanner does not want to be migrated to the ScannerPoolRegistry (and deleted) |

### configureMigration

```solidity
function configureMigration(uint256 _sunsettingTime, address _scannerPoolRegistry) external
```

Configures migration params

| Name | Type | Description |
| ---- | ---- | ----------- |
| _sunsettingTime | uint256 | time after which the scanners won't be operational (isEnabled will return false) and will not get bot assignments or rewards. |
| _scannerPoolRegistry | address | new registry, for compatibility for off chain components during migration |

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
uint256[47] __gap
```

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

## ScannerRegistryManaged

### _managers

```solidity
mapping(uint256 => struct EnumerableSet.AddressSet) _managers
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
| scannerId | uint256 | ERC721 token id of the scanner. |

### isManager

```solidity
function isManager(uint256 scannerId, address manager) public view virtual returns (bool)
```

Checks if address is defined as a manager for a scanner.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |
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
| scannerId | uint256 | ERC721 token id of the scanner. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total managers defined for a scanner. |

### getManagerAt

```solidity
function getManagerAt(uint256 scannerId, uint256 index) public view virtual returns (address)
```

Gets manager address at certain position of the scanner's manager set.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | ERC721 token id of the scanner. |
| index | uint256 | position in the set. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the manager at index. |

### __gap

```solidity
uint256[49] __gap
```

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