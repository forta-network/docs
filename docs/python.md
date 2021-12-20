# Python SDK

The Forta Agent Python SDK comes with a set of classes to provide a consistent interface for developers to write their agents. There are also some utility functions available for your convenience to do common operations like searching for an event in a transaction receipt. Check out the Python agents in our [examples repo](https://github.com/forta-protocol/forta-agent-examples) to learn more.

**NOTE**: while you can write agents in Python, you would still use the Node.js `forta-agent` CLI tool to run the agent

## Handlers

The most relevant functions for agent developers are the handler functions: `initialize`, `handle_block` and `handle_transaction`.

Your `agent.py` file must declare a `handle_block` and/or `handle_transaction` function. You can implement one or both of these depending on your use case, but at least one must be provided. These functions take a `BlockEvent` or `TransactionEvent` as their input, respectively, and return an array of zero or more `Finding` objects.

You can also optionally declare an `initialize` function that will be executed on agent startup. This is useful for fetching some data from the network or parsing some file before your agent begins.

## BlockEvent

When a block is mined and detected by a Forta scan node, it will generate a `BlockEvent` containing information such as the block hash and block number. It contains the following fields:

- `type` - specifies whether this was a block reorg or a regular block
- `network` - specifies which network the block was mined on (e.g. mainnet, ropsten, rinkeby, etc)
- `block_hash` - alias for `block.hash`
- `block_number` - alias for `block.number`
- `block` - data object containing the following fields:
    - `difficulty`
    - `extra_data`
    - `gas_limit`
    - `gas_used`
    - `hash`
    - `logs_bloom`
    - `miner`
    - `mix_hash`
    - `nonce`
    - `number`
    - `parent_hash`
    - `receipts_root`
    - `sha3_uncles`
    - `size`
    - `state_root`
    - `timestamp`
    - `total_difficulty`
    - `transactions`
    - `transactions_root`
    - `uncles`

## TransactionEvent

When a transaction is mined and detected by a Forta scan node, it will generate a `TransactionEvent` containing various information about the transaction. It contains the following fields:

- `type` - specifies whether this was from a block reorg or a regular block
- `network` - specifies which network the transaction was mined on (e.g. mainnet, ropsten, rinkeby, etc)
- `hash` - alias for `transaction.hash`
- `from_` - alias for `transaction.from_`
- `to` - alias for `transaction.to`
- `gas_price` - alias for `transaction.gas_price`
- `gas_used` - alias for `receipt.gas_used`
- `status` - alias for `receipt.status`
- `logs` - alias for `receipt.logs`
- `timestamp` - alias for `block.timestamp`
- `block_number` - alias for `block.number`
- `block_hash` - alias for `block.hash`
- `addresses` - map of addresses involved in the transaction (generated from transaction to/from address, any event log address and trace data address if available)
- `block` - data object containing following fields:
    - `hash`
    - `number`
    - `timestamp`
- `transaction` - data object containing the following fields:
    - `hash`
    - `from_`
    - `to`
    - `nonce`
    - `gas`
    - `gas_price`
    - `value`
    - `data`
    - `r`
    - `s`
    - `v`
- `receipt` - receipt object containing the following fields:
    - `status`
    - `root`
    - `gasUsed`
    - `cumulative_gas_used`
    - `logs_bloom`
    - `contract_address`
    - `block_number`
    - `block_hash`
    - `transaction_index`
    - `transaction_hash`
    - `logs` - list of log objects with following fields:
        - `address`
        - `topics`
        - `data`
        - `log_index`
        - `block_number`
        - `block_hash`
        - `transaction_index`
        - `transaction_hash`
        - `removed`
- `traces` - only with tracing enabled; list of trace objects with following fields:
    - `block_hash`
    - `block_number`
    - `subtraces`
    - `trace_address`
    - `transaction_hash`
    - `transaction_position`
    - `type`
    - `error`
    - `action` - object with following fields:
        - `call_type`
        - `to`
        - `from_`
        - `input`
        - `value`
        - `init`
        - `address`
        - `balance`
        - `refund_address`
    - `result` - object with following fields:
        - `gas_used`
        - `address`
        - `code`
        - `output`

### filter_log

`filter_log` is a convenience function on `TransactionEvent` to filter **and decode** transaction logs. For example, you can use it to get all of the Transfer logs in a transaction from a particular ERC-20 token:

```python
erc20_token_address = '0x123abc'
transfer_event_abi = '{"name":"Transfer","type":"event","anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}]}'
transfers = transaction_event.filter_log(transfer_event_abi, erc20_token_address)
print(f'found {transfers.length} transfer events')
```

The underlying library used for decoding event logs is [web3.py](https://web3py.readthedocs.io/en/stable/). The Python SDK uses the web3.py [`processLog`](https://web3py.readthedocs.io/en/stable/contracts.html#web3.contract.ContractEvents.myEvent) method and returns an array of [`Event Log`](https://web3py.readthedocs.io/en/stable/contracts.html#event-log-object) objects. To better understand usage, see the [Python filtering example](https://github.com/forta-protocol/forta-agent-examples/tree/master/filter-event-and-function-py) agent.

### filter_function

`filter_function` is a convenience function on `TransactionEvent` to filter **and decode** function calls in the transaction or traces. For example, you can use it to get all of the transferFrom function calls on a particular ERC-20 token:

```python
erc20_token_address = '0x123abc'
transferFrom_function_abi = '{"name":"transferFrom","type":"function","constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"outputs":[],"payable":false,"stateMutability":"nonpayable"}'
transfers = transaction_event.filter_function(transferFrom_function_abi, erc20_token_address)
print(f'found {transfers.length} function calls')
```

The underlying library used for decoding function calls is [web3.py](https://web3py.readthedocs.io/en/stable/). The Python SDK uses the web3.py [`decode_function_input`](https://web3py.readthedocs.io/en/stable/contracts.html#web3.contract.Contract.decode_function_input) method and returns an array of ([`ContractFunction`](https://web3py.readthedocs.io/en/stable/contracts.html#web3.contract.ContractFunction), `dict`) tuples. To better understand usage, see the [Python filtering example](https://github.com/forta-protocol/forta-agent-examples/tree/master/filter-event-and-function-py) agent.

## Finding

If an agent wants to flag a transaction/block because it meets some condition (e.g. flash loan attack), the handler function would return a `Finding` object. This object would detail the results of the finding and provide metadata such as the severity of the finding. A `Finding` object accepts the following properties:

- `name` - **required**; human-readable name of finding e.g. "High Gas"
- `description` - **required**; brief description e.g. "High gas used: 1,000,000"
- `alert_id` - **required**; unique string to identify this class of finding, primarily used to group similar findings for the end user
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
- `metadata` - optional; dict (both keys and values as strings) for providing extra information
- `everest_id` - optional; [Everest](http://everest.link/) link for information about the specific project/protocol

## get_json_rpc_url

A convenience function called `get_json_rpc_url` can be used to load a JSON-RPC URL for your agent. When running in production, this function will return a URL injected by the scan node that is running the agent. When running locally in development, this function will return the `jsonRpcUrl` property specified in your forta.config.json file.

## get_web3_provider

`get_web3_provider` is a convenience function that returns a [web3.py Provider](https://web3py.readthedocs.io/en/stable/providers.html) which can be used to interact with the blockchain. The value from `get_json_rpc_url` will be used as the JSON-RPC endpoint to connect to.

## create_block_event

A utility function for writing tests. You can use `create_block_event` to easily generate a mock `BlockEvent` object when writing unit tests for your `handle_block` handler. To better understand usage, see the [Python unit test example](https://github.com/forta-protocol/forta-agent-examples/blob/master/minimum-balance-py/src/agent_test.py).

## create_transaction_event

A utility function for writing tests. You can use `create_transaction_event` to easily generate a mock `TransactionEvent` object when writing unit tests for your `handle_transaction` handler. To better understand usage, see the [Python unit test example](https://github.com/forta-protocol/forta-agent-examples/blob/master/high-gas-py/src/agent_test.py).
