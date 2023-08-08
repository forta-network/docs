## Forta

This version of the Forta token is living on the root (or parent) chain. That would be:
- Mainnet for production
- Goerli for testing

In addition to all the common forta features, the version is mintable by a specific role.

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### SUPPLY

```solidity
uint256 SUPPLY
```

### MintingMoreThanSupply

```solidity
error MintingMoreThanSupply()
```

### initialize

```solidity
function initialize(address admin) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| admin | address | address for the ADMIN_ROLE of the token. |

### mint

```solidity
function mint(address to, uint256 amount) public
```

Allow MINTER_ROLE to mint new tokens

### version

```solidity
function version() external pure virtual returns (string)
```

Contract version

_Since FortaCommon is IVersioned, Forta is deployed in L1 and FortaBridgedPolygon in L2,
we need to implement the interface with a method instead of immutable variable._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | version of FORT deployed in L1 |

### __gap

```solidity
uint256[50] __gap
```