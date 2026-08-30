# Quick start

This guide will explore the basics of creating a Forta detection bot.

## Prerequisites

Before you start, please make sure you have the following:

- [High-level understanding of Forta detection bot development](intro-to-bot-dev.md)
- [Node.js v20+](https://nodejs.org/) (which includes the Node package manager i.e. npm)
- [Python v3.10+](https://www.python.org/) (only if you want to build Python detection bots)
- [Docker Desktop v4.16+](https://docs.docker.com/desktop)
- Basic understanding of [Ethereum](https://ethereum.org/) and smart contracts
- POL tokens for deploying your bot (see [this guide](matic.md))

## Initializing a project

To initialize a Forta detection bot, you can use the [Forta Hardhat plugin](hardhat.md), the [Forta Detection Bot Wizard](wizard.md) or the `forta-bot` tool:

```bash
$ mkdir my-new-bot
$ cd my-new-bot
$ npx @fortanetwork/forta-bot-cli@latest init
```

The above snippet creates a new project directory called `my-new-bot`, and then uses `npx` (a package runner tool that is part of npm 5.2+) to invoke the `init` command of the `forta-bot` tool. By default, the tool will initialize a Typescript project but you can also pass the `--javascript` or `--python` options to initialize Javascript or Python projects, respectively.

!!! info "Using @latest version"

        We recommend always initializing projects with `@latest` version to ensure you have the latest and greatest CLI and SDK features. Otherwise, you may end up using an older previously cached version.

The `init` command will initialize a forta.config.json and a keyfile for you in the ~/.forta folder (you will be prompted for a password for the keyfile). The forta.config.json file will be used throughout the development lifecycle of your bots. Several files will also be created inside of your project folder, including a package.json file, tsconfig.json (for Typescript) and a src folder. Dependencies of the project will also be installed for you by running `npm install`.

!!! danger "Protecting your keyfile"

        Make sure you **do not forget the password** for your keyfile as we have no way to recover it! We also recommend keeping a backup of it. The keyfile is located in the ~/.forta folder and named in the format `UTC--<created_at UTC ISO8601>--<address hex>` (an example name would be `UTC--2021-07-12T01:37:55.270Z--577022b59d1c25623ac523fe78d2f6347b5c69f2`). This keyfile will primarily be used for publishing your bot. You can get the absolute path to your keyfile using the `npm run keyfile` command from the project folder.

Awesome! You have successfully completed setting up your project. See below for ideas/examples of bots, or continue to [testing your bot](testing.md).

## Ideas for bots

We’re excited to see what sort of innovative bots the community comes up with! A good place to start is to choose a specific protocol that you use or would love to build bots for. You could also choose based on TVL ranking as listed on [DeFi Pulse](https://www.defipulse.com/). If you’re looking for some inspiration to get started, here are possible ideas for bots:

- Detect admin functions
- Detect high gas transactions
- Detect ownership transfers of contracts
- Detect high volume of failed transactions from an account
- Detect flash loan attacks
- Detect sandwich attacks
- Detect when an oracle is returning bad values
- Detect transactions from a known list of blacklisted addresses

Be sure to check out [useful libraries](useful-libraries.md) for developing your bots, including a set of low-code templates you can use. To learn more about what makes a good bot, see our [FAQ](faq.md#what-makes-a-good-bot) section.

## Examples

You can find some example implementations of Forta bots in our [examples repo](https://github.com/forta-network/forta-bot-examples). Another great place to see real bots in action is on the [Forta App Discover](https://app.forta.network/) page.
