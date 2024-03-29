
* [Adding labels to findings](https://docs.forta.network/en/latest/labels/)

Labels provide a way to add more contextual data to findings generated by Forta bots. This information can be used to answer questions like "which addresses have been involved in flashloan attacks?" or "which blocks contain exploits?". 



* [Error monitoring](https://docs.forta.network/en/latest/error-monitoring/)

While [verifying the health of your bot](https://docs.forta.network/en/latest/maintaining/#verifying-bot-health) from the status dashboard on Forta App (i.e. `https://app.forta.network/bot/YOUR_BOT_ID`) is useful information, bot developers may want to integrate their bot into an existing error monitoring solution (e.g. [Sentry](https://sentry.io/)).



* [Increasing bot throughput with Sharding](https://docs.forta.network/en/latest/sharding/)

Some detection bots may have difficulty keeping up with the volume of blocks/transactions (either because of the bot's logic or due to the speed of the blockchain being scanned). One solution is to use sharding to increase throughput for your detection bot. With sharding, you can increase the number of instances of your detection bot and split the blocks/transactions across these instances.



* [Long running tasks](https://docs.forta.network/en/latest/long-running-tasks/)

Both `handleBlock` and` handleTransaction` functions are required to return within a timeout specified by the network (currently 30 seconds). This should be enough time for most bots to complete, but if you need longer for your bot (e.g. you need to execute many network calls) you can still return findings asynchronously.



* [Protecting sensitive data](https://docs.forta.network/en/latest/sensitive-data/)

There are cases where developers need to use sensitive information in their bot (e.g. some API key) or just hide their bot code from the public. Developers can still use JWT authentication or code obfuscation as two ways to protect sensitive data.



* [Private alerts](https://docs.forta.network/en/latest/private-alerts/)

In certain usecases bot developers may want to keep their generated alerts private. Using encryption, bot developers can publish alerts that are unreadable to anyone but themselves.



* [JWT authentication for bots](https://docs.forta.network/en/latest/jwt-auth/)

There may be cases where you need to call a private API, perhaps to save some state or load some secret. The SDK provides the methods for generating a JWT token which enables bots to make authorized requests to external APIs.



* [Deploying machine learning models](https://docs.forta.network/en/latest/deploying-ml-models/)

This guide will share tips and tricks on deploying a [scikit-learn](https://scikit-learn.org/stable/index.html) machine learning model in a Python detection bot.



* [Time series analysis](https://docs.forta.network/en/latest/time-series-analysis/)

To create a time series model in Python, the [Prophet Library](https://facebook.github.io/prophet/docs/quick_start.html) is a good choice. A simple model can be created by querying alerts from other detection bots or holding the timeline data in the bot directly.



* [Consuming bot alerts](https://docs.forta.network/en/latest/handle-alert/)

With the addition of the new handleAlert handler, bots are now able to subscribe to alerts from the Forta network. This enables increased composability and higher reuse of existing bots when building your own bot.



* [Transfer Bot Ownership](https://docs.forta.network/en/latest/bot-transfer-ownership/)

Each Bot is an ERC-721 NFT and is minted to the creator of the Bot. This means that the owner can invoke the ERC-721 transferFrom function, and it changes the owner of the Bot.



* [Transaction simulation](https://docs.forta.network/en/latest/tx-simulation/)

Transaction simulation is a powerful technique that can be used by bot developers to see the results of transactions without having to pay for on-chain execution. Using simulation, you can run transactions from any account on the latest blockchain state and view the results.



* [Advanced testing](https://docs.forta.network/en/latest/advanced-testing/)

This page describes how to conduct more advanced testing using a locally forked chain.



* [Querying other chains](https://docs.forta.network/en/latest/querying-chains/)

Bots can manually read data from any other chain themselves. This page will describe how to interact with any blockchain using a Javascript example bot. 



* <span style="text-decoration:underline;">Bot licensing </span>

You are free to adopt the Forta Bot License if you think it fits your purpose! Alternatively, you can adopt any other license you believe is compatible with the technical architecture and spirit of the Forta Network, or no license at all.
