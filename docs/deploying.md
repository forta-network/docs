# Deploying your agent

Once you have tested your agent locally, you are ready to deploy it to the Forta protocol production environment! Deploying your agent involves 2 key steps:

1. publishing a Docker image, and
2. registering it in the Agent Registry smart contract.

## Acquiring Polygon MATIC tokens

The Agent Registry smart contract currently lives on the Polygon mainnet, so you will need MATIC tokens on the Polygon blockchain in order to deploy. You can acquire some MATIC tokens by following [this guide](matic.md).

## Publishing your agent image
You can choose to [deploy using Forta Explorer](deploying-explorer.md) (recommended), or [deploy using the CLI tool](deploying-cli.md). With Forta Explorer, less configuration is required. You may still want to use the CLI tool, for example, in your CI/CD pipeline.
