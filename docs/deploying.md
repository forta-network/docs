# Deploying your bot

Once you have tested your bot locally, you are ready to deploy it to the Forta protocol production environment! Deploying your bot involves 2 key steps:

1. publishing a Docker image, and
2. registering it in the Bot Registry smart contract.

## Acquiring Polygon MATIC tokens

The Bot Registry smart contract currently lives on Polygon mainnet, so you will need **MATIC tokens on Polygon mainnet** in order to deploy your bot. You can acquire some MATIC tokens by following [this guide](matic.md).

## Enable logging (optional)

Forta provides a logging feature that can be used to see what's happening inside of your bot across multiple scan nodes. To enable this feature, you need to add/uncomment the following line in the bot **Dockerfile**:

```Dockerfile
LABEL "network.forta.settings.agent-logs.enable"="true"
```

After deploying, you can [view bot logs](maintaining.md#viewing-bot-logs) using the Forta API.

## Publishing your bot image

You can choose to [deploy using Forta App](deploying-app.md) or [deploy using the CLI tool](deploying-cli.md). You may want to use the CLI tool, for example, in your CI/CD pipeline.
