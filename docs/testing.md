# Testing your bot

Once you have initialized your bot, it’s now time to test it.

=== "Typescript/Javascript"

    The code for a simple Forta detection bot can be found in the src/bot.ts file. Towards the end of this file, you will find:

    ```Typescript
    async function main() {
      scanEthereum({
        rpcUrl: "https://cloudflare-eth.com/",
        handleTransaction,
      });
      ...
    }
    ```

    A `main()` method is declared which serves as the entrypoint for the bot. Inside `main()`, the `scanEthereum` SDK method is being invoked which will start scanning the Ethereum mainnet chain using the `rpcUrl` provided. As blocks and transactions are mined, the provided `handleTransaction` function will be invoked with blockchain data to allow the bot to scan for certain conditions and return any findings.

    Let’s take a closer look at the `handleTransaction` function:

    ```Typescript
    export const ERC20_TRANSFER_EVENT =
      "event Transfer(address indexed from, address indexed to, uint256 value)";
    export const TETHER_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    export const TETHER_DECIMALS = 6;

    const handleTransaction: HandleTransaction = async (
      txEvent: TransactionEvent,
      provider: JsonRpcProvider
    ) => {
      const findings: Finding[] = [];

      // filter the transaction logs for Tether transfer events
      const tetherTransferEvents = txEvent.filterLog(
        ERC20_TRANSFER_EVENT,
        TETHER_ADDRESS
      );

      tetherTransferEvents.forEach((transferEvent) => {
        // extract transfer event arguments
        const { to, from, value } = transferEvent.args;
        // shift decimals of transfer value
        const normalizedValue = value / BigInt(10 ** TETHER_DECIMALS);

        // if more than 10,000 Tether were transferred, report it
        if (normalizedValue > 10000) {
          findings.push(
            Finding.fromObject({
              name: "High Tether Transfer",
              description: `High amount of USDT transferred: ${normalizedValue}`,
              alertId: "FORTA-1",
              severity: FindingSeverity.Low,
              type: FindingType.Info,
              metadata: {
                to,
                from,
              },
              source: {
                chains: [{ chainId: txEvent.chainId }],
                transactions: [{ hash: txEvent.hash, chainId: txEvent.chainId }],
              },
            })
          );
        }
      });

      return findings;
    };
    ```

    The signature of this function is `(txEvent: TransactionEvent, provider: JsonRpcProvder) => Promise<Finding[]>`. That is, it accepts a `TransactionEvent` and an ethers.js `JsonRpcProvider` as an input, and returns a Promise of an array of `Finding` objects. In this simple example, we check whether there are any Tether token transfer events above 10,000 USDT. If so, we flag the transaction by creating a `Finding` object. We then return what we found in the `findings` array. Pretty straightforward.

=== "Python"

    The code for a simple Forta detection bot can be found in the src/bot.py file. Towards the end of this file, you will find:

    ```Typescript
    async def main():
      await asyncio.gather(
          scan_ethereum({
              'rpc_url': 'https://cloudflare-eth.com/',
              'handle_transaction': handle_transaction
          }),
          ...
      )
    ```

    A `main()` method is declared which serves as the entrypoint for the bot. Inside `main()`, the `scan_ethereum` SDK method is being invoked which will start scanning the Ethereum mainnet chain using the `rpc_url` provided. As blocks and transactions are mined, the provided `handle_transaction` function will be invoked with blockchain data to allow the bot to scan for certain conditions and return any findings.

    Let’s take a closer look at the `handle_transaction` function:

    ```Python
    ERC20_TRANSFER_EVENT = '{"name":"Transfer","type":"event","anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}]}'
    TETHER_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    TETHER_DECIMALS = 6

    async def handle_transaction(tx_event: TransactionEvent, provider: AsyncWeb3):
      findings = []

      # filter the transaction logs for any Tether transfers
      tether_transfer_events = tx_event.filter_log(
          ERC20_TRANSFER_EVENT, TETHER_ADDRESS)

      for transfer_event in tether_transfer_events:
          # extract transfer event arguments
          to = transfer_event['args']['to']
          from_ = transfer_event['args']['from']
          value = transfer_event['args']['value']
          # shift decimals of transfer value
          normalized_value = value / 10 ** TETHER_DECIMALS

          # if more than 10,000 Tether were transferred, report it
          if normalized_value > 10000:
              findings.append(Finding({
                  'name': 'High Tether Transfer',
                  'description': f'High amount of USDT transferred: {normalized_value}',
                  'alert_id': 'FORTA-1',
                  'severity': FindingSeverity.Low,
                  'type': FindingType.Info,
                  'metadata': {
                      'to': to,
                      'from': from_,
                  },
                  'source': {
                      'chains': [{'chain_id': tx_event.chain_id}],
                      'transactions': [{'hash': tx_event.hash, 'chain_id': tx_event.chain_id}]
                  }
              }))

      return findings
    ```

    Theis function accepts a `TransactionEvent` and a web3.py `AsyncWeb3` provider as an input, and returns an array of `Finding` objects. In this simple example, we check whether there are any Tether token transfer events above 10,000 USDT. If so, we flag the transaction by creating a `Finding` object. We then return what we found in the `findings` array. Pretty straightforward.

## Manual testing

Now let’s run this bot locally with some real data from Ethereum mainnet to see how it behaves. We can begin throwing blockchain data at our bot and observe the output with the command:

```
$ npm start
```

!!! info "npm scripts"

    The package.json file includes a set of npm scripts which invoke the `forta-bot` CLI tool. But when invoking `npm start` to run the bot, we are simply invoking the bot script and running it directly.

This will run blocks and transactions against your bot as they are mined. Blockchain data is pulled from the provided [Cloudflare Ethereum gateway](https://cloudflare-eth.com/) (as specified by the `rpcUrl` parameter to `scanEthereum`).

Since our transfer value threshold is pretty high (10 thousand), we may not flag a lot of transactions. To quickly make changes and see them take effect, try changing the threshold to a lower number and save the bot.ts file. The bot should automatically restart with your new changes.

It is also worth mentioning that bots are long-running processes. This means you can maintain state in-memory across blocks and transactions if needed. See the [high transaction volume bot](https://github.com/forta-network/forta-bot-examples/tree/master/high-volume-js) as an example of a stateful bot.

## Setting up a JSON-RPC provider

Detection bots require blockchain data to execute their scanning logic. This means developers will need to provide their bots with data from a JSON-RPC URL. The starter project uses the public Cloudflare JSON-RPC endpoint for easy setup, but you will likely need a non-public URL when deploying to production. Please see [this guide](bot-json-rpc-provider.md) on setting up a JSON-RPC provider.

## Getting test data

If you are writing a bot targeting a particular protocol or contract, you likely already have a wealth of data on the blockchain which you can use to test your bot. By visiting a block explorer (e.g. [Etherscan](https://etherscan.io/)), you can browse the history of transactions on a contract.

For example, you can visit the [Tether token page](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7) on Etherscan and see a list of transfers. From there you can easily pick out a transaction (e.g. `0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813`) and run it against your bot using:

```
$ npm run tx 0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813 --chainId 1
```

Note that you need to specify the `chainId` you are talking about as well. You could also run your bot against all the transactions in a block using:

```
$ npm run block 13682565 --chainId 1
```

Also, if you visit the [transaction's details page](https://etherscan.io/tx/0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813) on Etherscan, you can see more information such as the block number, amount of gas used and which function was invoked. The logs generated by the transaction can also be viewed under the [Logs tab](https://etherscan.io/tx/0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813#eventlog).

## Trace data

Detection bots can use trace data to get further insights into a transaction e.g. which contract function calls were made internally. These are also known as "internal transactions". **Only certain RPC providers provide trace data** through the `TransactionEvent.traces` field (if not available, the traces are an empty array). These traces are fetched using the [`trace_block`](https://openethereum.github.io/JSONRPC-trace-module#trace_block) RPC method of the OpenEthereum trace module. To enable fetching of trace data, you need to use a RPC provider that supports the OpenEthereum trace module (e.g. typically a paid provider like Alchemy) and set the `useTraceData` flag:

=== "Typescript/Javascript"

    ```Typescript
    scanEthereum({
      ...
      useTraceData: true
    })
    ```

=== "Python"

    ``` Python
    scan_ethereum({
      ...
      'use_trace_data': True
    })
    ```

Not all detection bots will require trace data, but depending on the presence of trace data your detection bot may behave differently (e.g. the `TransactionEvent.filterFunction` utility method will use trace data to filter internal function calls if they are available).

## Automated testing

A complete bot testing strategy will include automated unit tests that can quickly verify the behaviour of the bot. For your convenience, unit tests are included in the starter projects as examples. We use the `jest` testing framework in the Typescript/Javascript projects, and `pytest` in the Python project. These are only suggestions and you should feel free to use whichever testing framework you prefer. You can run the included unit tests with the following command:

```
$ npm test
```

When writing unit tests, you can easily create mock transactions and blocks using the SDK methods `createTransactionEvent` and `createBlockEvent`. See [here](https://github.com/forta-network/forta-bot-examples/blob/master/high-gas-js/src/high.gas.used.spec.js) for an example. Also, you can easily write tests for bots that detect log events or function calls by mocking out the SDK methods `filterLog` and `filterFunction`. See [here](https://github.com/forta-network/forta-bot-examples/blob/master/filter-event-and-function-js/src/large.transfer.event.spec.js) for an example.

## Advanced testing

For more advanced testing involving simulated transactions, check out the [Advanced testing](advanced-testing.md) pattern.

## Code review

We strongly recommend conducting code reviews within your team as a best practice. This will help ensure that any bugs are identified and any edge cases are covered by your bot.

## Best practices

To learn more about bot development best practices, see the [best practices](best-practices.md) section. Be sure to check out [useful libraries](useful-libraries.md) for developing your bots as well. There are also sections describing more advanced bot development patterns like [hiding sensitive data](sensitive-data.md), [consuming bot alerts](handle-alert.md), [publishing private alerts](private-alerts.md), [transaction simulation](tx-simulation.md) and [querying other chains](querying-chains.md).

Once you have tested and reviewed your bot, you can move on to [deploying your bot](deploying.md).
