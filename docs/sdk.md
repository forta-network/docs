# Javascript/Typescript SDK

The Forta bot Javascript SDK comes with a set of classes and type definitions to provide a consistent interface for developers to write their bots. There are also some utility functions available for your convenience to do common operations like searching for an event in the transaction logs. Check out the Javascript/Typescript bots in our [examples repo](https://github.com/forta-network/forta-bot-examples) to learn more.

## Handlers

The most relevant type definitions for bot developers are the handler types: `Initialize`, `HandleBlock` and `HandleTransaction`. They are function types with the following signatures

```javascript
type Initialize = () => Promise<void>
type HandleTransaction = (txEvent: TransactionEvent) => Promise<Finding[]>
type HandleBlock = (blockEvent: BlockEvent) => Promise<Finding[]>
```

Your `agent.js`/`agent.ts` file must have a default export object with the `handleBlock` and/or `handleTransaction` properties that provide the handler functions. You can export one or both of these depending on your use case, but at least one must be provided. The return type of these functions is `Promise<Finding[]>`, meaning they are asynchronous functions that return an array of zero or more `Finding` objects.

You can also optionally export an `initialize` handler that will be executed on bot startup. This is useful for fetching some data from the network or parsing some file before your bot begins.

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
const transferEvent = "event Transfer(address indexed from, address indexed to, uint256 value)";
const transfers = transactionEvent.filterLog(transferEvent, erc20TokenAddress);
console.log(`found ${transfers.length} transfer events`);
```

The underlying library used for decoding event logs is [ethers.js](https://docs.ethers.io/v5/). The Javascript SDK uses the ethers.js [`parseLog`](https://docs.ethers.io/v5/api/utils/abi/interface/#Interface--parsing) method and returns an array of [`LogDescription`](https://docs.ethers.io/v5/api/utils/abi/interface/#LogDescription) objects (which we modified to also include the originating `address` of the log). To better understand usage, see the [Javascript filtering example](https://github.com/forta-network/forta-bot-examples/tree/master/filter-event-and-function-js) bot.

### filterFunction

`filterFunction` is a convenience function on `TransactionEvent` to filter **and decode** function calls in the transaction or traces. For example, you can use it to get all of the transferFrom function calls on a particular ERC-20 token:

```javascript
const erc20TokenAddress = "0x123abc";
const transferFromFunction = "function transferFrom(address from, address to, uint value)";
const transfers = transactionEvent.filterFunction(transferFromFunction, erc20TokenAddress);
console.log(`found ${transfers.length} function calls`);
```

The underlying library used for decoding function calls is [ethers.js](https://docs.ethers.io/v5/). The Javascript SDK uses the ethers.js [`parseTransaction`](https://docs.ethers.io/v5/api/utils/abi/interface/#Interface--parsing) method and returns an array of [`TransactionDescription`](https://docs.ethers.io/v5/api/utils/abi/interface/#TransactionDescription) objects. To better understand usage, see the [Javascript filtering example](https://github.com/forta-network/forta-bot-examples/tree/master/filter-event-and-function-js) bot.

## Finding

If a bot wants to flag a transaction/block because it meets some condition (e.g. flash loan attack), the handler function would return a `Finding` object. This object would detail the results of the finding and provide metadata such as the severity of the finding. A `Finding` object can only be created using the `Finding.fromObject` method which accepts the following properties:

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

## Alerts

When an `Alert` is fired by a bot the data will be avalible to fetch using the [`getAlerts` method](sdk.md#getalerts). `Alert` objects have the following properties:

- `addresses` -  human-readable list of addresses involved in the alert
- `alertId` -  unique string to identify this class of finding
- `contracts` -  list of contracts related to the alert
- `createdAt` -  timestamp when the alert was published
- `description` - text description of the alert
- `name` - alert name
- `protocol` - name of protocol being reported on
- `scanNodeCount` - number of scanners that found the alert
- `source` - source where the alert was detected
    - block - block where the threat was detected
    - bot - bot that triggered the alert
    - transactionHash - transaction where the threat was detected
- `projects` - list of Web3 projects related to the alert
    - contacts - list of contact info
    - id - project identifier
    - name - user-friendly name of the project
    - token
    - social
    - website - main website of the project
- `findingType` -  indicates type of finding:
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

## getJsonRpcUrl

A convenience function called `getJsonRpcUrl` can be used to load a JSON-RPC URL for your bot. When running in production, this function will return a URL injected by the scan node that is running the bot. When running locally in development, this function will return the `jsonRpcUrl` property specified in your forta.config.json file (or `https://cloudflare-eth.com/` by default).

## getEthersProvider

`getEthersProvider` is a convenience function that returns an [ethers.js Provider](https://docs.ethers.io/v5/api/providers/) which can be used to interact with the blockchain. The value from `getJsonRpcUrl` will be used as the JSON-RPC endpoint to connect to.

## getTransactionReceipt

A convenience function called `getTransactionReceipt` can be used to fetch the entire receipt of a transaction and returned in a format matching the SDK `Receipt` interface.

## getAlerts

A method called `getAlerts` can be used to fetch alerts based on input `AlertQueryOptions`. The `getAlerts` method accepts the following input filter properties:

- `botIds` **required**; list of bot ids to fetch alerts for
- `addresses` -  indicate a list of addresses, alerts returned will have those addresses involved.
- `alertId` - filter alerts by alert-id
- `chainId` - EIP155 identifier of the chain alerts returned will only be from the specific chain Id Default is 1 = Ethereum Mainnet
- `createdSince` - indicate number of milliseconds, alerts returned will be alerts created since the number of milliseconds indicated ago
- `first` - indicate max number of results.
- `startingCursor` - query results after the specified cursor
- `projectId` - indicate a project id, alerts returned will only be from that project.
- `scanNodeConfirmations` - filter alerts by number of scan nodes confirming the alert
- `severities` - filter alerts by severity levels
- `transactionHash` - indicate a transaction hash, alerts returned will only be from that transaction
- `blockSortDirection` - indicate sorting order by block number, 'desc' or 'asc'. Default is 'desc'.
- `blockDateRange` - alerts returned will be between the specified start and end block timestamp dates when the threats were detected
- `blockNumberRange` - alerts for the block number range will be returned

The returned alerts are formatted to match the SDK `AlertsResponse` interface the looks like:

```javascript
{
    alerts: Alert[],
    pageInfo: {
        hasNextPage: boolean,
        endCursor?: {
            alertId: string,
            blockNumber: number
        }
    }
}
```

Below is an example of using the sdk:

```javascript
import { getAlerts } from "forta-agent"
import { AlertsResponse } from "forta-agent/dist/sdk/graphql/forta";

const main = async () => {

  let hasNext = true;
  let startingCursor = undefined;

  while(hasNext) {
    const results: AlertsResponse = await getAlerts({
      botIds: ["0xddb7c17e370ecd5f99cadcddb39cfa51264e989c5133c490046d63a299dd68f0"], 
      transactionHash: "0xc65af85a3fab1e538f6f521cd0a6e6d246c2f76c05aa8fba40817b59de7401b6"
    })
    
    hasNext = results.pageInfo.hasNextPage;
    startingCursor = results.pageInfo.endCursor;

    results.alerts.forEach(a => console.log(`${JSON.stringify(a)} \n`))
  }
}


main();
```

## fetchJwt

Scan nodes allow bots to make authorized requests to external APIs by using the scan node's identity, without letting the scan node modify the requests. You can use the `fetchJwt` utility function to generate a jwt token from a scan node.

!!! warning "This method will only generate a token if the bot is running on a scan node"
    If running a bot locally or in a stand alone enviornment (ie. outside of a scanner node), this method will return a mock value.

The function signature is `fetchJwt(claims, expiresAt)`:
- `claims`:  a json object of any additional claims you would like to include in the payload of the JWT
- `expiresAt`:  an optional `Date` object that sets when the JWT will expire

The returned JWT can be decoded using the [`decodeJwt` method](sdk.md#decodeJwt).

``` javascript

let token;

const initialize: Initialize = async (blockEvent: BlockEvent) => {
  token = await fetchJwt(claims: {key: value})
  ...
}
```
## verifyJwt

A utility method intended to be used on an external server for verifying the claims and signature of a JWT generated by a scan node. This method verifies that the JWT was generated and signed by the same scan node the bot is running on. [See an example usage](jwt-auth.md#detection-bot-authentication-example) of verifying a JWT

- `token` - **required**  a JWT token generated by `fetchJwt`
## decodeJwt

A utility method for decoding the header and payload of a Jwt returned from a scan node.

- `token` - **required**  a JWT token generated by `fetchJwt`

``` javascript
let jwt;

const initialize: Initialize = async (blockEvent: BlockEvent) => {
  const token = await fetchJwt(claims: {key: value})
  jwt = decodeJwt(token)

  ...
}
```

!!! warning "This method will not verify the signature of a JWT"

## createBlockEvent

A utility function for writing tests. You can use `createBlockEvent` to easily generate a mock `BlockEvent` object when writing unit tests for your `handleBlock` handler. To better understand usage, see the [Typescript unit test example](https://github.com/forta-network/forta-bot-examples/blob/master/minimum-balance-ts/src/agent.spec.ts).

## createTransactionEvent

A utility function for writing tests. You can use `createTransactionEvent` to easily generate a mock `TransactionEvent` object when writing unit tests for your `handleTransaction` handler. To better understand usage, see the [Javascript unit test example](https://github.com/forta-network/forta-bot-examples/blob/master/high-gas-js/src/high.gas.used.spec.js).
