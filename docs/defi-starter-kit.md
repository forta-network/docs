# DeFi Threat Detection Kit


<p align="left">
    <img width=1200 alt="DeFi Threat Detection Kit Overview" src="../defi-threat-detection-kit.png">
</p>

!!! important "Frequent Doc Updates"
    Forta will continue to add more curated security bots in the coming months, so stay tuned and come check this page frequently for new updates!

| Bot Name | Bot Details/Template Link | Bot Description  |
|----------|------------------|------------------|
| Anomalous Token Transfers Detection Machine Learning Bot | [Bot Details](starter-kit-bot-details.md#anomalous-token-transfers-detection-machine-learning-bot) | Alerts on anomalous transactions with erc2 token transfers.|
| Anomalous Transaction Volume | [Bot Details](starter-kit-bot-details.md#anomalous-transaction-volume) | Alerts on anomalous transaction volume (both successful and failed).|
| Asset Drained Bot | [Bot Details](starter-kit-bot-details.md#asset-drained) | Alerts on assets being drained from a contract. |
| Attack Detector Feed (aka Alert Combiner) | [Bot Details](starter-kit-bot-details.md#attack-detector-feed) | Combines past alerts under common address to emit a high precision alert around protocol attacks. |
| Chainalysis Sanctioned Addresses | [Bot Details](starter-kit-bot-details.md#chainalysis-sanctioned-addresses) | Alerts when a Chainalysis sanctioned account interacts with the address monitored. |
| Exploiter Addresses | [Bot Details](starter-kit-bot-details.md#exploiter-addresses) | Alerts when known exploiter address interacts with the address monitored. |
| FlashBot Detector | [Bot Details](https://explorer.forta.network/agent/0xbc06a40c341aa1acc139c900fd1b7e3999d71b80c13a9dd50a369d8f923757f5) |  Alerts when transaction is routed through FlashBot framework bypassing the mempool. |
| Flash Loan Detector | [Bot Details](starter-kit-bot-details.md#evidence-of-phishing-bot) | Alerts when a flash loan results in large profits indicative of an attack |
| Ice Phishing Detection Bot | [Bot Details](starter-kit-bot-details.md#evidence-of-phishing-bot) | Alerts when ice phishing (social engineer users into token approvals) for a token contract monitored. |
| Large Balance Decreases | [Template](https://github.com/LimeChain/forta-starter-kits/tree/main/large-balance-decrease) available on [Bot Wizard](https://app.forta.network/wizard) 🧙 | Identifies when the balance of an account decreases significantly. Note, this template has been deployed for the following bridges: Polygon, Avalanche, Arbitrum, Near/Aurora, Optimism, Harmony, xDAI, Boba, Ronin, THORChain and Multichain/Anyswap. |
| Mint/Borrow Value Anomalies | [Bot Details](starter-kit-bot-details.md#mint-borrow-anomalies) | Alerts when mint/borrow volume is changing in a statistically significant way. |
| Monitor Events | [Template](https://github.com/arbitraryexecution/forta-bot-templates/tree/main/src/monitor-events) available on [Bot Wizard](https://app.forta.network/wizard) 🧙 | Monitors blockchain transactions for specified events emitted from specified contract addresses. This template can be used to alert events emitted from functions that should only be callable by privileged roles. |
| Monitor Function Calls | [Template](https://github.com/arbitraryexecution/forta-bot-templates/tree/main/src/monitor-function-calls) available on [Bot Wizard](https://app.forta.network/wizard) 🧙 | This bot monitors blockchain transactions for specific function calls to specific contract addresses. This template can be used to alert on function calls that should only be callable by privileged roles.|
| OpenZeppelin-Gnosis Safe Contract Events | [Bot Details](starter-kit-bot-details.md#openzeppelin-gnosis-safe-contract-events) | Alerts on security relevant events of the OZ contract library/ Gnosis Safe contact instances. |
| Price Change Anomalies | [Bot Details](starter-kit-bot-details.md#price-change-anomaly) | | Identifies when a price of an asset changes significantly. |
| Re-entrancy counter | [Bot Details](starter-kit-bot-details.md#reentrancy-counter) | Alerts when reentrancy on the contract monitored is detected. |
| Suspicious Contract Creation | [Bot Details](starter-kit-bot-details.md#suspicious-contract-creation) | Alerts on contract creation that contained the address monitored. |
| Time Series Analyzer Template | [Template](https://github.com/forta-network/starter-kits/time-series-analyzer-template) available on [Bot Wizard](https://app.forta.network/wizard) 🧙 | This template turns an underlying noisy alert representing a time series into a statistically meaningful alert when values become abnormal. |
| Token Impersonation | [Bot Details](starter-kit-bot-details.md#token-impersonation) | Alerts when an existing token is being impersonated by a newly created contract. |
| Tornado Cash Funded Account Interaction | [Bot Details](starter-kit-bot-details.md#tornado-cash-funded-account-interaction) | Alerts when a Tornado Cash funded account interacts with the address monitored. |
| Unverified Contract Creation | [Bot Details](starter-kit-bot-details.md#unverified-contract-creation) | Alerts on contract creation that isnt verified on Etherscan. |


