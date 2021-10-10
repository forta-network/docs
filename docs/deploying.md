# Deploying your agent

Once you have tested your agent locally, you are ready to deploy it to the Forta protocol production environment! Deploying your agent involves publishing a Docker image and registering it in the Agent Registry contract. **Make sure your Docker is running before proceeding**.

!!! note "Deploying via CLI"
    While we currently support deploying using the CLI tool, we will replace this process with a web UI in the near future for a simpler experience.

## Göerli ETH

The Agent Registry contract currently lives on the Göerli testnet, so you will need Göerli ETH in order to deploy. You can acquire some ETH at this [Göerli faucet](https://faucet.goerli.mudit.blog). The address to send the funds to will be specified in your keyfile (located at ~/.forta).
## Documentation

Documentation for your agent is **required** in order to deploy. It should let others know what conditions your agent is detecting and what sort of alerts it will fire. Documentation will always be in the README.md file in your project folder (we have provided example documentation to help you get started). Please update the README.md for your specific agent.

## Configuration

A few configuration values must be set in your package.json and forta.config.json in order to deploy successfully:

- in package.json (located in your project folder):
    - `name` of your agent project should be specified (which should be globally unique, so feel free to add some unique modifiers)
    - `version` of your agent should also be set as well
- in forta.config.json (located in ~/.forta):
    - `ipfsGatewayUrl` is required to publish your agent's metadata (also referred to as manifest) to IPFS. We recommend using the [Infura IPFS gateway](https://infura.io/docs/ipfs) as the simplest option to interact with IPFS (for Infura, this value would be `https://ipfs.infura.io:5001`)
    - `ipfsGatewayAuth` is needed *if your IPFS gateway requires an authorization header* (as Infura's does). If using Infura, you should set this value to `Basic Base64(<YOUR_INFURA_PROJECT_ID>:<YOUR_INFURA_PROJECT_SECRET>)`. See their [authentication docs](https://infura.io/docs/ipfs#section/Authentication) for more information
    - `agentRegistryJsonRpcUrl` is required to interact with the Agent Registry contract on Göerli. We also recommend using Infura to do this e.g. `https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID`

## Deploying

You can now run the following command from your project folder to deploy your agent:

```
npm run publish
```

This will build a Docker image for your agent using the Dockerfile in your project folder and push it to an image repository where scan nodes can find it. A manifest will be generated for your agent (which includes a reference to the Docker image) and be published to the Agent Registry contract.

!!! note "Signing the manifest"
    The agent manifest will need to be signed using your keyfile (located in ~/.forta), so **you will be prompted for the password**.

When successfully deployed, you should see a message in your output similar to `successfully added agent id 0x12345abcdef with manifest bafyxyz123abc`.

Congratulations! You have successfully deployed your first Forta Agent!

## Verifying your agent

Once your agent is published and picked up by a scan node, you can view the findings it generates using the [Forta Explorer](https://explorer.forta.network/). You can filter findings using your agent ID (as outputted above).

Great job getting this far! You have created a project, developed an agent, written and run a test, and deployed it to the Forta protocol.

We encourage you to share your agents with the [Discord community](https://discord.gg/DUju5Dh4J9) as a way to showcase your ideas or receive general feedback! For any questions or feedback you may have, you can find us in the [Forta Discord server](https://discord.gg/DUju5Dh4J9) as well.
