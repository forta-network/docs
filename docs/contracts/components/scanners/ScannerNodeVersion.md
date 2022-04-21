


Contract that will trigger software autoupdate of the Scanner Node software.
Forta Governance, through SCANNER_VERSION_ROLE, will propose and approve updates and
the nodes will listen to the resulting event, downloading the new version from IPFS

### scannerNodeVersion

```solidity
string scannerNodeVersion
```

Version of the scanner image software the network expects (IPFS hash)
Starts empty

### version

```solidity
string version
```

### ScannerNodeVersionUpdated

```solidity
event ScannerNodeVersionUpdated(string newVersion, string oldVersion)
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
function setScannerNodeVersion(string version) public
```

Signal to the Scanner Nodes that they have to update their binaries downloading the new
version from IPFS, by emitting ScannerNodeVersionUpdated(newVersion, oldVersion).

_restricted to SCANNER_VERSION_ROLE (governance)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| version | string | IPFS pointer to the new image. |

### __gap

```solidity
uint256[49] __gap
```

