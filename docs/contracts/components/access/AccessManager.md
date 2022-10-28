## AccessManager

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
function initialize(address __admin) external
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __admin | address | address to be the DEFAULT_ADMIN_ROLE. |

### setNewRole

```solidity
function setNewRole(bytes32 role, bytes32 admin) external
```

Method for DEFAULT_ADMIN_ROLE to create new roles, and define their role admin.

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | id of the new role. Should be keccak256("<ROLE_NAME>"). |
| admin | bytes32 | role id that will be the role admin for the new role. |

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal virtual
```

Access control for the upgrade process (UPGRADER_ROLE)

| Name | Type | Description |
| ---- | ---- | ----------- |
| newImplementation | address | address of the new deployed implementation. |

### setName

```solidity
function setName(address ensRegistry, string ensName) public
```

Allow ENS_MANAGER_ROLE to set ENS reverse registration

| Name | Type | Description |
| ---- | ---- | ----------- |
| ensRegistry | address | address |
| ensName | string | the name to set in th registry |

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Helper to get either msg msg.sender if not a meta transaction, signer of forwarder metatx if it is.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
the signer address is encoded in the last 20 bytes of msg.data._

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | address of sender of the transaction of signer if meta transaction. |

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Helper to get msg.data if not a meta transaction, forwarder data in metatx if it is.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
msg.data must have the signer address (encoded in the last 20 bytes of msg.data) removed._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | msg.data of the transaction of msg.data - signer address if meta transaction. |

### __gap

```solidity
uint256[50] __gap
```

