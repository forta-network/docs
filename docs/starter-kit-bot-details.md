# Starter Kit Bot Details

!!! important "Frequent Doc Updates"
    Forta will continue to add more curated security bots in the coming months, so stay tuned and come check this page frequently for new updates!


## Alert Combiner

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Alert Combiner | [Stats URL](https://explorer.forta.network/agent/0x80ed808b586aeebe9cdd4088ea4dea0a8e322909c0e4493c993e060e89c09ed1){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/alert-combiner-py){:target="_blank"} | All |

Combines past alerts under a common address to emit a high precision alert.

## Anomalous Transaction Volume

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Successful txn | [Stats URL](https://explorer.forta.network/agent/0x20d57d727a2d7bf4b447d1952d7ea44efeda0920e45e779d298d5385f3b36cfa){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/transaction-volume-anomaly-detection){:target="_blank"} | Ethereum Mainnet, BSC, Polygon, Optimism, Fantom, Arbitrum, Avalanche |

This bot detects successful transactions that have one or more failed internal transactions.

## Chainalysis Sanctioned Addresses

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Chainalysis Sanctioned Addresses | [Stats URL](https://explorer.forta.network/agent/0x9a8134e4a061e3c0098fd14f8d54c2391fb9118ff403e4b2c79faf6390f0e518){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/sanctioned-addresses-py#chainalysis-sanctioned-addresses){:target="_blank"} | All |

This bot detects transactions that involve Chainalysis sanctioned addresses.

The bot listens to the [Chainalysis Sanction Oracle Contract](https://go.chainalysis.com/chainalysis-oracle-docs.html)'s sanctioned events and maintains a local list of sanctioned addresses.

## Evidence of Phishing Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Evidence of Phishing Agent | [Stats URL](https://explorer.forta.network/agent/0xd9fe61cfe875470b80318a96cc0a94ba3adbe1eb4a14827fa018f14925e7da64){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/ice-phishing-detection-bot){:target="_blank"} | Ethereum Mainnet |

Users approving token transfers to an address or contract may be a behavior indicative of an ice phishing attack.

This bot detects when a high number of EOAs call the approve() or increaseAllowance() methods for the same target EOA/ contract over an extend period of time. This bot emits two types of alerts: first for the approvals that occurred and another when attacker is making the transfers.

## Exploiter Addresses

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Exploiter Addresses | [Stats URL](https://explorer.forta.network/agent/0x0e82982faa7878af3fad8ddf5042762a3b78d8949da2e301f1adfedc973f25ea){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/exploiter-addresses-py#exploiter-addresses-detection-bot){:target="_blank"} | All |

This bot detects transactions that involve known exploiter addresses.

## Flashloan Detection Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Flashloan Detection Bot | [Stats URL](https://explorer.forta.network/agent/0x55636f5577694c83b84b0687eb77863850c50bd9f6072686c8463a0cbc5566e0){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/flashloan-detector){:target="_blank"} | Ethereum Mainnet |

This bot detects if a transaction contains a flashloan and the borrower made significant profit


## Mint/Borrow Anomaly Detection Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Flashloan Detection Bot | [Stats URL](https://explorer.forta.network/agent/0x2c8452ff81b4fa918a8df4441ead5fedd1d4302d7e43226f79cb812ea4962ece){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/large-mint-borrow-anomaly-detection){:target="_blank"} | Ethereum Mainnet |

This bot detects if an anomalous volume of mints and/or borrows occurs.


## NFT Sleep Minting Detection

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| NFT Sleep Minting Detection | [Stats URL](https://explorer.forta.network/agent/0x20d0cd9432c7e15cb625097a718c15cc07f463b5252e3c36ae23acb7ef98d54e){:target="_blank"} | [Github Repo URL](https://github.com/a16z/nft-sleep-mint-forta-agent){:target="_blank"} | Ethereum Mainnet |

This bot detects transactions that may indicate NFT Sleep Minting.

Sleep Minting is when an attacker mints an NFT directly to a famous creator's wallet with permissions to reclaim or pull the NFT back out of the creator's wallet. This creates the appearance that (1) a famous creator minted an NFT to themselves, and (2) the creator sent that NFT to an attacker. Based on â€œon-chainâ€ provenance, the attacker can claim they own an NFT created by a famous artist and sell it for a high value.

You can read more about what this is and why it matters [here](https://a16z.com/2022/03/09/sleep-minting-nfts/)

## OpenZeppelin-Gnosis Safe Contract Events

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| oz-gnosis-events | [Stats URL](https://explorer.forta.network/agent/0x77281ae942ee1fe141d0652e9dad7d001761552f906fb1684b2812603de31049){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/forta-bot-examples/tree/master/oz-gnosis-events-ts){:target="_blank"} | Ethereum Mainnet, Polygon, Avalanche, Arbitrum, Optimism |

This bot detects **ALL** events from smart contracts defined in the [`openzeppelin-contracts`](https://github.com/OpenZeppelin/openzeppelin-contracts) and [`gnosis-safe`](https://github.com/gnosis/safe-contracts) Github repositories

## Reentrancy Counter

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| nethforta-25 | [Stats URL](https://explorer.forta.network/agent/0x492c05269cbefe3a1686b999912db1fb5a39ce2e4578ac3951b0542440f435d9){:target="_blank"} | [Github Repo URL](https://github.com/NethermindEth/Forta-Agents/tree/a5bd20303669d5a1d0e2163c43904627f8999749/reentrancy-counter#reentrancy-counter){:target="_blank"} | Ethereum Mainnet, BSC, Polygon |

This bot detects reentrancy based on the call stack provided in the transaction traces. The bot reports the number of repeated calls with different severities levels.


## Suspicious Contract Creation

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Suspicious Contract Creation | [Stats URL](https://explorer.forta.network/agent/0x457aa09ca38d60410c8ffa1761f535f23959195a56c9b82e0207801e86b34d99){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/suspicious-contract-creation-py#suspicious-contract-creation){:target="_blank"} | Ethereum Mainnet, BSC, Polygon |

This bot detects when a suspicious contract is created. A suspicious contract can take many forms; initially, this bot will alert on contracts that were created from Tornado cash funded accounts.


## Tornado Cash Funded Account Interaction

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Tornado Cash Funded Account Interaction | [Stats URL](https://explorer.forta.network/agent/0x617c356a4ad4b755035ef8024a87d36d895ee3cb0864e7ce9b3cf694dd80c82a){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/forta-tornado-cash-starter-kit#tornado-cash-funded-account-interacted-with-contract){:target="_blank"} | Ethereum Mainnet, BSC, Polygon, Arbitrum, Optimism |

This bot detects when an account that was funded by Tornado Cash interacts with any contract.

## Unverified Contract Creation

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Unverified Contract Creation | [Stats URL](https://explorer.forta.network/agent/0x4c7e56a9a753e29ca92bd57dd593bdab0c03e762bdd04e2bc578cb82b842c1f3){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/unverified-contract-py){:target="_blank"} | Ethereum Mainnet, BSC, Polygon |

This bot detects when a contract is created that isn't verified on Etherscan within 30 min of creation.