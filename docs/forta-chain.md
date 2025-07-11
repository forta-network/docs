The **Forta Chain** is an L3 rollup with the core function of supporting the Forta Firewall.

The Forta Chain is built as an Arbitrum Orbit chain, leveraging the scalability and security of the Arbitrum ecosystem.

![Arbitrum Logo](Forta_arbitrum.png)


The Firewall writes certain encrypted details to Forta Chain, including:

- Information about batches of transactions screened by the Firewall
- Information about blocked/delayed transactions

Most importantly, the chain will maintain an inbox of transactions blocked by the Firewall. These transactions are not permanently blocked, however, as they can be resubmitted after some delay period and processed normally. The motivation behind delaying as opposed to permanently blocking was rooted in a desire to maintain some level of censorship resistance and alignment with the broader Ethereum community.

Data written to the Forta Chain will be encrypted and will only be available to the relevant Firewall user. The chain essentially serves as a decentralized record about the work performed by, and results of, the Firewall.

### Technical Information

- Chain ID: 80931
- Public RPC: `https://rpc-forta-chain-8gj1qndmfc.t.conduit.xyz`
- Explorer: [https://explorer.forta.org/](https://explorer.forta.org/)



[:octicons-arrow-left-24: Previous](forta-firewall-monitoring.md) 