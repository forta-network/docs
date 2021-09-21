---
hide:
  - toc
---

# forta.config.json

The forta.config.json file provides configurability for your agent. If you want to use a different config file during development, you can do so using the `--config` CLI flag. 

!!! note "Securing sensitive information"
    Since the config file can contain sensitive information (e.g. Infura API keys), you should **not** commit it into version control. 

Here are the following supported configuration properties:

- **agentId** - unique identifier for your agent when publishing
- **version** - used as a version stamp for your agent when publishing
- **documentation** - specifies the name of a markdown file containing agent documentation that is published with the agent
- **ipfsGatewayUrl** - used to specify a IPFS gateway to upload your agent manifest when publishing
- **ipfsGatewayAuth** - optional; provide an authorization header if your IPFS gateway requires one
- **agentRegistryJsonRpcUrl** - used to access the network where the Agent Registry is deployed (i.e. Göerli)
- **jsonRpcUrl** - development only; allows you to run your agent against data from a specific JSON-RPC endpoint
- **traceRpcUrl** - development only; allows you to retrieve trace data from the specified JSON-RPC endpoint
- **imageRepositoryUsername** - optional; provide authorization username when pushing to an image repository
- **imageRepositoryPassword** - optional; provide authorization password when pushing to an image repository
- **keyfile** - optional; specifies the name of a keyfile in ~/.forta to use for publishing (by default we assume there is only one keyfile)
