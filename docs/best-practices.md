# Best practices

This page describes some of the best practices observed for bot development.

## Target specific conditions

Write your bot to target a specific condition so that it does not generate findings for every other block/transaction. Verbose bots can make it hard to distinguish the signal from the noise i.e. if a bot alerts on more than 5% of transactions, the usefulness of those alerts would not be very high as it is difficult to know what to pay attention to.

## Return findings in a timely manner

Ensure that your bot returns findings in a timely manner as requests will timeout after 30 seconds. If your bot needs to execute for longer than 30 seconds, check out the pattern for [long running tasks](long-running-tasks.md).

## Break down large bots into smaller files

Your bot may be looking for multiple conditions that you could write in a single file. We recommend keeping each condition in its own file. This will make testing your bot easier and keep the code more maintainable. You would then combine all the bots in the top-level entrypoint file (i.e. agent.js). See [here](https://github.com/forta-protocol/forta-bot-examples/tree/master/high-gas-js) for an example.

## Keep findings lean

There is a `metadata` field in the `Finding` object that you can use to store any extra information that is useful. Try to keep the data here as lean as possible i.e. don't throw the whole `TransactionEvent` into the metadata since that information is already available on Etherscan.

## Create useful alertIds

You are required to populate the `alertId` field of the `Finding` object. Ideally, you would want it to be unique so that when you search for your `alertId` in [Forta Explorer](https://explorer.forta.network/) it only shows your bot's alerts. Typically, an `alertId` has a string component (describing either the protocol or project) and a numeric component (to distinguish between different types of alerts about the same protocol or project) e.g. `TETHER-1`. It is left to the bot developer to choose what makes sense for their bot.

## Write unit tests

You should write and maintain unit tests for your bot. This will ensure a high quality bar and also allow you to test all edge cases in your bot. Include both negative (i.e. when alerts should not be created) and positive (i.e. when alerts should be created) test cases for completeness.

When writing tests that involve log events, you can mock out the `filterLog` SDK method instead of having to fiddle around with event topics and signatures. See [here](https://github.com/forta-protocol/forta-bot-examples/blob/master/filter-event-and-function-js/src/large.transfer.event.spec.js) for an example. You can similarly mock out the `filterFunction` SDK method when writing tests that involve function calls. See [here](https://github.com/forta-protocol/forta-bot-examples/blob/master/filter-event-and-function-js/src/transfer.from.function.spec.js) for an example.

## Conduct code reviews

It is strongly recommended to conduct code reviews within your team. This will help ensure that any bugs are identified and all edge cases are covered by your bot.

## Include documentation

Ensure that your project documentation README.md is complete, clear and concise. Briefly describe what your bot does, as well as each type of alert it can produce under which conditions. You should also include real test data that someone could use to verify the bot's behaviour. See the example README.md included with the starter projects for an example.

## Use the initialize handler

Your bot may need to do some asynchronous initialization when it starts, for example, by fetching data from some external API. You should use the `initialize` handler function for such logic.

## Limit number of network calls

Your bot may need to make network calls to fetch data from external sources e.g. token prices. Be sure to make only the necessary network calls in order to respond in a timely manner. Another useful strategy for this could be to use caching. Also, if querying lots of on-chain data (e.g. token balances for a list of accounts), consider using the `ethers-multicall` package listed in the [Useful libraries](useful-libraries.md) section to fetch all the data in a single http request.

## Use caching where possible

Caching is a great way to improve performance. If you need to store the result of a network call or some other calculation, try to use an in-memory cache. The `lru-cache` package listed in the [Useful libraries](useful-libraries.md) section is a great option.

## Use concurrency where possible

Try to make use of concurrency to maximize performance. For example, if you are firing multiple http requests to fetch on-chain data, you can use the `ethers-multicall` package to fetch all the data in a single http request. Also, if firing multiple network calls, you can fire all the requests at the same time using something like `Promise.all` in Javascript.

## Obfuscate sensitive information

Be sure to obfuscate sensitive information, such as API keys, in your code. Bot images are stored in a public repository where anyone can access and inspect the code. See the pattern for [hiding sensitive data](sensitive-data.md).

## Beware of case-sensitivity

When comparing addresses in your code, be mindful of case-sensitivity. The SDK will return addresses in the `BlockEvent` and `TransactionEvent` as lowercase, but if you are comparing to a checksum address it will not be equal.
