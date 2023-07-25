## SLA

The SLA score is a performance score calculated by using the reports the scan nodes are sending. It is used in calculating rewards and making bot assignments. To learn more about how it is calculated, please visit the [SLA page](../sla.md).

The largest factor in SLA calculation is the number of the latest block scanned.

To view your scan node's uptime and SLA simply copy and paste

```
https://explorer.forta.network/scan-node/{enter-your-scan-node-address-here}
```

into your browser's search bar.

![View scan node SLA example](../scan-node-view.png)

You can use the [SLA API](sla-api.md) for more details insights.

Please note that the number in Forta Explorer can differ from what SLA API returns because of time range differences (see Q3 in [FAQ](faq.md)).

## Telemetry

The health reports presented in the [Health](troubleshoot.md#health) section are forwarded to Forta telemetry handler every 5 minutes, after sensitive data is obfuscated (e.g. API URLs that contain keys). This is useful for core developers to understand what is going on with scan nodes and resolve issues.

You can specify a custom telemetry handler in the `config.yml` file if you would like to receive these health reports from your nodes every minute:

```yaml
telemetry:
  customUrl: http://<enter-your-telemetry-handler-url-here>
```

The forwarded content is a gzipped JSON which is similar to the `forta status --show all --format json` output.

```json
[
  ...
  {
    "name": "forta.container.forta-scanner.service.agent-pool.agents.total",
    "status": "ok",
    "details": "14"
  },
  {
    "name": "forta.container.forta-scanner.service.block-analyzer.event.input.time",
    "status": "ok",
    "details": "2022-08-17T10:36:20Z"
  },
  {
    "name": "forta.container.forta-scanner.service.block-analyzer.event.output.time",
    "status": "ok",
    "details": "2022-08-17T10:36:20Z"
  },
  {
    "name": "forta.container.forta-scanner.service.block-feed.last-block",
    "status": "info",
    "details": "15358230"
  }
  ...
]
```
