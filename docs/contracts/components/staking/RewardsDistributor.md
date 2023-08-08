## RewardsDistributor

### version

```solidity
string version
```

### DidAccumulateRate

```solidity
event DidAccumulateRate(uint8 subjectType, uint256 subject, address staker, uint256 stakeAmount, uint256 sharesAmount)
```

### DidReduceRate

```solidity
event DidReduceRate(uint8 subjectType, uint256 subject, address staker, uint256 stakeAmount, uint256 sharesAmount)
```

### Rewarded

```solidity
event Rewarded(uint8 subjectType, uint256 subject, uint256 amount, uint256 epochNumber)
```

### ClaimedRewards

```solidity
event ClaimedRewards(uint8 subjectType, uint256 subject, address to, uint256 epochNumber, uint256 value)
```

### DidTransferRewardShares

```solidity
event DidTransferRewardShares(uint256 sharesId, uint8 subjectType, address from, address to, uint256 sharesAmount)
```

### SetDelegationFee

```solidity
event SetDelegationFee(uint8 subjectType, uint256 subject, uint256 epochNumber, uint256 feeBps)
```

### SetDelegationParams

```solidity
event SetDelegationParams(uint256 epochDelay, uint256 defaultFeeBps)
```

### TokensSwept

```solidity
event TokensSwept(address token, address to, uint256 amount)
```

### RewardingNonRegisteredSubject

```solidity
error RewardingNonRegisteredSubject(uint8 subjectType, uint256 subject)
```

### AlreadyClaimed

```solidity
error AlreadyClaimed()
```

### AlreadyRewarded

```solidity
error AlreadyRewarded(uint256 epochNumber)
```

### SetDelegationFeeNotReady

```solidity
error SetDelegationFeeNotReady()
```

### constructor

```solidity
constructor(address _forwarder, address _rewardsToken, address __subjectGateway) public
```

### initialize

```solidity
function initialize(address _manager, uint256 _delegationParamsEpochDelay, uint256 _defaultFeeBps) public
```

### didAllocate

```solidity
function didAllocate(uint8 subjectType, uint256 subject, uint256 stakeAmount, uint256 sharesAmount, address staker) external
```

### didUnallocate

```solidity
function didUnallocate(uint8 subjectType, uint256 subject, uint256 stakeAmount, uint256 sharesAmount, address staker) external
```

### didTransferShares

```solidity
function didTransferShares(uint256 sharesId, uint8 subjectType, address from, address to, uint256 sharesAmount) external
```

### reward

```solidity
function reward(uint8 subjectType, uint256 subjectId, uint256 amount, uint256 epochNumber) external
```

### availableReward

```solidity
function availableReward(uint8 subjectType, uint256 subjectId, uint256 epochNumber, address staker) public view returns (uint256)
```

### claimRewards

```solidity
function claimRewards(uint8 subjectType, uint256 subjectId, uint256[] epochNumbers) external
```

### setDelegationParams

```solidity
function setDelegationParams(uint256 _delegationParamsEpochDelay, uint256 _defaultFeeBps) external
```

### setDelegationFeeBps

```solidity
function setDelegationFeeBps(uint8 subjectType, uint256 subjectId, uint16 feeBps) external
```

Sets delegation fee for a ScannerPool (required to own the ScannerPoolRegistry NFT).
Change in fees will start having an effect in the beginning of the next reward epoch.
After the first time setting the parameter, it cannot be set again until delegationParamsEpochDelay epochs pass.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | a DELEGATED subject type. |
| subjectId | uint256 | the DELEGATED subject id. |
| feeBps | uint16 |  |

### getDelegationFee

```solidity
function getDelegationFee(uint8 subjectType, uint256 subjectId, uint256 epochNumber) public view returns (uint256)
```

Returns current delegation fee for an epoch or defaultFeeBps if not set

### sweep

```solidity
function sweep(contract IERC20 token, address recipient) external returns (uint256)
```

Sweep all token that might be mistakenly sent to the contract. This covers both unrelated tokens and staked
tokens that would be sent through a direct transfer. Restricted to SWEEPER_ROLE.
If tokens are the same as staked tokens, only the extra tokens (no rewards) will be transferred.

_WARNING: thoroughly review the token to sweep._

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | address of the token to be swept. |
| recipient | address | destination address of the swept tokens |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of tokens swept. For unrelated tokens is RewardDistributor's balance, for stakedToken its the balance minus total rewards distributed; |

### getEpochNumber

```solidity
function getEpochNumber(uint256 timestamp) external pure returns (uint32)
```

### getCurrentEpochNumber

```solidity
function getCurrentEpochNumber() external view returns (uint32)
```

### getEpochStartTimestamp

```solidity
function getEpochStartTimestamp(uint256 epochNumber) external pure returns (uint256)
```

### getCurrentEpochStartTimestamp

```solidity
function getCurrentEpochStartTimestamp() external view returns (uint256)
```

### getEpochEndTimestamp

```solidity
function getEpochEndTimestamp(uint256 epochNumber) external pure returns (uint256)
```

### getCurrentEpochEndTimestamp

```solidity
function getCurrentEpochEndTimestamp() external view returns (uint256)
```

### isCurrentEpoch

```solidity
function isCurrentEpoch(uint256 timestamp) external view returns (bool)
```