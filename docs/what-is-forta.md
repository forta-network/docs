# What is Forta

Forta is a decentralized monitoring network to detect threats and anomalies on DeFi, NFT, governance, bridges and other Web3 systems in real-time.

Underlying Forta is a decentralized network of independent node operators that scan all transactions and block-by-block state changes for outlier transactions and threats. When an issue is detected, node operators send alerts to subscribers of potential risks, which enables them to take action.

### Supported chains

The future is multi-chain. That is why Forta continues to expand into the emerging landscape of new L1s and L2s, bringing runtime monitoring and anomaly detection to Ethereum, Avalanche, Polygon, BNB Chain, Fantom, Arbitrum, and Optimism.

### Why Forta

As the Web3 economy grows in value and complexity, security has become increasingly critical. More than $1 billion was lost in the first quarter of 2022 due to hacks and exploits, some of which have only been discovered several days after the attack happened. The need for real-time security and operational monitoring has become clear, allowing protocols and investors to react quickly to neutralize threats and prevent or minimize loss of funds.

However, the rapid speed at which the Web3 industry develops makes it hard for a centralized entity to watch it all. That’s where Forta comes in.

## How to get started

**You can subscribe** to the Forta data feeds through a variety of applications, including the [Forta App](https://app.forta.network/), [OpenZeppelin Defender](https://openzeppelin.com/defender/), or directly by using the public [Forta API](https://www.youtube.com/watch?v=xkxS7d2i5ms).

**You can develop** and deploy your own detection bots on Forta using the [SDK](https://docs.forta.network/en/latest/quickstart/). There are many [templates](https://github.com/arbitraryexecution/forta-agent-templates) and [examples](https://github.com/forta-protocol/forta-bot-examples) you can work from. There are also a growing number of development teams who you can hire to develop Forta bots for your project (visit the [Bot Development Marketplace](https://www.notion.so/forta/Agent-Development-Marketplace-f8584bee618746319e9615f7a045df37) or contact the Forta Foundation at [info@forta.org](mailto:info@forta.org) for more information).

If you are an independent dev that wants to develop detection bots, you can visit Forta’s [Bot Development Marketplace](https://forta.notion.site/Agent-Development-Marketplace-f8584bee618746319e9615f7a045df37) to discover RFPs, apply for Grants or participate in Forta Development Contests, which are announced in the [Forta Discord](https://discord.com/invite/KACdTEutQq).

### Detection Bots

Detection bots refer to a set of code scripts within a Docker container that process some blockchain data (i.e. a block or transaction) and detect specific threat conditions (e.g. whether a flash loan attack occured, or whether a particular account balance fell below some threshold). Bots emit alerts for their findings. Bots are executed by scan nodes. To learn more about bots, see our [FAQ](faq.md#what-makes-a-good-bot) section.

### Scan Nodes

A scan node is a specific type of Forta node that executes detection bots for every transaction and every new block on a specific blockchain network. The scan node manages and coordinates bots (e.g. by instantiating and running bots, and restarting bots that become unresponsive). The scan node ferries blockchain data to bots to process the transaction/block. To learn more about scan nodes, see our [FAQ](faq.md#how-do-i-run-a-scan-node) section.

## Types of monitoring

### Operational monitoring

**Operational (“performance”) monitoring** checks that your protocol is functioning as expected, within some predetermined bounds. These types of checks are beneficial for the protocol’s community, as they provide some assurance of the overall health of the protocol while still highlighting some of the more extraordinary transactions that occur. Beyond the financial operation, this monitoring may provide information about when implementation contracts are upgraded, admin addresses change, or critical administrative smart contract methods are called. This type of monitoring would provide alerts that may be appropriate for display in a dashboard like Splunk, DataDog, etc.

For example, the total liquidity of pools may fluctuate by ±1% over the course of a day, so any single transaction that affects the liquidity by more than that should trigger an alert. Alternatively, because some pools may have relatively little liquidity, it may make sense to use a fixed value threshold (denominated in USDC, ETH, USD, etc.) rather than a percentage.

### Threat monitoring

**Threat detection monitoring** provides alerts on transactions and events that may indicate malicious activity. One of the main challenges in threat monitoring is determining “what to look for” in transactions. Unfortunately, there are many examples of smart contract exploits from the past few years, so there is a large body of ideas to draw from.

For example, while the DeFi community is well aware of the anonymity that Tornado Cash mixers provide, the vast majority of DeFi market transactions do not involve Tornado Cash contracts. However, attackers have an incentive to conceal the source and/or destination of funds associated with an attack. Therefore, a useful monitoring pattern may be to identify EOAs performing transactions with a protocol and then check if those EOAs have performed withdrawals from any Tornado Cash contracts within the recent past (e.g. the previous hour, day, weeks, etc.).

#### How can Forta be used to prevent smart contract exploits?

Certain categories of exploits, such as phishing, governance attacks, and multi-chain or bridge attacks, typically require the use of multiple transactions over multiple blocks that offer the opportunity for early detection followed by prevention before the exploit occurs or mitigation before the exploit is complete.

Forta community members have already published multiple examples of how Forta can be used to detect and prevent or mitigate such exploits, like the [Microsoft ice phishing bot](https://t.co/sPlZEmh0qN) or the [Sleep Minting bot for NFTs](https://a16z.com/2022/03/09/sleep-minting-nfts/). The ability to respond to Forta alerts also relies on the readiness of project teams and Forta community members have begun to work with organizations to put together emergency response plans.

#### Examples of smart contract exploits that can be mitigated by Forta

Other categories of exploits, such as those involving oracle or collateral manipulations, can also be detected by Forta, however prevention may be limited by the fact that such exploits often involve the use of flashloans or other techniques that allow them to occur in the context of a single block which itself may be privately mined. For this category of exploit, fast detection from Forta may still prove useful to mitigate attacks or prevent similar attacks on other chains or protocols.

The Forta community is growing to include even more security researchers, leading organizations, L1 and L2 providers, and other concerned parties, who may use Forta to investigate and develop new techniques and approaches that might lead to prevention against market manipulations and zero-block vulnerabilities in the future. Visit the [Forum](https://gov.forta.network/) or [Discord](https://discord.com/invite/KACdTEutQq) and join the discussion today.

### Other use cases

Since Forta is open for anyone to write and deploy a detection bot, the applications for Forta are limitless. Forta simply acts as the real-time monitoring layer for any use case you can imagine. For example, users might incorporate real-time Forta data as an input in algorithmic asset trading strategies to beat the market or create an automated insurance protocol that identifies a covered loss in real-time and pays out automatically. If you are interested in building on top of Forta, the community would love to hear about it in the [Forum](https://gov.forta.network/) or [Discord](https://discord.com/invite/KACdTEutQq).

## Advantages over other monitoring solutions

Forta provides maximum flexibility for advanced monitoring on a real-time, block-by-block basis through detection bots that can implement a wide variety of techniques, including transaction simulation, anomaly detection, and multi-chain monitoring. Forta bots emit alerts and findings that can also be fully customized.

In addition, Forta’s decentralized network of nodes, aligned and powered by economic incentives, provides unparalleled reliability while removing single points of failure.
