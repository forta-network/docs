## FortaStakingParameters

### _fortaStaking

```solidity
contract FortaStaking _fortaStaking
```

### _stakeSubjectHandlers

```solidity
mapping(uint8 => contract IStakeSubject) _stakeSubjectHandlers
```

### FortaStakingChanged

```solidity
event FortaStakingChanged(address staking)
```

### version

```solidity
string version
```

### maxSlashableStakePercent

```solidity
uint256 maxSlashableStakePercent
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

Get max stake for that `subjectType` and `subject`. If not set, will return 0.

### minStakeFor

```solidity
function minStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get min stake for that `subjectType` and `subject`. If not set, will return 0.

### isStakeActivatedFor

```solidity
function isStakeActivatedFor(uint8 subjectType, uint256 subject) external view returns (bool)
```

Get if staking is activated for that `subjectType` and `subject`. If not set, will return false.

### activeStakeFor

```solidity
function activeStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Gets active stake (amount of staked tokens) on `subject` id for `subjectType`

### totalStakeFor

```solidity
function totalStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Gets active and inactive stake (amount of staked tokens) on `subject` id for `subjectType`

### isRegistered

```solidity
function isRegistered(uint8 subjectType, uint256 subject) external view returns (bool)
```

Checks if subject, subjectType is registered

