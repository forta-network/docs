## PredicatMock

### LockedERC20

```solidity
event LockedERC20(address depositor, address depositReceiver, address rootToken, uint256 amount)
```

### lockTokens

```solidity
function lockTokens(address depositor, address depositReceiver, address rootToken, bytes depositData) public
```

### exitTokens

```solidity
function exitTokens(address, address rootToken, bytes log) public
```

## RootChainManagerMock

### predicate

```solidity
contract PredicatMock predicate
```

### BridgeDeposit

```solidity
event BridgeDeposit(address user, address rootToken, bytes depositData)
```

### tokenToType

```solidity
function tokenToType(address) external pure returns (bytes32)
```

### typeToPredicate

```solidity
function typeToPredicate(bytes32) external view returns (address)
```

### depositFor

```solidity
function depositFor(address user, address rootToken, bytes depositData) external
```

### exit

```solidity
function exit(bytes inputData) external
```