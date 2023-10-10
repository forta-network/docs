## Pick a chain

Forta Network is currently scanning seven chains. Please make sure you have decided which chain you would like your node to scan before continuing to the next steps.

- Ethereum
- Polygon
- BNB Chain
- Avalanche
- Arbitrum
- Optimism
- Fantom

You can find info about the per-week reward pool and previously distributed weekly rewards in this [Rewards](https://forta.notion.site/Rewards-2152a115a3df4f70ae05971a6fa6ac3e) page, which might help you choose the chain to scan.

## Pick a provider

!!! important "JSON-RPC API quality matters"
    This is the most important step of configuring a Forta scan node as it has a critical impact on alerting and the SLA (performance) score.

There are four types of JSON-RPC APIs which are configurable in `~/.forta/config.yml` after the next step and each can have a critical impact on the SLA score of the node.

- `scan`: This is the API used as the source of the chain data (blocks, transactions) which are fed into running detection bots.
- `trace`: This is usually the same as the scan API and it needs to support the `trace_block` method. It is not required for scanning every chain (currently only Ethereum and Fantom).
- `jsonRpc`: This defaults to scan API by default. It allows bots to make extra JSON-RPC requests to check the chain state. Please make sure that this API can take load as some bots can be heavy.
- `registry`: This API is different from the other APIs as it always needs to be a _Polygon Mainnet_ JSON-RPC API. It is used for retrieving the list of assigned bots and the latest node releases for auto-upgrade purposes. It is used much more lightly compared to the other APIs listed here.

**We strongly recommend:**

- running your own full node as the provider of the first three APIs,
- picking a _private_ registry API to avoid disconnection from the network state.

If you would like to run an Ethereum full node you can follow [these steps](miscellaneous.md#run-an-ethereum-full-node). 

If you are not willing to run a full node, you can prefer [Alchemy](../alchemy-partnership.md), [Chainstack](../scan-with-chainstack.md) or others as your provider.

## Initialize the node

Initialization creates three things:

- A Forta node configuration directory at `~/.forta`
- A default configuration file at `~/.forta/config.yml`
- An Ethereum private key at `~/.forta/.keys/<keyfile>`

The private key is used for asserting your node's identity whenever required (e.g. publishing alerts from your scan node).

You can run the `init` command by providing two values:

- **Passphrase (required):** `FORTA_PASSPHRASE` environment variable or the `--passphrase` flag
- **Directory path (optional):** `FORTA_DIR` environment variable or the `--dir` flag

```
forta init --passphrase <your_passphrase>
```

The output is:

```
Scanner address: 0xAAA8C491232cB65a65FBf7F36b71220B3E695AAA

Successfully initialized at /home/username/.forta
```

If you need to find out your address later again, you can do `forta account address`.

## Configure systemd

If `forta` ever stops running, it must be restarted. If you used a package installation method, there is a Forta systemd service that can be enabled and overridden with your passphrase and config directory environment variables.

**Please do not modify the original `forta.service` file and instead prefer the override recommended in this section.** This is needed because the original file will be replaced next time you update `forta` through `yum` or `apt`.

To override systemd service environment, you can set the variables in `/etc/systemd/system/forta.service.d/env.conf` like:

```ini
[Service]
Environment="FORTA_DIR=<your_forta_config_dir>"
Environment="FORTA_PASSPHRASE=<your_forta_passphrase>"
```

!!! note "Alternative Systemd Override Path"
    In our previous tests, it was confirmed that this approach works in Ubuntu, Debian, CentOS and Fedora. However, it has been reported by several node operators that it sometimes does not work as expected in some distributions. If you are not able to make this work using the suggested path above, you can try writing to `/lib/systemd/system/forta.service.d/env.conf` instead, as an alternative.

## Configure Chain APIs

In your Forta directory, there now is a `config.yml` file. You must configure that file so that your scan node knows how to get its blockchain data.

To let your scan node pull chain data, you need to provide a valid `scan.jsonRpc.url`.

If you are scanning Ethereum mainnet, `trace.jsonRpc.url` must also be set as an endpoint that supports `trace_block` method. If you have your own Ethereum node that supports it (e.g. Erigon), you can use that node. If not, you can use an endpoint from a paid plan like [Alchemy](../alchemy-partnership.md) Growth plan or one of [Chainstack](../scan-with-chainstack.md)'s plans.

!!! note "JSON-RPC APIs"
    Detection bots are able to call JSON-RPC APIs using the scan node's configured endpoints. By default, this is the `scan.jsonRpc.url` but one can separate bot-specific traffic by specifying a `jsonRpcProxy.jsonRpc.url`.

!!! info "Other chains"
    If your node is scanning chains other than Ethereum mainnet, please check out the [Scanning other chains](#scanning-other-chains) section to see some examples.

### HTTP

Here is an example configuration to scan Ethereum mainnet using [Alchemy](../alchemy-partnership.md) Growth plan and HTTP endpoints:

```yaml
chainId: 1

# The scan settings are used to retrieve the transactions that are analyzed
scan:
  jsonRpc:
    url: https://eth-mainnet.alchemyapi.io/v2/KEY

# This is needed only for scanning Ethereum Mainnet and Fantom
trace:
  jsonRpc:
    url: https://eth-mainnet.alchemyapi.io/v2/KEY

# Optional: Bots make extra requests to check the chain state. You can point
# them to a different reliable API by using this. This defaults to `scan.jsonRpc.url`. 
jsonRpcProxy:
  jsonRpc:
    url: http://different-api:8545
```

Another example configuration to scan Ethereum mainnet using your Erigon node's HTTP endpoint:

```yaml
chainId: 1

scan:
  jsonRpc:
    url: http://your-node:8545

trace:
  jsonRpc:
    url: http://your-node:8545

# Defaulting to `scan.jsonRpc.url` if not set - the best option when running a node
# jsonRpcProxy:
#   jsonRpc:
#     url: http://your-node:8545
```

### WebSocket

If you have a WebSocket endpoint available from your full node or from your JSON-RPC provider (e.g. [Alchemy](../alchemy-partnership.md)), you can use that endpoint as `scan.jsonRpc.url`. This will ensure that your node will always fetch the latest block as fast as possible.

!!! tip "Notifications"
    The WebSocket endpoint needs to support block header notifications. Please check the output of
	```
	docker logs forta-scanner -f
	```
	to see any issues after starting the node.

!!! warning "Proxy"
    If you set the scan API as a WebSocket endpoint, please set `jsonRpcProxy.jsonRpc.url` as an HTTP JSON-RPC API. Your node may get a low score if you skip this!

Example:

```yaml
chainId: 1

scan:
  jsonRpc:
    url: wss://<websocket-api>

trace:
  jsonRpc:
    url: wss://<websocket-api>

jsonRpcProxy:
  jsonRpc:
    url: https://<http-api>
```

### Retries

The block feed in the node always retries any request whenever `eth_getBlockByNumber`, `eth_getLogs` or `trace_block` does not work. The default retry interval is 8 seconds. While this is a sufficient retry interval on average for all chains, you can reduce this interval so your node catches up faster.

!!! tip "Effect to score"
    Reducing the retry interval can help you achieve a higher SLA score in case you have any concerns about your node's current score. Please keep in mind that small retry intervals can cause a bump in the number of total requests because of the increase in the number of retries.

To reduce the retry interval to two seconds, you can add `retryIntervalSeconds` to the scan section of your config like:

```yaml
scan:
  retryIntervalSeconds: 2
```

## Configure Registry API

!!! danger "Not optional"
    Quality of this API is as important as the rest of the APIs configured for scanning while it is not used heavily. Please consider using a private API to avoid disconnection from the network state.

There are a set of Forta smart contracts on Polygon, which allows finding out:

- the latest list of bots which a scan node should run
- the latest Forta node service Docker image release

All Forta nodes are expected to run with the latest release and the latest list of the assigned bots. To be able to read these values, Forta nodes use `https://rpc.ankr.com/polygon` by default but this API can rate-limit your node. Please consider changing this to a free Polygon API with high availability, e.g. [Alchemy](../alchemy-partnership.md) Polygon API, [Chainstack](../scan-with-chainstack.md) Polygon API, by adding the following configuration:

```yaml
registry:
  jsonRpc:
    url: https://polygon-mainnet.g.alchemy.com/v2/<your-alchemy-api-key>
```

## Scanning other chains

Here are some configuration examples that use free APIs for chains other than Ethereum mainnet.

!!! danger "Free APIs"
    The performance of free APIs can be unpredictable as they have unknown rate limits. This can cause your node to have a low SLA score.

### BNB Chain

You can choose from public BNB Chain endpoints at https://docs.binance.org/smart-chain/developer/rpc.html.

```yaml
chainId: 56

scan:
  jsonRpc:
    url: https://bsc-dataseed.binance.org/

trace:
  enabled: false
```

### Polygon

```yaml
chainId: 137

scan:
  jsonRpc:
    url: https://polygon-rpc.com/

trace:
  enabled: false
```

### Avalanche

```yaml
chainId: 43114

scan:
  jsonRpc:
    url: https://api.avax.network/ext/bc/C/rpc

trace:
  enabled: false
```

### Arbitrum

```yaml
chainId: 42161

scan:
  jsonRpc:
    url: https://arb1.arbitrum.io/rpc

trace:
  enabled: false
```

### Optimism

```yaml
chainId: 10

scan:
  jsonRpc:
    url: https://mainnet.optimism.io

trace:
  enabled: false
```

### Fantom

```yaml
chainId: 250

scan:
  jsonRpc:
    url: https://rpc.ftm.tools/

trace:
  jsonRpc:
    url: https://rpcapi-tracing.fantom.network/
```
