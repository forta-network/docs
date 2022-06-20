## Security - Design

Security starts in the design phase by incorporating strategies to disincentivize and mitigate malicious behaviors. As described in the original [Forta whitepaper](TODO LINK), the primary guiding principles around the Forta protocol were:

- **Decentralization** - this not only applies to the network of scan nodes, but also to the detection bots that the community develops. This creates redundancies and increases the reliability of the network in case isolated failures occur.
- **Cryptoeconomic Incentives** - these incentives, like bot and bot staking, disincentivize malicious behaviors.
- **Security Inheritance** - as Forta network is built on top of Ethereum and Polygon, its smart contracts inherit the security properties of those networks at the base layer. 
- **Network Isolation** - isolation of network components from each other.

Further, an assume-breach mentality, adopting an attacker mindset, and looking at the protocol comprehensively from a security perspective was incorporated into the design of the network and should be at forefront of the Forta community's mind going forward. Some of the questions asked during the design phase were:

- What if a core developer is compromised?
- What if there is a malicious node or bot developer? What are they able to accomplish? 
- What are the components beyond the smart contracts that need to be considered?
- Where are there community touch points and how would a compromise within that setting have?

The [Forta whitepaper](TODO LINK) details how those guiding principles and questions were originally incorporated into the Forta Network's design.
