# Testing your agent

The code for a simple Forta Agent can be found in the src/agent.ts file. The entry point for your agent will always be a file named agent.ts (or agent.js/agent.py if using Javascript/Python, respectively). At the end of this file, you will find:

```javascript
export default {
  handleTransaction,
  handleBlock,
};
```

We are exporting 2 functions inside of an object: `handleTransaction` and `handleBlock`. These functions are where the logic of your agent will live. As blocks and transactions are added to the blockchain, these functions will be invoked to allow the agent to scan for certain conditions and return any findings. You can export either one or both of these functions based on your requirements.

Let’s take a closer look at the `handleTransaction` function:

```javascript
const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];

  // create finding if gas used is higher than threshold
  const gasUsed = new BigNumber(txEvent.gasUsed);
  if (gasUsed.isGreaterThan("1000000")) {
    findings.push(
      Finding.fromObject({
        name: "High Gas Used",
        description: `Gas Used: ${gasUsed}`,
        alertId: "FORTA-1",
        severity: FindingSeverity.High,
        type: FindingType.Suspicious,
      })
    );
  }

  return findings;
};
```

The signature of this function is `(txEvent: TransactionEvent) => Promise<Finding[]>`. That is, it accepts a `TransactionEvent` as an input, and returns a Promise of an array of `Finding` objects. In this simple example, we check whether the amount of gas used by a transaction is above 1 million. If so, we flag the transaction as suspicious by creating a Finding object. We then return what we found in the `findings` array. Pretty straightforward.

## Manual testing

Now let’s manually test this agent with some real data to see how it behaves. First, let’s specify a JSON-RPC provider in the forta.config.json file. Uncomment the `jsonRpcUrl` property and set it to a HTTP provider (e.g. https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY). Now we can begin throwing mainnet transactions at our agent and observe the output:

```bash
$ npm start
```

!!! note "npm scripts"
    The package.json file includes a set of npm scripts which invoke the `forta-agent` CLI tool. When invoking `npm start` to run the agent, we are using the `forta-agent run` command.

Since our gas threshold is pretty high (1 million), we may not flag a lot of transactions. To quickly make changes and see them take effect, try changing the threshold to a lower number and save the agent.ts file. The agent should automatically restart with your new changes.

## Automated testing

A complete agent testing strategy will include automated unit tests that can quickly verify the behaviour of the agent. For your convenience, unit tests are included in the starter projects as examples. We use the `jest` testing framework in the Javascript/Typescript projects, and `pytest` in the Python project. These are only suggestions and you should feel free to use whichever testing framework you prefer. You can run the included unit tests with the following command:

```bash
$ npm test
```

## Code review

We strongly recommend conducting code reviews within your team as a best practice. This will help ensure that any bugs are identified and any edge cases are covered by your agent.
