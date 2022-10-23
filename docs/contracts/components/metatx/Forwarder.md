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

