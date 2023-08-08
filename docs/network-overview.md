

**Introduction**

The Forta Network acts like a giant, shared security camera and alarm system, monitoring public blockchains in real-time for threats, anomalies, security-related events and other noteworthy activity. Put differently, Forta is the “real-time monitoring layer” in the Web3 tech stack. The Network is comprised of two primary components - _detection bots_ and _scan nodes_. 

_Detection Bots_

Detection bots are the equivalent of tiny cameras, built by developers and published on the network. What each bot monitors for is determined by the logic written by its developer. Bots vary in complexity, with some monitoring for a single condition (ex: a multi-sig transaction above a certain amount threshold), and others monitoring for a combination of different factors (ex: scam activity using a combination of advanced heuristics and machine learning models). When a bot finds what it’s looking for, it emits an alert. 

To prevent spam and malicious bots from being published and consuming network resources, developers are required to stake at least 100 FORT on each detection bot they publish. Bots without the minimum stake will be inactive. 

_Scan Nodes_

The other component of the network are scan nodes, and you can think of scan nodes as servers that provide capacity to the Forta Network. Scan nodes are responsible for running detection bots, providing them blockchain data and publishing any alerts. 

Anyone can run a scan node as long as they stake the required amount of FORT tokens. Each scan node listens for blocks and transactions from a blockchain. Currently the Forta Network runs scan nodes for EVM blockchains such as Ethereum, Polygon and BNB (complete list of supported chains [here](https://explorer.forta.network/network)). Each scan node is assigned a set of detection bots to run by the Forta Network. 

When a new bot is published, it is randomly assigned to one or more scan nodes and begins running shortly thereafter. The scan node collects any alerts reported by the detection bots and publishes them.

To hold scan node operators accountable for operating in the best interest of the network, each scan node must be staked with at least 2,500 FORT. 

_Network Intelligence_

Collectively, the detection bots on the Forta Network are generating hundreds of thousands of alerts and other data points every hour. Users can subscribe to alerts from a specific detection bot using the [Forta App](https://app.forta.network/). They can also browse and search the latest alerts using the [Forta Explorer](https://explorer.forta.network/). Also, more technical users can query for alerts using the [Forta API](https://docs.forta.network/en/latest/api/) to integrate alert feeds right into their own applications.
