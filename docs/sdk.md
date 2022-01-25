# Javascript/Typescript SDK

The Forta Agent Javascript SDK comes with a set of classes and type definitions to provide a consistent interface for developers to write their agents. There are also some utility functions available for your convenience to do common operations like searching for an event in a transaction receipt. Check out the Javascript/Typescript agents in our [examples repo](https://github.com/forta-protocol/forta-agent-examples) to learn more.

## Handlers

The most relevant type definitions for agent developers are the handler types: `Initialize`, `HandleBlock` and `HandleTransaction`. They are function types with the following signatures

```javascript
type Initialize = () => Promise<void>
type HandleTransaction = (txEvent: TransactionEvent) => Promise<Finding[]>
type HandleBlock = (blockEvent: BlockEvent) => Promise<Finding[]>
```

Your `agent.js`/`agent.ts` file must have a default export object with the `handleBlock` and/or `handleTransaction` properties that provide the handler functions. You can export one or both of these depending on your use case, but at least one must be provided. The return type of these functions is `Promise<Finding[]>`, meaning they are asynchronous functions that return an array of zero or more `Finding` objects.

You can also optionally export an `initialize` handler that will be executed on agent startup. This is useful for fetching some data from the network or parsing some file before your agent begins.

## BlockEvent

When a block is mined and detected by a Forta scan node, it will generate a `BlockEvent` containing information such as the block hash and block number. It contains the following fields:

- `type` - specifies whether this was a block reorg or a regular block
- `network` - specifies which network the block was mined on (e.g. mainnet, ropsten, rinkeby, etc)
- `blockHash` - hash of the block
- `blockNumber` - number of the block
- `block` - data object containing the following fields:
    - `difficulty`
    - `extraData`
    - `gasLimit`
    - `gasUsed`
    - `hash`
    - `logsBloom`
    - `miner`
    - `mixHash`
    - `nonce`
    - `number`
    - `parentHash`
    - `receiptsRoot`
    - `sha3Uncles`
    - `size`
    - `stateRoot`
    - `timestamp`
    - `totalDifficulty`
    - `transactions`
    - `transactionsRoot`
    - `uncles`

## TransactionEvent

When a transaction is mined and detected by a Forta scan node, it will generate a `TransactionEvent` containing various information about the transaction. It contains the following fields:

- `type` - specifies whether this was from a block reorg or a regular block
- `network` - specifies which network the transaction was mined on (e.g. mainnet, ropsten, rinkeby, etc)
- `hash` - alias for `transaction.hash`
- `from` - alias for `transaction.from`
- `to` - alias for `transaction.to`
- `gasPrice` - alias for `transaction.gasPrice`
- `gasUsed` - alias for `receipt.gasUsed`
- `status` - alias for `receipt.status`
- `logs` - alias for `receipt.logs`
- `timestamp` - alias for `block.timestamp`
- `blockNumber` - alias for `block.number`
- `blockHash` - alias for `block.hash`
- `addresses` - map of addresses involved in the transaction (generated from transaction to/from address, any event log address and trace data address if available)
- `block` - data object containing following fields:
    - `hash`
    - `number`
    - `timestamp`
- `transaction` - data object containing the following fields:
    - `hash`
    - `from`
    - `to`
    - `nonce`
    - `gas`
    - `gasPrice`
    - `value`
    - `data`
    - `r`
    - `s`
    - `v`
- `receipt` - receipt object containing the following fields:
    - `status`
    - `root`
    - `gasUsed`
    - `cumulativeGasUsed`
    - `logsBloom`
    - `contractAddress`
    - `blockNumber`
    - `blockHash`
    - `transactionIndex`
    - `transactionHash`
    - `logs` - list of log objects with following fields:
        - `address`
        - `topics`
        - `data`
        - `logIndex`
        - `blockNumber`
        - `blockHash`
        - `transactionIndex`
        - `transactionHash`
        - `removed`
- `traces` - only with tracing enabled; list of trace objects with following fields:
    - `blockHash`
    - `blockNumber`
    - `subtraces`
    - `traceAddress`
    - `transactionHash`
    - `transactionPosition`
    - `type`
    - `error`
    - `action` - object with following fields:
        - `callType`
        - `to`
        - `from`
        - `input`
        - `value`
        - `init`
        - `address`
        - `balance`
        - `refundAddress`
    - `result` - object with following fields:
        - `gasUsed`
        - `address`
        - `code`
        - `output`

### filterLog

`filterLog` is a convenience function on `TransactionEvent` to filter **and decode** transaction logs. For example, you can use it to get all of the Transfer logs in a transaction from a particular ERC-20 token:

```javascript
const erc20TokenAddress = "0x123abc";
const transferEventAbi = "event Transfer(address indexed from, address indexed from, uint256 value)";
const transfers = transactionEvent.filterLog(transferEvent, erc20TokenAddress);
console.log(`found ${transfers.length} transfer events`);
```

The underlying library used for decoding event logs is [ethers.js](https://docs.ethers.io/v5/). The Javascript SDK uses the ethers.js [`parseLog`](https://docs.ethers.io/v5/api/utils/abi/interface/#Interface--parsing) method and returns an array of [`LogDescription`](https://docs.ethers.io/v5/api/utils/abi/interface/#LogDescription) objects (which we modified to also include the originating `address` of the log). To better understand usage, see the [Javascript filtering example](https://github.com/forta-protocol/forta-agent-examples/tree/master/filter-event-and-function-js) agent.

### filterFunction

`filterFunction` is a convenience function on `TransactionEvent` to filter **and decode** function calls in the transaction or traces. For example, you can use it to get all of the transferFrom function calls on a particular ERC-20 token:

```javascript
const erc20TokenAddress = "0x123abc";
const transferFromFunctionAbi = "function transferFrom(address from, address to, uint value)";
const transfers = transactionEvent.filterFunction(transferFromFunction, erc20TokenAddress);
console.log(`found ${transfers.length} function calls`);
```

The underlying library used for decoding function calls is [ethers.js](https://docs.ethers.io/v5/). The Javascript SDK uses the ethers.js [`parseTransaction`](https://docs.ethers.io/v5/api/utils/abi/interface/#Interface--parsing) method and returns an array of [`TransactionDescription`](https://docs.ethers.io/v5/api/utils/abi/interface/#TransactionDescription) objects. To better understand usage, see the [Javascript filtering example](https://github.com/forta-protocol/forta-agent-examples/tree/master/filter-event-and-function-js) agent.

## Finding

If an agent wants to flag a transaction/block because it meets some condition (e.g. flash loan attack), the handler function would return a `Finding` object. This object would detail the results of the finding and provide metadata such as the severity of the finding. A `Finding` object can only be created using the `Finding.fromObject` method which accepts the following properties:

- `name` - **required**; human-readable name of finding e.g. "High Gas"
- `description` - **required**; brief description e.g. "High gas used: 1,000,000"
- `alertId` - **required**; unique string to identify this class of finding, primarily used to group similar findings for the end user
- `protocol` - **required**; name of protocol being reported on e.g. "aave", defaults to "ethereum" if left blank
- `type` - **required**; indicates type of finding:
    - Exploit
    - Suspicious
    - Degraded
    - Info
- `severity` - **required**; indicates impact level of finding:
    - Critical - exploitable vulnerabilities, massive impact on users/funds
    - High - exploitable under more specific conditions, significant impact on users/funds
    - Medium - notable unexpected behaviours, moderate to low impact on users/funds
    - Low - minor oversights, negligible impact on users/funds
    - Info - miscellaneous behaviours worth describing
- `metadata` - optional; key-value map (both keys and values as strings) for providing extra information

## getJsonRpcUrl

A convenience function called `getJsonRpcUrl` can be used to load a JSON-RPC URL for your agent. When running in production, this function will return a URL injected by the scan node that is running the agent. When running locally in development, this function will return the `jsonRpcUrl` property specified in your forta.config.json file.

## getEthersProvider

`getEthersProvider` is a convenience function that returns an [ethers.js Provider](https://docs.ethers.io/v5/api/providers/) which can be used to interact with the blockchain. The value from `getJsonRpcUrl` will be used as the JSON-RPC endpoint to connect to.

## createBlockEvent

A utility function for writing tests. You can use `createBlockEvent` to easily generate a mock `BlockEvent` object when writing unit tests for your `handleBlock` handler. To better understand usage, see the [Typescript unit test example](https://github.com/forta-protocol/forta-agent-examples/blob/master/minimum-balance-ts/src/agent.spec.ts).

## createTransactionEvent

A utility function for writing tests. You can use `createTransactionEvent` to easily generate a mock `TransactionEvent` object when writing unit tests for your `handleTransaction` handler. To better understand usage, see the [Javascript unit test example](https://github.com/forta-protocol/forta-agent-examples/blob/master/high-gas-js/src/high.gas.used.spec.js).