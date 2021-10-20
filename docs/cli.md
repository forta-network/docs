# CLI Commands

The following sections describe the CLI commands available to agent developers. You can always use `forta-agent help` to get a quick overview of these commands, as well as details about specific commands e.g. `forta-agent run help`.

## init

Using the `forta-agent init` command, you can quickly initialize a Forta Agent Javascript project inside of the current working directory. The starter project includes some default configuration files as well as an example agent implementation. A keyfile and forta.config.json file will also be generated for you and placed in the ~/.forta folder if they do not already exist. You will be prompted to enter a password that will be used to encrypt the keyfile. This keyfile will be used later when publishing your agent.

Options:

```
--typescript - initialize Typescript project
--python - initialize Python project
```

Example: Initialize a Typescript Project

```
$ forta-agent init --typescript
```

## run

Easily verify the behaviour of your agent during local development using the `forta-agent run` command. The default behaviour (i.e. without any options) is to subscribe to a JSON-RPC endpoint and listen for the latest blocks and transactions. A stream of the latest data will be passed to your agent with any findings printed to your output console. The endpoint is specified by the `jsonRpcUrl` property in the forta.config.json file.

Options:

```
--tx - run your agent with a specific transaction hash
--block - run your agent against a specific block number/hash, including the transactions in the block
--range - run your agent against a specific range of block numbers
--file - run your agent against a JSON file of test data
--prod - used for running the agent inside of a production environment i.e. you probably won’t need this during development
--config - specify a config file to use (default: forta.config.json)
```

Example: Run for a specific transaction

```bash
$ forta-agent run --tx 0xf9c43e15ef2abfec163ec3b1165f18a5119ba119b6e059fc924903e5251e3543
```

or if using locally installed package

```bash
$ npm run tx 0xf9c43e15ef2abfec163ec3b1165f18a5119ba119b6e059fc924903e5251e3543
```

Example: Run for a specific block (by number)

```
$ forta-agent run --block 12821978
```

or if using locally installed package

```bash
$ npm run block 12821978
```

Example: Run for a specific block (by hash)

```
$ forta-agent run --block 0x9e052eb02a3849b650e8b9e0a47b1fae194b928c930168ef19e311dbd7886172
```

or if using locally installed package

```bash
$ npm run block 0x9e052eb02a3849b650e8b9e0a47b1fae194b928c930168ef19e311dbd7886172
```

Example: Run for a specific block range

```
$ forta-agent run --range 12821978..12821980
```

or if using locally installed package

```bash
$ npm run range 12821978..12821980
```

Example: Run for an input file

```
$ forta-agent run --file ./test.data.json
```

or if using locally installed package

```bash
$ npm run file ./test.data.json
```

## publish

Deploy your agent to the Forta protocol using the `forta-agent publish` command. This will build a Docker image for your agent and publish it to the image repository. Also, it will create an agent manifest which includes the Docker image reference, sign the manifest using your keyfile (you will be prompted for password), store it on IPFS and publish the IPFS reference to the Agent Registry contract.

Options:

```
--config - specify a config file to use (default: forta.config.json)
```

## disable

Disable your deployed agent and stop it from running on the Forta protocol by using `forta-agent disable`. Your Docker image will still be publicly available, but scan nodes will know not to run your agent.

## enable

Enable your agent and start execution on the Forta protocol by using `forta-agent enable`. By default, your agent is enabled when you deploy to the Forta protocol. Only use this command if your agent is currently disabled.

## keyfile

You can print out information about your keyfile, including its absolute path and address, using the `forta-agent keyfile` command.