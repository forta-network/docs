## FortaBridgedPolygon

This version of the Forta token is living on the child chain. That would be:
- Polygon for production
- Mumbai for testing

When tokens are deposited from the root chain, the `childChainManagerProxy` will call the
{deposit} function, which will mint corresponding tokens on the child chain. The total supply
on the side chain is expected to match the amount of locked tokens on the parent chain.

In order to bridge tokens back from the child chain to the parent chain, any user
can call either the {withdraw} or the {withdrawTo} function. This will burn tokens here,
emitting a burn event (Transfer event from the user to address(0)) in the process. This burn event
is needed to trigger unlocking the corresponding tokens on the parent chain.

### childChainManagerProxy

```solidity
address childChainManagerProxy
```

### DepositOnlyByChildChainManager

```solidity
error DepositOnlyByChildChainManager()
```

### constructor

```solidity
constructor(address _childChainManagerProxy) public
```

### initialize

```solidity
function initialize(address admin) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| admin | address | address that will be ADMIN_ROLE. |

### deposit

```solidity
function deposit(address user, bytes depositData) external
```

_To avoid token locked on the parent chains not being correctly represented on the
child chain, this should NEVER revert (exception: _mint can revert if totalSupply() <= _maxSupply())._

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | the destination address for the tokens. |
| depositData | bytes | encoded data sent by the bridge. |

### withdraw

```solidity
function withdraw(uint256 amount) external
```

_Burns tokens in L2 so Polygon's PoS bridge will unlock them in L1._

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | of tokens to send to L1 |

### withdrawTo

```solidity
function withdrawTo(uint256 amount, address receiver) external
```

_In order for a token holder on the child chain to be able to withdraw tokens to
another address on the parent chain, this function will temporarily transfer the tokens to
the address of the receiver on the parent chain so that the burn event is correct._

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | of tokens to send to L1 |
| receiver | address | destination address in L1 |

### version

```solidity
function version() external pure returns (string)
```

Contract version

_Since FortaCommon is IVersioned, Forta is deployed in L1 and FortaBridgedPolygon in L2,
we need to implement the interface with a method instead of immutable variable._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | version of FORT deployed in L2 |

### __gap

```solidity
uint256[49] __gap
```