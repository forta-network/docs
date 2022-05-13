# Starter Kit Bot Details

!!! important "Frequent Doc Updates"
    Forta will continue to add more curated security bots in the coming months, so stay tuned and come check this page frequently for new updates!


## Alert Combiner

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| alert-combiner | [Stats URL](https://explorer.forta.network/agent/0x80ed808b586aeebe9cdd4088ea4dea0a8e322909c0e4493c993e060e89c09ed1){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/alert-combiner-py#alert-combiner){:target="_blank"} |

Individual alerts can have low precision (in other words raise false positives). This agent combines past alerts to separate the signal from noise.

It does so with the realization that an attack usually consists of 4 distinct phases:

* funding (e.g. tornado cash funding)
* preparation (e.g. creation of an attacker contract)
* exploitation (e.g. draining funds from a contract)
* money laundering (e.g. sending funds to tornado cash)

As such, this detection bot combines previously raised alerts under the initiating address (i.e. the attacker address) for a given time window (2 calendar days, so between 24-48h) and emits a cricial alert when alerts from all four phases have been observed.

As a result, the precision of this alert is quite high, but also some attacks may be missed. Note, in the case where attacks are missed, the broader set of detection bots deployed on Forta will still raise individual alerts that users can subscribe to.

## Blocklisted Addresses Transaction Detection

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| Blocklisted Addresses Transaction Detection | [Stats URL](https://explorer.forta.network/agent/0xaedda4252616d971d570464a3ae4a9f0a9d72a57d8581945fff648d03cd30a7d){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/blocklist-addr-tx-py#blocklisted-address-bot){:target="_blank"} |

This bot detects transactions that involve blocklisted addresses. The blocklist is generated and updated from 4 data sources listed below.

Blocklist source:

* Blocklisted addresses in [USDC Token Contract](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48).
* Blocklisted addresses in [USDT Token Contract](https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7)
* Sanctioned addresses by [Chainalysis Sanction Oracle Contract](https://go.chainalysis.com/chainalysis-oracle-docs.html)
* [Luabase's](https://luabase.com/) `tags` table which includes addresses and wallet tags labeled as `exploit`, `heist`, and `phish/hack` from [Etherscan](https://etherscan.io/labelcloud).

## Evidence of Phishing Bot

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| Evidence of Phishing Agent | [Stats URL](https://explorer.forta.network/agent/0x6a0960a22bb752532b68c266dfa507849009283bf11f086095f3504211c2b5fa){:target="_blank"} | [Github Repo URL](https://github.com/VVlovsky/Evidence-of-Phishing-Agent#evidence-of-phishing-agent){:target="_blank"} |

Users approving token transfers to an externally owned address (EOA) may be a behavior indicative of a phishing attack.

This bot detects when a high number (e.g. 10 or more) of EOAs call the approve() or increaseAllowance() methods for the same target EOA over an extend period of time (e.g. 6 hours ~ 1600 blocks). The finding should include the affected addresses, the alleged attacker's address, and the addresses and amounts of tokens involved. It also doesn't include smart contracts (i.e. approve() called by a smart contract or a smart contract that is the designated spender for an approve() call) and EOAs for any centralized exchanges (e.g. FTX exchange: 0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2).

## NFT Sleep Minting Detection

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| NFT Sleep Minting Detection | [Stats URL](https://explorer.forta.network/agent/0x20d0cd9432c7e15cb625097a718c15cc07f463b5252e3c36ae23acb7ef98d54e){:target="_blank"} | [Github Repo URL](https://github.com/a16z/nft-sleep-mint-forta-agent){:target="_blank"} |

This bot detects transactions that may indicate NFT Sleep Minting.

Sleep Minting is when an attacker mints an NFT directly to a famous creator's wallet with permissions to reclaim or pull the NFT back out of the creator's wallet. This creates the appearance that (1) a famous creator minted an NFT to themselves, and (2) the creator sent that NFT to an attacker. Based on â€œon-chainâ€ provenance, the attacker can claim they own an NFT created by a famous artist and sell it for a high value.

You can read more about what this is and why it matters [here](https://a16z.com/2022/03/09/sleep-minting-nfts/)

## OpenZeppelin-Gnosis Safe Contract Events

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| oz-gnosis-events | [Stats URL](https://explorer.forta.network/agent/0x77281ae942ee1fe141d0652e9dad7d001761552f906fb1684b2812603de31049){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/forta-bot-examples/tree/master/oz-gnosis-events-ts){:target="_blank"} |

This bot detects **ALL** events from smart contracts defined in the [`openzeppelin-contracts`](https://github.com/OpenZeppelin/openzeppelin-contracts) and [`gnosis-safe`](https://github.com/gnosis/safe-contracts) Github repositories

## Reentrancy Counter

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| nethforta-25 | [Stats URL](https://explorer.forta.network/agent/0x492c05269cbefe3a1686b999912db1fb5a39ce2e4578ac3951b0542440f435d9){:target="_blank"} | [Github Repo URL](https://github.com/NethermindEth/Forta-Agents/tree/a5bd20303669d5a1d0e2163c43904627f8999749/reentrancy-counter#reentrancy-counter){:target="_blank"} |

This bot detects reentrancy based on the call stack provided in the transaction traces. The bot reports the number of repeated calls with different severities levels.

## Successful Transactions with Internal Failures

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| Successful txn | [Stats URL](https://explorer.forta.network/agent/0x09f72094780dd969eb295dad8ce6126cc393a97a9df746633611235a39810110){:target="_blank"} | [Github Repo URL](https://github.com/NethermindEth/Forta-Agents/tree/ce3026fb0e6da69af243ba3d36dbf6dd85a74d9f/success-txn-with-internal-failures#successful-transactions-with-internal-failures){:target="_blank"} |

This bot detects successful transactions that have one or more failed internal transactions.

## Suspicious Contract Creation

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| Suspicious Contract Creation | [Stats URL](https://explorer.forta.network/agent/0x457aa09ca38d60410c8ffa1761f535f23959195a56c9b82e0207801e86b34d99){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/suspicious-contract-creation-py#suspicious-contract-creation){:target="_blank"} |

This bot detects when a suspicious contract is created. A suspicious contract can take many forms; initially, this bot will alert on contracts that were created from Tornado cash funded accounts.


## Tornado Cash Funded Account Interaction

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| Tornado Cash Funded Account Interaction | [Stats URL](https://explorer.forta.network/agent/0x617c356a4ad4b755035ef8024a87d36d895ee3cb0864e7ce9b3cf694dd80c82a){:target="_blank"} | [Github Repo URL](https://github.com/LimeChain/forta-starter-kits/tree/main/forta-tornado-cash-starter-kit#tornado-cash-funded-account-interacted-with-contract){:target="_blank"} |

This bot detects when an account that was funded by Tornado Cash interacts with any contract.

## Unverified Contract Creation

| Bot Name | Bot Stats | Bot Source Code  |
|----------|-----------|------------------|
| Unverified Contract Creation | [Stats URL](https://explorer.forta.network/agent/0x4c7e56a9a753e29ca92bd57dd593bdab0c03e762bdd04e2bc578cb82b842c1f3){:target="_blank"} | [Github Repo URL](https://github.com/forta-network/starter-kits/tree/main/unverified-contract-py){:target="_blank"} |

This bot detects when a contracr is created that isnt verified on Etherscan within 30min of creation.