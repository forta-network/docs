# Quick start

This guide will explore the basics of creating a Forta Agent project. 

## Prerequisites

Before you start, please make sure you have the following:

- [Node.js](https://nodejs.org/) (which includes the Node package manager i.e. npm)
- [Python](https://www.python.org/) (only if you want to use Python SDK)
- [Docker](https://www.docker.com/get-started)
- Basic understanding of [Ethereum](https://ethereum.org/) and smart contracts

## Initializing a project

To initialize a Forta Agent project, you can use the `forta-agent` CLI tool:

```bash
$ mkdir my-new-agent
$ cd my-new-agent
$ npx forta-agent@latest init --typescript
```

The above snippet creates a new project directory called `my-new-agent`, and then uses `npx` (a package runner tool that is part of npm 5.2+) to invoke the `init` command of the `forta-agent` CLI tool. By passing the `--typescript` option, you can initialize a Typescript project (default is Javascript, and `--python` is also an option).

!!! note "Using @latest version"
    We recommend always initializing projects with `@latest` version to ensure you have the latest and greatest SDK features. Otherwise, you may end up using an older previously cached version.

The `init` command will initialize a forta.config.json and a keyfile for you in the ~/.forta folder (you will be prompted for a password for the keyfile). The forta.config.json file will be used throughout the development lifecycle of your agents. Several files will also be created inside of your project folder, including a package.json file, tsconfig.json (for Typescript) and a src folder.

!!! note "Protecting your keyfile"
    Make sure you **do not forget the password** for your keyfile as we have no way to recover it! We also recommend keeping a backup of it. The keyfile is located in the ~/.forta folder and named in the format `UTC--<created_at UTC ISO8601>--<address hex>` (an example name would be `UTC--2021-07-12T01:37:55.270Z--577022b59d1c25623ac523fe78d2f6347b5c69f2`). This keyfile will primarily be used for publishing your agent. You should also note the absolute path to the keyfile is printed at the end of the `init` command output.

## Installing dependencies

Let’s make sure our project dependencies are installed by running:

```bash
$ npm install
```

This will also install the `forta-agent` package locally in your project (i.e. in the node_modules folder). 

!!! note "Installing globally"
    You may choose to install the CLI tool globally using `npm install -g forta-agent`, just make sure it does not conflict with the locally installed version. We strongly recommend using the locally installed version to avoid keeping track of this.

Awesome! You have successfully completed setting up your project. See below for ideas/examples of agents, or continue to [testing your agent](testing.md).
## Ideas for agents

We’re excited to see what sort of innovative agents our community comes up with! If you’re looking for some inspiration to get started, here are possible ideas for agents:

- Detect high gas payments
- Detect ownership transfers of contracts
- Detect high volume of failed transactions from an account
- Detect flash loan attacks
- Detect sandwich attacks
- Detect when an oracle is returning bad values
- Detect transactions from a known list of blacklisted addresses

## Examples

You can find more example implementations of Forta Agents in our [examples repo](https://github.com/forta-protocol/forta-agent-examples).
