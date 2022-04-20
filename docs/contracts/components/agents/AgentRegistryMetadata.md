
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
mapping(uint256 &#x3D;&gt; struct AgentRegistryMetadata.AgentMetadata) _agentMetadata
```

### _agentMetadataUniqueness

```solidity
mapping(bytes32 &#x3D;&gt; bool) _agentMetadataUniqueness
```

### MetadataNotUnique

```solidity
error MetadataNotUnique(bytes32 hash)
```

### getAgent

```solidity
function getAgent(uint256 agentId) public view returns (bool created, address owner, uint256 agentVersion, string metadata, uint256[] chainIds)
```

Gets agent metadata, version and chain Ids.

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| created | bool | if agent exists. |
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
| agentId | uint256 | ERC1155 token id of the agent to be created or updated. |
| newMetadata | string | IPFS pointer to agent&#x27;s metadata JSON. |
| newChainIds | uint256[] | ordered list of chainIds where the agent wants to run. |

### __gap

```solidity
uint256[48] __gap
```

