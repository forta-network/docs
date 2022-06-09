# NFT Threat Detection Kit

<p align="left">
    <img width=1200 alt="NFT Threat Detection Kit Overview" src="../nft-threat-detection-kit.png">
</p>

!!! important "Frequent Doc Updates"
    Forta will continue to add more curated security bots in the coming months, so stay tuned and come check this page frequently for new updates!


| Bot Name | Bot Details/Template Link | Bot Description  |
|----------|------------------|------------------|
| Alert Combiner | [Bot Details](starter-kit-bot-details.md#alert-combiner) | Combines past alerts under common adddress to emit a high precision alert. |
| Anomalous Transaction Volume | [Bot Details](starter-kit-bot-details.md#anomalous-transaction-volume) | Alerts on anomalous transaction volume (both successful and failed).|
| Chainalysis Sanctioned Addresses | [Bot Details](starter-kit-bot-details.md#chainalysis-sanctioned-addresses) | Alerts when a Chainalysis sanctioned account interacts with the address monitored. |
| Events Monitor | [Template Link](https://github.com/arbitraryexecution/forta-bot-templates/tree/main/src/monitor-events) | Monitors blockchain transactions for specified events emitted from specified contract addresses. This template can be used to alert events emitted from functions that should only be callable by privileged roles. |
| Exploiter Addresses | [Bot Details](starter-kit-bot-details.md#exploiter-addresses) | Alerts when known exploiter address interacts with the address monitored. |
| Function call with access control monitor | [Template Link](https://github.com/arbitraryexecution/forta-bot-templates/tree/main/src/monitor-function-calls) | Alerts on function calls that should only be callable by privileged roles.|
| Ice Phishing Detection Bot | [Bot Details](starter-kit-bot-details.md#evidence-of-phishing-bot) | Alerts when ice phishing (social engineer users into token approvals) for a token contract monitored. |
| OpenZeppelin-Gnosis Safe Contract Events | [Bot Details](starter-kit-bot-details.md#openzeppelin-gnosis-safe-contract-events) | Alerts on security relevant events of the OZ contract library/ Gnosis Safe contact instances. |
| Price Change Anomalies | Coming Soon | Identifies when a price of an asset changes significantly. |
| NFT Sleep Minting Detection | [Bot Details](starter-kit-bot-details.md#nft-sleep-minting-detection) | Alerts when an NFT is created in a way that appears to be minted from another account. |
| NFT Wash Trading | [Template Link](https://github.com/forta-network/forta-bot-templates/tree/main/nft-wash-trade) | Alerts on evidence of wash trading.|
| Suspicious Contract Creation | [Bot Details](starter-kit-bot-details.md#suspicious-contract-creation) | Alerts on contract creation that contained the address monitored. |
| Token Impersonation | Coming Soon | Alerts when an existing token is being impersonated by a newly created contract. |
| Tornado Cash Funded Account Interaction | [Bot Details](starter-kit-bot-details.md#tornado-cash-funded-account-interaction) | Alerts when a Tornado Cash funded account interacts with the address monitored. |
| Unverified Contract Creation | [Bot Details](starter-kit-bot-details.md#unverified-contract-creation) | Alerts on contract creation that isnt verified on Etherscan. |




