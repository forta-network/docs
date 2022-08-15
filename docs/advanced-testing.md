# Advanced testing

There may be cases where developers want to test their bot with more complex interactions using real data, or to test scenarios that have not yet occurred on-chain. One way to do this is to fork the state of the chain locally and point your bot to it. You can then simulate transactions on the forked chain and the bot will scan the resulting blocks and transactions.

This page describes how to conduct more advanced testing using a locally forked chain. The complete code for this example can be found [here](https://github.com/forta-network/forta-bot-examples/tree/master/advanced-testing-js).

## Run a forked chain

We make use of the [Ganache](https://trufflesuite.com/ganache/) forking feature, specifically using the underlying [ganache-core](https://www.npmjs.com/package/ganache-core) library. In the example project, there is a convenient script for you to run in package.json: `npm run ganache`. This will run the following code (make sure to replace the `RPC_URL` with a valid endpoint):

```javascript
const RPC_URL = "https://mainnet.infura.io/v3/YOUR_API_KEY";
const PORT = 7545;

async function runGanacheFork() {
  // get the latest block number
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const blockNumber = await provider.getBlockNumber();

  // fork the chain from the block number and unlock an account to simulate transactions from
  const server = ganache.server({
    fork: RPC_URL,
    fork_block_number: blockNumber,
    unlocked_accounts: [USER],
  });

  // start a rpc server
  server.listen(PORT, () => {
    console.log(`json-rpc listening on port ${PORT}`);
  });
}
```

This function will fetch the latest block number and create a Ganache fork at that point in the chain. You can also specify any accounts you want to unlock in order to simulate transactions from them. The last line starts a JSON-RPC server running locally on port 7545.

## Point the bot to the forked chain

Once we have the forked Ganache chain running, we want to point our bot to it. This is easily done by setting the `jsonRpcUrl` in forta.config.json:

```
{
  "jsonRpcUrl": "http://127.0.0.1:7545"
}
```

In the example project, we provide a _local_ forta.config.json to point this specific bot to the forked chain (make sure that `jsonRpcUrl` is uncommented). You could also set `jsonRpcUrl` in your global forta.config.json (located at ~/.forta) if you want to point all of your local bots to the forked chain.

Now you can run the bot in a separate terminal using `npm start`. This will start listening for blocks from the forked Ganache chain. Awesome!

## Simulate transactions

Now we can simulate a number of transactions on the forked chain and see whether the bot returns any findings. In a separate terminal, run the script provided in package.json: `npm run simulation`. This will run the following code:

```javascript
async function runSimulatedTransactions() {
  // get an ethers provider that points to the ganache fork
  const provider = getEthersProvider();
  const tether = new ethers.Contract(
    TETHER_ADDRESS,
    TETHER_ABI,
    provider.getSigner(USER)
  );

  // simulate a tether transfer for 100 TETH
  const tx1 = await tether.transfer(USER2, 100 * 10 ** TETHER_DECIMALS);
  const receipt1 = await tx1.wait();

  // simulate a tether transfer for 10 TETH
  const tx2 = await tether.transfer(USER2, 10 * 10 ** TETHER_DECIMALS);
  const receipt2 = await tx2.wait();
}
```

Here we simulate 2 transfers of Tether tokens from the unlocked account. After these transactions are mined by Ganache, you should see the bot scan the blocks shortly after (may take a few seconds). The bot should alert about one of these transactions. Sweet! Note that Ganache behaviour is to mine a new block for each transaction.

## Automating the above

While it's cool to be able to manually run the above scripts, it would be amazing to have it all automated. This is exactly what we have done in the provided [agent.spec.js](https://github.com/forta-network/forta-bot-examples/blob/master/advanced-testing-js/src/agent.spec.js) file. In it you will find a Jest test suite that will fork a Ganache chain, run simulated transactions and verify that the bot outputs the correct findings.

## Other considerations

- A known limitation of Ganache is the lack of tracing data. If your bot relies on trace data (either using `txEvent.traces` directly, or indirectly using `txEvent.filterFunction`), then this simulation may not generate the correct findings.
