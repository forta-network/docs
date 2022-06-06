# Bridge Threat Detection Kit

<p align="left">
    <img width=1200 alt="Bridge Threat Detection Kit Overview" src="../bridge-threat-detection-kit.png">
</p>

!!! important "Frequent Doc Updates"
    Forta will continue to add more curated security bots in the coming months, so stay tuned and come check this page frequently for new updates!

| Bot Name | Bot Details/Template Link | Bot Description  |
|----------|------------------|------------------|
| Alert Combiner | [Bot Details](starter-kit-bot-details.md#alert-combiner) | Combines past alerts under common adddress to emit a high precision alert. |
| Anomalous Transaction Volume | [Bot Details](starter-kit-bot-details.md#anomalous-transaction-volume) | Alerts on anomalous transaction volume (both successful and failed).|| Balance Decreases | Coming Soon | Identifies when the balance of an account decreases significantly. |
| Balance Decreases | Coming Soon | Identifies when the balance of an account decreases significantly. |
| Blocklisted Addresses’ Transaction Detection | [Bot Details](starter-kit-bot-details.md#blocklisted-addresses-transaction-detection) | Alerts when a blocklisted account interacts with the address monitored. |
| Bridge Balance Inconsistencies | Coming Soon | Alerts when the two sides of the bridge are unexpectedly are out of balance. |
| Events with access control monitor | [Template Link](https://github.com/arbitraryexecution/forta-bot-templates/tree/main/src/monitor-events) | Alerts on events emitted from functions that should only be callable by privileged roles.|| Function call with access control monitor | [Template Link](https://github.com/arbitraryexecution/forta-bot-templates/tree/main/src/monitor-function-calls) | Alerts on function calls that should only be callable by privileged roles.|
| Ice Phishing Detection Bot | [Bot Details](starter-kit-bot-details.md#evidence-of-phishing-bot) | Alerts when ice phishing (social engineer users into token approvals) for a token contract monitored. |
| Mint/Borrow Value Anomalies | [Bot Details](starter-kit-bot-details.md#mint-borrow-anomalies) | Alerts when mint/borrow volume is changing in a statistically significant way. |
| OpenZeppelin-Gnosis Safe Contract Events | [Bot Details](starter-kit-bot-details.md#openzeppelin-gnosis-safe-contract-events) | Alerts on security relevant events of the OZ contract library/ Gnosis Safe contact instances. |
| Suspicious Contract Creation | [Bot Details](starter-kit-bot-details.md#suspicious-contract-creation) | Alerts on contract creation that contained the address monitored. |
| Tornado Cash Funded Account Interaction | [Bot Details](starter-kit-bot-details.md#tornado-cash-funded-account-interaction) | Alerts when a Tornado Cash funded account interacts with the address monitored. |
| Transaction Volume Anomalies | Coming Soon | Identifies whether transaction volume is changing in a statistically significant way. |
| Unverified Contract Creation | [Bot Details](starter-kit-bot-details.md#unverified-contract-creation) | Alerts on contract creation that isnt verified on Etherscan. |

