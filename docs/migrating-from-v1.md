# Migrating from v1 SDK

As of April 2024, the Forta Network has enabled the deployment of v2 detection bots. These are developed using the v2 bot SDK (which has version number beginning with `0.2.x`) as opposed to the v1 bot SDK (which has version number beginning with `0.1.x`). The primary benefit of v2 detection bots is that they enable developers to scan activity on **any EVM-compatible chain** (vs the 7 supported chains of v1 bots). Migrating your v1 bots to the v2 SDK is straightforward since the majority of code can be reused.

!!! warning "V1 Bots Will Be Deprecated"

    Support for v1 bots will be deprecated at some point in 2024, so migrating to v2 as soon as possible is encouraged.

The following steps will explain how to migrate your v1 bot:

=== "Typescript/Javascript"

    Please see the [Typescript starter project](https://github.com/forta-network/forta-bot-sdk-v2/blob/master/cli/starter-project/ts/src/bot.ts) (or [Javascript](https://github.com/forta-network/forta-bot-sdk-v2/blob/master/cli/starter-project/js/src/bot.js)) for a working example of a v2 bot

    - make sure you have NodeJS v20+ installed (using [nvm](https://github.com/nvm-sh/nvm) is recommended i.e. `nvm install 20`)
    - import the new [`@fortanetwork/forta-bot`](https://www.npmjs.com/package/@fortanetwork/forta-bot) package (instead of `forta-agent`)
    - setup your bot's JSON-RPC provider using [this guide](bot-json-rpc-provider.md)
    - exporting your handler functions is no longer required (*but* you still probably want to do this for unit testing)
    - define your own async `main()` function in your `agent.ts` file to serve as your bot's entrypoint, and then invoke it e.g.
        ``` Typescript
        async function main() {
          // we will fill this in below
        }

        // only run main() method if this file is directly invoked (vs imported for testing)
        if (require.main === module) {
          main();
        }
        ```
    - if you have an `initialize` handler, then manually invoke it in `main()` and store any returned response in a variable e.g.
        ``` Typescript
        const initializeResponse = await initialize()
        ```
    - if you have a `handleBlock` handler, then add invocations for `scanX()` in `main()` **for each chain you want to scan** and pass the handler as a parameter e.g.
        ``` Typescript
        scanEthereum({
          rpcUrl: "https://cloudflare-eth.com/",
          handleBlock: handleBlock
        })
        ```
    - if you have a `handleTransaction` handler, then add invocations for `scanX()` in `main()` **for each chain you want to scan** and pass the handler as a parameter e.g.
        ``` Typescript
        scanPolygon({
          rpcUrl: "https://polygon-rpc.com",
          handleTransaction: handleTransaction
        })
        ```
    - if you have a `handleAlert` handler, then add an invocation for `scanAlerts()` in `main()` and pass the handler as well as the required bot subscriptions as a parameter e.g.
        ``` Typescript
        scanAlerts({
          subscriptions: [{botId: "0x123"}], // or initializeResponse.alertConfig.subscriptions
          handleAlert: handleAlert
        })
        ```
    - add an invocation for `runHealthCheck()` in `main()` and if you defined a custom `healthCheck` handler then pass the handler as a parameter e.g.
        ``` Typescript
        runHealthCheck(healthCheck) // or runHealthCheck() if no custom handler
        ```
    - **to attribute an alert to a specific chain/block/tx**, use the `Finding.source` attribute e.g.
        ``` Typescript
        Finding.from({
          ...
          source: {
            chains: [{chainId: 1}] // associates this finding to Ethereum mainnet
          }
          ...
        })
        ```
    - use the ethers.js `provider` (which is specific to the chain being scanned) passed as a second parameter into `handleBlock` and `handleTransaction` (instead of using `getEthersProvider`) e.g.
        ``` Typescript
        const handleTransaction: HandleTransaction = async (
          txEvent: TransactionEvent,
          provider: JsonRpcProvider
        ) => {
          ...
          await provider.doSomething()
        }
        ```
    - update package.json to use the new `forta-bot` CLI tool (which needs to be added to the `devDependencies` as well) (see [starter project package.json](https://github.com/forta-network/forta-bot-sdk-v2/blob/master/cli/starter-project/ts/package.json))
    - update the Dockerfile to use a base image of NodeJS 20+ (see [starter project Dockerfile](https://github.com/forta-network/forta-bot-sdk-v2/blob/master/cli/starter-project/ts/Dockerfile)) e.g.
        ```
        FROM node:20-alpine
        ```
    - ethers.js v6-specific migration:
        - `BigNumber` is no longer used in ethers.js v6, and is replaced by the Typescript built-in `BigInt` (so for example, you will need to make sure any event args you are parsing from `filterLogs` or `ethers.provider` methods are handled as `BigInt`)

=== "Python"

    Please see the [Python starter project](https://github.com/forta-network/forta-bot-sdk-v2/blob/master/cli/starter-project/py/src/bot.py) for a working example of a v2 bot

    - make sure you have [Python v3.10](https://www.python.org/downloads/release/python-31011/)+ installed
    - import the new [`forta_bot_sdk`](https://pypi.org/project/forta-bot-sdk/) package (instead of `forta_agent`)
    - setup your bot's JSON-RPC provider using [this guide](bot-json-rpc-provider.md)
    - add an import for the [`asyncio`](https://docs.python.org/3/library/asyncio.html) package (used for running code asynchronously)
    - define your own async `main()` function in your `agent.py` file to serve as your bot's entrypoint, and then invoke it using `asyncio.run` e.g.
        ``` Python
        async def main():
          await asyncio.gather(...) # we will populate these args in the steps below

        # only invoke main() if running this file directly (vs importing it for testing)
        if __name__ == "__main__":
          asyncio.run(main())
        ```
    - add the `async` keyword in front of all your handler methods e.g.
        ``` Python
          async def initialize():
            ...

          async def handle_block():
            ...

          async def handle_transaction():
            ...

          async def handle_alert():
            ...
        ```
    - if you have an `initialize` handler, then manually invoke it in `main()` and store any returned response in a variable e.g.
        ``` Python
        initialize_response = await initialize()
        ```
    - if you have a `handle_block` handler, then add invocations for `scan_X()` in `main()` (as arguments to `asyncio.gather`) **for each chain you want to scan** and pass the handler as a parameter e.g.
        ``` Python
        scan_ethereum({
          'rpc_url': 'https://cloudflare-eth.com/',
          'handle_block': handle_block
        })
        ```
    - if you have a `handle_transaction` handler, then add invocations for `scan_X()` in `main()` (as arguments to `asyncio.gather`) **for each chain you want to scan** and pass the handler as a parameter e.g.
        ``` Python
        scan_polygon({
          'rpc_url': 'https://polygon-rpc.com',
          'handle_transaction': handle_transaction
        })
        ```
    - if you have a `handle_alert` handler, then add an invocation for `scan_alerts()` in `main()` (as an argument to `asyncio.gather`) and pass the handler as well as the required bot subscriptions as a parameter e.g.
        ``` Python
        scan_alerts({
          'subscriptions': [{'bot_id': '0x123'}] # or initialize_response['alert_config']['subscriptions'],
          'handle_alert': handle_alert
        })
        ```
    - add an invocation for `run_health_check()` in `main()` (as an argument to `asyncio.gather`) and if you defined a custom `health_check` handler then pass the handler as a parameter e.g.
        ``` Python
        run_health_check(health_check) # or run_health_check() if no custom handler
        ```
    - **to attribute an alert to a specific chain/block/tx**, use the `Finding.source` attribute e.g.
        ``` Python
        Finding({
          ...
          'source': {
            'chains': [{'chain_id': 1}] # associates this finding to Ethereum mainnet
          }
          ...
        })
        ```
    - use the web3.py AsyncWeb3 `provider` (which is specific to the chain being scanned) passed as a second parameter into `handle_block` and `handle_transaction` (instead of using `get_web3_provider`) e.g.
        ``` Python
        async def handle_transaction(tx_event: TransactionEvent, provider: AsyncWeb3):
          ...
          await provider.do_something()
        ```
    - update package.json to use the new `forta-bot` CLI tool (which needs to be added to the `devDependencies` as well) (see [starter project package.json](https://github.com/forta-network/forta-bot-sdk-v2/blob/master/cli/starter-project/py/package.json))
    - update the Dockerfile to use a base image of Python 3.10+ (see [starter project Dockerfile](https://github.com/forta-network/forta-bot-sdk-v2/blob/master/cli/starter-project/py/Dockerfile)) e.g.
        ```
        FROM python:3.10-alpine
        ```
