## Health

The Forta node CLI (`forta`) has a `status` command which displays a list of human friendly health reports.

```
forta.container.forta-inspector.summary
⬤ ok

forta.container.forta-json-rpc.summary
⬤ ok

forta.container.forta-public-api.summary
⬤ ok

forta.container.forta-scanner.summary
⬤ ok: at block 17455932.

forta.container.forta-supervisor.summary
⬤ ok: all 6 service containers are running.
```

Upon extending this command with `--show all --format oneline` or by simply using `status all`, it returns a full list of statuses from the trackers internally used.

Positive numbers mean a successful result. `-1` is failure and `-3` means unknown/irrelevant. The ones that are `-1` one can effect the SLA score and this might be visible from the `inspector.expected-score` report.

Let's visit some of the useful ones:

### `inspector`

These are the result of the inspections made in the node periodically. It runs once at startup and then approximately every 10 minutes.

For chains other than Ethereum Mainnet, `is-eth2` is irrelevant.

- `api.refs.valid`: Scan, trace and proxy should have the same hash for the same API call. This tells about the configuration consistency.
- `expected-score`: This is the expected inspection score according to the node's knowledge. The inspection score has a critical effect on your node's SLA score.
- `proxy-api`:  Should have positive numbers.
- `registry-api`: This tells if your node is able load the detection bots. This might affect your SLA score.
- `resources.memory`: Total memory must be at least 16 GB and available must be at least 2 GB.
- `scan-api`:  Should have positive numbers.
- `trace-api`:  Should have positive numbers if scanning chains with ID 1 and 250.

### `chain-json-rpc-client`

`request.block-by-number.error` can sometimes say "not found". This is because the next block is requested and it is just yet not available. This is okay. We just need to surface _whatever_ error is happening.

If it's an error different than a periodically appearing and disappearing "not found" (or similar), then it is likely that your scan API does not work. Please revisit [this section](configure.md#pick-a-provider) in this case.

### `trace-json-rpc-client`

`request.trace-block.error` can rarely fail when it is different from the scan API and they are slightly out of sync (i.e. the trace API does not have the block yet). It safe to ignore unless the error looks like a very specific one and is persistent.

### `publisher`

- `event.batch-publish-attempt.time`: This "attempt" should just look recent.
- `event.batch-publish.time`: This should not look much older than 1m if there are bots. If there are no bots, then this period is 15m.
- `event.batch-publish.error`: This error is a sign that your node is failing to deliver alerts and will have a low SLA score.

### `bot-registry`

- `event.checked.time`: Should not be much longer than 10m. If it is, then please check your bandwidth.
- `event.checked.error`: This is a sign that your node is failing to load the bot list or auto-upgrade. It is okay if an error appear sometimes. Make sure that it is not persistent and visit [this section](configure.md#configure-registry-api) in case it is persistent.

```
$ forta status all
⬤ ok | forta.container.forta-inspector | running
⬤ info | forta.container.forta-inspector.service.inspector.api.refs.valid | 1
⬤ info | forta.container.forta-inspector.service.inspector.expected-score | 1
⬤ ok | forta.container.forta-inspector.service.inspector.last-error
⬤ info | forta.container.forta-inspector.service.inspector.network.access.outbound | 1
⬤ info | forta.container.forta-inspector.service.inspector.network.speed.download | -3
⬤ info | forta.container.forta-inspector.service.inspector.network.speed.upload | -3
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.accessible | 1
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.chain-id | 1
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.history-support | 1
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.is-eth2 | 1
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.module.eth | 1
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.module.net | 1
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.module.web3 | 1
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.offset.scan.max | 367
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.offset.scan.mean | 182.5
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.offset.scan.median | 182.5
⬤ info | forta.container.forta-inspector.service.inspector.proxy-api.offset.scan.samples | 2
⬤ info | forta.container.forta-inspector.service.inspector.registry-api.accessible | 1
⬤ info | forta.container.forta-inspector.service.inspector.registry-api.assignments | 1
⬤ info | forta.container.forta-inspector.service.inspector.registry-api.ens | 1
⬤ info | forta.container.forta-inspector.service.inspector.resources.cpu.benchmark | 751051706
⬤ info | forta.container.forta-inspector.service.inspector.resources.cpu.usage | 9.571788413844256
⬤ info | forta.container.forta-inspector.service.inspector.resources.memory.available | 4509470720
⬤ info | forta.container.forta-inspector.service.inspector.resources.memory.total | 16419328000
⬤ info | forta.container.forta-inspector.service.inspector.resources.storage.available | 1420687622144
⬤ info | forta.container.forta-inspector.service.inspector.resources.storage.total | 538439368704
⬤ info | forta.container.forta-inspector.service.inspector.scan-api.accessible | 1
⬤ info | forta.container.forta-inspector.service.inspector.scan-api.chain-id | 1
⬤ info | forta.container.forta-inspector.service.inspector.scan-api.is-eth2 | 1
⬤ info | forta.container.forta-inspector.service.inspector.scan-api.module.eth | 1
⬤ info | forta.container.forta-inspector.service.inspector.scan-api.module.net | 1
⬤ info | forta.container.forta-inspector.service.inspector.trace-api.accessible | 1
⬤ info | forta.container.forta-inspector.service.inspector.trace-api.chain-id | 1
⬤ info | forta.container.forta-inspector.service.inspector.trace-api.is-eth2 | 1
⬤ info | forta.container.forta-inspector.service.inspector.trace-api.supported | 1
⬤ ok | forta.container.forta-inspector.summary
⬤ ok | forta.container.forta-json-rpc | running
⬤ ok | forta.container.forta-json-rpc.service.json-rpc-proxy.api
⬤ ok | forta.container.forta-json-rpc.summary
⬤ ok | forta.container.forta-jwt-provider | running
⬤ ok | forta.container.forta-jwt-provider.service.jwt-provider.api
⬤ ok | forta.container.forta-nats | running
⬤ ok | forta.container.forta-public-api | running
⬤ ok | forta.container.forta-public-api.service.public-api-proxy.api
⬤ ok | forta.container.forta-public-api.summary
⬤ ok | forta.container.forta-scanner | running
⬤ info | forta.container.forta-scanner.service.alert-feed.last-alert
⬤ ok | forta.container.forta-scanner.service.block-analyzer.event.input.time | 2023-06-11T09:19:05Z
⬤ unknown | forta.container.forta-scanner.service.block-analyzer.event.output.time
⬤ info | forta.container.forta-scanner.service.block-feed.last-block | 17455940
⬤ ok | forta.container.forta-scanner.service.chain-json-rpc-client.request.block-by-number.error
⬤ ok | forta.container.forta-scanner.service.chain-json-rpc-client.request.block-by-number.time | 2023-06-11T09:19:24Z
⬤ ok | forta.container.forta-scanner.service.chain-json-rpc-client.request.get-transaction-receipt.error
⬤ unknown | forta.container.forta-scanner.service.chain-json-rpc-client.request.get-transaction-receipt.time
⬤ ok | forta.container.forta-scanner.service.chain-json-rpc-client.request.trace-block.error
⬤ unknown | forta.container.forta-scanner.service.chain-json-rpc-client.request.trace-block.time
⬤ unknown | forta.container.forta-scanner.service.combiner-alert-analyzer.event.input.time
⬤ unknown | forta.container.forta-scanner.service.combiner-alert-analyzer.event.output.time
⬤ ok | forta.container.forta-scanner.service.publisher.event.batch-publish-attempt.time | 2023-06-11T09:19:15Z
⬤ ok | forta.container.forta-scanner.service.publisher.event.batch-publish.error
⬤ unknown | forta.container.forta-scanner.service.publisher.event.batch-publish.time
⬤ info | forta.container.forta-scanner.service.publisher.event.batch-skip.reason | because this node runs no bots and slow report deadline has not exceeded yet
⬤ info | forta.container.forta-scanner.service.publisher.event.batch-skip.time | 2023-06-11T09:19:15Z
⬤ unknown | forta.container.forta-scanner.service.publisher.event.metrics-flush.time
⬤ info | forta.container.forta-scanner.service.sender.agents.lagging | 0
⬤ failing | forta.container.forta-scanner.service.sender.agents.total | 0
⬤ ok | forta.container.forta-scanner.service.trace-json-rpc-client.request.block-by-number.error
⬤ unknown | forta.container.forta-scanner.service.trace-json-rpc-client.request.block-by-number.time
⬤ ok | forta.container.forta-scanner.service.trace-json-rpc-client.request.get-transaction-receipt.error
⬤ unknown | forta.container.forta-scanner.service.trace-json-rpc-client.request.get-transaction-receipt.time
⬤ ok | forta.container.forta-scanner.service.trace-json-rpc-client.request.trace-block.error
⬤ ok | forta.container.forta-scanner.service.trace-json-rpc-client.request.trace-block.time | 2023-06-11T09:19:05Z
⬤ ok | forta.container.forta-scanner.service.tx-analyzer.event.input.time | 2023-06-11T09:19:05Z
⬤ unknown | forta.container.forta-scanner.service.tx-analyzer.event.output.time
⬤ ok | forta.container.forta-scanner.service.tx-stream.event.block.time | 2023-06-11T09:19:05Z
⬤ ok | forta.container.forta-scanner.service.tx-stream.event.transaction.time | 2023-06-11T09:19:05Z
⬤ ok | forta.container.forta-scanner.summary | at block 17455940.
⬤ ok | forta.container.forta-supervisor | running
⬤ info | forta.container.forta-supervisor.service.bot-registry.event.change-detected.time | 2023-06-11T09:12:52Z
⬤ ok | forta.container.forta-supervisor.service.bot-registry.event.checked.error
⬤ info | forta.container.forta-supervisor.service.bot-registry.event.checked.time | 2023-06-11T09:08:41Z
⬤ ok | forta.container.forta-supervisor.service.supervisor.containers.managed | 6
⬤ ok | forta.container.forta-supervisor.service.supervisor.event.agent-logs-sync.error
⬤ ok | forta.container.forta-supervisor.service.supervisor.event.agent-logs-sync.time | 2023-06-11T09:18:39Z
⬤ ok | forta.container.forta-supervisor.service.supervisor.event.custom-telemetry-sync.error
⬤ unknown | forta.container.forta-supervisor.service.supervisor.event.custom-telemetry-sync.time
⬤ info | forta.container.forta-supervisor.service.supervisor.event.run-agent.time
⬤ info | forta.container.forta-supervisor.service.supervisor.event.stop-agent.time
⬤ ok | forta.container.forta-supervisor.service.supervisor.event.telemetry-sync.error
⬤ unknown | forta.container.forta-supervisor.service.supervisor.event.telemetry-sync.time
⬤ info | forta.container.forta-supervisor.service.supervisor.local-mode | false
⬤ ok | forta.container.forta-supervisor.summary | all 6 service containers are running.
⬤ info | forta.version
```
