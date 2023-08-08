## SlashingController

### UNDEFINED

```solidity
enum StateMachines.State UNDEFINED
```

### CREATED

```solidity
enum StateMachines.State CREATED
```

### REJECTED

```solidity
enum StateMachines.State REJECTED
```

### DISMISSED

```solidity
enum StateMachines.State DISMISSED
```

### IN_REVIEW

```solidity
enum StateMachines.State IN_REVIEW
```

### REVIEWED

```solidity
enum StateMachines.State REVIEWED
```

### EXECUTED

```solidity
enum StateMachines.State EXECUTED
```

### REVERTED

```solidity
enum StateMachines.State REVERTED
```

### PenaltyMode

```solidity
enum PenaltyMode {
  UNDEFINED,
  MIN_STAKE,
  CURRENT_STAKE
}
```

### SlashPenalty

```solidity
struct SlashPenalty {
  uint256 percentSlashed;
  enum SlashingController.PenaltyMode mode;
}
```

### Deposit

```solidity
struct Deposit {
  address proposer;
  uint256 amount;
}
```

### Proposal

```solidity
struct Proposal {
  uint256 subjectId;
  address proposer;
  bytes32 penaltyId;
  uint8 subjectType;
}
```

### _proposalIds

```solidity
struct Counters.Counter _proposalIds
```

### proposals

```solidity
mapping(uint256 => struct SlashingController.Proposal) proposals
```

### deposits

```solidity
mapping(uint256 => uint256) deposits
```

### penalties

```solidity
mapping(bytes32 => struct SlashingController.SlashPenalty) penalties
```

### slashingExecutor

```solidity
contract ISlashingExecutor slashingExecutor
```

### subjectGateway

```solidity
contract StakeSubjectGateway subjectGateway
```

### depositAmount

```solidity
uint256 depositAmount
```

### slashPercentToProposer

```solidity
uint256 slashPercentToProposer
```

### depositToken

```solidity
contract IERC20 depositToken
```

### _transitionTable

```solidity
StateMachines.Machine _transitionTable
```

### version

```solidity
string version
```

### MAX_EVIDENCE_LENGTH

```solidity
uint256 MAX_EVIDENCE_LENGTH
```

### MAX_CHAR_LENGTH

```solidity
uint256 MAX_CHAR_LENGTH
```

### HUNDRED_PERCENT

```solidity
uint256 HUNDRED_PERCENT
```

### SlashProposalUpdated

```solidity
event SlashProposalUpdated(address updater, uint256 proposalId, enum StateMachines.State stateId, address proposer, uint256 subjectId, uint8 subjectType, bytes32 penaltyId)
```

### EvidenceSubmitted

```solidity
event EvidenceSubmitted(uint256 proposalId, enum StateMachines.State stateId, string[] evidence)
```

### DepositAmountChanged

```solidity
event DepositAmountChanged(uint256 amount)
```

### SlashPercentToProposerChanged

```solidity
event SlashPercentToProposerChanged(uint256 amount)
```

### DepositSubmitted

```solidity
event DepositSubmitted(uint256 proposalId, address proposer, uint256 amount)
```

### DepositReturned

```solidity
event DepositReturned(uint256 proposalId, address proposer, uint256 amount)
```

### DepositSlashed

```solidity
event DepositSlashed(uint256 proposalId, address proposer, uint256 amount)
```

### SlashPenaltyAdded

```solidity
event SlashPenaltyAdded(bytes32 penaltyId, uint256 percentSlashed, enum SlashingController.PenaltyMode mode)
```

### SlashPenaltyRemoved

```solidity
event SlashPenaltyRemoved(bytes32 penaltyId, uint256 percentSlashed, enum SlashingController.PenaltyMode mode)
```

### WrongSlashPenaltyId

```solidity
error WrongSlashPenaltyId(bytes32 penaltyId)
```

### NonRegisteredSubject

```solidity
error NonRegisteredSubject(uint8 subjectType, uint256 subjectId)
```

### WrongPercentValue

```solidity
error WrongPercentValue(uint256 value)
```

### onlyValidSlashPenaltyId

```solidity
modifier onlyValidSlashPenaltyId(bytes32 penaltyId)
```

### onlyValidPercent

```solidity
modifier onlyValidPercent(uint256 percent)
```

### constructor

```solidity
constructor(address _forwarder, address _depositToken) public
```

### initialize

```solidity
function initialize(address __manager, contract ISlashingExecutor __executor, contract StakeSubjectGateway __subjectGateway, uint256 __depositAmount, uint256 __slashPercentToProposer, bytes32[] __slashPenaltyIds, struct SlashingController.SlashPenalty[] __slashPenalties) public
```

Initializer method, access point to initialize inheritance tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| __manager | address | address of AccessManager. |
| __executor | contract ISlashingExecutor |  |
| __subjectGateway | contract StakeSubjectGateway |  |
| __depositAmount | uint256 |  |
| __slashPercentToProposer | uint256 |  |
| __slashPenaltyIds | bytes32[] |  |
| __slashPenalties | struct SlashingController.SlashPenalty[] |  |

### proposeSlash

```solidity
function proposeSlash(uint8 _subjectType, uint256 _subjectId, bytes32 _penaltyId, string[] _evidence) external returns (uint256 proposalId)
```

Creates a slash proposal pointing to a slashable subject. To do so, the proposer must provide a FORT deposit and present evidence.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _subjectType | uint8 | type of the subject. |
| _subjectId | uint256 | ERC721 registry id of the stake subject. |
| _penaltyId | bytes32 | if of the SlashPenalty to inflict upon the subject if the proposal goes through. |
| _evidence | string[] | IPFS hashes of the evidence files, proof of the subject being slash worthy. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | the proposal identifier. |

### dismissSlashProposal

```solidity
function dismissSlashProposal(uint256 _proposalId, string[] _evidence) external
```

Arbiter dismisses a slash proposal (the proposal is legitimate, but after investigation, it is not a slashable offense)
The deposit is returned to the proposer, and the stake of the subject is unfrozen

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | the proposal identifier. |
| _evidence | string[] | IPFS hashes of the evidence files, proof of the subject not being slashable. |

### rejectSlashProposal

```solidity
function rejectSlashProposal(uint256 _proposalId, string[] _evidence) external
```

Arbiter rejects a slash proposal, slashing the deposit of the proposer (the proposal is deemed as spam, misconduct, or similar)
and unfreezing the subject's stake.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | the proposal identifier. |
| _evidence | string[] | IPFS hashes of the evidence files, justification for slashing the proposer's deposit. |

### markAsInReviewSlashProposal

```solidity
function markAsInReviewSlashProposal(uint256 _proposalId) external
```

Arbiter recognizes the report as valid and procceeds to investigate. The deposit is returned to proposer, stake remains frozen.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | the proposal identifier. |

### reviewSlashProposalParameters

```solidity
function reviewSlashProposalParameters(uint256 _proposalId, uint8 _subjectType, uint256 _subjectId, bytes32 _penaltyId, string[] _evidence) external
```

After investigation, arbiter updates the proposal's incorrect assumptions. This can only be done if the proposal is IN_REVIEW, and
presenting evidence for the changes.
Changing the subject and subjectType will unfreeze the previous target and freeze the new.
Changing the penalty will affect slashing amounts.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | the proposal identifier. |
| _subjectType | uint8 | type of the subject. |
| _subjectId | uint256 | ERC721 registry id of the stake subject. |
| _penaltyId | bytes32 | if of the SlashPenalty to inflict upon the subject if the proposal goes through. |
| _evidence | string[] | IPFS hashes of the evidence files, proof of need for proposal changes. |

### _updateProposal

```solidity
function _updateProposal(uint256 _proposalId, uint8 _subjectType, uint256 _subjectId, bytes32 _penaltyId) private
```

### markAsReviewedSlashProposal

```solidity
function markAsReviewedSlashProposal(uint256 _proposalId) external
```

Arbiter marks the proposal as reviewed, so the slasher can execute or revert.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | the proposal identifier. |

### revertSlashProposal

```solidity
function revertSlashProposal(uint256 _proposalId, string[] _evidence) external
```

The slashing proposal should not be executed. Stake is unfrozen.
If the proposal is IN_REVIEW, this can be executed by the SLASHING_ARBITER_ROLE.
If the proposal is REVIEWED, this can be executed by the SLASHER_ROLE.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | the proposal identifier. |
| _evidence | string[] | IPFS hashes of the evidence files, proof of the slash being not valid. |

### executeSlashProposal

```solidity
function executeSlashProposal(uint256 _proposalId) external
```

The slashing proposal is executed. Subject's stake is slashed and unfrozen.
The proposer gets a % of the slashed stake as defined by slashPercentToProposer.
Only executable by SLASHER_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | the proposal identifier. |

### getSlashedStakeValue

```solidity
function getSlashedStakeValue(uint256 _proposalId) public view returns (uint256)
```

gets the stake amount to be slashed.
The amount depends on the StakePenalty.
In all cases, the amount will be the minimum of the max slashable stake for the subject and:
MIN_STAKE: a % of the subject's MIN_STAKE
CURRENT_STAKE: a % of the subject's active + inactive stake.

### getSubject

```solidity
function getSubject(uint256 _proposalId) external view returns (uint8 subjectType, uint256 subject)
```

### getProposer

```solidity
function getProposer(uint256 _proposalId) external view returns (address)
```

### setDepositAmount

```solidity
function setDepositAmount(uint256 _amount) external
```

### setSlashPercentToProposer

```solidity
function setSlashPercentToProposer(uint256 _amount) external
```

### setSlashPenalties

```solidity
function setSlashPenalties(bytes32[] _slashReasons, struct SlashingController.SlashPenalty[] _slashPenalties) external
```

### _authorizeRevertSlashProposal

```solidity
function _authorizeRevertSlashProposal(uint256 _proposalId) private view
```

### _unfreeze

```solidity
function _unfreeze(uint256 _proposalId) private
```

### _freeze

```solidity
function _freeze(uint8 _subjectType, uint256 _subjectId) private
```

### _setSlashingExecutor

```solidity
function _setSlashingExecutor(contract ISlashingExecutor _executor) private
```

### _setsubjectGateway

```solidity
function _setsubjectGateway(contract StakeSubjectGateway _subjectGateway) private
```

### _setDepositAmount

```solidity
function _setDepositAmount(uint256 _amount) private
```

### _setSlashPercentToProposer

```solidity
function _setSlashPercentToProposer(uint256 _amount) private
```

### _setSlashPenalties

```solidity
function _setSlashPenalties(bytes32[] _slashReasons, struct SlashingController.SlashPenalty[] _slashPenalties) private
```

### _submitEvidence

```solidity
function _submitEvidence(uint256 _proposalId, enum StateMachines.State _stateId, string[] _evidence) private
```

### _returnDeposit

```solidity
function _returnDeposit(uint256 _proposalId) private
```

### _slashDeposit

```solidity
function _slashDeposit(uint256 _proposalId) private
```

### transitionTable

```solidity
function transitionTable() public view virtual returns (StateMachines.Machine)
```

