
## FortaStakingParameters

### _fortaStaking

```solidity
contract FortaStaking _fortaStaking
```

### _stakeSubjectHandlers

```solidity
mapping(uint8 &#x3D;&gt; contract IStakeSubject) _stakeSubjectHandlers
```

### FortaStakingChanged

```solidity
event FortaStakingChanged(address staking)
```

### version

```solidity
string version
```

### constructor

```solidity
constructor(address forwarder) public
```

### initialize

```solidity
function initialize(address __manager, address __router, address __fortaStaking) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |
| __router | address | address of Router. |
| __fortaStaking | address | address of FortaStaking. |

### setFortaStaking

```solidity
function setFortaStaking(address newFortaStaking) external
```

Setter for FortaStaking implementation address.

### _setFortaStaking

```solidity
function _setFortaStaking(address newFortaStaking) internal
```

### setStakeSubjectHandler

```solidity
function setStakeSubjectHandler(uint8 subjectType, contract IStakeSubject subjectHandler) external
```

Sets stake subject handler stake for subject type.

### maxStakeFor

```solidity
function maxStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get max stake for that &#x60;subjectType&#x60; and &#x60;subject&#x60;. If not set, will return 0.

### minStakeFor

```solidity
function minStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get min stake for that &#x60;subjectType&#x60; and &#x60;subject&#x60;. If not set, will return 0.

### isStakeActivatedFor

```solidity
function isStakeActivatedFor(uint8 subjectType, uint256 subject) external view returns (bool)
```

Get if staking is activated for that &#x60;subjectType&#x60; and &#x60;subject&#x60;. If not set, will return false.

### activeStakeFor

```solidity
function activeStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Gets active stake (amount of staked tokens) on &#x60;subject&#x60; id for &#x60;subjectType&#x60;

