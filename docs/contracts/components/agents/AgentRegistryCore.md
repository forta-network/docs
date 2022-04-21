

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
| agentId | uint256 | ERC1155 token id of the agent. |

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
| commit | bytes32 | keccak256 hash of the agent creation&#x27;s parameters |

### createAgent

```solidity
function createAgent(uint256 agentId, address owner, string metadata, uint256[] chainIds) public
```

Agent creation method. Mints an ERC1155 token with the agent id for the owner and stores metadata.

_fires _before and _after hooks within the inheritance tree.
If front run protection is enabled (disabled by default), it will check if the keccak256 hash of the parameters
has been committed in prepareAgent(bytes32)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent to be created. |
| owner | address | address to have ownership privileges in the agent methods. |
| metadata | string | IPFS pointer to agent&#x27;s metadata JSON. |
| chainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### isCreated

```solidity
function isCreated(uint256 agentId) public view returns (bool)
```

Checks if the agentId has been minted.

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent. |

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
| agentId | uint256 | ERC1155 token id of the agent to be updated. |
| metadata | string | IPFS pointer to agent&#x27;s metadata JSON. |
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
| [0] | bool | true if agent is staked over the minimum threshold, or staking is not yet enabled (stakeController &#x3D; 0). false otherwise |

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
| agentId | uint256 | ERC1155 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent&#x27;s metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### _agentUpdate

```solidity
function _agentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

logic for agent update.

_emits AgentUpdated, will be extended by child contracts._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent&#x27;s metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### _afterAgentUpdate

```solidity
function _afterAgentUpdate(uint256 agentId, string newMetadata, uint256[] newChainIds) internal virtual
```

hook fired after agent creation or update.

_emits Router hook._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent&#x27;s metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Obligatory inheritance dismambiguation of ForwardedContext&#x27;s _msgSender()

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | msg.sender if not a meta transaction, signer of forwarder metatx if it is. |

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Obligatory inheritance dismambiguation of ForwardedContext&#x27;s _msgSender()

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | sender msg.data if not a meta transaction, forwarder data in metatx if it is. |

### __gap

```solidity
uint256[41] __gap
```

