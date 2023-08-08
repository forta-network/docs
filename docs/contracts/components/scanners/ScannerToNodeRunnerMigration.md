## ScannerToScannerPoolMigration

Migration of ScannerRegistry to ScannerPoolRegistry

### version

```solidity
string version
```

Contract version

### MigrationExecuted

```solidity
event MigrationExecuted(uint256 scannersMigrated, uint256 scannersIgnored, uint256 scannerPoolId, bool mintedScannerPool)
```

### NotOwnerOfScannerPool

```solidity
error NotOwnerOfScannerPool(address pretender, uint256 scannerPoolId)
```

### WrongScannerChainId

```solidity
error WrongScannerChainId(uint256 expected, uint256 provided, address scanner)
```

### WrongScannerPoolChainId

```solidity
error WrongScannerPoolChainId(uint256 expected, uint256 provided, uint256 scannerPoolId)
```

### ScannerPoolAlreadyMigrated

```solidity
error ScannerPoolAlreadyMigrated(uint256 scannerPoolId)
```

### constructor

```solidity
constructor(address _forwarder, address _scannerNodeRegistry, address _scannerPoolRegistry, address _stakeMigrator) public
```

### selfMigrate

```solidity
function selfMigrate(address[] scanners, uint256 scannerPoolId, uint256 chainId) external returns (uint256)
```

Method to self migrate from the old ScannerRegistry NFTs to a single ScannerPoolRegistry NFT, per chain.
WARNING: ScannerNodeRegistry's manager addresses will not be migrated, please user ScannerPoolRegistry's methods to set them again.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanners | address[] | array of scanner addresses to be migrated. All the scanners willing to migrate (optingOutOfMigration flags set to false) ScannerRegistry ERC721 identified by the uint256(address) in the input array will be: - Registered in ScannerPoolRegistry to the scannerPoolId either indicated or generated, with the same chainId and metadata. - Deleted in ScannerNodeRegistry. The ERC721 will be burned, disabled flags and managers deleted from storage. Scanners with optingOutOfMigration flags == true will be ignored (opted out), and will stay in ScannerNodeRegistry. At migration end, they will stop receiving work and rewards. |
| scannerPoolId | uint256 | If set as 0, a new ScannerPoolRegistry ERC721 will be minted to scannerPool, otherwise it must be set as a valid ScannerPoolRegistry ERC721 id owned by scannerPool. |
| chainId | uint256 |  |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ScannerPoolRegistry ERC721 id the scanners are migrated to. |

### migrate

```solidity
function migrate(address[] scanners, uint256 scannerPoolId, address scannerPool, uint256 chainId) external returns (uint256)
```

Method to migrate from the old ScannerRegistry NFTs to a single ScannerPoolRegistry NFT, executed by an address with the role
MIGRATION_EXECUTOR_ROLE.
WARNING: ScannerNodeRegistry's manager addresses will not be migrated, please user ScannerPoolRegistry's methods to set them again.

| Name | Type | Description |
| ---- | ---- | ----------- |
| scanners | address[] | array of scanner addresses to be migrated. All the scanners willing to migrate (optingOutOfMigration flags set to false) ScannerRegistry ERC721 identified by the uint256(address) in the input array will be: - Registered in ScannerPoolRegistry to the scannerPoolId either indicated or generated, with the same chainId and metadata. - Deleted in ScannerNodeRegistry. The ERC721 will be burned, disabled flags and managers deleted from storage. Scanners with with optingOutOfMigration flags == true will be ignored (opted out), and will stay in ScannerNodeRegistry. |
| scannerPoolId | uint256 | If set as 0, a new ScannerPoolRegistry ERC721 will be minted to scannerPool, otherwise it must be set as a valid ScannerPoolRegistry ERC721 id owned by scannerPool. |
| scannerPool | address | address that owns the scanners and will own the ScannerPoolRegistry ERC721 |
| chainId | uint256 |  |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ScannerPoolRegistry ERC721 id the scanners are migrated to. |

### __gap

```solidity
uint256[49] __gap
```