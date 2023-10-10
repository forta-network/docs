# Querying other chains

Forta currently supports scanning on several chains including Ethereum, Polygon, BNB Chain, Avalanche, Arbitrum, Optimism and Fantom. More chains will inevitably be added in the future, but some bots may need to scan data from chains that are not yet officially supported (could be mainnet or testnet). To achieve this, bots can manually read data from any other chain themselves.

This page will describe how to interact with any blockchain using a Javascript example bot. This example builds on the [long running task pattern](long-running-tasks.md) to query the Rinkeby testnet and find transactions with high gas usage. The complete code for this example can be found [here](https://github.com/forta-network/forta-bot-examples/tree/master/querying-other-chains-js).

## Setting up the RPC endpoint

We start by initializing the current Rinkeby block number using the `initialize` handler:

```javascript
const RINKEBY_RPC_URL = "https://rinkeby.infura.io/v3/YOUR_API_KEY";
const rinkebyProvider = new ethers.providers.JsonRpcProvider(RINKEBY_RPC_URL);
let currentRinkebyBlockNumber;

async function initialize() {
  currentRinkebyBlockNumber = await rinkebyProvider.getBlockNumber();
}
```

Note that the RPC URL is hardcoded in the bot since it will not be passed in by the scan node. When using an API key, you probably also want to use obfuscation as shown in the pattern for [protecting sensitive data](sensitive-data.md) or load the API key securely using [JWT authentication](jwt-auth.md).

## Scanning blocks

Now we can manually fetch blocks from Rinkeby and scan over each one to detect whatever condition we are interested in:

```javascript
async function scanRinkebyBlocks() {
  isScanningRinkeby = true;

  const latestRinkebyBlockNumber = await rinkebyProvider.getBlockNumber();
  // for each unprocessed block
  while (currentRinkebyBlockNumber <= latestRinkebyBlockNumber) {
    // fetch rinkeby block
    const rinkebyBlock = await rinkebyProvider.getBlock(
      currentRinkebyBlockNumber
    );
    // fetch receipt for each transaction in block
    for (const tx of rinkebyBlock.transactions) {
      const receipt = await rinkebyProvider.getTransactionReceipt(tx);
      // check if gas usage is higher than 1 million
      if (receipt.gasUsed.gt("1000000")) {
        findingsCache.push(
          Finding.fromObject({
            name: "High gas used",
            description: `Transaction with high gas usage: ${receipt.gasUsed.toString()}`,
            alertId: "RINK-1",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              txHash: tx,
            },
          })
        );
      }
    }
    currentRinkebyBlockNumber++;
  }

  isScanningRinkeby = false;
}
```

The above code fetches block data given a block number which also includes transaction hashes. We then fetch the receipt for each transaction to get its gas usage. If gas usage is higher than 1 million, we add a finding to the `findingsCache`. The `scanRinkebyBlocks` function will be invoked by the `handleBlock` handler (not shown above), which will return any cached findings.

## Other considerations

- Since the findings returned will be for a different chain than what the scan node is scanning, the block hash associated to the finding will be incorrect. To get around this, you can store all the information you need from the Rinkeby block/transaction inside the `metadata` of the finding
- The cost of the RPC endpoint usage (if any) will be covered by you, the bot developer. This is not the case when consuming data passed in from the scan node itself. Also, there may be multiple instances of your bot running across Forta scan nodes. Keep this in mind when estimating the costs of running such a bot
- The long running task (i.e. `scanRinkebyBlocks`) is being triggered from `handleBlock` in the example, which should fire on average every 15 seconds for Ethereum mainnet. You may want more regular fixed intervals to trigger your task based on the speed of the chain you are querying, in which case you can use the Node.js `setInterval` function and invoke it from the bot's `initialize` handler
- The above example uses a simple flag (i.e. `isScanningRinkeby`) to ensure only one task is running, but based on your requirements you may customize this logic further e.g. making sure a minimum amount of time has passed before triggering the next task
- A minor drawback of this approach is that the developer tools (i.e. CLI commands) are not usable. For instance, you cannot specify a transaction/block from Rinkeby using `npm run tx/block`. You would have to do this by manually modifying the code.

Great! You now have a bot that can scan blocks and transactions from any blockchain whether or not it's officially supported by Forta.
