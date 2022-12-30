# How Forta works

The Forta Network has two main components – detection bots and scan nodes. Detection bots are pieces of logic (scripts) that look for certain transaction characteristics or state changes (e.g. anomaly detection) on smart contracts across any supported chain. Nodes run detection bots against each block of transactions. When the bots detect a specific condition or event, the network emits an alert which is stored on IPFS. Forta will also maintain an automated public registry of all alerts, and anyone interested in the security of a contract can consume relevant alerts via the [Forta Explorer](https://explorer.forta.network/) or [API](api.md).

There is value in the negative signal too – knowing that detection bots are running 24/7 and not triggering alerts. Forta will maintain an automated record of the detection bots run by each node, for each block.

## Roles in the network

### Subscribers to alerts

Protocols, DAOs, investors and individuals can use Forta to monitor transaction activity and receive alerts on security, financial, operational and governance related events on Layer 1s, Layer 2s and sidechains.

**You can subscribe** to the Forta data feeds through a variety of applications, including the [Forta App](https://app.forta.network/), [OpenZeppelin Defender](https://openzeppelin.com/defender/), or directly by using the public [Forta API](https://www.youtube.com/watch?v=xkxS7d2i5ms).

#### Notification channels

By default, detection bot alerts are sent from Scan Nodes to a Forta maintained ElasticSearch database and then displayed in the Forta Explorer dashboard. If the detection bot is specified as private, the alerts will not appear in the Forta Explorer dashboard, but they will still be accessible through the Forta Public GraphQL API via queries specifying the detection bot ID. For accessing alerts, Forta detection bots have a few built-in options and a number of extended options:

1. Subscriptions through the Forta App - Currently email address and/or a Slack webhook, but you can request that other options be added by the Forta Foundation.
2. OpenZeppelin Defender Forta Sentinels - Monitors the Forta Public API for new alerts and delivers those alerts to Defender Autotasks and/or Defender Notifications (email, Discord, Slack, Datadog, Telegram, other webhooks).
3. Custom solution - Manually polling the Forta Public API on local or cloud hosted machine.
4. Pushing data directly from the Forta detection bot to an External API Endpoint - As in the case of the data sources, there is no mechanism for keeping an API key secret. This is ill-advised.

#### Reacting to alerts

Performing on-chain actions from within a Forta detection bot is not advised, given the public nature of the Forta detection bot code and any keys it may use. However, Forta detection bot alerts can be monitored by OpenZeppelin Defender Forta Sentinels, where the Defender account is private (i.e. password protected). When a Forta Sentinel detects a new alert from a specific Forta detection bot, it can execute a Defender Autotask to initiate on-chain transactions to call specific contract methods, such as `pause()`. Defender Autotasks are JavaScript scripts that may perform similar operations that Forta detection bots can, including interacting with external APIs to retrieve or post data.

#### Private monitoring

There are multiple options for users that prefer private monitoring. Forta bots are not required to publish their source code, and the bot code in the deployed container can be obfuscated in a variety of ways, as described in the [Forta docs](https://docs.forta.network/en/latest/private-alerts/). Alert findings output from bots can be coded or encrypted. For users that prefer to deploy bots to a private environment without any public exposure, or that simply want redundancy for their bots on the public network, Forta also can support these users running private nodes, which remain completely independent of the public Forta network and do not participate in public detection bot assignment or public broadcast of detection bot findings.

### Detection bot developers

The vehicles for monitoring smart contracts on Forta are called detection bots – virtual security cameras that broadcast a public feed. Any developer can write and publish a detection bot on the Forta network, and anyone can subscribe to a bot and receive its alerts. The more detection bots running on Forta, the safer Web3 becomes.

**You can develop** and deploy your own detection bots on Forta using the [SDK](https://docs.forta.network/en/latest/quickstart/). There are many [templates](https://github.com/arbitraryexecution/forta-bot-templates) and [examples](https://github.com/forta-network/forta-bot-examples) you can work from. There are also a growing number of development teams who you can hire to develop Forta bots for your project (visit the [Bot Development Marketplace](https://www.notion.so/forta/Agent-Development-Marketplace-f8584bee618746319e9615f7a045df37) or contact the Forta Foundation at [info@forta.org](mailto:info@forta.org) for more information).

If you are an independent dev that wants to develop detection bots, you can visit Forta’s [Bot Development Marketplace](https://forta.notion.site/Agent-Development-Marketplace-f8584bee618746319e9615f7a045df37) to discover RFPs, apply for Grants or participate in Forta Development Contests, which are announced in the [Forta Discord](https://discord.com/invite/KACdTEutQq).

### Scan node operators

Scan node operators run the detection bots that Forta’s work assigner directs to them, against each block of transactions. When the bots detect a specific condition or event, the network emits an alert which is stored on IPFS. If you want to become a node operator, please check out the following [link](scanner-quickstart.md).

## Security

Staking will be required for scan nodes to be discoverable in the network and emit alerts, and Forta detection bots may be staked on to signal quality.

Bots are executed in individual containers and are not able to affect scan nodes or other bots. Detection bots are further restricted in a variety of ways by scan nodes during execution, and bot output can be validated by users and community members, and malicious, redundant, or inaccurate detection bots are slashed and disabled.

Scan nodes must produce proof of scan for every block, which provides the ability for community monitoring. Malicious or inaccurate scan nodes can be slashed and disabled.

The Forta smart contracts, node software, and other components of the network receive regular security review and the reports will be made public.

### How does Forta ensure reliable monitoring?

Reliability on Forta is solved through detection bot redundancy and the monitoring and enforcement of scan node service levels by the community. On the public network, Forta detection bots are assigned to multiple scan nodes with periodic re-assignment. Scan nodes are required to provide a stake and must produce a proof of scan for every block. Scan nodes are monitored for reliability and are slashed for failure to meet the community-established service levels.

### How are Forta alerts and findings validated?

Forta scan nodes gather findings from detection bots for each block and then store a proof of scan on IPFS and broadcast the finding details to the Forta analyzer node. Users can obtain the detailed information from the Forta analyzer node via the public API, which can be validated against the proof of scan data on IPFS. The analyzer node performs data indexing and may provide additional analysis.

## Fees

At the moment, no fees are required for subscribing to receive Forta alerts or for the execution of bots, although Forta encourages projects to fund experienced developers to create quality Forta detection bots for their specific use cases.
