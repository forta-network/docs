# forta.config.json

The forta.config.json file is a shared global config located in ~/.forta that provides configuration for your bot projects. You can optionally override any value for a specific bot project by providing a forta.config.json file in your project folder. Also, if you want to use a specific config file during local development, you can do so using the `--config` CLI flag. 

!!! warning "Securing sensitive information"
    Since the config file can contain sensitive information (e.g. Infura API keys), you should **not** commit it into version control. 

Here are the following supported configuration properties:

- `jsonRpcUrl` - for local development only; allows you to run your bot against data from a specific JSON-RPC endpoint
- `traceRpcUrl` - for local development only; allows you to retrieve trace data from the specified JSON-RPC endpoint
- `ipfsGatewayUrl` - optional; used to specify a IPFS gateway to upload your bot manifest when publishing
- `ipfsGatewayAuth` - optional; provide an authorization header if your IPFS gateway requires one
- `agentRegistryJsonRpcUrl` - optional; used to access the network where the Bot Registry is deployed (i.e. Polygon)
- `imageRepositoryUsername` - optional; provide authorization username when pushing to an image repository
- `imageRepositoryPassword` - optional; provide authorization password when pushing to an image repository
- `keyfile` - optional; specify the name of a keyfile in ~/.forta to use for publishing (by default we assume there is only one keyfile)
- `keyfilePassword` - optional; specify the password to decrypt the keyfile, useful for CI/CD pipelines
- `agentId` - optional; specify the agentId of this bot, to be used for bos deployed with Forta App