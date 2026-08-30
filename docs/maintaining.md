# Maintaining your bot

## Verifying bot health

When your bot is published **and picked up by a scan node**, you can view the findings it generates using [Forta App](https://app.forta.network/alerts). You can filter findings using your bot ID (which looks like a SHA-256 hash e.g. `0x855b1556a45637abf05c63407437f6f305b4627c4361fb965a78e5731999c0c7`) using the search bar near the top of the page.

Also, you can verify that your bot is healthy by visiting the bot status page on Forta App. The URL for this page looks like `https://app.forta.network/bot/YOUR_BOT_ID`. You can see various information about the bot including how many transactions it processed, the different severities of alerts it produced and how long it took to respond to requests.

## Viewing bot logs

If [logging is enabled](deploying.md#enable-logging-optional), bot logs are updated by scan nodes every minute. You can view your bot's logs via Forta App, Forta API, or the CLI. Only logs from the past 30 days are stored.

In the Forta App, you can view the latest logs from your bot's health page (i.e. `https://app.forta.network/bot/YOUR_BOT_ID`). Simply click on the 'Log Data' button near the top of the page.

Using the Forta API, you can programmatically fetch the latest logs from `https://api.forta.network/logs/agents/YOUR_BOT_ID`. To enable JSON format responses, you can specify the `Accept: application/json` header in your request. By default, the logs API will return the most recent logs but you can query previous logs using the `minute` query param. By specifying a minute in RFC3339 format (e.g. `https://api.forta.network/logs/agents/YOUR_BOT_ID?minute=2023-04-12T07:20:00.00Z`), you can view previous logs. Note that not every minute may have logs.

You can also use the [CLI command](cli.md#logs) `npm run logs` to see recent logs.

## Disabling/enabling your bot

If you will not be using the alerts your bot generates (i.e. you were just testing out Forta, which we encourage), we ask that you please disable the bot. You can use [Forta App](https://app.forta.network/) or the CLI to enable or disable your bot. In Forta App, go to the Detection Bots page (from the menu at the top right) and click on the options menu to the right of your bot. From the options menu, you can choose to disable or enable your bot.

You can also use the CLI command `npm run disable`. Just make sure to set the `agentId` property in your **project folder's** forta.config.json before running the command (you should create the forta.config.json if it doesn't exist). You will also need to ensure you have Polygon POL tokens in your keyfile address to execute the disable transaction (you can get the keyfile address using `npm run keyfile`). See [this guide](matic.md) on how to acquire Polygon POL tokens. Similarly, you can re-enable a disabled bot using `npm run enable`.


## Updating your bot

You may want to update the code for your bot from time to time (e.g. if you found a bug, or there is a new scenario you want to detect). You can use [Forta App](https://app.forta.network/) or the CLI to update your bot. In Forta App, go to the Detection Bots page (from the menu at the top right) and click on the options menu to the right of your bot. From the options menu, you can choose to edit your bot.

You can also use the CLI command `npm run publish` to update your bot. If you have already deployed a bot, the CLI will know to update the existing bot. Ensure that the keyfile used for updating is the same one you used for creating the bot. Make sure to set the `agentId` property in your **project folder's** forta.config.json before running the command (you should create the forta.config.json if it doesn't exist). You will also need to ensure you have Polygon POL tokens in your keyfile address to execute the update transaction (you can get the keyfile address using `npm run keyfile`). See [this guide](matic.md) on how to acquire Polygon POL tokens.

## Viewing the state of your bot

If you want to inspect the current or historic state of your bot, for example checking the last time your bot was updated, you can use the [CLI command](cli.md#info) `npm run info`.
