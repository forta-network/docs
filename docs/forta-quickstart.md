# Getting started with Forta

In this article you will gain a high-level understanding of Forta detection bot development including myths, development workflows, dApps and SDKs that will lay out a clear path to develop on Forta. This article is intended for developers who are new to Forta and assumes you already have some general knowledge about blockchains such as smart contracts and tokens. Let’s jump right in!

## Demystifying Forta development

The most important thing for new Forta developers to understand is that it is not a requirement to have experience with blockchain development to get started building on Forta. In fact, your web2 development experience transfers directly to detection bot development. In Forta, detection bots are programs running on the Forta Network that scan the blockchain for events of interest and alerts users about them e.g. large token transfers or declining account balances. While detection bots can be written in any language, Forta provides convenient SDKs in Javascript, Typescript and Python for you to get started easily. Detection bots are the heart of the Forta Network as they alert users of any suspicious or anomalous activity. There are currently many bots deployed for users to interact and integrate with.

## 30,000 foot view

Let’s start by understanding the big picture of the Forta Network and the different components involved. Keep in mind that this diagram is an oversimplification to allow for easy understanding.

![30,000 foot view](fortahighlevel.png)

On the far left there are the Forta developer tools that are used by detection bot developers to build and deploy bots to the Forta Network. These developer tools are described in more detail later on. Once deployed, the detection bots are run by Forta scan nodes. You can think of scan nodes as servers that provide capacity to the Forta Network. Scan nodes are responsible for running detection bots, providing them blockchain data and publishing any alerts. Detection bots use the blockchain data to detect some condition they are interested in, and can also make network calls to other APIs to combine richer data sources.

In the middle of the diagram are the scan nodes that comprise the Forta Network. Anyone can run a scan node as long as they stake the required amount of FORT tokens. Each scan node listens for blocks and transactions from a blockchain. Currently the Forta Network runs scan nodes for EVM (Ethereum Virtual Machine) blockchains such as Ethereum, Polygon, BNB, Avalanche, Arbitrum, Optimism and Fantom. Each scan node is assigned a set of detection bots to run by the Forta Network. The scan node collects any alerts reported by the detection bots and publishes them. You can view the complete list of scan nodes on the [Forta Explorer Network](https://explorer.forta.network/network) page.

On the far right of the diagram are the users of the Forta Network who are interested in receiving alerts. Users can subscribe to alerts from a specific detection bot, or alerts about a specific blockchain address using the [Forta App](https://app.forta.network/). They can also browse and search the latest alerts using the [Forta Explorer](https://explorer.forta.network). Also, more technical users can query for alerts using the [Forta API](api.md) to integrate alert feeds right into their own applications.

## Forta development workflows

The primary development workflow for building detection bots involves the `forta-agent` CLI (command line interface) tool. Using the CLI, you can setup a detection bot project within seconds. As a general overview of the workflow, it starts from initialization, to development and testing, then finally deployment and maintenance.

As mentioned earlier, Forta provides easy to use SDKs for detection bot development in [Javascript/Typescript](https://www.npmjs.com/package/forta-agent) and [Python](https://pypi.org/project/forta-agent/). These allow you to focus on your bot’s detection logic while taking care of the rest of the details. Once your bot is ready to deploy, you simply use the CLI to publish it to the Forta Network.

A second development workflow involves the use of the [Forta Hardhat plugin](https://www.npmjs.com/package/hardhat-forta) to create detection bots for your existing smart contract project. Hardhat is a smart contract development framework with a powerful plugin ecosystem. Using the Forta plugin, you can initialize detection bots right into your project. Also, you can choose from a set of low-code templates to setup detection bots for your project quickly.

To deploy your bot to the Forta Network you can use the CLI or the Forta App, which provides a convenient UI to deploy and manage your detection bots. Deploying a bot involves making a transaction to the Bot Registry contract on the Polygon blockchain. This requires having MATIC tokens in order to pay the small transaction fee (in the order of a few cents). Developers just need to ensure they have enough MATIC tokens, and the CLI or Forta App will take care of executing the transaction. Once a detection bot is deployed to the Forta Network, users can subscribe to the alerts generated by the bot or consume them through the Forta API.

## Awesome! How do I begin?

Now that you are ready to dive into detection bot development, the best place to start is the [build your first detection bot tutorial](quickstart.md). You will also find curated resources for developers and node operators throughout this docs website. To see real-world detection bots from well-known protocols check out the [Forta App Discover](https://app.forta.network/) page. Good luck and can’t wait to see what you come up with!
