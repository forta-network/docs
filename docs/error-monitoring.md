# Error monitoring

You can verify the health of your agent from the status dashboard on Forta Explorer (i.e. `https://explorer.forta.network/agent/YOUR_AGENT_ID`). This will give you information like how many transactions the agent has processed or the latency of its responses.

While this is useful information, agent developers may want more context about error cases and what caused them. Developers can collect this data themselves using an existing monitoring tool (e.g. [Sentry](https://sentry.io/)).

In addition to custom monitoring solutions, Forta provides a logging API that lets you check log snapshots of your agent from across different scan nodes. To enable this feature for your agent, you need to update your agent Dockerfile with a container setting label like

```Dockerfile
LABEL "network.forta.settings.agent-logs.enable"="true"
```

and build & publish your agent again. These snapshots are updated by scan nodes every minute and you can retrieve the last few of them from

```
https://api.forta.network/logs/agents/{your-agent-id}
```

All log snapshots are kept for 30 days. There is a `minute` param (requires RFC3339 format) that lets you check older log snapshots but not every minute might have a log snapshot. You can use this param more effectively after determining the time of an agent event. If you need a continuous history, you can fetch the API periodically, without params, and store the logs in a tool of your choice. To enable JSON format in response, you can use `Accept: application/json` header in your request.

## Initialization

Whatever custom error monitoring tool you decide to use, there will probably be some sort of initialization method you need to invoke, possibly using some API key. A good place to do this would be inside the `initialize` handler of the agent. Also, when placing API keys in your code you probably want to use obfuscation as described in the pattern for [hiding sensitive data](sensitive-data.md).

## Catching errors

The simplest approach would be to wrap the logic in your handler functions with a `try`/`catch` statement. Upon catching any unexpected errors, you can simply log it using your tool of choice. This will allow you to gain more insights into errors and patch your agent if needed.

Keep in mind that there can be multiple instances of your agent running across Forta scan nodes. As such, you may want to assign some generated ID in the agent to distinguish between errors from different instances.
