# Smart Contracts - Introduction

The pages that follow in this section provide detailed documentation for the individual smart contracts that make up Forta. The repo for them can be found [here](https://github.com/forta-network/forta-contracts).

## Smart Contracts

### AccessManager

**version**

```solidity
string version
```

**constructor**

```solidity
constructor(address forwarder) public
```

**initialize**

```solidity
function initialize(address __admin) external
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __admin | address | address to be the DEFAULT_ADMIN_ROLE. |

**setNewRole**

```solidity
function setNewRole(bytes32 role, bytes32 admin) external
```

Method for DEFAULT_ADMIN_ROLE to create new roles, and define their role admin.

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | id of the new role. Should be keccak256("<ROLE_NAME>"). |
| admin | bytes32 | role id that will be the role admin for the new role. |

**_authorizeUpgrade**

```solidity
function _authorizeUpgrade(address newImplementation) internal virtual
```

Access control for the upgrade process (UPGRADER_ROLE)

| Name | Type | Description |
| ---- | ---- | ----------- |
| newImplementation | address | address of the new deployed implementation. |

**setName**

```solidity
function setName(address ensRegistry, string ensName) public
```

Allow ENS_MANAGER_ROLE to set ENS reverse registration

| Name | Type | Description |
| ---- | ---- | ----------- |
| ensRegistry | address | address |
| ensName | string | the name to set in th registry |

**_msgSender**

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Helper to get either msg msg.sender if not a meta transaction, signer of forwarder metatx if it is.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
the signer address is encoded in the last 20 bytes of msg.data._

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | address of sender of the transaction of signer if meta transaction. |

**_msgData**

```solidity
function _msgData() internal view virtual returns (bytes)
```

Helper to get msg.data if not a meta transaction, forwarder data in metatx if it is.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
msg.data must have the signer address (encoded in the last 20 bytes of msg.data) removed._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | msg.data of the transaction of msg.data - signer address if meta transaction. |

**__gap**

```solidity
uint256[50] __gap
```



## AgentRegistry

### AgentRegistry

**version**

```solidity
string version
```

**constructor**

```solidity
constructor(address forwarder) public
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

### getAgentState

```solidity
function getAgentState(uint256 agentId) public view returns (bool registered, address owner, uint256 agentVersion, string metadata, uint256[] chainIds, bool enabled, uint256 disabledFlags)
```

Gets all Agent state.

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | bool | if agent exists. |
| owner | address | address. |
| agentVersion | uint256 | of the agent. |
| metadata | string | IPFS pointer. |
| chainIds | uint256[] | the agent wants to run in. |
| enabled | bool | true if staked over min and not disabled. |
| disabledFlags | uint256 | 0 if not disabled, Permission that disabled the scnner otherwise. |

### _beforeAgentUpdate

```solidity
function _beforeAgentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

Inheritance disambiguation for hook fired befire agent update (and creation).

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | id of the agent. |
| newMetadata | string | IPFS pointer to agent's metadata |
| newChainIds | uint256[] | chain ids that the agent wants to scan |

### _agentUpdate

```solidity
function _agentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

Obligatory inheritance disambiguation for hook fired for agent update (and creation).

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | id of the agent. |
| newMetadata | string | IPFS pointer to agent's metadata |
| newChainIds | uint256[] | chain ids that the agent wants to scan |

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

## AgentRegistryEnumerable

### _allAgents

```solidity
struct EnumerableSet.UintSet _allAgents
```

### _chainAgents

```solidity
mapping(uint256 => struct EnumerableSet.UintSet) _chainAgents
```

### getAgentCount

```solidity
function getAgentCount() public view returns (uint256)
```

Agent count.

_Helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total amount of registered agents. |

### getAgentByIndex

```solidity
function getAgentByIndex(uint256 index) public view returns (uint256)
```

Agent id at index in _allAgents array.

_Helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | of agent in _allAgents array. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | agentId at index. |

### getAgentCountByChain

```solidity
function getAgentCountByChain(uint256 chainId) public view returns (uint256)
```

Registered agent count by chainId.

_Helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | agent total registered by chainId. |

### getAgentByChainAndIndex

```solidity
function getAgentByChainAndIndex(uint256 chainId, uint256 index) public view returns (uint256)
```

Agent id at index, by chainId

_Helper for external iteration._

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainId | uint256 | where the agent was registered. |
| index | uint256 | of agent in _chainAgents[chainId] array. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | agentId at index for that chainId. |

### _beforeAgentUpdate

```solidity
function _beforeAgentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

hook fired before agent creation or update.

_stores agent in _allAgents if it wasn't there, manages agent arrays by chain._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent's metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### __gap

```solidity
uint256[48] __gap
```

## AgentRegistryMetadata

### AgentMetadata

```solidity
struct AgentMetadata {
  uint256 version;
  string metadata;
  uint256[] chainIds;
}
```

### _agentMetadata

```solidity
mapping(uint256 => struct AgentRegistryMetadata.AgentMetadata) _agentMetadata
```

### _agentMetadataUniqueness

```solidity
mapping(bytes32 => bool) _agentMetadataUniqueness
```

### MetadataNotUnique

```solidity
error MetadataNotUnique(bytes32 hash)
```

### getAgent

```solidity
function getAgent(uint256 agentId) public view returns (bool registered, address owner, uint256 agentVersion, string metadata, uint256[] chainIds)
```

Gets agent metadata, version and chain Ids.

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | bool | if agent exists. |
| owner | address | address. |
| agentVersion | uint256 | of the agent. |
| metadata | string | IPFS pointer. |
| chainIds | uint256[] | the agent wants to run in. |

### _agentUpdate

```solidity
function _agentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

logic for agent update.

_checks metadata uniqueness and updates agent metadata and version._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent's metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### __gap

```solidity
uint256[48] __gap
```

## AgentRegistryEnable

_AgentRegistry methods and state handling disabling and enabling agents, and
recognizing stake changes that might disable an agent.
NOTE: This contract was deployed before StakeAwareUpgradeable was created, so __StakeAwareUpgradeable_init
is not called._

### Permission

```solidity
enum Permission {
  ADMIN,
  OWNER,
  length
}
```

### _disabled

```solidity
mapping(uint256 => struct BitMaps.BitMap) _disabled
```

### AgentEnabled

```solidity
event AgentEnabled(uint256 agentId, bool enabled, enum AgentRegistryEnable.Permission permission, bool value)
```

### isEnabled

```solidity
function isEnabled(uint256 agentId) public view virtual returns (bool)
```

Check if agent is enabled

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if the agent exist, has not been disabled, and is staked over minimum Returns false if otherwise |

### enableAgent

```solidity
function enableAgent(uint256 agentId, enum AgentRegistryEnable.Permission permission) public virtual
```

Enable an agent if sender has correct permission and the agent is staked over minimum stake.

_agents can be disabled by ADMIN or OWNER._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |

### disableAgent

```solidity
function disableAgent(uint256 agentId, enum AgentRegistryEnable.Permission permission) public virtual
```

Disable an agent if sender has correct permission.

_agents can be disabled by ADMIN or OWNER._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |

### getDisableFlags

```solidity
function getDisableFlags(uint256 agentId) public view returns (uint256)
```

Get the disabled flags for an agentId.

_Permission (uint8) is used for indexing, so we don't need to loop. 
If not disabled, all flags will be 0._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 containing the byte flags. |

### _hasPermission

```solidity
function _hasPermission(uint256 agentId, enum AgentRegistryEnable.Permission permission) internal view returns (bool)
```

Permission check.

_it does not uses AccessManager since it is agent specific_

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if: permission.ADMIN and _msgSender is ADMIN_ROLE, Permission.OWNER and owner of agentId, false otherwise. |

### _enable

```solidity
function _enable(uint256 agentId, enum AgentRegistryEnable.Permission permission, bool enable) internal
```

Internal methods for enabling the agent.

_fires hook _before and _after enable within the inheritance tree._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |
| enable | bool | true if enabling, false if disabling. |

### _beforeAgentEnable

```solidity
function _beforeAgentEnable(uint256 agentId, enum AgentRegistryEnable.Permission permission, bool value) internal virtual
```

Hook _before agent enable

_does nothing in this contract_

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |
| value | bool | true if enabling, false if disabling. |

### _agentEnable

```solidity
function _agentEnable(uint256 agentId, enum AgentRegistryEnable.Permission permission, bool value) internal virtual
```

Logic for enabling agents, sets flag corresponding to permission.

_does nothing in this contract_

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |
| value | bool | true if enabling, false if disabling. |

### _afterAgentEnable

```solidity
function _afterAgentEnable(uint256 agentId, enum AgentRegistryEnable.Permission permission, bool value) internal virtual
```

Hook _after agent enable

_emits Router hook_

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |
| value | bool | true if enabling, false if disabling. |

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

## AgentRegistryCore

### _stakeThreshold

```solidity
struct IStakeSubject.StakeThreshold _stakeThreshold
```

### frontRunningDelay

```solidity
uint256 frontRunningDelay
```

### AgentCommitted

```solidity
event AgentCommitted(bytes32 commit)
```

### AgentUpdated

```solidity
event AgentUpdated(uint256 agentId, address by, string metadata, uint256[] chainIds)
```

### StakeThresholdChanged

```solidity
event StakeThresholdChanged(uint256 min, uint256 max, bool activated)
```

### FrontRunningDelaySet

```solidity
event FrontRunningDelaySet(uint256 delay)
```

### onlyOwnerOf

```solidity
modifier onlyOwnerOf(uint256 agentId)
```

Checks sender (or metatx signer) is owner of the agent token.

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |

### onlySorted

```solidity
modifier onlySorted(uint256[] array)
```

Checks if array of uint256 is sorted from lower (index 0) to higher (array.length -1)

| Name | Type | Description |
| ---- | ---- | ----------- |
| array | uint256[] | to check |

### prepareAgent

```solidity
function prepareAgent(bytes32 commit) public
```

Save commit representing an agent to prevent frontrunning of their creation

| Name | Type | Description |
| ---- | ---- | ----------- |
| commit | bytes32 | keccak256 hash of the agent creation's parameters |

### registerAgent

```solidity
function registerAgent(uint256 agentId, string metadata, uint256[] chainIds) public
```

Agent registration method. Mints an ERC721 token with the agent id for the sender and stores metadata.

_Agent Ids are generated through the Forta Bot SDK (by hashing UUIDs) so the agentId collision risk is minimized.
Fires _before and _after hooks within the inheritance tree.
If front run protection is enabled (disabled by default), it will check if the keccak256 hash of the parameters
has been committed in prepareAgent(bytes32)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent to be created. |
| metadata | string | IPFS pointer to agent's metadata JSON. |
| chainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### createAgent

```solidity
function createAgent(uint256 agentId, address, string metadata, uint256[] chainIds) external
```

_Create agent method with old signature for backwards compatibility. Owner parameter is ignore in favour of sender.
This method is deprecated and it will be removed in future versions of AgentRegistryCore_

### isRegistered

```solidity
function isRegistered(uint256 agentId) public view returns (bool)
```

Checks if the agentId has been minted.

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if agentId exists, false otherwise. |

### updateAgent

```solidity
function updateAgent(uint256 agentId, string metadata, uint256[] chainIds) public
```

Updates parameters of an agentId (metadata, image, chain IDs...) if called by the agent owner.

_fires _before and _after hooks within the inheritance tree._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent to be updated. |
| metadata | string | IPFS pointer to agent's metadata JSON. |
| chainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### setStakeThreshold

```solidity
function setStakeThreshold(struct IStakeSubject.StakeThreshold newStakeThreshold) external
```

_StakeThreshold setter, common to all Agents. Restricted to AGENT_ADMIN_ROLE, emits StakeThresholdChanged_

### getStakeThreshold

```solidity
function getStakeThreshold(uint256) public view returns (struct IStakeSubject.StakeThreshold)
```

_stake threshold common for all agents_

### _isStakeActivated

```solidity
function _isStakeActivated() internal view returns (bool)
```

### _isStakedOverMin

```solidity
function _isStakedOverMin(uint256 subject) internal view returns (bool)
```

Checks if agent is staked over minimum stake

| Name | Type | Description |
| ---- | ---- | ----------- |
| subject | uint256 | agentId |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if agent is staked over the minimum threshold and is, or staking is not enabled (stakeController = 0 or activated = false ). false otherwise |

### setFrontRunningDelay

```solidity
function setFrontRunningDelay(uint256 delay) external
```

_allows AGENT_ADMIN_ROLE to activate frontrunning protection for agents_

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay | uint256 | in seconds |

### _beforeAgentUpdate

```solidity
function _beforeAgentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

hook fired before agent creation or update.

_does nothing in this contract._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent's metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### _agentUpdate

```solidity
function _agentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

logic for agent update.

_emits AgentUpdated, will be extended by child contracts._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent's metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### _afterAgentUpdate

```solidity
function _afterAgentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

hook fired after agent creation or update.

_emits Router hook._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC721 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent's metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

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

### ownerOf

```solidity
function ownerOf(uint256 subject) public view virtual returns (address)
```

### __gap

```solidity
uint256[41] __gap
```



### Dispatch

**Disabled**

```solidity
error Disabled(string name)
```

**InvalidId**

```solidity
error InvalidId(string name, uint256 id)
```

**SetAgentRegistry**

```solidity
event SetAgentRegistry(address registry)
```

**SetScannerRegistry**

```solidity
event SetScannerRegistry(address registry)
```

**SetScannerPoolRegistry**

```solidity
event SetScannerPoolRegistry(address registry)
```

**AlreadyLinked**

```solidity
event AlreadyLinked(uint256 agentId, uint256 scannerId, bool enable)
```

**Link**

```solidity
event Link(uint256 agentId, uint256 scannerId, bool enable)
```

**constructor**

```solidity
constructor(address forwarder) public
```

**initialize**

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

**agentRegistry**

```solidity
function agentRegistry() public view returns (contract AgentRegistry)
```

**scannerRegistry**

```solidity
function scannerRegistry() public view returns (contract ScannerRegistry)
```

**scannerPoolRegistry**

```solidity
function scannerPoolRegistry() public view returns (contract ScannerPoolRegistry)
```

**numAgentsFor**

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

**numScannersFor**

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

**agentAt**

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

**agentRefAt**

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

**scannerAt**

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

**scannerRefAt**

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

**areTheyLinked**

```solidity
function areTheyLinked(uint256 agentId, uint256 scannerId) external view returns (bool)
```

Returns true if scanner and agents are linked, false otherwise.

**link**

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

**unlink**

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

**setAgentRegistry**

```solidity
function setAgentRegistry(address newAgentRegistry) public
```

Sets agent registry address.

_only DEFAULT_ADMIN_ROLE (governance)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAgentRegistry | address | agent of the new AgentRegistry. |

**_setAgentRegistry**

```solidity
function _setAgentRegistry(address newAgentRegistry) private
```

**setScannerRegistry**

```solidity
function setScannerRegistry(address newScannerRegistry) public
```

Sets scanner registry address.

_only DEFAULT_ADMIN_ROLE (governance)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| newScannerRegistry | address | agent of the new ScannerRegistry. |

**setScannerPoolRegistry**

```solidity
function setScannerPoolRegistry(address newScannerPoolRegistry) external
```

Sets ScannerPool registry address.

_only DEFAULT_ADMIN_ROLE (governance)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| newScannerPoolRegistry | address | agent of the new ScannerRegistry. |

**agentHash**

```solidity
function agentHash(uint256 agentId) external view returns (uint256 length, bytes32 manifest)
```

Method to hash the amount of scanners an agent is running in, and their status

_method marked for deprecation in next version._

**scannerHash**

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

**__gap**

```solidity
uint256[47] __gap
```

### Meta-transaction

#### Forwarder

**ForwardRequest**

```solidity
struct ForwardRequest {
  address from;
  address to;
  uint256 value;
  uint256 gas;
  uint256 nonce;
  uint256 deadline;
  bytes data;
}
```

**_FORWARDREQUEST_TYPEHASH**

```solidity
bytes32 _FORWARDREQUEST_TYPEHASH
```

**DeadlineExpired**

```solidity
error DeadlineExpired()
```

**SignatureDoesNotMatch**

```solidity
error SignatureDoesNotMatch()
```

**constructor**

```solidity
constructor() public
```

**execute**

```solidity
function execute(struct Forwarder.ForwardRequest req, bytes signature) external payable returns (bool, bytes)
```

Executes a ForwardRequest (meta-tx) if signature is verified, deadline is met and nonce is valid

_This implementations allows for out of order execution, by allowing several "timelines" per nonce
by splitting the uint256 type space into 128 bit subspaces where each subspace is interpreted as maintaining
an ordered timeline. The intent of the design is to allow multiple nonces to be valid at any given time.
For a detailed explanation: https://github.com/amxx/permit#out-of-order-execution
For an example on how to leverage this functionality, see tests/forwarder/forwarder.test.js
Will emit NonceUsed(user, timeline, nonce) for better reporting / UX 
WARNING: failed transactions do not consume a nonce, unlinke regular ethereum transactions. Please make use
of the deadline functionality, and if you want to cancel a request, submit a successful transaction with the same
nonce._

| Name | Type | Description |
| ---- | ---- | ----------- |
| req | struct Forwarder.ForwardRequest | ForwardRequest to be executed |
| signature | bytes | EIP-712 signature of the ForwardRequest |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | (success, returnData) of the executed request |
| [1] | bytes |  |

#### EIP712WithNonce

**NonceUsed**

```solidity
event NonceUsed(address user, uint256 timeline, uint256 nonce)
```

**InvalidNonce**

```solidity
error InvalidNonce(uint256 nonce)
```

**_nonces**

```solidity
mapping(address => mapping(uint256 => uint256)) _nonces
```

**DOMAIN_SEPARATOR**

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32)
```

Domain Separator as defined in EIP712

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | keccak256(typeHash, nameHash, versionHash, block.chainid, address(this)) |

**getNonce**

```solidity
function getNonce(address from) public view virtual returns (uint256)
```

Gets nonce for the from address in the "default" timeline

_For a detailed explanation: https://github.com/amxx/permit#out-of-order-execution_

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | address |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nonce |

**getNonce**

```solidity
function getNonce(address from, uint256 timeline) public view virtual returns (uint256)
```

Gets nonce for the from address in the specified timeline

_For a detailed explanation: https://github.com/amxx/permit#out-of-order-execution_

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | address |
| timeline | uint256 | where the nonce lives |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nonce |

**_verifyAndConsumeNonce**

```solidity
function _verifyAndConsumeNonce(address user, uint256 fullNonce) internal virtual
```

Extract timeline from nonce, iterates it to consume it, checks for replay protection.

_emits NonceUsed(user, timeline, nonce).
WARNING: Failed transactions would not consume a nonce, since the reverted transaction won't be able to save in storage._

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | address sending the nonce. |
| fullNonce | uint256 | nonce and timeline info in uint256 space |





### BaseComponentUpgradeable

_The Forta platform is composed of "component" smart contracts that are upgradeable, share a common access
control scheme and can send use routed hooks to signal one another. They also support the multicall pattern.

This contract contains the base of Forta components. Contracts that inherit this component must call
- __BaseComponentUpgradeable_init(address manager)
in their initialization process._

**__BaseComponentUpgradeable_init**

```solidity
function __BaseComponentUpgradeable_init(address __manager) internal
```

**_authorizeUpgrade**

```solidity
function _authorizeUpgrade(address newImplementation) internal virtual
```

_Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
{upgradeTo} and {upgradeToAndCall}.

Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.

```solidity
function _authorizeUpgrade(address) internal override onlyOwner {}
```

**setName**

```solidity
function setName(address ensRegistry, string ensName) public
```

**_msgSender**

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Helper to get either msg msg.sender if not a meta transaction, signer of forwarder metatx if it is.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
the signer address is encoded in the last 20 bytes of msg.data._

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | address of sender of the transaction of signer if meta transaction. |

**_msgData**

```solidity
function _msgData() internal view virtual returns (bytes)
```

Helper to get msg.data if not a meta transaction, forwarder data in metatx if it is.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
msg.data must have the signer address (encoded in the last 20 bytes of msg.data) removed._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | msg.data of the transaction of msg.data - signer address if meta transaction. |

**__gap**

```solidity
uint256[50] __gap
```



## DEFAULT_ADMIN_ROLE

```solidity
bytes32 DEFAULT_ADMIN_ROLE
```

**ROUTER_ADMIN_ROLE**

```solidity
bytes32 ROUTER_ADMIN_ROLE
```

**ENS_MANAGER_ROLE**

```solidity
bytes32 ENS_MANAGER_ROLE
```

**UPGRADER_ROLE**

```solidity
bytes32 UPGRADER_ROLE
```

**AGENT_ADMIN_ROLE**

```solidity
bytes32 AGENT_ADMIN_ROLE
```

**SCANNER_ADMIN_ROLE**

```solidity
bytes32 SCANNER_ADMIN_ROLE
```

**SCANNER_POOL_ADMIN_ROLE**

```solidity
bytes32 SCANNER_POOL_ADMIN_ROLE
```

**SCANNER_2_SCANNER_POOL_MIGRATOR_ROLE**

```solidity
bytes32 SCANNER_2_SCANNER_POOL_MIGRATOR_ROLE
```

**DISPATCHER_ROLE**

```solidity
bytes32 DISPATCHER_ROLE
```

**MIGRATION_EXECUTOR_ROLE**

```solidity
bytes32 MIGRATION_EXECUTOR_ROLE
```

**SLASHER_ROLE**

```solidity
bytes32 SLASHER_ROLE
```

**SWEEPER_ROLE**

```solidity
bytes32 SWEEPER_ROLE
```

**REWARDER_ROLE**

```solidity
bytes32 REWARDER_ROLE
```

**SLASHING_ARBITER_ROLE**

```solidity
bytes32 SLASHING_ARBITER_ROLE
```

**STAKING_CONTRACT_ROLE**

```solidity
bytes32 STAKING_CONTRACT_ROLE
```

**STAKING_ADMIN_ROLE**

```solidity
bytes32 STAKING_ADMIN_ROLE
```

**ALLOCATOR_CONTRACT_ROLE**

```solidity
bytes32 ALLOCATOR_CONTRACT_ROLE
```

**SCANNER_VERSION_ROLE**

```solidity
bytes32 SCANNER_VERSION_ROLE
```

**SCANNER_BETA_VERSION_ROLE**

```solidity
bytes32 SCANNER_BETA_VERSION_ROLE
```