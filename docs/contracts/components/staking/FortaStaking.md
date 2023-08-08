## FortaStaking

_This is a generic staking contract for the Forta platform. It allows any account to deposit ERC20 tokens to
delegate their "power" by staking on behalf of a particular subject. The subject can be scanner, or any other actor
in the Forta ecosystem, who need to lock assets in order to contribute to the system.

Stakers take risks with their funds, as bad action from a subject can lead to slashing of the funds. In the
meantime, stakers are elligible for rewards. Rewards distributed to a particular subject's stakers are distributed
following to each staker's share in the subject.

Stakers can withdraw their funds, following a withdrawal delay. During the withdrawal delay, funds are no longer
counting toward the active stake of a subject, but are still slashable.

The SLASHER_ROLE should be given to a smart contract that will be in charge of handling the slashing proposal process.

Stakers receive ERC1155 shares in exchange for their stake, making the active stake transferable. When a withdrawal
is initiated, similarly the ERC1155 tokens representing the (transferable) active shares are burned in exchange for
non-transferable ERC1155 tokens representing the inactive shares.

ERC1155 shares representing active stake are transferable, and can be used in an AMM. Their value is however subject
to quick devaluation in case of slashing event for the corresponding subject. Thus, trading of such shares should be
be done very carefully.

WARNING: To stake from another smart contract (smart contract wallets included), it must be fully ERC1155 compatible,
implementing ERC1155Receiver. If not, minting of active and inactive shares will fail.
Do not deposit on the constructor if you don't implement ERC1155Receiver. During the construction, the minting will
succeed but you will not be able to withdraw or mint new shares from the contract. If this happens, transfer your
shares to an EOA or fully ERC1155 compatible contract._

### stakedToken

```solidity
contract IERC20 stakedToken
```

### _activeStake

```solidity
struct Distributions.Balances _activeStake
```

### _inactiveStake

```solidity
struct Distributions.Balances _inactiveStake
```

### _lockingDelay

```solidity
mapping(uint256 => mapping(address => struct Timers.Timestamp)) _lockingDelay
```

### _rewards

```solidity
struct Distributions.Balances _rewards
```

### _released

```solidity
mapping(uint256 => struct Distributions.SignedBalances) _released
```

### _deprecated_frozen

```solidity
mapping(uint256 => bool) _deprecated_frozen
```

### _withdrawalDelay

```solidity
uint64 _withdrawalDelay
```

### _treasury

```solidity
address _treasury
```

### subjectGateway

```solidity
contract IStakeSubjectGateway subjectGateway
```

### slashDelegatorsPercent

```solidity
uint256 slashDelegatorsPercent
```

### allocator

```solidity
contract IStakeAllocator allocator
```

### openProposals

```solidity
mapping(uint256 => uint256) openProposals
```

### _reentrancyStatus

```solidity
uint256 _reentrancyStatus
```

### MIN_WITHDRAWAL_DELAY

```solidity
uint256 MIN_WITHDRAWAL_DELAY
```

### MAX_WITHDRAWAL_DELAY

```solidity
uint256 MAX_WITHDRAWAL_DELAY
```

### MAX_SLASHABLE_PERCENT

```solidity
uint256 MAX_SLASHABLE_PERCENT
```

### HUNDRED_PERCENT

```solidity
uint256 HUNDRED_PERCENT
```

### StakeDeposited

```solidity
event StakeDeposited(uint8 subjectType, uint256 subject, address account, uint256 amount)
```

### WithdrawalInitiated

```solidity
event WithdrawalInitiated(uint8 subjectType, uint256 subject, address account, uint64 deadline)
```

### WithdrawalExecuted

```solidity
event WithdrawalExecuted(uint8 subjectType, uint256 subject, address account)
```

### Froze

```solidity
event Froze(uint8 subjectType, uint256 subject, address by, bool isFrozen)
```

### Slashed

```solidity
event Slashed(uint8 subjectType, uint256 subject, address by, uint256 value)
```

### SlashedShareSent

```solidity
event SlashedShareSent(uint8 subjectType, uint256 subject, address by, uint256 value)
```

### DelaySet

```solidity
event DelaySet(uint256 newWithdrawalDelay)
```

### TreasurySet

```solidity
event TreasurySet(address newTreasury)
```

### StakeHelpersConfigured

```solidity
event StakeHelpersConfigured(address subjectGateway, address allocator)
```

### MaxStakeReached

```solidity
event MaxStakeReached(uint8 subjectType, uint256 subject)
```

### TokensSwept

```solidity
event TokensSwept(address token, address to, uint256 amount)
```

### SlashDelegatorsPercentSet

```solidity
event SlashDelegatorsPercentSet(uint256 percent)
```

### WithdrawalNotReady

```solidity
error WithdrawalNotReady()
```

### SlashingOver90Percent

```solidity
error SlashingOver90Percent()
```

### WithdrawalSharesNotTransferible

```solidity
error WithdrawalSharesNotTransferible()
```

### FrozenSubject

```solidity
error FrozenSubject()
```

### NoActiveShares

```solidity
error NoActiveShares()
```

### NoInactiveShares

```solidity
error NoInactiveShares()
```

### StakeInactiveOrSubjectNotFound

```solidity
error StakeInactiveOrSubjectNotFound()
```

### version

```solidity
string version
```

### constructor

```solidity
constructor(address _forwarder) public
```

### initialize

```solidity
function initialize(address __manager, contract IERC20 __stakedToken, uint64 __withdrawalDelay, address __treasury) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |
| __stakedToken | contract IERC20 | ERC20 to be staked (FORT). |
| __withdrawalDelay | uint64 | cooldown period between withdrawal init and withdrawal (in seconds). |
| __treasury | address | address where the slashed tokens go to. |

### setReentrancyGuard

```solidity
function setReentrancyGuard() public
```

Reinitializer to setup the reentrancy guard (introduced in v0.1.2)

### _setStatus

```solidity
function _setStatus(uint256 newStatus) internal virtual
```

### _getStatus

```solidity
function _getStatus() internal virtual returns (uint256)
```

### treasury

```solidity
function treasury() public view returns (address)
```

Returns treasury address (slashed tokens destination)

### activeStakeFor

```solidity
function activeStakeFor(uint8 subjectType, uint256 subject) public view returns (uint256)
```

Get stake of a subject (not marked for withdrawal).

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of stakedToken actively staked on subject+subjectType. |

### totalActiveStake

```solidity
function totalActiveStake() public view returns (uint256)
```

Get total active stake of all subjects (not marked for withdrawal).

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of stakedToken actively staked on all subject+subjectTypes. |

### inactiveStakeFor

```solidity
function inactiveStakeFor(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get inactive stake of a subject (marked for withdrawal).

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of stakedToken still staked on subject+subjectType but marked for withdrawal. |

### totalInactiveStake

```solidity
function totalInactiveStake() public view returns (uint256)
```

Get total inactive stake of all subjects (marked for withdrawal).

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of stakedToken still staked on all subject+subjectTypes but marked for withdrawal. |

### sharesOf

```solidity
function sharesOf(uint8 subjectType, uint256 subject, address account) public view returns (uint256)
```

Get (active) shares of an account on a subject, corresponding to a fraction of the subject stake.

_This is equivalent to getting the ERC1155 balanceOf for keccak256(abi.encodePacked(subjectType, subject)),
shifted 9 bits, with the 9th bit set and uint8(subjectType) masked in_

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| account | address | holder of the ERC1155 staking shares. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of ERC1155 shares account is in possession in representing stake on subject+subjectType. |

### totalShares

```solidity
function totalShares(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get the total (active) shares on a subject.

_This is equivalent to getting the ERC1155 totalSupply for keccak256(abi.encodePacked(subjectType, subject)),
shifted 9 bits, with the 9th bit set and uint8(subjectType) masked in_

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total ERC1155 shares representing stake on subject+subjectType. |

### inactiveSharesOf

```solidity
function inactiveSharesOf(uint8 subjectType, uint256 subject, address account) external view returns (uint256)
```

Get inactive shares of an account on a subject, corresponding to a fraction of the subject inactive stake.

_This is equivalent to getting the ERC1155 balanceOf for keccak256(abi.encodePacked(subjectType, subject)),
shifted 9 bits, with the 9th bit unset and uint8(subjectType) masked in._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| account | address | holder of the ERC1155 staking shares. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of ERC1155 shares account is in possession in representing inactive stake on subject+subjectType, marked for withdrawal. |

### totalInactiveShares

```solidity
function totalInactiveShares(uint8 subjectType, uint256 subject) external view returns (uint256)
```

Get the total inactive shares on a subject.

_This is equivalent to getting the ERC1155 totalSupply for keccak256(abi.encodePacked(subjectType, subject)),
shifted 9 bits, with the 9th bit unset and uint8(subjectType) masked in_

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | total ERC1155 shares representing inactive stake on subject+subjectType, marked for withdrawal. |

### isFrozen

```solidity
function isFrozen(uint8 subjectType, uint256 subject) public view returns (bool)
```

Checks if a subject frozen (stake of frozen subject cannot be withdrawn).

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | true if subject is frozen, false otherwise |

### deposit

```solidity
function deposit(uint8 subjectType, uint256 subject, uint256 stakeValue) external returns (uint256)
```

Deposit `stakeValue` tokens for a given `subject`, and mint the corresponding active ERC1155 shares.
will return tokens staked over maximum for the subject.
If stakeValue would drive the stake over the maximum, only stakeValue - excess is transferred, but transaction will
not fail.
Reverts if max stake for subjectType not set, or subject not found.

_NOTE: Subject type is necessary because we can't infer subject ID uniqueness between scanners, agents, etc
Emits a ERC1155.TransferSingle event and StakeDeposited (to allow accounting per subject type)
Emits MaxStakeReached(subjectType, activeSharesId)
WARNING: To stake from another smart contract (smart contract wallets included), it must be fully ERC1155 compatible,
implementing ERC1155Receiver. If not, minting of active and inactive shares will fail.
Do not deposit on the constructor if you don't implement ERC1155Receiver. During the construction, the minting will
succeed but you will not be able to withdraw or mint new shares from the contract. If this happens, transfer your
shares to an EOA or fully ERC1155 compatible contract._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| stakeValue | uint256 | amount of staked token. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of ERC1155 active shares minted. |

### migrate

```solidity
function migrate(uint8 oldSubjectType, uint256 oldSubject, uint8 newSubjectType, uint256 newSubject, address staker) external
```

deposits active stake from SCANNER to SCANNER_POOL if not frozen. Inactive stake remains for withdrawal in old subject
Burns active stake and shares for old subject.

_No slash has been executed, so new SCANNER_POOL share proportions apply._

### _getInboundStake

```solidity
function _getInboundStake(uint8 subjectType, uint256 subject, uint256 stakeValue) private view returns (uint256, bool)
```

Calculates how much of the incoming stake fits for subject.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | valid subect type |
| subject | uint256 | the id of the subject |
| stakeValue | uint256 | stake sent by staker |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | stakeValue - excess |
| [1] | bool | true if reached max |

### initiateWithdrawal

```solidity
function initiateWithdrawal(uint8 subjectType, uint256 subject, uint256 sharesValue) external returns (uint64)
```

Starts the withdrawal process for an amount of shares. Burns active shares and mints inactive
shares (non transferrable). Stake will be available for withdraw() after _withdrawalDelay. If the
subject has not been slashed, the shares will correspond 1:1 with stake.

_Emits a WithdrawalInitiated event._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| sharesValue | uint256 | amount of shares token. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | amount of time until withdrawal is valid. |

### withdraw

```solidity
function withdraw(uint8 subjectType, uint256 subject) external returns (uint256)
```

Burn `sharesValue` inactive shares for a given `subject`, and withdraw the corresponding tokens
(if the subject type has not been frozen, and the withdrawal delay time has passed).

_shares must have been marked for withdrawal before by initiateWithdrawal().
Emits events WithdrawalExecuted and ERC1155.TransferSingle._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of withdrawn staked tokens. |

### slash

```solidity
function slash(uint8 subjectType, uint256 subject, uint256 stakeValue, address proposer, uint256 proposerPercent) external returns (uint256)
```

Slash a fraction of a subject stake, and transfer it to the treasury. Restricted to the `SLASHER_ROLE`.

_This will alter the relationship between shares and stake, reducing shares value for a subject.
Emits a Slashed event.
Unallocated stake if needed.
A slash over a DELEGATED type will propagate to DELEGATORs according to proposerPercent._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| stakeValue | uint256 | amount of staked token to be slashed. |
| proposer | address | address of the slash proposer. Must be nonzero address if proposerPercent > 0 |
| proposerPercent | uint256 | percentage of stakeValue sent to the proposer. From 0 to MAX_SLASHABLE_PERCENT |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | stakeValue |

### _slash

```solidity
function _slash(uint256 activeSharesId, uint8 subjectType, uint256 subject, uint256 stakeValue) private
```

burns slashed stake from active and/or inactive stake for subjectType/subject.

| Name | Type | Description |
| ---- | ---- | ----------- |
| activeSharesId | uint256 | ERC1155 id of the shares being slashed |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| stakeValue | uint256 | amount of staked token to be slashed. |

### freeze

```solidity
function freeze(uint8 subjectType, uint256 subject, bool frozen) external
```

Freeze/unfreeze withdrawal of a subject stake. This will be used when something suspicious happens
with a subject but there is not a strong case yet for slashing.
Restricted to the `SLASHER_ROLE`.

_Emits a Freeze event._

| Name | Type | Description |
| ---- | ---- | ----------- |
| subjectType | uint8 | type id of Stake Subject. See SubjectTypeValidator.sol |
| subject | uint256 | id identifying subject (external to FortaStaking). |
| frozen | bool | true to freeze, false to unfreeze. |

### _migrateFrozenToOpenProposals

```solidity
function _migrateFrozenToOpenProposals(uint256 activeSharesId) private
```

If there is open cases before upgrading to openProposals (frozen == true), we increment as an extra proposal
and set to false. There could be more than 1 open, in that case SLASHING_ARBITER_ROLE should be cautious with not unfreezing.
This method will be obsolete when all the _deprecated_frozen are false

| Name | Type | Description |
| ---- | ---- | ----------- |
| activeSharesId | uint256 | of the subject |

### sweep

```solidity
function sweep(contract IERC20 token, address recipient) external returns (uint256)
```

Sweep all token that might be mistakenly sent to the contract. This covers both unrelated tokens and staked
tokens that would be sent through a direct transfer. Restricted to SWEEPER_ROLE.
If tokens are the same as staked tokens, only the extra tokens (no stake) will be transferred.

_WARNING: thoroughly review the token to sweep._

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | address of the token to be swept. |
| recipient | address | destination address of the swept tokens |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | amount of tokens swept. For unrelated tokens is FortaStaking's balance, for stakedToken its the balance over the active stake + inactive stake |

### relayPermit

```solidity
function relayPermit(uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external
```

_Relay a ERC2612 permit signature to the staked token. This cal be bundled with a {deposit} or a {reward}
operation using Multicall._

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | uint256 | amount of token allowance for deposit/reward |
| deadline | uint256 | for the meta-tx to be relayed. |
| v | uint8 | part of signature |
| r | bytes32 | part of signature |
| s | bytes32 | part of signature |

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data) internal virtual
```

_See {ERC1155-_beforeTokenTransfer}._

### stakeToActiveShares

```solidity
function stakeToActiveShares(uint256 activeSharesId, uint256 amount) public view returns (uint256)
```

Convert active token stake amount to active shares amount

| Name | Type | Description |
| ---- | ---- | ----------- |
| activeSharesId | uint256 | ERC1155 active shares id |
| amount | uint256 | active stake amount |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC1155 active shares amount |

### stakeToInactiveShares

```solidity
function stakeToInactiveShares(uint256 inactiveSharesId, uint256 amount) public view returns (uint256)
```

Convert inactive token stake amount to inactive shares amount

| Name | Type | Description |
| ---- | ---- | ----------- |
| inactiveSharesId | uint256 | ERC1155 inactive shares id |
| amount | uint256 | inactive stake amount |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | ERC1155 inactive shares amount |

### activeSharesToStake

```solidity
function activeSharesToStake(uint256 activeSharesId, uint256 amount) public view returns (uint256)
```

Convert active shares amount to active stake amount.

| Name | Type | Description |
| ---- | ---- | ----------- |
| activeSharesId | uint256 | ERC1155 active shares id |
| amount | uint256 | ERC1155 active shares amount |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | active stake amount |

### inactiveSharesToStake

```solidity
function inactiveSharesToStake(uint256 inactiveSharesId, uint256 amount) public view returns (uint256)
```

Convert inactive shares amount to inactive stake amount.

| Name | Type | Description |
| ---- | ---- | ----------- |
| inactiveSharesId | uint256 | ERC1155 inactive shares id |
| amount | uint256 | ERC1155 inactive shares amount |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | inactive stake amount |

### setDelay

```solidity
function setDelay(uint64 newDelay) external
```

Sets withdrawal delay. Restricted to DEFAULT_ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDelay | uint64 | in seconds. |

### setTreasury

```solidity
function setTreasury(address newTreasury) external
```

Sets destination of slashed tokens. Restricted to DEFAULT_ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTreasury | address | address. |

### configureStakeHelpers

```solidity
function configureStakeHelpers(contract IStakeSubjectGateway _subjectGateway, contract IStakeAllocator _allocator) external
```

### setSlashDelegatorsPercent

```solidity
function setSlashDelegatorsPercent(uint256 percent) external
```

### setURI

```solidity
function setURI(string newUri) external
```

Sets URI of the ERC1155 tokens. Restricted to DEFAULT_ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| newUri | string | root of the hosted metadata. |

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address sender)
```

Helper to get either msg msg.sender if not a meta transaction, signer of forwarder metatx if it is.

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Helper to get msg.data if not a meta transaction, forwarder data in metatx if it is.

### __gap

```solidity
uint256[36] __gap
```
