# Useful libraries

Here is a collection of libraries and APIs that bot developers may find useful when building their bots. Want to add your library here? Check out [this section](contributing#improve-the-documentation) to suggest an edit.

## forta-helpers

[`forta-helpers`](https://github.com/kovart/forta-helpers) is a useful library from community member Artem Kovalchuk to speed up bot development. It provides solutions to often-repeated patterns of bot development like working with data storage, executing asynchronous requests, extracting useful information from transactions and contracts, and much more.

## forta-bot-templates

[`forta-bot-templates`](https://github.com/arbitraryexecution/forta-bot-templates) is a repository of low-code bot templates developed by Forta community member [Arbitrary Execution](https://www.arbitraryexecution.com/). All you have to do is modify a single json config file to build your bot. Some example templates include listening for a set of events and filtering by some conditions, or scanning for accounts that have interacted with Tornado Cash.


## forta-flashloan-detector

[`forta-flashloan-detector`](https://www.npmjs.com/package/forta-flashloan-detector) is an awesome library developed by Forta community member [LimeChain](https://limechain.tech/). It provides a convenient way to detect whether transactions contain flashloans from various protocols including Aave, dYdX, Euler, Iron Bank and MakerDAO.

## forta-agent-tools

[`forta-agent-tools`](https://www.npmjs.com/package/forta-agent-tools) is a nifty library developed by Forta community member [Nethermind](https://nethermind.io/). It includes some common bot templates, as well as some neat testing tools.


## ethers-multicall

[`ethers-multicall`](https://www.npmjs.com/package/ethers-multicall) is useful for querying lots of data from the blockchain without having to make multiple http requests. For example, if you want to query token balances for a list of addresses, you can use this library to fetch all the balances in a single http request.


## rolling-math

[`rolling-math`](https://www.npmjs.com/package/rolling-math) is an awesome library developed by Forta community member Arbitrary Execution. It is useful for bots that require analyzing trends across some time window.

## lru-cache

[`lru-cache`](https://www.npmjs.com/package/lru-cache) is great for adding caching capability to your bot. You can specify the maximum number of items you want to cache and keep only the most recently used items.

## Etherscan API

The [Etherscan APIs](https://etherscan.io/apis) are a great resource for bot developers. They can be used to answer questions like "which transactions was a given address involved in?" or "what is the ABI for a given contract address?". **Note: make sure to [use obfuscation](sensitive-data.md) or [JWT authentication](jwt-auth.md) if using an Etherscan API key in your code.**
