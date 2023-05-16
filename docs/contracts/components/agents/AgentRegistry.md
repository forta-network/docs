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

