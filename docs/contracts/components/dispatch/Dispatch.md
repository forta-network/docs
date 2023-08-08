## Dispatch

### Disabled

```solidity
error Disabled(string name)
```

### InvalidId

```solidity
error InvalidId(string name, uint256 id)
```

### SetAgentRegistry

```solidity
event SetAgentRegistry(address registry)
```

### SetScannerRegistry

```solidity
event SetScannerRegistry(address registry)
```

### SetScannerPoolRegistry

```solidity
event SetScannerPoolRegistry(address registry)
```

### AlreadyLinked

```solidity
event AlreadyLinked(uint256 agentId, uint256 scannerId, bool enable)
```

### Link

```solidity
event Link(uint256 agentId, uint256 scannerId, bool enable)
```

### constructor

```solidity
constructor(address forwarder) public
```

### initialize

```solidity
function initialize(address __manager, address __agents, address __scanners, address __scannerPools) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |
| __agents | address | address of AgentRegistry. |
| __scanners | address | address of ScannerRegistry. |
| __scannerPools | address | address of ScannerPoolRegistry. |

### agentRegistry

```solidity
function agentRegistry() public view returns (contract AgentRegistry)
```

### scannerRegistry

```solidity
function scannerRegistry() public view returns (contract ScannerRegistry)
```

### scannerPoolRegistry

```solidity
function scannerPoolRegistry() public view returns (contract ScannerPoolRegistry)
```

### numAgentsFor

```solidity
function numAgentsFor(uint256 scannerId) public view returns (uint256)
```

Get total agents linked to a scanner.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | address of the scanner converted to uint256 |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total agents linked to a scanner |

### numScannersFor

```solidity
function numScannersFor(uint256 agentId) public view returns (uint256)
```

Get total scanners where an agent is running in.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total scanners running an scanner |

### agentAt

```solidity
function agentAt(uint256 scannerId, uint256 pos) public view returns (uint256)
```

Get agentId linked to a scanner in certain position.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | address of the scanner converted to uint256 |
| pos | uint256 | index for iteration. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC721 token id of the agent. |

### agentRefAt

```solidity
function agentRefAt(uint256 scannerId, uint256 pos) external view returns (bool registered, address owner, uint256 agentId, uint256 agentVersion, string metadata, uint256[] chainIds, bool enabled, uint256 disabledFlags)
```

Get data of an agent linked to a scanner at a certain position.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | address of the scanner converted to uint256 |
| pos | uint256 | index for iteration. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | bool | bool if agent exists, false otherwise. |
| owner | address | address. |
| agentId | uint256 | ERC721 token id of the agent. |
| agentVersion | uint256 | agent version number. |
| metadata | string | IPFS pointer for agent metadata. |
| chainIds | uint256[] | ordered array of chainId were the agent wants to run. |
| enabled | bool | bool if agent is enabled, false otherwise. |
| disabledFlags | uint256 | 0 if not disabled, Permission that disabled the scnner otherwise. |

### scannerAt

```solidity
function scannerAt(uint256 agentId, uint256 pos) public view returns (uint256)
```

Get scannerId running an agent at a certain position.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the scanner. |
| pos | uint256 | index for iteration. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC721 token id of the scanner. |

### scannerRefAt

```solidity
function scannerRefAt(uint256 agentId, uint256 pos) external view returns (bool registered, uint256 scannerId, address owner, uint256 chainId, string metadata, bool operational, bool disabled)
```

Get data of ascanner running an agent at a certain position.

_helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| pos | uint256 | index for iteration. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | bool | true if scanner is registered. |
| scannerId | uint256 | ERC721 token id of the scanner. |
| owner | address | address. |
| chainId | uint256 | that the scanner monitors. |
| metadata | string | IPFS pointer for agent metadata. |
| operational | bool | true if scanner is not disabled and staked over min, false otherwise. |
| disabled | bool | true if disabled by ScannerPool or scanner itself. |

### areTheyLinked

```solidity
function areTheyLinked(uint256 agentId, uint256 scannerId) external view returns (bool)
```

Returns true if scanner and agents are linked, false otherwise.

### link

```solidity
function link(uint256 agentId, uint256 scannerId) public
```

Assigns the job of running an agent to a scanner.

_currently only allowed for DISPATCHER_ROLE (Assigner software).
emits Link(agentId, scannerId, true) event._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| scannerId | uint256 | address of the scanner converted to uint256 |

### unlink

```solidity
function unlink(uint256 agentId, uint256 scannerId) public
```

Unassigns the job of running an agent to a scanner.

_currently only allowed for DISPATCHER_ROLE (Assigner software).
emits Link(agentId, scannerId, false) event._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| scannerId | uint256 | address of the scanner converted to uint256 |

### setAgentRegistry

```solidity
function setAgentRegistry(address newAgentRegistry) public
```

Sets agent registry address.

_only DEFAULT_ADMIN_ROLE (governance)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAgentRegistry | address | agent of the new AgentRegistry. |

### _setAgentRegistry

```solidity
function _setAgentRegistry(address newAgentRegistry) private
```

### setScannerRegistry

```solidity
function setScannerRegistry(address newScannerRegistry) public
```

Sets scanner registry address.

_only DEFAULT_ADMIN_ROLE (governance)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| newScannerRegistry | address | agent of the new ScannerRegistry. |

### setScannerPoolRegistry

```solidity
function setScannerPoolRegistry(address newScannerPoolRegistry) external
```

Sets ScannerPool registry address.

_only DEFAULT_ADMIN_ROLE (governance)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| newScannerPoolRegistry | address | agent of the new ScannerRegistry. |

### agentHash

```solidity
function agentHash(uint256 agentId) external view returns (uint256 length, bytes32 manifest)
```

Method to hash the amount of scanners an agent is running in, and their status

_method marked for deprecation in next version._

### scannerHash

```solidity
function scannerHash(uint256 scannerId) external view returns (uint256 length, bytes32 manifest)
```

_method used by Scanner Node software to know if their list of assigned agents has changed,
their enabled state or version has changed so they can start managing changes
(loading new agent images, removing not assigned agents, updating agents...)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| scannerId | uint256 | address of the scanner converted to uint256 |

| Name | Type | Description |
| ---- | ---- | ----------- |
| length | uint256 | amount of agents. |
| manifest | bytes32 | keccak256 of list of agents, list of agentVersion and list of enabled states. |

### __gap

```solidity
uint256[47] __gap
```

