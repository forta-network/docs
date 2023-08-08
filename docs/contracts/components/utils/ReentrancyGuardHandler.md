## ReentrancyGuardHandlerUpgradeable

_Based in OZ's ReentracyGuardUpgradeable, but without it's own storage so
we can insert the guard respecting storage layout.

Contract module that helps prevent reentrant calls to a function.

Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
available, which can be applied to functions to make sure there are no nested
(reentrant) calls to them.

Note that because there is a single `nonReentrant` guard, functions marked as
`nonReentrant` may not call one another. This can be worked around by making
those functions `private`, and then adding `external` `nonReentrant` entry
points to them.

TIP: If you would like to learn more about reentrancy and alternative ways
to protect against it, check out our blog post
[Reentrancy After Istanbul](https://blog.openzeppelin.com/reentrancy-after-istanbul/).

### _NOT_ENTERED

```solidity
uint256 _NOT_ENTERED
```

### _ENTERED

```solidity
uint256 _ENTERED
```

### __ReentrancyGuard_init

```solidity
function __ReentrancyGuard_init() internal
```

### __ReentrancyGuard_init_unchained

```solidity
function __ReentrancyGuard_init_unchained() internal
```

### _setStatus

```solidity
function _setStatus(uint256 newStatus) internal virtual
```

### _getStatus

```solidity
function _getStatus() internal virtual returns (uint256)
```

### nonReentrant

```solidity
modifier nonReentrant()
```

_Prevents a contract from calling itself, directly or indirectly.
Calling a `nonReentrant` function from another `nonReentrant`
function is not supported. It is possible to prevent this from happening
by making the `nonReentrant` function external, and making it call a
`private` function that does the actual work._