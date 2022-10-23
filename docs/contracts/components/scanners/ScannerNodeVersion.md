## ScannerNodeVersion

Contract that will trigger software autoupdate of the Scanner Node software.
Forta Governance, through SCANNER_VERSION_ROLE, will propose and approve updates and
the nodes will listen to the resulting event, downloading the new version from IPFS.
A similar system is provided for pre release version.

### scannerNodeVersion

```solidity
string scannerNodeVersion
```

Version of the scanner image software the network expects (IPFS hash)
Starts empty

### scannerNodeBetaVersion

```solidity
string scannerNodeBetaVersion
```

Version of the scanner image software for pre release version (IPFS hash)
Starts empty

### version

```solidity
string version
```

Contract version

### ScannerNodeVersionUpdated

```solidity
event ScannerNodeVersionUpdated(string newVersion, string oldVersion)
```

### ScannerNodeBetaVersionUpdated

```solidity
event ScannerNodeBetaVersionUpdated(string newVersion, string oldVersion)
```

### SameScannerNodeVersion

```solidity
error SameScannerNodeVersion()
```

### constructor

```solidity
constructor(address forwarder) public
```

### initialize

```solidity
function initialize(address __manager, address __router) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |
| __router | address | address of Router. |

### setScannerNodeVersion

```solidity
function setScannerNodeVersion(string _version) public
```

Signal to the Scanner Nodes that they have to update their binaries downloading the new
version from IPFS, by emitting ScannerNodeVersionUpdated(newVersion, oldVersion).

_restricted to SCANNER_VERSION_ROLE._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _version | string | IPFS pointer to the new image. |

### setScannerNodeBetaVersion

```solidity
function setScannerNodeBetaVersion(string _version) public
```

Signal to the Scanner Nodes that there is a new beta release downloadable from from IPFS,
by emitting ScannerNodeVersionUpdated(newVersion, oldVersion).

_restricted to SCANNER_BETA_VERSION_ROLE._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _version | string | IPFS pointer to the new image. |

### __gap

```solidity
uint256[48] __gap
```

