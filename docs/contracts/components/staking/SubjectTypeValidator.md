## UNDEFINED_SUBJECT

```solidity
uint8 UNDEFINED_SUBJECT
```

## SCANNER_SUBJECT

```solidity
uint8 SCANNER_SUBJECT
```

## AGENT_SUBJECT

```solidity
uint8 AGENT_SUBJECT
```

## SCANNER_POOL_SUBJECT

```solidity
uint8 SCANNER_POOL_SUBJECT
```

## DELEGATOR_SCANNER_POOL_SUBJECT

```solidity
uint8 DELEGATOR_SCANNER_POOL_SUBJECT
```

## SubjectTypeValidator

Defines the types of staking Subject Types, their agency and relationships.
There are different types of subject type agency:
- MANAGED --> Cannot be staked on directly, allocation of stake is controlled by their manager, a DELEGATED type
- DIRECT --> Can be staked on by multiple different stakers
- DELEGATED --> Can be staked on by the owner of the relevant Registry entry. Manages MANAGED subjects.
- DELEGATOR --> TBD

The current Subject Types and their Agency:
- SCANNER_SUBJECT --> MANAGED
- AGENT_SUBJECT (detection bots) --> DIRECT
- SCANNER_POOL_SUBJECT --> DELEGATED

### InvalidSubjectType

```solidity
error InvalidSubjectType(uint8 subjectType)
```

### ForbiddenForType

```solidity
error ForbiddenForType(uint8 subjectType, enum SubjectTypeValidator.SubjectStakeAgency provided, enum SubjectTypeValidator.SubjectStakeAgency expected)
```

### onlyValidSubjectType

```solidity
modifier onlyValidSubjectType(uint8 subjectType)
```

_check if `subjectType` belongs to the defined SUBJECT_TYPES_

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | is not an enum because some contracts using subjectTypes are not upgradeable (StakingEscrow) |

### onlyAgencyType

```solidity
modifier onlyAgencyType(uint8 subjectType, enum SubjectTypeValidator.SubjectStakeAgency expected)
```

### notAgencyType

```solidity
modifier notAgencyType(uint8 subjectType, enum SubjectTypeValidator.SubjectStakeAgency forbidden)
```

### getSubjectTypeAgency

```solidity
function getSubjectTypeAgency(uint8 subjectType) public pure returns (enum SubjectTypeValidator.SubjectStakeAgency)
```

### getDelegatorSubjectType

```solidity
function getDelegatorSubjectType(uint8 subjectType) public pure returns (uint8)
```

### getDelegatedSubjectType

```solidity
function getDelegatedSubjectType(uint8 subjectType) public pure returns (uint8)
```