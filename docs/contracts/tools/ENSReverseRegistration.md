## IReverseRegistrar

### ADDR_REVERSE_NODE

```solidity
function ADDR_REVERSE_NODE() external view returns (bytes32)
```

### ens

```solidity
function ens() external view returns (contract ENS)
```

### defaultResolver

```solidity
function defaultResolver() external view returns (address)
```

### claim

```solidity
function claim(address) external returns (bytes32)
```

### claimWithResolver

```solidity
function claimWithResolver(address, address) external returns (bytes32)
```

### setName

```solidity
function setName(string) external returns (bytes32)
```

### node

```solidity
function node(address) external pure returns (bytes32)
```

## ENSReverseRegistration

### ADDR_REVERSE_NODE

```solidity
bytes32 ADDR_REVERSE_NODE
```

### setName

```solidity
function setName(address ensregistry, string ensname) internal
```

