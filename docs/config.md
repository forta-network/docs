# forta.config.json

The forta.config.json file is a shared global config located in ~/.forta that provides configuration for your agent projects. You can optionally override any value for a specific agent project by providing a forta.config.json file in your project folder. Also, if you want to use a specific config file during local development, you can do so using the `--config` CLI flag. 

!!! warning "Securing sensitive information"
    Since the config file can contain sensitive information (e.g. Infura API keys), you should **not** commit it into version control. 

Here are the following supported configuration properties:

- `jsonRpcUrl` - development only; allows you to run your agent against data from a specific JSON-RPC endpoint
- `traceRpcUrl` - development only; allows you to retrieve trace data from the specified JSON-RPC endpoint
- `ipfsGatewayUrl` - used to specify a IPFS gateway to upload your agent manifest when publishing
- `ipfsGatewayAuth` - optional; provide an authorization header if your IPFS gateway requires one
- `agentRegistryJsonRpcUrl` - used to access the network where the Agent Registry is deployed (i.e. Polygon)
- `imageRepositoryUsername` - optional; provide authorization username when pushing to an image repository
- `imageRepositoryPassword` - optional; provide authorization password when pushing to an image repository
- `keyfile` - optional; specify the name of a keyfile in ~/.forta to use for publishing (by default we assume there is only one keyfile)
- `keyfilePassword` - optional; specify the password to decrypt the keyfile, useful for CI/CD pipelines
- `agentId` - optional; specify the agentId of this agent, to be used for agents deployed with Forta Connect

## Migrating to v0.0.19+

The forta.config.json file became a globally shared config stored at ~/.forta in SDK v0.0.19. Before v0.0.19, forta.config.json was stored in each project's folder. The motivation for this change was to prevent repeating configuration values across multiple agent projects. You may still provide a local config file in your project which will override any global config values.

If migrating from pre-v0.0.19, you should make the following changes in your project config file:

- remove the `agentId` value (instead, copy this value to the `name` attribute in package.json)
- remove the `version` value (instead, copy this value to the `version` attribute in package.json)
- remove the `documentation` value (this is always hardcoded to README.md)
- copy all remaining values to the global forta.config.json in ~/.forta