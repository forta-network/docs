# Python SDK

The Forta bot Python SDK comes with a set of classes to provide a consistent interface for developers to write their bots. There are also some utility functions available for your convenience to do common operations like searching for an event in the transaction logs. Check out the Python bots in our [examples repo](https://github.com/forta-network/forta-bot-examples) to learn more.

**NOTE**: while you can write bots in Python, you would still use the Node.js `forta-agent` CLI tool to run the bot.

## Handlers

The most relevant functions for bot developers are the handler functions: `initialize`, `handle_block`, `handle_transaction` and `handle_alert`.

Your `agent.py` file must declare at least one of the `handle_block`, `handle_transaction` or `handle_alert` functions. You can implement one or all of these depending on your use case, but at least one must be provided. These functions take a `BlockEvent`, `TransactionEvent` or `AlertEvent` as their input, respectively, and return an array of zero or more `Finding` objects.

You can also optionally declare an `initialize` function that will be executed on bot startup. This is useful for fetching some data from the network or parsing some file before your bot begins. If you are using the `handle_alert` handler, then the `initialize` function is **required** to return which bot's alerts you want to subscribe to (see the pattern for [consuming bot alerts](handle-alert.md) for more information). If you don't want to subscribe to any bot alerts, don't return anything.

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

## AlertEvent

When an alert is fired from a Forta bot and is detected by the network, any subscribing bots will receive an `AlertEvent` containing various information about the alert (see the pattern for [consuming bot alerts](handle-alert.md) for more information). It contains the following fields:

- `alert` - data object containing an [Alert](python.md#alert)
- `alert_id` - alias for `alert.alert_id`
- `name` - alias for `alert.name`
- `hash` - alias for `alert.hash`
- `bot_id` - alias for `alert.source.bot.id`
- `transaction_hash` - alias for `alert.source.transaction_hash`
- `block_hash` - alias for `alert.source.block.hash`
- `block_number` - alias for `alert.source.block.number`
- `chain_id` - alias for `alert.chain_id`
- `has_address` - alias function for [`alert.has_address`](python.md#has_address)

## Finding

If a bot wants to flag a transaction/block/alert because it meets some condition (e.g. flash loan attack), the handler function would return a `Finding` object. This object would detail the results of the finding and provide metadata such as the severity of the finding. A `Finding` object accepts the following properties:

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
- `labels` - optional; array of `Label` objects to attach to this finding

## Alert

When an `Alert` is fired by a Forta bot, it can be consumed using an [AlertEvent](python.md#alertevent) or manually queried using the [`get_alerts`](python.md#getalerts) method. `Alert` objects have the following properties:

- `alert_id` -  unique string to identify this class of finding
- `chain_id` - chain ID where this alert was fired
- `addresses` -  list of addresses involved in the alert (currently truncated at 50 addresses)
- `labels` - list of [Labels](python.md#label) associated to the alert
- `contracts` -  list of contracts related to the alert
- `created_at` -  timestamp when the alert was published
- `description` - text description of the alert
- `name` - alert name
- `protocol` - name of protocol being reported on
- `scan_node_count` - number of scanners that found the alert
- `source` - source where the alert was detected
    - `transaction_hash` - transaction where the alert was detected
    - `block` - block where the alert was detected
        - `timestamp`
        - `chain_id`
        - `hash`
        - `number`
    - `bot` - bot that triggered the alert
        - `id`
        - `reference`
        - `image`
    - `sourceAlert` - alert that triggered this alert
        - `hash`
        - `bot_id`
        - `timestamp`
        - `chain_id`
- `projects` - list of Web3 projects related to the alert
    - `contacts` - list of contact info
    - `id` - project identifier
    - `name` - user-friendly name of the project
    - `token`
    - `social`
    - `website` - main website of the project
- `finding_type` -  indicates type of finding:
    - Exploit
    - Suspicious
    - Degraded
    - Info
    - Unknown
- `severity` - indicates impact level of finding:
    - Critical - exploitable vulnerabilities, massive impact on users/funds
    - High - exploitable under more specific conditions, significant impact on users/funds
    - Medium - notable unexpected behaviours, moderate to low impact on users/funds
    - Low - minor oversights, negligible impact on users/funds
    - Info - miscellaneous behaviours worth describing
- `metadata` - key-value map (both keys and values as strings) for providing extra information

### has_address

`has_address` is a convenience function on `Alert` meant for checking the existence of an address involved in the alert. The `addresses` array is truncated for space-efficiency, so this method uses a bloom filter to check for existence. It accepts a single string parameter: the address to check

## Label

Labels can be used to add more contextual data to a `Finding` e.g. "is this address an attacker?". The `Label` object has the following properties:

- `id` - string identifier of this label
- `entity_type` - enum indicating type of entity:
    - `Address`
    - `Transaction`
    - `Block`
    - `Url`
    - `Unknown`
- `entity` - string identifier of the entity being labelled e.g. transaction hash
- `label` - string label to attach to the entity e.g. "exploit"
- `confidence` - confidence level of label between 0 and 1
- `metadata` - key-value map (both keys and values as strings) for providing extra information
- `created_at` - string containing timestamp of label creation
- `source` - object with information about where this label came from
    - `alert_hash`
    - `alert_id`
    - `id`
    - `chain_id`
    - `bot`
        - `id`
        - `image`
        - `image_hash`
        - `manifest`

## get_json_rpc_url

A convenience function called `get_json_rpc_url` can be used to load a JSON-RPC URL for your bot. When running in production, this function will return a URL injected by the scan node that is running the bot. When running locally in development, this function will return the `jsonRpcUrl` property specified in your forta.config.json file (or `https://cloudflare-eth.com/` by default).

## get_web3_provider

`get_web3_provider` is a convenience function that returns a [web3.py Provider](https://web3py.readthedocs.io/en/stable/providers.html) which can be used to interact with the blockchain. The value from `get_json_rpc_url` will be used as the JSON-RPC endpoint to connect to.

## get_transaction_receipt

A convenience function called `get_transaction_receipt` can be used to fetch the entire receipt of a transaction and returned in a format matching the SDK `Receipt` interface.

## get_alerts

The `get_alerts` method can be used to fetch alerts based on input `AlertQueryOptions`. The `get_alerts` method accepts the following input filter properties:

- `bot_ids` **required**; list of bot ids to fetch alerts for
- `addresses` -  indicate a list of addresses, alerts returned will have those addresses involved.
- `alert_id` - filter alerts by alert-id
- `chain_id` - EIP155 identifier of the chain alerts returned will only be from the specific chain Id Default is 1 = Ethereum Mainnet
- `created_since` - indicate number of milliseconds, alerts returned will be alerts created since the number of milliseconds indicated ago (note: if not specified, the query will only search the past 24 hours)
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
from forta_agent import get_alerts

response = get_alerts({
    'bot_ids': ["0x79af4d8e0ea9bd28ed971f0c54bcfe2e1ba0e6de39c4f3d35726b15843990a51"],
})
has_next = response.page_info.has_next_page
alerts = response.alerts
```

## get_labels

The `get_labels` method can be used to fetch labels based on input `LabelQueryOptions`. The `get_labels` method accepts the following input filter properties (at least one of `entities`, `labels` or `source_ids` is **required**):

- `entities` - string array to filter by label entities (e.g. wallet addresses, block/tx hashes)
- `labels` - string array to filter the label value (e.g. "attacker")
- `source_ids` - string array to filter the label sources (e.g. bot IDs)
- `entity_type` - string to filter labels by `EntityType` (see [label](#label) section for possible types)
- `state` - boolean, set to `true` if only the current state is desired
- `created_since` - integer timestamp in milliseconds, labels returns will be created after this timestamp
- `created_before` - integer timestamp in milliseconds, labels returned will be created before this timestamp
- `first` - integer indicating max number of results
- `starting_cursor` - query results after the specified cursor object

The returned labels are formatted to match the SDK `LabelsResponse` class, below is an example using this method:

```python
from forta_agent import get_labels

response = get_labels({
    'source_ids': ["0x79af4d8e0ea9bd28ed971f0c54bcfe2e1ba0e6de39c4f3d35726b15843990a51"],
})
has_next = response.page_info.has_next_page
labels = response.labels
```

## fetch_jwt

Scan nodes allow bots to make authorized requests to external APIs by using the scan node's identity, without letting the scan node modify the requests. You can use the `fetch_jwt` utility function to generate a jwt token from a scan node.

!!! warning "This method will only generate a token if the bot is running on a scan node"
    If running a bot locally or in a stand alone enviornment (ie. outside of a scanner node), this method will throw an error. For local testing you can run a local scan node and run your bot on it.

The function signature is `fetch_jwt(claims, expiresAt)`:
- `claims` [**required**]:  a dictionary of any data you would like to include in the data portion of the JWT
- `expiresAt`:  an optional `datetime` that sets when the JWT will expire

The returned JWT can be decoded using the [`decode_jwt` method](sdk.md#decode_jwt).

## verify_jwt

A utility method intended to be used on an external server for verifying the claims and signature of a JWT generated by a scan node. This method verifies that the JWT was generated and signed by the same scan node the bot is running on. [See an example usage](jwt-auth.md#detection-bot-authentication-example) of verifying a JWT

- `token` - **required**  a JWT token generated by `fetch_jwt`
## decode_jwt

A utility method for decoding the header and payload of a JWT returned from a scan node

The function signature is `decode_jwt(token)`:
!!! warning "This method will not verify the signature of a JWT"
## create_block_event

A utility function for writing tests. You can use `create_block_event` to easily generate a mock `BlockEvent` object when writing unit tests for your `handle_block` handler. To better understand usage, see the [Python unit test example](https://github.com/forta-network/forta-bot-examples/blob/master/minimum-balance-py/src/agent_test.py).

## create_transaction_event

A utility function for writing tests. You can use `create_transaction_event` to easily generate a mock `TransactionEvent` object when writing unit tests for your `handle_transaction` handler. To better understand usage, see the [Python unit test example](https://github.com/forta-network/forta-bot-examples/blob/master/high-gas-py/src/agent_test.py).
