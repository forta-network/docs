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

