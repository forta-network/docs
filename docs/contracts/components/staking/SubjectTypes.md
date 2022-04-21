
## SCANNER_SUBJECT

```solidity
uint8 SCANNER_SUBJECT
```

## AGENT_SUBJECT

```solidity
uint8 AGENT_SUBJECT
```



### InvalidSubjectType

```solidity
error InvalidSubjectType(uint8 subjectType)
```

### onlyValidSubjectType

```solidity
modifier onlyValidSubjectType(uint8 subjectType)
```

_check if &#x60;subjectType&#x60; belongs to the defined SUBJECT_TYPES_

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | is not an enum because some contracts using subjectTypes are not upgradeable (StakinEscrow) |

