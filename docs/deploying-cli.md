# Deploying your agent with the CLI

This page covers how to deploy your agent using the `forta-agent` CLI tool.

## Acquire Polygon MATIC

The Agent Registry contract currently lives on the Polygon mainnet, so you will need Polygon MATIC tokens in order to deploy. You can acquire some MATIC by following [this guide](matic.md).

## Documentation

Documentation for your agent is **required** in order to deploy. It should let others know what conditions your agent is detecting and what sort of alerts it will fire. Documentation will always be in the README.md file in your project folder (we have provided example documentation to help you get started). Please update the README.md for your specific agent.

## Discord Badge (optional)

To receive the `Agent Developer [Published]` Discord badge, add the following line at the top of your README.md (replaced with your own Discord username): `Please add me as a Agent Developer [Published] on Discord, my username is FortaKicksAss#010203`. After deploying your agent, share a link to your Github repo in [this channel](https://discord.gg/9V8CH8fCHr) with the hashtag #Published (make sure the repo is public). This is completely **optional**, and we do not require anyone to make their Discord username or codebase public.

## Configuration

A few configuration values must be set in your package.json and forta.config.json in order to deploy successfully:

- in package.json (located in your project folder):
    - `name` of your agent project should be specified and **should be globally unique**, so add some unique modifiers
    - `version` of your agent should also be set as well
    - `repository` is **optional**, but providing a link to your code helps build trust in your agent
- in forta.config.json (located in ~/.forta):
    - `ipfsGatewayUrl` is required to publish your agent's metadata (also referred to as manifest) to IPFS. We recommend using the [Infura IPFS gateway](https://infura.io/docs/ipfs) as the simplest option to interact with IPFS (for Infura, this value would be `https://ipfs.infura.io:5001`)
    - `ipfsGatewayAuth` is needed if your IPFS gateway requires an authorization header (as Infura's does). If using Infura, this value should look something like `Basic MXpNTm5D...QmVNmI0`. See their [authentication docs](https://infura.io/docs/ipfs#section/Authentication) for more information

## Deploying

**Make sure your Docker is running before proceeding**. You can now run the following command from your project folder to deploy your agent:

```
npm run publish
```

This will build a Docker image for your agent using the Dockerfile in your project folder and push it to an image repository where scan nodes can find it. A manifest will be generated for your agent (which includes a reference to the Docker image) and be published to the Agent Registry contract.

!!! note "Signing the manifest"
    The agent manifest will need to be signed using your keyfile (located in ~/.forta), so **you will be prompted for the password**.

When successfully deployed, you should see a message in your output similar to 
```
successfully added agent id 0x855b1556a45637abf05c63407437f6f305b4627c4361fb965a78e5731999c0c7 with manifest bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2
```
This message contains your agent ID (i.e. `0x855b1556a45637abf05c63407437f6f305b4627c4361fb965a78e5731999c0c7`) as well as your Docker image reference (i.e. `bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2`)

Congratulations! You have successfully deployed your first Forta Agent!

Great job getting this far! You have created a project, developed an agent, written and run a test, and deployed it to the Forta protocol. We encourage you to share your agents with the [Discord community](https://discord.gg/DUju5Dh4J9) as a way to showcase your ideas or receive general feedback! For any questions or feedback you may have, you can find us in the [Forta Discord server](https://discord.gg/DUju5Dh4J9) as well.

Continue to the next page where you can learn more about [maintaining your agent](maintaining.md).