## StateMachines

Library to handle Finite State Machines and codify their transitions in a uint256.
NOTE: the number of states is limited to 16.
Rewritten by Hadrien Croubois, https://github.com/Amxx

### Machine

### EMPTY_MACHINE

```solidity
StateMachines.Machine EMPTY_MACHINE
```

### State

```solidity
enum State {
  _00,
  _01,
  _02,
  _03,
  _04,
  _05,
  _06,
  _07,
  _08,
  _09,
  _10,
  _11,
  _12,
  _13,
  _14,
  _15
}
```

### statesToEdge

```solidity
function statesToEdge(enum StateMachines.State fromState, enum StateMachines.State toState) internal pure returns (uint256)
```

### isTransitionValid

```solidity
function isTransitionValid(StateMachines.Machine self, enum StateMachines.State fromState, enum StateMachines.State toState) internal pure returns (bool)
```

### addEdgeTransition

```solidity
function addEdgeTransition(StateMachines.Machine self, enum StateMachines.State fromState, enum StateMachines.State toState) internal pure returns (StateMachines.Machine newMachine)
```

### removeEdgeTransition

```solidity
function removeEdgeTransition(StateMachines.Machine self, enum StateMachines.State fromState, enum StateMachines.State toState) internal pure returns (StateMachines.Machine newMachine)
```

## StateMachineController

Contract that allows for the creation and management of finite state machines.
The state machines will transition following a commonly defined state set.
What each state and state transition means, as well as the business logic of defining a valid transition
are left to the inheriting contract.

### StateTransition

```solidity
event StateTransition(uint256 machineId, enum StateMachines.State fromState, enum StateMachines.State toState)
```

### InvalidState

```solidity
error InvalidState(enum StateMachines.State state)
```

### InvalidStateTransition

```solidity
error InvalidStateTransition(enum StateMachines.State fromState, enum StateMachines.State toState)
```

### _machines

```solidity
mapping(uint256 => enum StateMachines.State) _machines
```

### onlyInState

```solidity
modifier onlyInState(uint256 _machineId, enum StateMachines.State _state)
```

### transitionTable

```solidity
function transitionTable() public view virtual returns (StateMachines.Machine)
```

### _transition

```solidity
function _transition(uint256 _machineId, enum StateMachines.State _newState) internal
```

### currentState

```solidity
function currentState(uint256 _machineId) public view returns (enum StateMachines.State)
```

Checks the current state of a machine.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _machineId | uint256 | the identifier of a machine. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum StateMachines.State | current state identifier. |

