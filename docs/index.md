# Forta Agent Developer Docs

Welcome to the Forta Agent developer documentation! Forta is the leading runtime security network for the decentralized economy. We are currently in the private testnet phase. Agents are at the heart of the Forta network as they examine and flag events of interest. You can easily begin writing your own Forta Agents using the official Javascript SDK

## Quickstart

To initialize a Forta Agent project, you can use the forta-agent CLI tool:

```bash
$ mkdir my-new-agent
$ cd my-new-agent
$ npx forta-agent init --typescript
```

The above snippet creates a new project directory called `my-new-agent`, and then uses `npx` (a package runner tool that is part of npm 5.2+) to invoke the `init` command of the `forta-agent` CLI tool. By passing the `--typescript` option, you can initialize a Typescript project (default is Javascript)

This will initialize several files inside of your project directory, including a package.json file, tsconfig.json (for Typescript) as well as some Jest unit tests. The project also includes a forta.config.json file that will be used through the development lifecycle. Let’s run npm install to make sure our project dependencies are installed.

```
$ npm install
```

The code for a simple Forta Agent can be found in the index.ts file. At the end of this file, you will find:

```javascript
export default {
  handleTransaction,
  handleBlock,
};
```

We are exporting 2 functions inside of an object: handleTransaction and handleBlock. These functions are where the logic of your agent will live. As blocks and transactions are added to the blockchain, these functions will be invoked to allow the agent to scan for certain conditions and return any findings. You can export either one or both of these functions based on your requirements.

Let’s take a closer look at the handleTransaction function:

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

The signature of this function is `(txEvent: TransactionEvent) => Promise<Finding[]>`. That is, it accepts a TransactionEvent as an input, and returns a Promise of an array of Finding objects. In this simple example, we check whether the amount of gas used by a transaction is above 1 million. If so, we flag the transaction as suspicious by creating a Finding object. We then return what we found in the findings array. Pretty straightforward (we’ll get into the details later).

Now let’s take this agent for a spin with some real data to see how it behaves. First, let’s specify a JSON-RPC provider in the forta.config.json file. Uncomment the jsonRpcUrl property and set it to a websocket provider (e.g. wss://mainnet.infura.io/ws/v3/<YOUR_INFURA_API_KEY>). Now we can run npm start to begin throwing mainnet transactions at our agent and observe the output.

Since our gas threshold is pretty high (1 million), we may not flag a lot of transactions. To quickly make changes and see them take effect, try changing the threshold to a lower number and save the index.ts file. The agent should automatically restart with your new changes.

## Core Concepts

### Forta Network

The Forta Network refers to the distributed and decentralized nodes collaborating to secure different parts of a particular blockchain. The collection of all nodes is referred to as the Forta Network

### Pools

Pools are groupings of nodes inside of the Forta Network that are collaborating to secure some aspect of the blockchain. An example pool could be one dedicated to a specific protocol (e.g. Aave) or dedicated to a specific function (e.g. checking for flash loan attacks)

### Scanners

Scanners refer to a type of node in the network that listens for data from the blockchain and passes it to agents. Scanner nodes belong to a specific pool. The scanner node coordinates agents (e.g. by running newly published agents, removing unpublished agents, or restarting agents that may become unresponsive). The scanner ferries blockchain data to agents to process the transaction/block and return any findings

### Agents

Agents refer to a module of computation that processes some blockchain data (i.e. a block or transaction) and detects specific conditions (e.g. whether a flash loan attack occured, or whether a particular account balance fell below some threshold). Agents belong to a specific pool, as defined in the agent registry. Agents are run by scanner nodes, which can be running many agents on the same node all belonging to the same pool

### Agent registry

The agent registry refers to a smart contract (currently deployed on the Arbitrum public testnet) that records the existence of all pools and agents. Developers publish their agent manifests to this registry, and scanner nodes listen for events from this contract to know how manage the agents they are running

### Agent manifest

An agent manifest refers to a signed JSON document that describes the contents of an agent. Specifically, it provides information like the agent version as well as an IPFS reference to the agent image. Manifests are persisted on the IPFS network, with their IPFS references stored in the agent registry

### Disco

Disco is an open-source, decentralized and distributed container registry. This registry is used to store and distribute agent images. Scanner nodes request agent images from a Disco repository

## CLI Commands

The following sections describe the CLI commands available to agent developers. You can always use the forta-agent help command to get a quick understanding of these commands

### init

Using the forta-agent init command, you can quickly initialize a Forta Agent Javascript project inside of the current working directory. The starter project includes some default configuration files as well as an example agent implementation with unit tests

Options:

```
--typescript - initialize Typescript project
```

Example: Initialize a Typescript Project

```
$ forta-agent init --typescript
```

### run

Easily verify the behaviour of your agent during development using the forta-agent run command. The default behaviour (i.e. without any options) is to subscribe to a JSON-RPC endpoint and listen for the latest blocks and transactions. A stream of the latest data will be passed to your agent with output printed to the console. The endpoint is specified by the jsonRpcUrl property in the forta.config.json file. A websocket endpoint is required (i.e. begins with ws:// or wss://) only for the default run command. All other run options can use a http:// or https:// endpoint

Options:

```
--tx - use this option to run your agent with a specific transaction hash

--block - use this option to run your agent against a specific block number/hash, including the transactions in the block

--range - use this option to run your agent against a specific range of block numbers

--file - use this option to run your agent against a JSON file of test data e.g.
forta-agent run --file ./test.data.json

--prod - this option is used for running the agent inside of a production environment i.e. you probably won’t need this during development
```

Example: Run for a specific transaction

```bash
$ forta-agent run --tx 0xf9c43e15ef2abfec163ec3b1165f18a5119ba119b6e059fc924903e5251e3543
```

Example: Run for a specific block (by number)

```
$ forta-agent run --block 12821978
```

Example: Run for a specific block (by hash)

```
$ forta-agent run --block 0x9e052eb02a3849b650e8b9e0a47b1fae194b928c930168ef19e311dbd7886172
```

Example: Run for an input file

```
$ forta-agent run --file ./test.data.json
```

### publish

Once you have tested your agent, you can deploy it to the Forta Network using the forta-agent publish command. This requires some configuration to be set in your forta.config.json. Firstly, you will need to specify the agentId of your agent, as well as the poolId that you are targeting. A prerequisite for publishing is that you are authorized to do so in the Agent Registry contract by the owner of the pool specified by poolId. You should also set the version of your agent to track changes.

<!--
# TODO: Explain Agent Registry on Arbitrum and how to deposit into Arbitrum bridge with Rinkeby ETH and how to get approved for poolId
-->

Access to an IPFS gateway is required to publish your agent’s manifest. The manifest will be stored on the IPFS network, and the IPFS address of the agent manifest will be published to the Agent Registry contract. This will be used by Forta Scanners to pull the image for your agent and execute it. We recommend using the Infura IPFS gateway as the simplest option to interact with IPFS. The `ipfsGatewayUrl` will point to the IPFS gateway you want to use (for Infura, this would be https://ipfs.infura.io:5001).

If your gateway requires an authorization header (as Infura’s does), you can set this value using the `ipfsGatewayAuthHeader` property (e.g. Basic Base64(<YOUR_INFURA_PROJECT_ID>:<YOUR_INFURA_PROJECT_SECRET>))

The agent manifest will need to be signed using a private key. If you do not already have one initialized, a key will be generated for you and placed in the .fortify folder. You will be prompted to enter the password for the keyfile when signing.

## Javascript SDK

The Forta Agent Javascript SDK comes with a set of classes and type definitions to provide a consistent interface for developers to write their agents with. There are also some utility functions available for your convenience to do common operations like searching for an event in a transaction receipt.

### Handlers

The most relevant type definitions for agent developers are the HandleBlock and HandleTransaction types. They are function types with signatures of `(blockEvent: BlockEvent) => Promise<Finding[]>` and `(txEvent: TransactionEvent) => Promise<Finding[]>`, respectively. Your agent handlers must implement these types to process blocks and transactions as they are received.

You may have one or more handlers in your project. By default, the CLI tool will look for an index file in the project root directory. Multiple handlers can also be specified in the forta.config.json file using the handlers property.

Each handler file must have a default export object with the handleBlock and/or handleTransaction properties that export the handler functions. You can export one or both of these, depending on your use case, but at least one must be provided. The return type of these functions is `Promise<Finding[]>`, meaning they are asynchronous functions that return an array of zero or more Finding objects.

## BlockEvent

When a block is mined and detected by a Forta Scanner, it will generate a BlockEvent containing information such as the block hash and block number. The type property will also specify whether this was a block reorg.

## TransactionEvent

When a transaction is mined and detected by a Forta Scanner, it will generate a TransactionEvent containing various information about the transaction. A block property is also provided to easily get the block hash, number and timestamp.

The transaction property will contain information about the signed transaction message that was sent to the blockchain, such as its hash, nonce, gas, gasPrice, value of attached ether and any input data if calling a function. The r, s, v values of the signature are also provided

The receipt property will contain the confirmation of the mined transaction, including data like its status (success/failure), gasUsed and transactionIndex. Any logs generated by the transaction are also provided in the logs property. A convenience function is provided to check for the existence of an event given the event signature in TransactionEvent.hasEvent. An optional contractAddress property provides the address if a new contract was created.

The traces property contains detailed trace information about the transaction including any internal contract functions that may have been called. This is useful for detecting the use of particular contracts/functions that may not generate event logs.

The addresses property contains a map for quick lookup of any addresses involved in the execution of this transaction. The map is generated from the transaction to/from addresses, any event log addresses as well as trace data addresses.

## Finding

If a handler wants to flag a transaction because it meets some condition (e.g. flash loan attack), the function would return a Finding object. This object would detail the results of the finding and provide metadata such as the severity of the finding. A Finding object can only be created using the Finding.fromObject static method and has four required properties: name, description, alertId and protocol.

The name and description properties are required to provide a human-readable diagnosis of the finding. For example, for a transaction with high gas usage, the name could be “High Gas” while the description could be “High gas used: 1,000,000“

<!--
# TODO explain how to set alertId, severity and type
-->

The protocol property would specify whether this finding is for a specific protocol (e.g. Aave). If left blank, it defaults to “Ethereum”. A metadata property allows for providing a key-value map of extra information about the finding.
Config file
The forta.config.json file provides configurability for your agent. Here are the following supported properties

<!--
  TODO explain properties
-->

## Examples

You can find more example implementations of Forta Agents in our examples repo
Ideas for Agents
Getting Help
If you have a question that you want to ask, feel free to reach us on our Discord/Slack channels!
