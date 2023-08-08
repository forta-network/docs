## Forwarder

### ForwardRequest

```solidity
struct ForwardRequest {
  address from;
  address to;
  uint256 value;
  uint256 gas;
  uint256 nonce;
  uint256 deadline;
  bytes data;
}
```

### _FORWARDREQUEST_TYPEHASH

```solidity
bytes32 _FORWARDREQUEST_TYPEHASH
```

### DeadlineExpired

```solidity
error DeadlineExpired()
```

### SignatureDoesNotMatch

```solidity
error SignatureDoesNotMatch()
```

### constructor

```solidity
constructor() public
```

### execute

```solidity
function execute(struct Forwarder.ForwardRequest req, bytes signature) external payable returns (bool, bytes)
```

Executes a ForwardRequest (meta-tx) if signature is verified, deadline is met and nonce is valid

_This implementations allows for out of order execution, by allowing several "timelines" per nonce
by splitting the uint256 type space into 128 bit subspaces where each subspace is interpreted as maintaining
an ordered timeline. The intent of the design is to allow multiple nonces to be valid at any given time.
For a detailed explanation: https://github.com/amxx/permit#out-of-order-execution
For an example on how to leverage this functionality, see tests/forwarder/forwarder.test.js
Will emit NonceUsed(user, timeline, nonce) for better reporting / UX 
WARNING: failed transactions do not consume a nonce, unlinke regular ethereum transactions. Please make use
of the deadline functionality, and if you want to cancel a request, submit a successful transaction with the same
nonce._

| Name | Type | Description |
| ---- | ---- | ----------- |
| req | struct Forwarder.ForwardRequest | ForwardRequest to be executed |
| signature | bytes | EIP-712 signature of the ForwardRequest |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | (success, returnData) of the executed request |
| [1] | bytes |  |

## EIP712WithNonce

### NonceUsed

```solidity
event NonceUsed(address user, uint256 timeline, uint256 nonce)
```

### InvalidNonce

```solidity
error InvalidNonce(uint256 nonce)
```

### _nonces

```solidity
mapping(address => mapping(uint256 => uint256)) _nonces
```

### DOMAIN_SEPARATOR

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32)
```

Domain Separator as defined in EIP712

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | keccak256(typeHash, nameHash, versionHash, block.chainid, address(this)) |

### getNonce

```solidity
function getNonce(address from) public view virtual returns (uint256)
```

Gets nonce for the from address in the "default" timeline

_For a detailed explanation: https://github.com/amxx/permit#out-of-order-execution_

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | address |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nonce |

### getNonce

```solidity
function getNonce(address from, uint256 timeline) public view virtual returns (uint256)
```

Gets nonce for the from address in the specified timeline

_For a detailed explanation: https://github.com/amxx/permit#out-of-order-execution_

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | address |
| timeline | uint256 | where the nonce lives |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nonce |

### _verifyAndConsumeNonce

```solidity
function _verifyAndConsumeNonce(address user, uint256 fullNonce) internal virtual
```

Extract timeline from nonce, iterates it to consume it, checks for replay protection.

_emits NonceUsed(user, timeline, nonce).
WARNING: Failed transactions would not consume a nonce, since the reverted transaction won't be able to save in storage._

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | address sending the nonce. |
| fullNonce | uint256 | nonce and timeline info in uint256 space |