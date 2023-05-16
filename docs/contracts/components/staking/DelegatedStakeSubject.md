## DelegatedStakeSubjectUpgradeable

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

### __gap

```solidity
uint256[4] __gap
```