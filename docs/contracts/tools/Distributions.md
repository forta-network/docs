## Distributions

### Balances

```solidity
struct Balances {
  mapping(uint256 => uint256) _balances;
  uint256 _totalSupply;
}
```

### balanceOf

```solidity
function balanceOf(struct Distributions.Balances self, uint256 subjectId) internal view returns (uint256)
```

### totalSupply

```solidity
function totalSupply(struct Distributions.Balances self) internal view returns (uint256)
```

### mint

```solidity
function mint(struct Distributions.Balances self, uint256 subjectId, uint256 amount) internal
```

### burn

```solidity
function burn(struct Distributions.Balances self, uint256 subjectId, uint256 amount) internal
```

### transfer

```solidity
function transfer(struct Distributions.Balances self, uint256 from, uint256 to, uint256 amount) internal
```

### SignedBalances

```solidity
struct SignedBalances {
  mapping(address => int256) _balances;
  int256 _totalSupply;
}
```

### balanceOf

```solidity
function balanceOf(struct Distributions.SignedBalances self, address account) internal view returns (int256)
```

### totalSupply

```solidity
function totalSupply(struct Distributions.SignedBalances self) internal view returns (int256)
```

### mint

```solidity
function mint(struct Distributions.SignedBalances self, address account, int256 amount) internal
```

### burn

```solidity
function burn(struct Distributions.SignedBalances self, address account, int256 amount) internal
```

### transfer

```solidity
function transfer(struct Distributions.SignedBalances self, address from, address to, int256 amount) internal
```

