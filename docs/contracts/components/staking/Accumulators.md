## EPOCH_LENGTH

## Accumulators

### getLatestAccumulated

```solidity
function getLatestAccumulated(struct Accumulators.Accumulator acc) internal view returns (uint256)
```

### getAccumulatedForEpoch

```solidity
function getAccumulatedForEpoch(struct Accumulators.Accumulator acc, uint256 epoch) internal view returns (uint256)
```

### getEpochTotalFromInitialRate

```solidity
function getEpochTotalFromInitialRate(struct Accumulators.Accumulator acc, uint256 epoch) internal view returns (uint256)
```

### isFirstEpoch

```solidity
function isFirstEpoch(struct Accumulators.Accumulator acc, uint256 epoch) internal view returns (bool)
```

### addRate

```solidity
function addRate(struct Accumulators.Accumulator acc, uint256 rate) internal
```

### subRate

```solidity
function subRate(struct Accumulators.Accumulator acc, uint256 rate) internal
```

### setRate

```solidity
function setRate(struct Accumulators.Accumulator acc, uint256 rate) internal
```

### latest

```solidity
function latest(struct Accumulators.Accumulator acc) internal view returns (struct Accumulators.EpochCheckpoint)
```

### checkPointLength

```solidity
function checkPointLength(struct Accumulators.Accumulator acc) internal view returns (uint256)
```

### getCheckpointAtEpoch

```solidity
function getCheckpointAtEpoch(struct Accumulators.Accumulator acc, uint256 epochNumber) internal view returns (struct Accumulators.EpochCheckpoint)
```

_Returns the most recent checkpoint during a given epoch. If a checkpoint is not available at that
epoch, the closest one before it is returned, or a zero epoch checkpoint otherwise._

### zeroEpoch

```solidity
function zeroEpoch() private pure returns (struct Accumulators.EpochCheckpoint)
```

### getEpochNumber

```solidity
function getEpochNumber(uint256 timestamp) internal pure returns (uint32)
```

### getCurrentEpochNumber

```solidity
function getCurrentEpochNumber() internal view returns (uint32)
```

### getEpochStartTimestamp

```solidity
function getEpochStartTimestamp(uint256 epochNumber) internal pure returns (uint256)
```

### getCurrentEpochStartTimestamp

```solidity
function getCurrentEpochStartTimestamp() internal view returns (uint256)
```

### getEpochEndTimestamp

```solidity
function getEpochEndTimestamp(uint256 epochNumber) internal pure returns (uint256)
```

### getCurrentEpochEndTimestamp

```solidity
function getCurrentEpochEndTimestamp() internal view returns (uint256)
```

### isCurrentEpoch

```solidity
function isCurrentEpoch(uint256 timestamp) internal view returns (bool)
```