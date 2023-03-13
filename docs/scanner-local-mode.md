# Run a Scan Node locally

In addition to default public scanning, `forta` has a local mode which is useful for:

- running only specific detection bots
- doing a test run using specific detection bots within a block range
- logging the alerts instead of publishing
- forwarding the alerts to a specific target (webhook)
- producing bot metrics

!!! note "Staking and rewards"
    Local nodes do not require staking and do not generate any rewards. Local mode is made available only to suit your private scanning and testing needs.

## Steps to run

### Using the CLI

Steps to run a local node using the CLI:

- `forta init --passphrase <passphrase>`
- Configure `~/.forta/config.yml`
- `forta run --passphrase <passphrase>`

You can provide the passphrase by doing `export FORTA_PASSPHRASE=<passphrase>` as an alternative method to the `--passphrase` flag. If you are setting up your node just for testing and development, you can choose a weak and convenient passphrase.

### Using Docker Compose

Alternatively, if you would like to run the local mode using a single `docker-compose.yml` file make sure you check out the  [**standalone mode**](#standalone-mode) section!

## Start configuring

To enable the local mode successfully, please specify at least these settings in the config file:

```yaml
# id of the chain to scan
chainId: 1

scan:
  jsonRpc:
    url: http://some-json-rpc-url.io

trace:
  jsonRpc:
    url: http://only-if-required-for-chain.io

jsonRpcProxy:
  jsonRpc:
    url: http://defaults-to-scan-url-if-not-specified.io

localMode:
  enable: true
  # docker references of remote or locally available detection bot images
  botImages:
    - my-local-test-bot-image-reference
    - disco.forta.network/bafybeie5xvbbvhlrollwfb3xd4qxs5qw6rhk52ukeq2zbek6tetryqdn5a # remote image
```

If `forta` requires trace API to be specified for the configured `chainId` (e.g. Ethereum Mainnet, Fantom) and you don't want to use a trace API for now, you can change the `chainId` to something random like `90909`.

## Specify a block range

This allows limiting the runtime inputs, test different bots under the same conditions and comparing outputs. Since bot processing delay can be unexpected, it is important to specify a `stopTimeoutSeconds` to wait for all bots to finish and the alerts to get logged or sent (webhook). It is useful to reduce the publishing interval to a short time in order to keep `stopTimeoutSeconds` at a lower value.

```yaml
publish:
  batch:
    intervalSeconds: 1
    metricsBucketIntervalSeconds: 1 # how often the metrics go out with alert batches

localMode:
  ...
  runtimeLimits:
    startBlock: 1191111
    stopBlock: 1192345
    stopTimeoutSeconds: 30
```

## Outputting alerts

By default, local mode logs all alert batch outputs to `~/.forta/logs/forta-local-alert-logs-{timestamp}`. You can use the `logFileName` setting to always write to a specific file within `~/.forta/logs`.

```yaml
localMode:
  ...
  logFileName: testlogs.txt
```

Or, you could let them be outputted to stdout as info-level logs. Please keep in mind that this disables the other types of outputs described in this section.

```yaml
localMode:
  ...
  logToStdout: true
```

If you would like to forward the alerts to a specific destination instead, you can specify a webhook handler:

```yaml
localMode:
  ...
  webhookUrl: http://my-webhook-handler.url
```

To suit these kind of purposes, we defined [Forta Webhook Specification](https://github.com/forta-network/forta-core-go/blob/master/protocol/webhook/swagger.yml). In local mode, a scan node conforms with this specification and sends authorized webhook requests.

!!! note "About paths"
    The paths defined in the webhook specification is only for making the definitions easier. Scan node configuration requires the complete webhook URL and ignores all paths defined in the specification.

!!! important "Convert to Discord Webhooks"
    If you need to convert the webhook requests to Discord webhook requests, make sure you check out this [awesome converter](https://github.com/lidofinance/forta-discord) by Lido Finance.

## Alert deduplication

If you wish to avoid outputting an alert multiple times from a cluster of local nodes, you can set up Redis and point your nodes using the deduplication config.

```yaml
deduplication:
  ttlSeconds: 300
  redis:
    address: <host>:<port>
    password: '123'
    db: 1 # database to be selected after connecting to the server
```

Alternatively, if you are running a Redis cluster:

```yaml
deduplication:
  ttlSeconds: 300
  redisCluster:
    addresses:
      - host1:<port>
      - host2:<port>
    password: '123'
```

## Simulate JSON-RPC throttling

If you would like to observe how your bots are doing under strict JSON-RPC rate limiting, you can override the token bucket algorithm settings from:

```yaml
jsonRpcProxy:
  ...
  rateLimit:
    rate: 123
    burst: 456
```

## Bot metrics

As part of the alert batches (mentioned in the webhook specification), some bot metrics are forwarded. These metrics are bucketed into the specified interval in the config and a summary object for each go out with the soonest batch possible as soon as the interval is over.

Metrics are especially helpful to understand the performance of your bots. However, please keep in mind that `forta` does not yet come with a tool to further analyze or visualize this data.

```yaml
publish:
  batch:
    intervalSeconds: 1
    metricsBucketIntervalSeconds: 1 # how often the metrics go out with alert batches

localMode:
  ...
  includeMetrics: true
```

Please see [Forta Webhook Specification](https://github.com/forta-network/forta-core-go/blob/master/protocol/webhook/swagger.yml) to better understand the metrics summary data model.

### Types of bot metrics

| Name                | Description                                  |
| ------------------- | -------------------------------------------- |
| `finding`           | Finding count                                |
| `findings.dropped`  | Dropped finding count (due to hard limit)    |
| `tx.request`        | Transaction input count                      |
| `tx.latency`        | Transaction processing latency               |
| `tx.error`          | Transaction processing error count           |
| `tx.success`        | Transaction processing success count         |
| `tx.drop`           | Dropped transaction input count              |
| `tx.block.age`      | From block time to bot input time in ms      |
| `tx.event.age`      | From tx feed time to bot input time in ms    |
| `block.block.age`   | From block time to bot input time in ms      |
| `block.event.age`   | From block feed time to bot input time in ms |
| `block.request`     | Block input count                            |
| `block.latency`     | Block processing latency                     |
| `block.error`       | Block processing error count                 |
| `block.success`     | Block processing success count               |
| `block.drop`        | Dropped block input count                    |
| `jsonrpc.latency`   | JSON-RPC request latency                     |
| `jsonrpc.request`   | JSON-RPC request count                       |
| `jsonrpc.success`   | JSON-RPC request success count               |
| `jsonrpc.throttled` | Throttled JSON-RPC request count             |

## Standalone mode

We crafted a more specialized version of the local mode, called _standalone mode_, which allows running the node using a single `docker-compose.yml` file and without having to deal with the Forta node CLI and the `~/.forta` directory.

In this mode,

- all of the required Forta node service containers and the bots are defined under `services`,
- container dependencies are set by using `depends_on` definitions,
- Forta config is defined under `x-forta-config` instead of using a separate `config.yml` file.

The `docker-compose.yml` file looks something like this:

```yaml
services:
  service-forta-scanner:
    container_name: forta-scanner
    image: forta-network/forta-scanner:latest
    ...
    depends_on:
      - bot-1
  ...

  bot-1:
    container_name: forta-bot-1
    ...

x-forta-config:
  ...

  localMode:
    enable: true
    logToStdout: true
    privateKeyHex: abcdefg0...
    standalone:
      enable: true
      botContainers:
        - forta-bot-1
```

For a more detailed reference, please check out to the Docker Compose file defined in the forta-node repository [here](https://github.com/forta-network/forta-node/blob/master/docker-compose/standalone/docker-compose.yml). You can use that file as boilerplate for your purposes.

!!! important "This is still local mode"
    The other local mode settings are valid to use in this mode and other explanations also apply to it, since standalone is just a specialized sub-mode of the local mode.

The steps to run the standalone mode using that file are:

- Set `privateKeyHex` to something that makes sense to you. The webhook requests include a JWT that is signed using that. (More about verification [here](https://github.com/forta-network/forta-core-go/blob/master/security/jwt.go))
- Optionally, specify the webhook URL you would like to use.
- Configure the bot containers under `services` and let the scanner container depend on them (by using `depends_on`).
- List down the names of the bot containers (not service names!) under `localmode.standalone.botContainers` so the scanner container can attach to them.
- Specify the service container images. You can get this in two different ways:

    - Follow the IPFS hash in the `forta version` output and find the Docker image reference. Then use that reference like `disco.forta.network/bafybei...` in the Docker Compose file.
    - At the project root, do `make containers` and it will build the `forta-network/forta-scanner:latest` image for you.

- Run the Docker Compose file like `docker compose up --remove-orphans --abort-on-container-exit`.
