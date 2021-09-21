# Quick start

To initialize a Forta Agent project, you can use the `forta-agent` CLI tool:

```bash
$ mkdir my-new-agent
$ cd my-new-agent
$ npx forta-agent@latest init --typescript
```

The above snippet creates a new project directory called `my-new-agent`, and then uses `npx` (a package runner tool that is part of npm 5.2+) to invoke the `init` command of the latest version of the `forta-agent` CLI tool. By passing the `--typescript` option, you can initialize a Typescript project (default is Javascript, and `--python` is also an option).

!!! note "Using latest version"
    We always recommend initializing with `@latest` to ensure you have the latest and greatest SDK features. Otherwise, you may end up using an older previously cached version.

This will initialize a keyfile for you (and prompt for a password) as well as several files inside of your project directory, including a package.json file, tsconfig.json (for Typescript) and a src folder. The project also includes a forta.config.json file that will be used throughout the development lifecycle. Let’s make sure our project dependencies are installed:

```bash
$ npm install
```

This will also install the `forta-agent` package locally in your project. 

!!! note "Installing globally"
    You can choose to install the CLI tool globally using `npm install -g forta-agent`, just make sure it does not conflict with the locally installed version. We recommend using the locally installed version to avoid keeping track of this.


## Ideas for Agents

We’re excited to see what sort of innovative agents our community comes up with! If you’re looking for some inspiration to get started, here are possible ideas for agents:

- Detect high gas payments
- Detect ownership transfers of contracts
- Detect high volume of failed transactions from an account
- Detect flash loan attacks
- Detect sandwich attacks
- Detect when an oracle is returning bad values
- Detect transactions from a known list of blacklisted addresses

## Examples

You can find more example implementations of Forta Agents in our [examples repo](https://github.com/forta-network/forta-agent-examples).
