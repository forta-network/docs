# How Forta works

Underlying Forta is a decentralized network of independent node operators that scan all transactions and block-by-block state changes for outlier transactions and threats. When an issue is detected, node operators send alerts to subscribers of potential risks, which enables them to take action.

## Roles in the network

### Subscribers to alerts

You can subscribe to the Forta data feeds through a variety of applications, including the [Forta App](https://app.forta.network/), [OpenZeppelin Defender](https://openzeppelin.com/defender/), or directly by using the public [Forta API](https://www.youtube.com/watch?v=xkxS7d2i5ms).

#### Notification channels

By default, detection bot alerts are sent from Scan Nodes to a Forta maintained ElasticSearch database and then displayed in the Forta Explorer dashboard. If the detection bot is specified as private, the alerts will not appear in the Forta Explorer dashboard, but they will still be accessible through the Forta Public GraphQL API via queries specifying the detection bot ID. For accessing alerts, Forta detection bots have a few built-in options and a number of extended options:

1. Subscriptions through the Forta App - Currently email address and/or a Slack webhook, but you can request that other options be added by the Forta Foundation.
2. OpenZeppelin Defender Forta Sentinels - Monitors the Forta Public API for new alerts and delivers those alerts to Defender Autotasks and/or Defender Notifications (email, Discord, Slack, Datadog, Telegram, other webhooks).
3. Custom solution - Manually polling the Forta Public API on local or cloud hosted machine/
4. Pushing data directly from the Forta detection bot to an External API Endpoint - As in the case of the data sources, there is no mechanism for keeping an API key secret. This is ill-advised.

#### Reacting to alerts

Performing on-chain actions from within a Forta detection bot is not advised, given the public nature of the Forta detection bot code and any keys it may use. However, Forta detection bot alerts can be monitored by OpenZeppelin Defender Forta Sentinels, where the Defender account is private (i.e. password protected). When a Forta Sentinel detects a new alert from a specific Forta detection bot, it can execute a Defender Autotask to initiate on-chain transactions to call specific contract methods, such as `pause()`. Defender Autotasks are JavaScript scripts that may perform similar operations that Forta detection bots can, including interacting with external APIs to retrieve or post data.

#### Private monitoring

There are multiple options for users that prefer private monitoring. Forta bots are not required to publish their source code, and the bot code in the deployed container can be obfuscated in a variety of ways, as described in the [Forta docs](https://docs.forta.network/en/latest/private-alerts/). Alert findings output from bots can be coded or encrypted. For users that prefer to deploy bots to a private environment without any public exposure, or that simply want redundancy for their bots on the public network, Forta also can support these users running private nodes, which remain completely independent of the public Forta network and do not participate in public detection bot assignment or public broadcast of detection bot findings.

### Detection bot developers

**You can develop** and deploy your own detection bots on Forta using the [SDK](https://docs.forta.network/en/latest/quickstart/). There are many [templates](https://github.com/arbitraryexecution/forta-agent-templates) and [examples](https://github.com/forta-protocol/forta-agent-examples) you can work from. There are also a growing number of development teams who you can hire to develop Forta bots for your project (visit the [Bot Development Marketplace](https://www.notion.so/forta/Agent-Development-Marketplace-f8584bee618746319e9615f7a045df37) or contact the Forta Foundation at [info@forta.org](mailto:info@forta.org) for more information).

If you are an independent dev that wants to develop detection bots, you can visit Forta’s [Bot Development Marketplace](https://forta.notion.site/Agent-Development-Marketplace-f8584bee618746319e9615f7a045df37) to discover RFPs, apply for Grants or participate in Forta Development Contests, which are announced in the [Forta Discord](https://discord.com/invite/KACdTEutQq).

### Scan node operators

#### Become a node operator

The Forta Foundation will soon announce the start of the “Fortification Phase,” where anyone in the Forta community may apply to run a scan node and participate in testing the decentralized Forta Protocol using the FORT token, subject to certain eligibility criteria. If you are keen to dig into the technical details of running a node, [check out the docs](https://docs.forta.network/en/latest/scanner-quickstart/).

## Security

Staking will be required for scan nodes to be discoverable in the network and emit alerts, and Forta detection bots may be staked on to signal quality.

Bots are executed in individual containers and are not able to affect scan nodes or other bots. Detection bots are further restricted in a variety of ways by scan nodes during execution, and bot output can be validated by users and community members, and malicious, redundant, or inaccurate detection bots are slashed and disabled.

Scan nodes must produce proof of scan for every block, which provides the ability for community monitoring. Malicious or inaccurate scan nodes can be slashed and disabled.

The Forta smart contracts, node software, and other components of the network receive regular security review and the reports will be made public.

## Fees

No fees are required for subscribing to receive Forta alerts or for the execution of bots, although Forta encourages projects to fund experienced developers to create quality Forta detection bots for their specific use cases.
