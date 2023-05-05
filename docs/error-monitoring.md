# Error monitoring

You can [verify the health of your bot](maintaining.md#verifying-bot-health) from the status dashboard on Forta Explorer (i.e. `https://explorer.forta.network/agent/YOUR_AGENT_ID`). This will give you information like how many transactions the bot has processed or the latency of its responses. You can also use Forta's logging feature to [view bot logs](maintaining.md#viewing-bot-logs).

While this is useful information, bot developers may want to integrate their bot into an existing error monitoring solution (e.g. [Sentry](https://sentry.io/)).

<iframe width="560" height="315" src="https://www.youtube.com/embed/JlssgYi6XfA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Initialization

Whatever 3rd party error monitoring tool you decide to use, there will probably be some sort of initialization method you need to invoke, possibly using some API key. A good place to do this would be inside the `initialize` handler of the bot. Also, when placing API keys in your code you probably want to use methods described in the pattern for [protecting sensitive data](sensitive-data.md).

## Catching errors

The simplest approach would be to wrap the logic in your handler functions with a `try`/`catch` statement. Upon catching any unexpected errors, you can simply log it using your tool of choice. This will allow you to gain more insights into errors and patch your bot if needed.

Keep in mind that there can be multiple instances of your bot running across Forta scan nodes. As such, you may want to assign some generated ID in the bot to distinguish between errors from different instances.
