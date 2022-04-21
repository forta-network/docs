


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
mapping(uint256 &#x3D;&gt; struct BitMaps.BitMap) _disabled
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
| agentId | uint256 | ERC1155 token id of the agent. |

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
| agentId | uint256 | ERC1155 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |

### disableAgent

```solidity
function disableAgent(uint256 agentId, enum AgentRegistryEnable.Permission permission) public virtual
```

Disable an agent if sender has correct permission.

_agents can be disabled by ADMIN or OWNER._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |

### _hasPermission

```solidity
function _hasPermission(uint256 agentId, enum AgentRegistryEnable.Permission permission) internal view returns (bool)
```

Permission check.

_it does not uses AccessManager since it is agent specific_

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent. |
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
| agentId | uint256 | ERC1155 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |
| enable | bool | true if enabling, false if disabling. |

### _getDisableFlags

```solidity
function _getDisableFlags(uint256 agentId) internal view returns (uint256)
```

Get the disabled flags for an agentId.

_Permission (uint8) is used for indexing, so we don&#x27;t need to loop. 
If not disabled, all flags will be 0._

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 containing the byte flags. |

### _beforeAgentEnable

```solidity
function _beforeAgentEnable(uint256 agentId, enum AgentRegistryEnable.Permission permission, bool value) internal virtual
```

Hook _before agent enable

_does nothing in this contract_

| Name | Type | Description |
| ---- | ---- | ----------- |
| agentId | uint256 | ERC1155 token id of the agent. |
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
| agentId | uint256 | ERC1155 token id of the agent. |
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
| agentId | uint256 | ERC1155 token id of the agent. |
| permission | enum AgentRegistryEnable.Permission | the sender claims to have to enable the agent. |
| value | bool | true if enabling, false if disabling. |

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
uint256[49] __gap
```

