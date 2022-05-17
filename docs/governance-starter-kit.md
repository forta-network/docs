# Governance Threat Detection Kit

!!! important "Frequent Doc Updates"
    Forta will continue to add more curated security bots in the coming months, so stay tuned and come check this page frequently for new updates!

| Bot Name | Bot Details/Template Link | Bot Description  |
|----------|------------------|------------------|
| Balance Decreases | Coming Soon | Identifies when the balance of an account decreases significantly. |
| Blocklisted Addresses’ Transaction Detection | [Bot Details](starter-kit-bot-details.md#blocklisted-addresses-transaction-detection) | Alerts when a blocklisted account interacts with the address monitored. |
| Events with access control monitor | [Template Link](hhttps://github.com/arbitraryexecution/forta-agent-templates/tree/main/admin-events) | Alerts on events emitted from functions that should only be callable by privileged roles.|
| Flash Loan Detector | Coming soon | Alerts when a flash loan results in large profits indicative of an attack |
| Function call with access control monitor | [Template Link](https://github.com/arbitraryexecution/forta-agent-templates/tree/main/monitor-function-calls) | Alerts on function calls that should only be callable by privileged roles.|
| Mint/Borrow Value Anomalies | Coming Soon | Alerts when mint/borrow volume is changing in a statistically significant way. |
| OpenZeppelin-Gnosis Safe Contract Events | [Bot Details](starter-kit-bot-details.md#openzeppelin-gnosis-safe-contract-events) | Alerts on security relevant events of the OZ contract library/ Gnosis Safe contact instances. |
| Re-entrancy counter | [Bot Details](starter-kit-bot-details.md#reentrancy-counter) | Alerts when reentrancy on the contract monitored is detected. |
| Successful transactions with internal failures | [Bot Details](starter-kit-bot-details.md#successful-transactions-with-internal-failures) | Alerts on transactions involving the address monitored that succeed, but had internal failures.|
| Suspicious Contract Creation | [Bot Details](starter-kit-bot-details.md#suspicious-contract-creation) | Alerts on contract creation that contained the address monitored. |
| Tornado Cash Funded Account Interaction | [Bot Details](starter-kit-bot-details.md#tornado-cash-funded-account-interaction) | Alerts when a Tornado Cash funded account interacts with the address monitored. |
| Unverified Contract Creation | [Bot Details](starter-kit-bot-details.md#unverified-contract-creation) | Alerts on contract creation that isnt verified on Etherscan. |


