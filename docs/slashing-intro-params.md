# Slashing.

To participate in the Forta Network, participants (Scan Nodes, Detection Bots) have to deposit an amount of FORT tokens (stake) as skin in the game. This stake can and will be slashed if the participant is demonstrably going against the established [slashing reasons](#current-parameters).

For Scan Nodes operators, SLA score is the main mechanism used to determine bot assignment and rewards. However, this policy will not slash nodes for low SLA scores, since having low scores would mean the scanner is getting less work and less or no FORT rewards, and factoring the costs of running a node it would mean low SLA scanner nodes run at a loss and should therefore naturally remove themselves from the network over time.

However, there may be factors not contemplated by SLA that make a scanner node underperform, harming the health of the bot(s) it is assigned. In this case, when this type of underperformance is discovered and reported, the relevant node should get slashed for a percentage of its stake. This type of slashing proposal may therefore be a source of improvement for SLA parameters.

Additionally, a scanner node could engage in censoring, forging of alerts, malicious activity and misreporting in order to cheat the network and earn rewards in an unfair way. If proved, this behavior would merit the slashing of most of the stake (90%).

## Slashing incentives.

If a slash proposal is executed, following [the Slashing Process](/slashing-process), the slashed FORT will be split between the treasury and the slash proposer, as a reward for keeping the Forta network safe and secure.

The amount of FORT to be slashed deppends on the Slash Reason. This, and the % of the reward split between proposer and treasury is set by Governance, and the [current parameters](#current-parameters) are below.

Since submitting a slash proposal has immediate consequences, freezing the stake of the reported subject, a deposit of 1000 FORT is necessary to submit a slash proposal. This deposit could be lost if the proposal is malicious, false, or formatted inappropiately.

See [the Slashing Process docs](/slashing-process) to learn about the possible outcomes of submitting a Slash Proposal, and after the [Slash Proposal creation guide](/slashing-creating-proposal) to submit one.

!!! warning "Proposal Deposit slashing"
    This deposit can be slashed if the proposal does not follow appropiate formatting, it is malicious, false or spam.
    Follow carefully this guide to follow correct conventions.

# Current Parameters

## Slash reasons:

**1. Operational complaint.** Penalty: 15% of Min Stake

1.1 Scanner Nodes:

- Not providing the minimum technical requirements specified in the Forta docs 9, in a way not yet contemplated in SLA calculation.

1.1 Detection Bots:

- Demand an excessive amount of resources from the Scanner Node.

**2. Malicious or fraudulent.** Penalty: 90% of Stake

2.1 Scanner Nodes

- Censoring, forging or tampering with bots and alerts.
- Faking performance metrics.
- Not providing performance metrics.
- Any other proven malicious activity.

2.2 Detection Bots:

- Submit bots with the intention of clogging the network (spam).
- Create bots that fail in a way that affects the scanner node, affecting the Scanner’s SLA.
- Attack the Scanners, the Forta Network or another party.
- Bots whose alert misrepresent the purpose stated on their description or that fail to alert subscribers in the way they advertise.
- Any other proven malicious activity.

## Other Parameters

- 50% of slashed stake for Slash Proposer.
- 1k FORT deposit to create each Slash Proposal.
- Treasury address: [TBD]
