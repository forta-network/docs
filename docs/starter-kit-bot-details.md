# Starter Kit Bot Details

!!! important "Frequent Doc Updates"
    Forta will continue to add more curated security bots in the coming months, so stay tuned and come check this page frequently for new updates!


## Anomalous Token Transfers Detection Machine Learning Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Anomalous Token Transfers Detection Machine Learning Bot | [Stats URL](https://explorer.forta.network/agent/0x2e51c6a89c2dccc16a813bb0c3bf3bbfe94414b6a0ea3fc650ad2a59e148f3c8){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/anomalous-token-transfers-ml-py){:target="_blank"} | Ethereum Mainnet |

This bot utilizes the [Isolation Forest](https://scikit-learn.org/stable/modules/outlier_detection.html#isolation-forest) machine learning technique to detect anomalous transactions with ERC20 token transfers.

## Anomalous Transaction Volume

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Successful txn | [Stats URL](https://explorer.forta.network/agent/0x20d57d727a2d7bf4b447d1952d7ea44efeda0920e45e779d298d5385f3b36cfa){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/transaction-volume-anomaly-detection){:target="_blank"} | Ethereum Mainnet, BNB Chain, Polygon, Optimism, Fantom, Arbitrum, Avalanche |

This bot detects successful transactions that have one or more failed internal transactions.

## Asset Drained

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Asset Drained Bot | [Stats URL](https://explorer.forta.network/bot/0xe4a8660b5d79c0c64ac6bfd3b9871b77c98eaaa464aa555c00635e9d8b33f77f){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/asset-drained){:target="_blank"} | Ethereum Mainnet, BNB Chain, Fantom, Avalanche |

This bot detects when digital assets are fully drained from a contract.


## Attack Detector Feed (aka Alert Combiner)

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Attack Detector Feed | [Stats URL](https://explorer.forta.network/agent/0x80ed808b586aeebe9cdd4088ea4dea0a8e322909c0e4493c993e060e89c09ed1){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/alert-combiner-py){:target="_blank"} | All |

The attack detector takes past alerts under a common address from a variety of underlying bots to emit a high precision alert for protocol attacks. It does so by mapping each alert to the four attack stages (Funding, Preparation, Exploitation and Money Laundering) and applying a variety of heuristics (e.g. an alert has to exist for each of the four stages) to emit an alert.


## Chainalysis Sanctioned Addresses

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Chainalysis Sanctioned Addresses | [Stats URL](https://explorer.forta.network/agent/0x9a8134e4a061e3c0098fd14f8d54c2391fb9118ff403e4b2c79faf6390f0e518){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/sanctioned-addresses-py#chainalysis-sanctioned-addresses){:target="_blank"} | All |

This bot detects transactions that involve Chainalysis sanctioned addresses.

The bot listens to the [Chainalysis Sanction Oracle Contract](https://go.chainalysis.com/chainalysis-oracle-docs.html)'s sanctioned events and maintains a local list of sanctioned addresses.

## Evidence of Phishing Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Evidence of Phishing Agent | [Stats URL](https://explorer.forta.network/agent/0x8badbf2ad65abc3df5b1d9cc388e419d9255ef999fb69aac6bf395646cf01c14){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/ice-phishing-detection-bot){:target="_blank"} | Ethereum Mainnet |

Users approving token transfers to an address or contract may be a behavior indicative of an ice phishing attack.

This bot detects when a high number of EOAs call the approve() or increaseAllowance() methods for the same target EOA/ contract over an extended period of time. This bot emits two types of alerts: first for the approvals that occurred and another when the attacker is making the transfers.

## Exploiter Addresses

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Exploiter Addresses | [Stats URL](https://explorer.forta.network/agent/0x0e82982faa7878af3fad8ddf5042762a3b78d8949da2e301f1adfedc973f25ea){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/exploiter-addresses-py#exploiter-addresses-detection-bot){:target="_blank"} | All |

This bot detects transactions that involve known exploiter addresses.

## Flashbot Detection Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Flashbots Detection Bot | [Stats URL](https://explorer.forta.network/agent/0xbc06a40c341aa1acc139c900fd1b7e3999d71b80c13a9dd50a369d8f923757f5){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/flashbot-attack){:target="_blank"} | Ethereum Mainnet |

This bot detects if a transaction was made using Flashbots bypassing the mempool.

## Flashloan Detection Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Flashloan Detection Bot | [Stats URL](https://explorer.forta.network/agent/0x55636f5577694c83b84b0687eb77863850c50bd9f6072686c8463a0cbc5566e0){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/flashloan-detector){:target="_blank"} | Ethereum Mainnet, Optimism, BNB Chain, Polygon, Fantom, Arbitrum, Avalanche |

This bot detects if a transaction contains a flashloan and the borrower made a significant profit.


## Mint/Borrow Anomaly Detection Bot

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Large Mint Borrow Volume Anomaly Detection | [Stats URL](https://explorer.forta.network/agent/0x2c8452ff81b4fa918a8df4441ead5fedd1d4302d7e43226f79cb812ea4962ece){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/large-mint-borrow-anomaly-detection){:target="_blank"} | Ethereum Mainnet |

This bot detects if an anomalous volume of mints and/or borrows occurs.


## NFT Sleep Minting Detection

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| NFT Sleep Minting Detection | [Stats URL](https://explorer.forta.network/agent/0x20d0cd9432c7e15cb625097a718c15cc07f463b5252e3c36ae23acb7ef98d54e){:target="_blank"} | [Github Repo URL](https://github.com/a16z/nft-sleep-mint-forta-agent){:target="_blank"} | Ethereum Mainnet |

This bot detects transactions that may indicate NFT Sleep Minting.

Sleep Minting is when an attacker mints an NFT directly to a famous creator's wallet with permission to reclaim or pull the NFT back out of the creator's wallet. This creates the appearance that (1) a famous creator minted an NFT to themselves, and (2) the creator sent that NFT to an attacker. Based on â€œon-chainâ€ provenance, the attacker can claim they own an NFT created by a famous artist and sell it for a high value.

You can read more about what this is and why it matters [here](https://a16z.com/2022/03/09/sleep-minting-nfts/)

## OpenZeppelin-Gnosis Safe Contract Events

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| oz-gnosis-events | [Stats URL](https://explorer.forta.network/agent/0x77281ae942ee1fe141d0652e9dad7d001761552f906fb1684b2812603de31049){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/forta-bot-examples/tree/master/oz-gnosis-events-ts){:target="_blank"} | Ethereum Mainnet, Polygon, Avalanche, Arbitrum, Optimism |

This bot detects **ALL** events from smart contracts defined in the [`openzeppelin-contracts`](https://github.com/OpenZeppelin/openzeppelin-contracts) and [`gnosis-safe`](https://github.com/gnosis/safe-contracts) Github repositories


## Price Change Anomaly

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Smart Price Changes Agent | [Stats URL](https://explorer.forta.network/agent/0x0f21668ebd017888e7ee7dd46e9119bdd2bc7f48dbabc375d96c9b415267534c){:target="_blank"} | [Github Repo URL](https://github.com/VVlovsky/Smart-Price-Changes-Agent){:target="_blank"} | Ethereum Mainnet |

This bot detects when there are drastic price change anomalies based on on-chain price oracles (i.e. Uniswap and Uniswap derivatives.)

## Reentrancy Counter

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Reentrancy Calls Detection Bot | [Stats URL](https://explorer.forta.network/agent/0x492c05269cbefe3a1686b999912db1fb5a39ce2e4578ac3951b0542440f435d9){:target="_blank"} | [Github Repo URL](https://github.com/NethermindEth/Forta-Agents/tree/a5bd20303669d5a1d0e2163c43904627f8999749/reentrancy-counter#reentrancy-counter){:target="_blank"} | Ethereum Mainnet, BNB Chain, Polygon |

This bot detects reentrancy based on the call stack provided in the transaction traces. The bot reports the number of repeated calls with different severity levels.


## Scam Detector Feed (aka Alert Combiner)

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Scam Detector Feed | [Stats URL](https://explorer.forta.network/agent/0x80ed808b586aeebe9cdd4088ea4dea0a8e322909c0e4493c993e060e89c09ed1){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/alert-combiner-py){:target="_blank"} | All |

The attack detector takes past alerts under a common address from a variety of underlying bots to emit a high precision alert related to scams (ice phishing, rug pulls, scams). It does so by combining alerts applying a variety of heuristics (e.g. ice phishing and tornado cash funding alert fired) to emit an alert.


## Suspicious Contract Creation

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Suspicious Contract Creation | [Stats URL](https://explorer.forta.network/agent/0x457aa09ca38d60410c8ffa1761f535f23959195a56c9b82e0207801e86b34d99){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/suspicious-contract-creation-py#suspicious-contract-creation){:target="_blank"} | Ethereum Mainnet, BNB Chain, Polygon |

This bot detects when a suspicious contract is created. A suspicious contract can take many forms; initially, this bot will alert on contracts that were created from Tornado cash funded accounts.


## Token Impersonation

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Token Impersonation | [Stats URL](https://explorer.forta.network/agent/0x6aa2012744a3eb210fc4e4b794d9df59684d36d502fd9efe509a867d0efa5127){:target="_blank"} | [Github Repo URL](https://github.com/kovart/forta-token-impersonation-agent){:target="_blank"} | Ethereum Mainnet |

This bot detects if an ERC-20/ ERC-721/ ERC-1155 contract gets deployed with the same symbol of an existing deployed contract. This may be indicative of a scam or phishing attack.


## Tornado Cash Funded Account Interaction

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Tornado Cash Funded Account Interaction | [Stats URL](https://explorer.forta.network/agent/0x617c356a4ad4b755035ef8024a87d36d895ee3cb0864e7ce9b3cf694dd80c82a){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/forta-tornado-cash-starter-kit#tornado-cash-funded-account-interacted-with-contract){:target="_blank"} | Ethereum Mainnet, BNB Chain, Polygon, Arbitrum, Optimism |

This bot detects when an account that was funded by Tornado Cash interacts with any contract.


## Unverified Contract Creation

| Bot Name | Bot Stats | Bot Source Code  | Supported Chains |
|----------|-----------|------------------|------------------|
| Unverified Contract Creation | [Stats URL](https://explorer.forta.network/agent/0x4c7e56a9a753e29ca92bd57dd593bdab0c03e762bdd04e2bc578cb82b842c1f3){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/unverified-contract-py){:target="_blank"} | Ethereum Mainnet, BNB Chain, Polygon |

This bot detects when a contract is created that isn't verified on Etherscan within 30 min of creation.