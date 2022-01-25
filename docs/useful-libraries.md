# Useful libraries

Here is a collection of libraries and APIs that agent developers may find useful when building their agents. Want to add your library here? Check out [this section](/contributing/#improve-the-documentation) to suggest an edit.

## ethers-multicall

[`ethers-multicall`](https://www.npmjs.com/package/ethers-multicall) is useful for querying lots of data from the blockchain without having to make multiple http requests. For example, if you want to query token balances for a list of addresses, you can use this library to fetch all the balances in a single http request.

## forta-agent-tools

[`forta-agent-tools`](https://www.npmjs.com/package/forta-agent-tools) is a nifty library developed by Forta community member [Nethermind](https://nethermind.io/). It includes some common agent templates, as well as some neat testing tools.

## rolling-math

[`rolling-math`](https://www.npmjs.com/package/rolling-math) is an awesome library developed by Forta community member [Arbitrary Execution](https://www.arbitraryexecution.com/). It is useful for agents that require analyzing trends across some time window.

## Etherscan API

The [Etherscan APIs](https://etherscan.io/apis) are a great resource for agent developers. They can be used to answer questions like "which transactions was a given address involved in?" or "what is the ABI for a given contract address?". **Note: make sure to use obfuscation if placing an Etherscan API key in your code.**
