# Error monitoring

You can verify the health of your agent from the status dashboard on Forta Explorer (i.e. `https://explorer.forta.network/agent/YOUR_AGENT_ID`). This will give you information like how many transactions the agent has processed or how many times the agent has been stopped due to unresponsiveness.

While this is useful information, agent developers may want more context about error cases and what caused them. Forta currently does not provide detailed error traces for agents, but developers can still collect this data themselves using an existing monitoring tool (e.g. [Sentry](https://sentry.io/)).

## Initialization

Whatever error monitoring tool you decide to use, there will probably be some sort of initialization method you need to invoke, possibly using some API key. A good place to do this would be inside the `initialize` handler of the agent. Also, when placing API keys in your code you probably want to use obfuscation as described in the pattern for [hiding sensitive data](sensitive-data.md).

## Catching errors

The simplest approach would be to wrap the logic in your handler functions with a `try`/`catch` statement. Upon catching any unexpected errors, you can simply log it using your tool of choice. This will allow you to gain more insights into errors and patch your agent if needed.

Keep in mind that there can be multiple instances of your agent running across Forta scan nodes. As such, you may want to assign some generated ID in the agent to distinguish between errors from different instances.
