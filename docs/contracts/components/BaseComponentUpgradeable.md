## BaseComponentUpgradeable

_The Forta platform is composed of "component" smart contracts that are upgradeable, share a common access
control scheme and can send use routed hooks to signal one another. They also support the multicall pattern.

This contract contains the base of Forta components. Contract  inheriting this will have to call
- __AccessManaged_init(address manager)
- __Routed_init(address router)
in their initialization process._

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal virtual
```

_Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
{upgradeTo} and {upgradeToAndCall}.

Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.

```solidity
function _authorizeUpgrade(address) internal override onlyOwner {}
```_

### setName

```solidity
function setName(address ensRegistry, string ensName) public
```

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

