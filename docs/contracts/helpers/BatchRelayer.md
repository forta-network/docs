## BatchRelayer

Helper contract for deploy scripts for batch transactions.

### relay

```solidity
function relay(address target, bytes[] data) external returns (bytes[] results)
```

_Calls multiple functions on the contract deployed in `target` address. Only callable by owner of BatchRelayer._

| Name | Type | Description |
| ---- | ---- | ----------- |
| target | address | the destination contract. |
| data | bytes[] | encoded method calls with arguments. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| results | bytes[] | of the method calls. |