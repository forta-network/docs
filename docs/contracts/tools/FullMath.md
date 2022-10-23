## FullMath

### DenominatorLessOrEqualThanProd

```solidity
error DenominatorLessOrEqualThanProd()
```

### mulDiv

```solidity
function mulDiv(uint256 numerator, uint256 denominator, uint256 target) internal pure returns (uint256 partialAmount)
```

_Multiplication followed by division, without overflow of intermediate values. Lack of overflow is guaranteed if numerator &lt;&#x3D; denominator._

| Name | Type | Description |
| ---- | ---- | ----------- |
| partialAmount | uint256 | target * numerator / denominator |

