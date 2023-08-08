## AgentRegistry

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