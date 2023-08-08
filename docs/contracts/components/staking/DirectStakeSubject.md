## DirectStakeSubjectUpgradeable

### SubjectHandlerUpdated

```solidity
event SubjectHandlerUpdated(address newHandler)
```

### StakedUnderMinimum

```solidity
error StakedUnderMinimum(uint256 subject)
```

### setSubjectHandler

```solidity
function setSubjectHandler(address subjectGateway) public
```

Stake controller setter, restricted to DEFAULT_ADMIN_ROLE

### getSubjectHandler

```solidity
function getSubjectHandler() public view returns (contract IStakeSubjectGateway)
```

Getter for subjectGateway

### isStakedOverMin

```solidity
function isStakedOverMin(uint256 subject) external view virtual returns (bool)
```

Returns true if `subject` amount of staked tokens is bigger or equal the minimum stake set
for it. It's for contracts implementing `StakeSubjectUpgradeable` to decide what that means.

### ownerOf

```solidity
function ownerOf(uint256 subject) external view virtual returns (address)
```

### __gap

```solidity
uint256[4] __gap
```