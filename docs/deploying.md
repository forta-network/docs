# Deploying your agent

Once you have tested your agent locally, you are ready to deploy it to the Forta protocol production environment! Deploying your agent involves 2 key steps:

1. publishing a Docker image, and
2. registering it in the Agent Registry contract.

You can choose to [deploy using Forta Connect](deploying-connect.md) (recommended), or [deploy using the CLI tool](deploying-cli.md). With Forta Connect, less configuration is required and your deployment will be gasless (i.e. Forta will cover the transaction fees). You may still want to use the CLI tool, for example, in your CI/CD pipeline.
