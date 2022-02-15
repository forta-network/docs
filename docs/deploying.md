# Deploying your agent

Once you have tested your agent locally, you are ready to deploy it to the Forta protocol production environment! Deploying your agent involves 3 key steps:

1. getting whitelisted to publish agents,
2. publishing a Docker image, and
3. registering it in the Agent Registry contract.

## Getting whitelisted

In order to get whitelisted for deploying agents, you will need to DM `Haseeb | OpenZeppelin` in the community [Discord](https://discord.gg/DUju5Dh4J9) with your wallet address that will be used for deployment.

## Publishing your agent image
You can choose to [deploy using Forta Connect](deploying-connect.md) (recommended), or [deploy using the CLI tool](deploying-cli.md). With Forta Connect, less configuration is required and your deployment will be gasless (i.e. Forta will cover the transaction fees). You may still want to use the CLI tool, for example, in your CI/CD pipeline.
