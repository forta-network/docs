## Security Screening

Firewall uses Al to simulate malicious transactions and block them before they reach the chain. It also prevents the deployment of scam smart contracts in real time.


## FORTRESS - AI Based Risk Scoring

Firewall uses an advanced AI model called FORTRESS to analyze and detect high-risk transactions. Each transaction simulated and screened by FORTRESS receives a risk score from 0 to 1 with a latency <60 ms. The closer the score is to 1, the more likely it is malicious. Each rollup and protocol that uses Firewall sets their desired threshold, above which transactions are blocked at the firewall.

FORTRESS has been trained on past exploits and is fine-tuned on a regular basis as Firewall screens new transactions. In terms of performance, FORTRESS can detect over 99% of exploits (recall), with a false positive rate of <0.0002% (1 in 500,000 transactions).

Here's a visual representation of the risk score distribution for a DeFi protocol's transactions over the last week:

## Scam prevention

Forta Firewall can prevent the deployment of scam contracts by screening them before they're confirmed on-chain. This includes identifying and blocking patterns commonly associated with:

Rug pulls - contracts with functions that enable liquidity withdrawal or token minting by a privileged address

Fake tokens - contracts mimicking legitimate assets but with altered parameters or backdoors

Phishing contracts - interfaces or tokens designed to trick users into signing malicious transactions

Firewall detects these threats by simulating contract behavior and analyzing on-chain metadata before deployment. Because screening happens before inclusion in a block, scams can be stopped before they affect users.