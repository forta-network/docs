# Integrating with Hardhat

Integrating Forta in your existing Hardhat project is easier than ever with the [Forta Hardhat plugin](https://www.npmjs.com/package/hardhat-forta). You can now keep your security/operational monitoring logic right next to the smart contracts they will be monitoring. The plugin provides convenient access to the Forta Agent development tools to manage the agent lifecycle using Hardhard tasks.

This plugin uses the [`forta-agent`](https://www.npmjs.com/package/forta-agent) package to [programmatically invoke commands](cli.md#invoke-commands-programmatically). For a more comprehensive walkthrough of agent development, we recommend going through the [build your first agent](quickstart.md) guide as well.

## Installation

You can install the Forta Hardhat plugin with the following command:

```
npm install -D hardhat-forta
```

Remember to import the plugin in your hardhat.config.js with the line:

```javascript
require("hardhat-forta");
```

Or if you are using Typescript, then update your hardhat.config.ts instead:

```typescript
import "hardhat-forta";
```

To verify the installation, run `npx hardhat` to see the available tasks. You should see the following tasks:

- `forta:init` - initialize a sample agent project
- `forta:init:template` - initialize an agent project from existing templates
- `forta:run` - run an agent project with blockchain data
- `forta:test` - execute unit tests for an agent project
- `forta:publish` - publish an agent to the Forta network
- `forta:push` - build an agent Docker image and push it to the repository
- `forta:disable` - disable an agent on the Forta network
- `forta:enable` - enable an agent on the Forta network
- `forta:keyfile` - print out keyfile information

## Getting started

You can initialize a sample project using the `forta:init` task, but to create something more useful you can use the `forta:init:template` task:

```
npx hardhat forta:init:template
```

This will prompt you with a list of [templates](https://github.com/arbitraryexecution/forta-agent-templates) (i.e. low-code agents) to choose from. Some examples include monitoring whether an account's ETH balance has fallen below a threshold, or if an address that recently interacted with Tornado Cash is now interacting with your contracts.

You can select one or more templates from the list. They will be unpacked into a folder called `agents` in your Hardhat project. Each template comes with a SETUP.md file that you should use to configure the agent's behaviour. All you need to do is modify a single JSON config file.

If this is your first time initializing a Forta Agent project on your machine, a keyfile and a forta.config.json file will be generated for you. You will be prompted to enter a password for the keyfile (to be used later for agent deployment).

## Testing your agent

You can now run the agent against real blockchain data using the command:

```
npx hardhat forta:run
```

If you have multiple agents, you will be prompted to select which one to run. By default, the agent will point to Ethereum mainnet using the public Cloudflare RPC endpoint (you can change this by setting the `jsonRpcUrl` value in the forta.config.json file located at ~/.forta). Once running, you should see output printed to the console showing the agent scanning blocks and transactions. Awesome! You can also use this command to run the agent against specific blocks and transactions using [commandline args](cli.md#run).

There is also a command to run unit tests of the agent project:

```
npx hardhat forta:test
```

Again, you may be prompted to select a specific agent. This command will run any unit tests present in the agent folder.

To learn more about testing agents, check out [this section](testing.md).

## Deploying your agent

Once you are happy with the agent behaviour, you can deploy this agent to the production Forta network using the command:

```
npx hardhat forta:publish
```

You may be prompted to select a specific agent if you have multiple. This command builds a Docker image for the agent and pushes it to a public repository. The image will then be registered in an agent registry smart contract. This step requires having MATIC tokens on Polygon mainnet (see [here](matic.md) on how to acquire MATIC tokens).

Another way to deploy your agent is using the [Forta App](https://app.forta.network/). To learn more about deploying agents (including how to enable logging), check out [this section](deploying.md).

## Subscribing to alerts

After your agent is deployed, you can view the alerts it generates using [Forta Explorer](https://explorer.forta.network/). You can search by your agent's ID or a contract address.

Alternatively, you can query for alerts programmatically using the [Forta API](api.md).

To learn more about subscribing to alerts, check out [this section](subscribing.md).

## Maintaining your agent

You may need to update your agent code at some point in the future, or even disable it. This can all be done using the provided Hardhat tasks as well e.g `npx hardhat forta:disable`.

To learn more about maintaining your agent, check out [this section](maintaining.md).
