# Deploying your bot with the CLI

This page covers how to deploy your bot using the `forta-agent` CLI tool.

## Enable logging (optional)

Forta provides a logging feature that can be used to see what's happening inside of your bot across multiple scan nodes. To enable this feature, you need to add/uncomment the following line in the bot **Dockerfile**:

```Dockerfile
LABEL "network.forta.settings.agent-logs.enable"="true"
```

After deploying, you can [view bot logs](maintaining.md#viewing-bot-logs) using the Forta API.

## Documentation

Documentation for your bot is **required** in order to deploy. It should let others know what conditions your bot is detecting and what sort of alerts it will fire. Documentation will always be in the README.md file in your project folder (we have provided example documentation to help you get started). Please update the README.md for your specific bot.

## Configuration

A few configuration values must be set in your package.json in order to deploy:

- `name` of your bot project should be specified
- `description` should be a short human-readable description of what your bot does
- `version` of your bot should also be set as well
- `chainIds` of the blockchains that your bot will be scanning should be specified as an array of integers. You must specify at least one and up to as many as you need. The supported chain IDs are:
    - 1 (Ethereum)
    - 137 (Polygon)
    - 56 (Binance Smart Chain)
    - 43114 (Avalanche)
    - 42161 (Arbitrum)
    - 10 (Optimism)
    - 250 (Fantom)
- `repository` is **optional**, but providing a link to your code helps build trust in your bot

## Deploying

**Make sure your Docker is running before proceeding**. You can now run the following command from your project folder to deploy your bot:

```
npm run publish
```

This will build a Docker image for your bot using the Dockerfile in your project folder and push it to an image repository where scan nodes can find it. A manifest will be generated for your bot (which includes a reference to the Docker image) and be published to the Bot Registry contract.

!!! warning "Signing the manifest"
    The bot manifest will need to be signed using your keyfile (located in ~/.forta), so **you will be prompted for the password** (unless you specified `keyfilePassword` in forta.config.json).

When successfully deployed, you should see a message in your output similar to 
```
successfully added agent id 0x855b1556a45637abf05c63407437f6f305b4627c4361fb965a78e5731999c0c7 with manifest QmcWPhPQ3un47QpZKKJZxD5ih3TXgk91ehLeUw6we2ncYg
```
This message contains your bot ID (i.e. `0x855b1556a45637abf05c63407437f6f305b4627c4361fb965a78e5731999c0c7`) as well as your manifest IPFS reference (i.e. `QmcWPhPQ3un47QpZKKJZxD5ih3TXgk91ehLeUw6we2ncYg`). You can view the manifest by requesting it from any IPFS gateway (e.g. [`https://ipfs.io/ipfs/QmcWPhPQ3un47QpZKKJZxD5ih3TXgk91ehLeUw6we2ncYg`](https://ipfs.io/ipfs/QmcWPhPQ3un47QpZKKJZxD5ih3TXgk91ehLeUw6we2ncYg))

## Staking

In order to enable your bot, it must be staked with 100 FORT tokens. You can easily stake on your bot by following the steps [here](stake-on-detection-bot.md).

Congratulations! You have successfully deployed your first Forta bot!

Great job getting this far! You have created a project, developed a bot, written and run a test, and deployed it to the Forta network. We encourage you to share your bots with the [Discord community](https://discord.com/invite/fortanetwork) as a way to showcase your ideas or receive general feedback! For any questions or feedback you may have, you can find us in the [Forta Discord server](https://discord.com/invite/fortanetwork) as well.

Continue to the next page where you can learn more about [subscribing to alerts](subscribing.md).