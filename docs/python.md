# Python SDK

The Forta bot Python SDK comes with a set of classes to provide a consistent interface for developers to write their bots. There are also some utility functions available for your convenience to do common operations like searching for an event in the transaction logs. Check out the Python bots in our [examples repo](https://github.com/forta-network/forta-bot-examples) to learn more.

**NOTE**: while you can write bots in Python, you would still use the Node.js `forta-agent` CLI tool to run the bot.

## Handlers

The most relevant functions for bot developers are the handler functions: `initialize`, `handle_block` and `handle_transaction`.

Your `agent.py` file must declare a `handle_block` and/or `handle_transaction` function. You can implement one or both of these depending on your use case, but at least one must be provided. These functions take a `BlockEvent` or `TransactionEvent` as their input, respectively, and return an array of zero or more `Finding` objects.

You can also optionally declare an `initialize` function that will be executed on bot startup. This is useful for fetching some data from the network or parsing some file before your bot begins.

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

The underlying library used for decoding event logs is [web3.py](https://web3py.readthedocs.io/en/stable/). The Python SDK uses the web3.py [`processLog`](https://web3py.readthedocs.io/en/stable/contracts.html#web3.contract.ContractEvents.myEvent) method and returns an array of [`Event Log`](https://web3py.readthedocs.io/en/stable/contracts.html#event-log-object) objects. To better understand usage, see the [Python filtering example](https://github.com/forta-network/forta-bot-examples/tree/master/filter-event-and-function-py) bot.

### filter_function

`filter_function` is a convenience function on `TransactionEvent` to filter **and decode** function calls in the transaction or traces. For example, you can use it to get all of the transferFrom function calls on a particular ERC-20 token:

```python
erc20_token_address = '0x123abc'
transferFrom_function_abi = '{"name":"transferFrom","type":"function","constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"outputs":[],"payable":false,"stateMutability":"nonpayable"}'
transfers = transaction_event.filter_function(transferFrom_function_abi, erc20_token_address)
print(f'found {transfers.length} function calls')
```

The underlying library used for decoding function calls is [web3.py](https://web3py.readthedocs.io/en/stable/). The Python SDK uses the web3.py [`decode_function_input`](https://web3py.readthedocs.io/en/stable/contracts.html#web3.contract.Contract.decode_function_input) method and returns an array of ([`ContractFunction`](https://web3py.readthedocs.io/en/stable/contracts.html#web3.contract.ContractFunction), `dict`) tuples. To better understand usage, see the [Python filtering example](https://github.com/forta-network/forta-bot-examples/tree/master/filter-event-and-function-py) bot.

## Finding

If a bot wants to flag a transaction/block because it meets some condition (e.g. flash loan attack), the handler function would return a `Finding` object. This object would detail the results of the finding and provide metadata such as the severity of the finding. A `Finding` object accepts the following properties:

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

## Alerts

When an `Alert` is fired by a bot the data will be avalible to fetch using the [`get_alerts` method](python.md#getalerts). `Alert` objects have the following properties:

- `addresses` -  human-readable list of addresses involved in the alert
- `alert_id` -  unique string to identify this class of finding
- `contracts` -  list of contracts related to the alert
- `created_at` -  timestamp when the alert was published
- `description` - text description of the alert
- `name` - alert name
- `protocol` - name of protocol being reported on
- `scan_node_count` - number of scanners that found the alert
- `source` - source where the alert was detected
    - block - block where the threat was detected
    - bot - bot that triggered the alert
    - transaction_hash - transaction where the threat was detected
- `projects` - list of Web3 projects related to the alert
    - contacts - list of contact info
    - id - project identifier
    - name - user-friendly name of the project
    - token
    - social
    - website - main website of the project
- `finding_type` -  indicates type of finding:
    - Exploit
    - Suspicious
    - Degraded
    - Info
    - Unknown_Type
- `severity` - indicates impact level of finding:
    - Critical - exploitable vulnerabilities, massive impact on users/funds
    - High - exploitable under more specific conditions, significant impact on users/funds
    - Medium - notable unexpected behaviours, moderate to low impact on users/funds
    - Low - minor oversights, negligible impact on users/funds
    - Info - miscellaneous behaviours worth describing
- `metadata` - key-value map (both keys and values as strings) for providing extra information

## get_json_rpc_url

A convenience function called `get_json_rpc_url` can be used to load a JSON-RPC URL for your bot. When running in production, this function will return a URL injected by the scan node that is running the bot. When running locally in development, this function will return the `jsonRpcUrl` property specified in your forta.config.json file (or `https://cloudflare-eth.com/` by default).

## get_web3_provider

`get_web3_provider` is a convenience function that returns a [web3.py Provider](https://web3py.readthedocs.io/en/stable/providers.html) which can be used to interact with the blockchain. The value from `get_json_rpc_url` will be used as the JSON-RPC endpoint to connect to.

## get_transaction_receipt

A convenience function called `get_transaction_receipt` can be used to fetch the entire receipt of a transaction and returned in a format matching the SDK `Receipt` interface.

## get_alerts

A method called `get_alerts` can be used to fetch alerts based on input `AlertQueryOptions`. The `get_alerts` method accepts the following input filter properties:

- `bot_ids` **required**; list of bot ids to fetch alerts for
- `addresses` -  indicate a list of addresses, alerts returned will have those addresses involved.
- `alert_id` - filter alerts by alert-id
- `chain_id` - EIP155 identifier of the chain alerts returned will only be from the specific chain Id Default is 1 = Ethereum Mainnet
- `created_since` - indicate number of milliseconds, alerts returned will be alerts created since the number of milliseconds indicated ago
- `first` - indicate max number of results.
- `starting_cursor` - query results after the specified cursor
- `project_id` - indicate a project id, alerts returned will only be from that project.
- `scan_node_confirmations` - filter alerts by number of scan nodes confirming the alert
- `severities` - filter alerts by severity levels
- `transaction_hash` - indicate a transaction hash, alerts returned will only be from that transaction
- `block_sort_direction` - indicate sorting order by block number, 'desc' or 'asc'. Default is 'desc'.
- `block_date_range` - alerts returned will be between the specified start and end block timestamp dates when the threats were detected
- `block_number_range` - alerts for the block number range will be returned

The returned alerts are formatted to match the SDK `AlertsResponse` class, below is an example using this method:

```python
import forta_agent
x = forta_agent.get_alerts({
    'bot_ids': ["0x79af4d8e0ea9bd28ed971f0c54bcfe2e1ba0e6de39c4f3d35726b15843990a51"],
})

print(x)
```

## fetchJwtToken

Scan nodes allow bots to make authorized requests to external APIs by using the scan node's identity, without letting the scan node modify the requests. You can use the `fetch_jwt_token` utility function to generate a jwt token from a scan node.

!!! warning "This method will only generate a token if the bot is running on a scan node"
    If running a bot locally or in a stand alone enviornment (ie. outside of a scanner node), this method will throw an error. For local testing you can run a local scan node and run your bot on it.

The function signature is `fetch_Jwt_token(claims, expiresAt)`:
- `claims` [**required**]:  a dictionary of any data you would like to include in the data portion of the JWT
- `expiresAt`:  an optional `datetime` that sets when the JWT will expire

The returned JWT can be decoded using the [`decode_Jwt_token` method](sdk.md#decode_Jwt_token).

## decode_Jwt_token

A utility method for decoding Jwt tokens returned from a scan node
## create_block_event

A utility function for writing tests. You can use `create_block_event` to easily generate a mock `BlockEvent` object when writing unit tests for your `handle_block` handler. To better understand usage, see the [Python unit test example](https://github.com/forta-network/forta-bot-examples/blob/master/minimum-balance-py/src/agent_test.py).

## create_transaction_event

A utility function for writing tests. You can use `create_transaction_event` to easily generate a mock `TransactionEvent` object when writing unit tests for your `handle_transaction` handler. To better understand usage, see the [Python unit test example](https://github.com/forta-network/forta-bot-examples/blob/master/high-gas-py/src/agent_test.py).
