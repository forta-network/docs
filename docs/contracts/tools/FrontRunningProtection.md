## FrontRunningProtection

_FrontRunningProtection class usef for commit-reveal schemes with deadline.
We don't emit events to not broadcast the commits, devs will have to use the getter._

### _commits

```solidity
mapping(bytes32 => uint256) _commits
```

### CommitNotReady

```solidity
error CommitNotReady()
```

### CommitAlreadyExists

```solidity
error CommitAlreadyExists()
```

### frontrunProtected

```solidity
modifier frontrunProtected(bytes32 commit, uint256 duration)
```

Use it to enforce the need of a previous commit within duration
Will consume the commit if we are within deadline

| Name | Type | Description |
| ---- | ---- | ----------- |
| commit | bytes32 | the commit ID |
| duration | uint256 | duration in seconds |

### getCommitTimestamp

```solidity
function getCommitTimestamp(bytes32 commit) external view returns (uint256)
```

Gets duration for a commit

| Name | Type | Description |
| ---- | ---- | ----------- |
| commit | bytes32 | ID |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | commit duration or zero if not found |

### _frontrunCommit

```solidity
function _frontrunCommit(bytes32 commit) internal
```

Saves commits deadline if commit does not exist

| Name | Type | Description |
| ---- | ---- | ----------- |
| commit | bytes32 | id |

