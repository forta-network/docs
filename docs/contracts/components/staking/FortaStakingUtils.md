## FortaStakingUtils

### subjectToActive

```solidity
function subjectToActive(uint8 subjectType, uint256 subject) internal pure returns (uint256)
```

_Encode "active" and subjectType in subject by hashing them together, shifting left 9 bits,
setting bit 9 (to mark as active) and masking subjectType in_

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | agents, scanner or future types of stake subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC1155 token id representing active shares. |

### subjectToInactive

```solidity
function subjectToInactive(uint8 subjectType, uint256 subject) internal pure returns (uint256)
```

_Encode "inactive" and subjectType in subject by hashing them together, shifting left 9 bits,
letting bit 9 unset (to mark as inactive) and masking subjectType in._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | agents, scanner or future types of stake subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC1155 token id representing inactive shares. |

### activeToInactive

```solidity
function activeToInactive(uint256 activeSharesId) internal pure returns (uint256)
```

_Unsets bit 9 of an activeSharesId to mark as inactive_

| Name | Type | Description |
| ---- | ---- | ----------- |
| activeSharesId | uint256 | ERC1155 token id representing active shares. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC1155 token id representing inactive shares. |

### inactiveToActive

```solidity
function inactiveToActive(uint256 inactiveSharesId) internal pure returns (uint256)
```

_Sets bit 9 of an inactiveSharesId to mark as inactive_

| Name | Type | Description |
| ---- | ---- | ----------- |
| inactiveSharesId | uint256 | ERC1155 token id representing inactive shares. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC1155 token id representing active shares. |

### isActive

```solidity
function isActive(uint256 sharesId) internal pure returns (bool)
```

_Checks if shares id is active_

| Name | Type | Description |
| ---- | ---- | ----------- |
| sharesId | uint256 | ERC1155 token id representing shares. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if active shares, false if inactive |

### subjectTypeOfShares

```solidity
function subjectTypeOfShares(uint256 sharesId) internal pure returns (uint8)
```

_Extracts subject type encoded in shares id_

| Name | Type | Description |
| ---- | ---- | ----------- |
| sharesId | uint256 | ERC1155 token id representing shares. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | subject type (see SubjectTypeValidator.sol) |