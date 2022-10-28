## Router

### _routingTable

```solidity
mapping(bytes4 => struct EnumerableSet.AddressSet) _routingTable
```

### _revertsOnFail

```solidity
mapping(bytes4 => bool) _revertsOnFail
```

### SIGNATURE_SIZE

```solidity
uint256 SIGNATURE_SIZE
```

### version

```solidity
string version
```

### RoutingUpdated

```solidity
event RoutingUpdated(bytes4 sig, address target, bool enable, bool revertsOnFail)
```

### HookFailed

```solidity
error HookFailed(bytes4 sig, uint256 at)
```

### AlreadyRouted

```solidity
error AlreadyRouted()
```

### NotInRoutingTable

```solidity
error NotInRoutingTable()
```

### constructor

```solidity
constructor(address forwarder) public
```

### initialize

```solidity
function initialize(address __manager) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |

### hookHandler

```solidity
function hookHandler(bytes payload) external
```

Method that executes all the listeners in the routing table for a payload.

_hooks can fail without the error bubling up._

| Name | Type | Description |
| ---- | ---- | ----------- |
| payload | bytes | with the method signature and parameters for the hook to be executed |

### setRoutingTable

```solidity
function setRoutingTable(bytes4 sig, address target, bool enable, bool revertsOnFail) external
```

Adds or removes a listener that will react to a certain hook.

| Name | Type | Description |
| ---- | ---- | ----------- |
| sig | bytes4 | the hook signature to listen to. |
| target | address | address of the listening contract. |
| enable | bool | true if adding to the list, false to remove. |
| revertsOnFail | bool | true if hook execution failure should bubble up, false to ignore. |

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal virtual
```

Access control for the upgrade process

### setName

```solidity
function setName(address ensRegistry, string ensName) public
```

Allow the upgrader to set ENS reverse registration

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
uint256[48] __gap
```

