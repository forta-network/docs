## Scam prevention

Forta Firewall can prevent the deployment of scam contracts by screening them before they're confirmed on-chain. This includes identifying and blocking patterns commonly associated with:

- **Rug pulls** - contracts with functions that enable liquidity withdrawal or token minting by a privileged address

- **Fake tokens** - contracts mimicking legitimate assets but with altered parameters or backdoors

- **Phishing contracts** - interfaces or tokens designed to trick users into signing malicious transactions

Firewall detects these threats by simulating contract behavior and analyzing on-chain metadata before deployment. Because screening happens before inclusion in a block, scams can be stopped before they affect users.


[:octicons-arrow-left-24: Previous](forta-firewall-security-screening.md) [Next :octicons-arrow-right-24:](forta-firewall-compliance-screening.md)