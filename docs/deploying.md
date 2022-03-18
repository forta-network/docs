# Deploying your agent

Once you have tested your agent locally, you are ready to deploy it to the Forta protocol production environment! Deploying your agent involves 2 key steps:

1. publishing a Docker image, and
2. registering it in the Agent Registry smart contract.

## Acquiring Polygon MATIC tokens

The Agent Registry smart contract currently lives on Polygon mainnet, so you will need **MATIC tokens on Polygon mainnet** in order to deploy your agent. You can acquire some MATIC tokens by following [this guide](matic.md).

## Enable logging (optional)

Forta provides a logging feature that can be used to see what's happening inside of your agent across multiple scan nodes. To enable this feature, you need to add/uncomment the following line in the agent **Dockerfile**:

```Dockerfile
LABEL "network.forta.settings.agent-logs.enable"="true"
```

After deploying, you can [view agent logs](maintaining.md#viewing-agent-logs) using the Forta API.

## Publishing your agent image
You can choose to [deploy using Forta App](deploying-app.md) (recommended), or [deploy using the CLI tool](deploying-cli.md). With Forta App, less configuration is required. You may still want to use the CLI tool, for example, in your CI/CD pipeline.
