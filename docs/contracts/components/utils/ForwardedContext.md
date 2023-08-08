## ForwardedContext

### _trustedForwarder

```solidity
address _trustedForwarder
```

### ADDRESS_SIZE_BYTES

```solidity
uint256 ADDRESS_SIZE_BYTES
```

### constructor

```solidity
constructor(address trustedForwarder) internal
```

### isTrustedForwarder

```solidity
function isTrustedForwarder(address forwarder) public view virtual returns (bool)
```

Checks if `forwarder` address provided is the trustedForwarder set in the constructor.

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Gets sender of the transaction of signer if meta transaction.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
the signer address is encoded in the last 20 bytes of msg.data._

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | address of sender of the transaction of signer if meta transaction. |

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Gets msg.data of the transaction or meta-tx.

_If the tx is sent by the trusted forwarded, we assume it is a meta transaction and 
msg.data must have the signer address (encoded in the last 20 bytes of msg.data) removed._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | msg.data of the transaction of msg.data - signer address if meta transaction. |

