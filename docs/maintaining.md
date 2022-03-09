# Maintaining your agent

## Verifying your agent

When your agent is published **and picked up by a scan node**, you can view the findings it generates using [Forta Explorer](https://explorer.forta.network/). You can filter findings using your agent ID (which looks like a SHA-256 hash e.g. `0x855b1556a45637abf05c63407437f6f305b4627c4361fb965a78e5731999c0c7`) using the search bar near the top of the page.

Also, you can verify that your agent is healthy by visiting the agent status page on Forta Explorer. The URL for this page looks like `https://explorer.forta.network/agent/YOUR_AGENT_ID`. You can see various information about the agent including how many transactions it processed, the different severities of alerts it produced and how long it took to respond to requests. For more detailed information like error stacktraces, check out the [error monitoring pattern](error-monitoring.md).

## Disabling/enabling your agent

If you will not be using the alerts your agent generates (i.e. you were just testing out Forta, which we encourage), we ask that you please disable the agent. You can use [Forta App](https://app.forta.network/) or the CLI to enable or disable your agent. In Forta App, go to the My Agents page (from the menu at the top right) and click on the options menu to the right of your agent. From the options menu, you can choose to disable or enable your agent.

You can also use the CLI command `npm run disable`. Just make sure to set the `agentId` property in your **project folder's** forta.config.json before running the command (you should create the forta.config.json if it doesn't exist). You will also need to ensure you have Polygon MATIC tokens in your keyfile address to execute the disable transaction (you can get the keyfile address using `npm run keyfile`). See [this guide](matic.md) on how to acquire Polygon MATIC tokens. Similarly, you can re-enable a disabled agent using `npm run enable`.


## Updating your agent

You may want to update the code for your agent from time to time (e.g. if you found a bug, or there is a new scenario you want to detect). You can use [Forta App](https://app.forta.network/) or the CLI to update your agent. In Forta App, go to the My Agents page (from the menu at the top right) and click on the options menu to the right of your agent. From the options menu, you can choose to edit your agent.

You can also use the CLI command `npm run publish` to update your agent. If you have already deployed an agent, the CLI will know to update the existing agent. Ensure that the keyfile used for updating is the same one you used for creating the agent. Make sure to set the `agentId` property in your **project folder's** forta.config.json before running the command (you should create the forta.config.json if it doesn't exist). You will also need to ensure you have Polygon MATIC tokens in your keyfile address to execute the update transaction (you can get the keyfile address using `npm run keyfile`). See [this guide](matic.md) on how to acquire Polygon MATIC tokens.

