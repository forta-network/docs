## FortaExtendedMock

### version

```solidity
function version() external pure returns (string)
```

Contract version

_Since FortaCommon is IVersioned, Forta is deployed in L1 and FortaBridgedPolygon in L2,
we need to implement the interface with a method instead of immutable variable._

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | version of FORT deployed in L1 |