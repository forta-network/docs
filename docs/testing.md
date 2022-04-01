# Testing your agent

Once you have initialized your agent, it’s now time to test it. The code for a simple Forta Agent can be found in the src/agent.ts file. The entry point for your agent will always be a file named agent.ts (or agent.js/agent.py if using Javascript/Python, respectively). At the end of this file, you will find:

```javascript
export default {
  handleTransaction,
  handleBlock,
};
```

We are exporting 2 functions inside of an object: `handleTransaction` and `handleBlock`. These functions are where the logic of your agent will live. As blocks and transactions are mined to the blockchain, these functions will be invoked with blockchain data to allow the agent to scan for certain conditions and return any findings. You can export either one or both of these functions based on your requirements.

Let’s take a closer look at the `handleTransaction` function:

```javascript
const ERC20_TRANSFER_EVENT = "event Transfer(address indexed from, address indexed to, uint256 value)";
const TETHER_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const TETHER_DECIMALS = 6;

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  // filter the transaction logs for Tether transfer events
  const tetherTransferEvents = txEvent.filterLog(ERC20_TRANSFER_EVENT, TETHER_ADDRESS);

  // for each Tether transfer event
  tetherTransferEvents.forEach((transferEvent) => {
    // extract transfer event arguments
    const { to, from, value } = transferEvent.args;
    // shift decimals of transfer value
    const normalizedValue = value.div(10 ** TETHER_DECIMALS);

    // if more than 10,000 Tether were transferred, report it
    if (normalizedValue.gt(10000)) {
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
        })
      );
    }
  });

  return findings;
};
```

The signature of this function is `(txEvent: TransactionEvent) => Promise<Finding[]>`. That is, it accepts a `TransactionEvent` as an input, and returns a Promise of an array of `Finding` objects. In this simple example, we check whether there any Tether token transfer events above 10,000 USDT. If so, we flag the transaction by creating a `Finding` object. We then return what we found in the `findings` array. Pretty straightforward.

## Manual testing

Now let’s run this agent locally with some real data from Ethereum mainnet to see how it behaves. We can begin throwing blockchain data at our agent and observe the output with the command:

```bash
$ npm start
```

!!! info "npm scripts"
    The package.json file includes a set of npm scripts which invoke the `forta-agent` CLI tool. When invoking `npm start` to run the agent, we are using the `forta-agent run` command.

This will run blocks and transactions against your agent as they are mined. By default, blockchain data is pulled from the [Cloudlfare Ethereum gateway](https://cloudflare-eth.com/). You can also specify a JSON-RPC provider in the forta.config.json file (located in ~/.forta) by uncommenting the `jsonRpcUrl` property and setting it to a HTTP provider (e.g. `https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY`).

Since our transfer value threshold is pretty high (10 thousand), we may not flag a lot of transactions. To quickly make changes and see them take effect, try changing the threshold to a lower number and save the agent.ts file. The agent should automatically restart with your new changes.

It is also worth mentioning that agents are long-running processes. This means you can maintain state in-memory across blocks and transactions if needed. See the [high volume agent](https://github.com/forta-protocol/forta-agent-examples/tree/master/high-volume-js) as an example of a stateful agent.

## Getting test data

If you are writing an agent targeting a particular protocol or contract, you likely already have a wealth of data on the blockchain which you can use to test your agent. By visiting a block explorer (e.g. [Etherscan](https://etherscan.io/)), you can browse the history of transactions on a contract.

For example, you can visit the [Tether token page](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7) on Etherscan and see a list of transfers. From there you can easily pick out a transaction (e.g. `0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813`) and run it against your agent using:
```bash
$ npm run tx 0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813
```
You could also run your agent against all the transactions in a block using:
```bash
$ npm run block 13682565
```

Also, if you visit the [transaction's details page](https://etherscan.io/tx/0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813) on Etherscan, you can see more information such as the block number, amount of gas used and which function was invoked. The logs generated by the transaction can also be viewed under the [Logs tab](https://etherscan.io/tx/0x338c6d7095228544f27ba8479aea6cadbe5aea98806a651f66ef30b3cd7e1813#eventlog).

## Automated testing

A complete agent testing strategy will include automated unit tests that can quickly verify the behaviour of the agent. For your convenience, unit tests are included in the starter projects as examples. We use the `jest` testing framework in the Javascript/Typescript projects, and `pytest` in the Python project. These are only suggestions and you should feel free to use whichever testing framework you prefer. You can run the included unit tests with the following command:

```bash
$ npm test
```

When writing unit tests, you can easily create mock transactions and blocks using the SDK methods `createTransactionEvent` and `createBlockEvent`. See [here](https://github.com/forta-protocol/forta-agent-examples/blob/master/high-gas-js/src/high.gas.used.spec.js) for an example. Also, you can easily write tests for agents that detect log events or function calls by mocking out the SDK methods `filterLog` and `filterFunction`. See [here](https://github.com/forta-protocol/forta-agent-examples/blob/master/filter-event-and-function-js/src/large.transfer.event.spec.js) for an example.

## Advanced testing

For more advanced testing involving simulated transactions, check out the [Advanced testing](advanced-testing.md) pattern.

## Code review

We strongly recommend conducting code reviews within your team as a best practice. This will help ensure that any bugs are identified and any edge cases are covered by your agent. 

## Best practices

To learn more about agent development best practices, see the [Best practices](best-practices.md) section. Be sure to check out [Useful libraries](useful-libraries.md) for developing your agents as well. There are also sections describing more advanced agent patterns like [hiding sensitive data](sensitive-data.md), [publishing private alerts](private-alerts.md), [transaction simulation](tx-simulation.md) and [querying other chains](querying-chains.md).

Once you have tested and reviewed your agent, you can move on to [deploying your agent](deploying.md).