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

