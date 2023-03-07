# Run a Scan Node locally

In addition to default public scanning, `forta` has a local mode which is useful for:

- running only specific detection bots
- doing a test run using specific detection bots within a block range
- logging the alerts instead of publishing
- forwarding the alerts to a specific target (webhook)
- producing bot metrics

!!! note "Staking and rewards"
    Local nodes do not require staking and do not generate any rewards. Local mode is made available only to suit your private scanning and testing needs.

Steps to run a local node:

- `forta init --passphrase <passphrase>`
- Configure `~/.forta/config.yml`
- `forta run --passphrase <passphrase>`

You can provide the passphrase by doing `export FORTA_PASSPHRASE=<passphrase>` as an alternative method to the `--passphrase` flag. If you are setting up your node just for testing and development, you can choose a weak and convenient passphrase.

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
  redis:
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
