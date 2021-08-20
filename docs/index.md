# Forta Agent Developer Docs

_Last updated: August 18, 2021_

Welcome to the Forta Agent developer documentation! Forta is a permissionless runtime security network designed to provide threat detection and prevention for the decentralized economy. We are currently in the private testnet phase. Agents are at the heart of the Forta network as they examine and flag events of interest. You can easily begin writing your own Forta Agents using the official [Javascript SDK and CLI tool](https://www.npmjs.com/package/forta-agent).

## Quickstart

To initialize a Forta Agent project, you can use the `forta-agent` CLI tool:

```bash
$ mkdir my-new-agent
$ cd my-new-agent
$ npx forta-agent init --typescript
```

The above snippet creates a new project directory called `my-new-agent`, and then uses `npx` (a package runner tool that is part of npm 5.2+) to invoke the `init` command of the `forta-agent` CLI tool. By passing the `--typescript` option, you can initialize a Typescript project (default is Javascript).

This will initialize several files inside of your project directory, including a package.json file, tsconfig.json (for Typescript) as well as a src folder. The project also includes a forta.config.json file that will be used throughout the development lifecycle. Let’s make sure our project dependencies are installed:

```bash
$ npm install
```

This will also install the `forta-agent` package locally in your project. Note: you can choose to install the CLI tool globally using `npm install -g forta-agent`, just make sure it does not conflict with the locally installed version. The code for a simple Forta Agent can be found in the src/index.ts file. At the end of this file, you will find:

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

The signature of this function is `(txEvent: TransactionEvent) => Promise<Finding[]>`. That is, it accepts a `TransactionEvent` as an input, and returns a Promise of an array of `Finding` objects. In this simple example, we check whether the amount of gas used by a transaction is above 1 million. If so, we flag the transaction as suspicious by creating a Finding object. We then return what we found in the `findings` array. Pretty straightforward (we’ll get into the details later).

Now let’s take this agent for a spin with some real data to see how it behaves. First, let’s specify a JSON-RPC provider in the forta.config.json file. Uncomment the `jsonRpcUrl` property and set it to a websocket provider (e.g. wss://mainnet.infura.io/ws/v3/<YOUR_INFURA_API_KEY>). Now we can run `npm start` to begin throwing mainnet transactions at our agent and observe the output:

```bash
$ npm start
```

Since our gas threshold is pretty high (1 million), we may not flag a lot of transactions. To quickly make changes and see them take effect, try changing the threshold to a lower number and save the index.ts file. The agent should automatically restart with your new changes.

## Core Concepts

### Forta Network

The Forta Network refers to the distributed and decentralized nodes collaborating to provide threat detection and prevention for smart contract transactions on supported blockchains, coordinated through a set of smart contracts deployed across multiple blockchains. One specific type of node is the scan node. The collection of all nodes and smart contracts is referred to as the Forta Network.

### Scan Nodes

A scan node is a specific type of Forta node that executes agents for every transaction and every new block on a specific blockchain network (may also be mempool or simulated network). The scan node manages and coordinates agents (e.g. by instantiating and running agents, and restarting agents that become unresponsive). The scan node ferries blockchain data to agents to process the transaction/block and then consolidates the report of findings to a public Forta smart contract.

### Agents

Agents refer to a set of code scripts within a Docker container that process some blockchain data (i.e. a block or transaction) and detect specific threat conditions (e.g. whether a flash loan attack occured, or whether a particular account balance fell below some threshold). Agents emit alerts for their findings. Agents are executed by scan nodes.

### Agent registry

The agent registry refers to a smart contract (currently deployed on the Göerli public testnet) that records the existence of all agent containers. Developers publish their agent manifests to this registry, and scan nodes listen for events from this contract to know how to manage the agents they are running.

### Agent manifest

An agent manifest refers to a signed JSON document that describes the contents of an agent container. Specifically, it provides information like the agent version as well as an IPFS reference to the agent container image. Manifests are persisted on the IPFS network, with their IPFS references stored in the agent registry.

### Disco

Disco is an open-source, decentralized and distributed container registry. This registry is used to store and distribute agent container images. Scan nodes request agent images from a Disco repository.

## CLI Commands

The following sections describe the CLI commands available to agent developers. You can always use `forta-agent help` to get a quick overview of these commands, as well as details about specific commands e.g. `forta-agent run help`.

### init

Using the `forta-agent init` command, you can quickly initialize a Forta Agent Javascript project inside of the current working directory. The starter project includes some default configuration files as well as an example agent implementation. A keyfile will also be generated for you and placed in the ~/.forta folder if it does not already exist. You will be prompted to enter a password that will be used to encrypt the keyfile. This keyfile will be used later when publishing your agent.

Options:

```
--typescript - initialize Typescript project
```

Example: Initialize a Typescript Project

```
$ forta-agent init --typescript
```

### run

Easily verify the behaviour of your agent during development using the `forta-agent run` command. The default behaviour (i.e. without any options) is to subscribe to a JSON-RPC endpoint and listen for the latest blocks and transactions. A stream of the latest data will be passed to your agent with output printed to the console. The endpoint is specified by the `jsonRpcUrl` property in the forta.config.json file. A websocket endpoint is required (i.e. begins with ws:// or wss://) **only** for the default run command. All other run options can use a http:// or https:// endpoint.

Options:

```
--tx - run your agent with a specific transaction hash

--block - run your agent against a specific block number/hash, including the transactions in the block

--range - run your agent against a specific range of block numbers

--file - run your agent against a JSON file of test data

--prod - used for running the agent inside of a production environment i.e. you probably won’t need this during development

--config - specify a config file to use (default: forta.config.json)
```

Example: Run for a specific transaction

```bash
$ forta-agent run --tx 0xf9c43e15ef2abfec163ec3b1165f18a5119ba119b6e059fc924903e5251e3543
```

or if using locally installed package

```bash
$ npm run tx 0xf9c43e15ef2abfec163ec3b1165f18a5119ba119b6e059fc924903e5251e3543
```

Example: Run for a specific block (by number)

```
$ forta-agent run --block 12821978
```

or if using locally installed package

```bash
$ npm run block 12821978
```

Example: Run for a specific block (by hash)

```
$ forta-agent run --block 0x9e052eb02a3849b650e8b9e0a47b1fae194b928c930168ef19e311dbd7886172
```

or if using locally installed package

```bash
$ npm run block 0x9e052eb02a3849b650e8b9e0a47b1fae194b928c930168ef19e311dbd7886172
```

Example: Run for a specific block range

```
$ forta-agent run --range 12821978..12821980
```

or if using locally installed package

```bash
$ npm run range 12821978..12821980
```

Example: Run for an input file

```
$ forta-agent run --file ./test.data.json
```

or if using locally installed package

```bash
$ npm run file ./test.data.json
```

### publish

Once you have tested your agent, you can deploy it to the Forta Network using the `forta-agent publish` command (or `npm run publish`). This requires some configuration to be set in your forta.config.json. Firstly, you will need to specify the `agentId` of your agent which should be globally unique. You should also set the `version` of your agent to track changes.

The Agent Registry contract is currently deployed on the Göerli testnet, so you will need to send a “publish” transaction to the Agent Registry (using the CLI `publish` command). To do this you will need Göerli ETH in your account generated by the `init` command (you can get some at [https://faucet.goerli.mudit.blog](https://faucet.goerli.mudit.blog)).

Access to an IPFS gateway is required to publish your agent’s manifest. The manifest will be stored on the IPFS network, and the IPFS address of the agent manifest will be published to the Agent Registry contract. This will be used by Forta scan nodes to pull the image for your agent and execute it. We recommend using the [Infura IPFS gateway](https://infura.io/docs/ipfs) as the simplest option to interact with IPFS. The `ipfsGatewayUrl` will point to the IPFS gateway you want to use (for Infura, this would be `https://ipfs.infura.io:5001`). If your gateway requires an authorization header (as Infura’s does), you can set this value using the `ipfsGatewayAuth` property (e.g. `Basic Base64(<YOUR_INFURA_PROJECT_ID>:<YOUR_INFURA_PROJECT_SECRET>)`).

Lastly, you need to provide the `agentRegistryJsonRpcUrl` which should be a JSON-RPC endpoint to access Göerli. We also recommend using Infura to do this e.g. `https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID`

The agent manifest will need to be signed using your private key generated by the `init` command. You will be prompted to enter the password for the keyfile when signing.

Once your agent is published and picked up by a scan node, you can view the findings it generates using this dapp: [https://explorer.forta.network/](https://explorer.forta.network/)

Options:

```
--config - specify a config file to use (default: forta.config.json)
```

### forta.config.json

The forta.config.json file provides configurability for your agent. Since it can contain sensitive information (e.g. Infura API keys), you should **not** commit it into version control. Also note that when publishing your agent image you will need to provide a config file which at a minimum specifies the paths to your agents using the `handlers` property. If you want to use a different config file during development, you can do so using the `--config` CLI flag. Here are the following supported configuration properties:

- **agentId** - unique identifier for your agent when publishing
- **version** - used as a version stamp for your agent when publishing
- **ipfsGatewayUrl** - used to specify a IPFS gateway to upload your agent manifest when publishing
- **ipfsGatewayAuth** - optional; provide an authorization header if your IPFS gateway requires one
- **agentRegistryJsonRpcUrl** - used to access the network where the Agent Registry is deployed (i.e. Göerli)
- **jsonRpcUrl** - development only; allows you to run your agent against data from a specific JSON-RPC endpoint
- **traceRpcUrl** - development only; allows you to retrieve trace data from the specified JSON-RPC endpoint
- **imageRepositoryUsername** - optional; provide authorization username when pushing to an image repository
- **imageRepositoryPassword** - optional; provide authorization password when pushing to an image repository
- **handlers** - specifies an array of file paths to your agent handlers (i.e. the files with the exported functions)

## Javascript SDK

The Forta Agent Javascript SDK comes with a set of classes and type definitions to provide a consistent interface for developers to write their agents with. There are also some utility functions available for your convenience to do common operations like searching for an event in a transaction receipt.

### Handlers

The most relevant type definitions for agent developers are the `HandleBlock` and `HandleTransaction` types. They are function types with signatures of `(blockEvent: BlockEvent) => Promise<Finding[]>` and `(txEvent: TransactionEvent) => Promise<Finding[]>`, respectively. Your agent handlers must implement these types to process blocks and transactions as they are received.

You may have one or more handlers in your project, as specified by the `handlers` property in the forta.config.json file.

Each handler file must have a default export object with the `handleBlock` and/or `handleTransaction` properties that export the handler functions. You can export one or both of these, depending on your use case, but at least one must be provided. The return type of these functions is `Promise<Finding[]>`, meaning they are asynchronous functions that return an array of zero or more `Finding` objects.

### BlockEvent

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

### TransactionEvent

When a transaction is mined and detected by a Forta scan node, it will generate a `TransactionEvent` containing various information about the transaction. It contains the following fields:

- `type` - specifies whether this was from a block reorg or a regular block
- `network` - specifies which network the transaction was mined on (e.g. mainnet, ropsten, rinkeby, etc)
- `hash` - alias for `transaction.hash`
- `from` - alias for `transaction.from`
- `to` - alias for `transaction.to`
- `gasPrice` - alias for `transaction.gasPrice`
- `gasUsed` - alias for `receipt.gasUsed`
- `status` - alias for `receipt.status`
- `logs` - alias for `receipt.logs`
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
- `receipt` - receipt object containing the following fields:
  - `status`
  - `root`
  - `gasUsed`
  - `cumulativeGasUsed`
  - `logsBloom`
  - `contractAddress`
  - `blockNumber`
  - `blockHash`
  - `transactionIndex`
  - `transactionHash`
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

#### filterEvent

A convenience function is provided on `TransactionEvent` to check for the existence of event logs called `filterEvent`. For example, you could use it to filter all of the transfer logs of a particular ERC-20 token:

```javascript
const erc20TokenAddress = "0x123abc";
const transferEventSignature = "Transfer(address,address,uint256)";
const transfers = transactionEvent.filterEvent(
  transferEventSignature,
  erc20TokenAddress
);
console.log(`found ${transfers.length} transfers`);
```

The second argument for the contract address is optional. To better understand how event signatures are formed, see [this article](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378).

### Finding

If an agent wants to flag a transaction/block because it meets some condition (e.g. flash loan attack), the handler function would return a `Finding` object. This object would detail the results of the finding and provide metadata such as the severity of the finding. A `Finding` object can only be created using the `Finding.fromObject` method which accepts the following properties:

- `name` - **required**; human-readable name of finding e.g. "High Gas"
- `description` - **required**; brief description e.g. "High gas used: 1,000,000"
- `alertId` - **required**; unique string to identify this class of finding, primarily used to group similar findings for the end user
- `protocol` - **required**; name of protocol being reported on e.g. "aave", defaults to "ethereum" if left blank
- `type` - **required**; indicates type of finding e.g. exploit or suspicious occurrence
- `severity` - **required**; indicates impact level of finding:
  - Critical - exploitable vulnerabilities, massive impact on users/funds
  - High - exploitable under more specific conditions, significant impact on users/funds
  - Medium - notable unexpected behaviours, moderate to low impact on users/funds
  - Low - minor oversights, negligible impact on users/funds
  - Info - miscellaneous behaviours worth describing
- `metadata` - optional; key-value map (both keys and values as strings) for providing extra information
- `everestId` - optional; [Everest](http://everest.link/) link for information about the specific project/protocol

### getJsonRpcUrl

A convenience function called `getJsonRpcUrl` can be used to load a JSON-RPC URL for your agent. When running in production, this function will return a URL injected by the scan node that is running the agent. When running in development, this function will return the `jsonRpcUrl` property specified in your config file.

### getFortaConfig

A convenience function called `getFortaConfig` can be used to load your config file as an object to access any other properties

## Ideas for Agents

We’re excited to see what sort of innovative agents our community comes up with! If you’re looking for some inspiration to get started, here are possible ideas for agents:

- Detect high gas payments
- Detect ownership transfers of contracts
- Detect high volume of failed transactions from an account
- Detect flash loan attacks
- Detect sandwich attacks
- Detect when an oracle is returning bad values
- Detect transactions from a known list of blacklisted addresses

## Examples

You can find more example implementations of Forta Agents in our [examples repo](https://github.com/forta-network/forta-agent-examples).

## Getting Help

If you have a question that you want to ask or just want to say hello, please reach us on our [Discord channel](https://discord.gg/DUju5Dh4J9).
