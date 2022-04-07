# Transaction simulation

Transaction simulation is a powerful technique that can be used by bot developers to see the results of transactions without having to pay for on-chain execution. Using simulation, you can run transactions from any account on the latest blockchain state and view the results. An example usecase would be to flag malicious transactions in the mempool targeting your protocol before they get mined.

This page describes how to simulate transactions using an example Typescript bot. The code for this example can be found [here](https://github.com/forta-protocol/forta-agent-examples/tree/master/tx-simulation-ts).

## Forking the chain

In this example, the [`ganache-core`](https://www.npmjs.com/package/ganache-core) library is used to create an in-memory fork of the blockchain from a specified block number. Since we want to fork the latest state, we create the fork inside of the `handleBlock` handler and specify the latest block number:

```javascript
import ganache from "ganache-core";

const USER_ADDRESS = "0x72cea5e3540956b2b71a91012a983267472d2fb1";

// returns an ethers provider pointing to a forked version of the chain from the specified block
function getEthersForkProvider(blockNumber: number) {
  return new ethers.providers.Web3Provider(
    ganache.provider({
      fork: getJsonRpcUrl(), // specify the chain to fork from
      fork_block_number: blockNumber, // specify the block number to fork from
      unlocked_accounts: [USER_ADDRESS], // specify any accounts to unlock
    })
  );
}

async function handleBlock(blockEvent: BlockEvent) {
  // create an ethers provider that points to a forked ganache chain
  const provider = getEthersForkProvider(blockEvent.blockNumber);
  ...
}
```

The above code initializes an ethers provider pointing to the Ganache fork that you can use like a regular provider (e.g. invoke methods like `getBalance`). We also specify exactly which accounts we want Ganache to unlock so we can simulate transactions from that account.

## Simulating transactions

Now we can simulate transactions using the ethers provider. In this example, we execute a Tether transfer from the specified account to some other account. First we query the balance of the account, and then transfer the entire balance.

```javascript
async function handleBlock(blockEvent: BlockEvent) {
  // create an ethers provider that points to a forked ganache chain
  const provider = getEthersForkProvider(blockEvent.blockNumber);
  // create an ethers contract pointing to the Tether token on the forked ganache chain
  const tetherContract = new ethers.Contract(
    TETHER_ADDRESS,
    TETHER_ABI,
    provider.getSigner(USER_ADDRESS)
  );

  try {
    // get the user's balance
    userBalance = await tetherContract.balanceOf(USER_ADDRESS);
    // transfer the entire balance to another user
    const tx = await tetherContract.transfer(USER2_ADDRESS, userBalance);
    // wait for transaction to be mined by ganache
    await tx.wait();
  } catch (e) {
    // report a finding if the simulated transaction fails
  }
}
```

The above transaction should succeed with no errors. Ganache will mine the transaction and increase the block number. But what happens if you try to transfer an amount higher than the user's balance? The on-chain logic will throw an error, and the `catch` block will be invoked. In this example, we return a finding if the transfer fails for any reason.

Amazing! You now have an bot that can fork the state of the blockchain, query on-chain data, and execute transactions without needing to pay any gas.
