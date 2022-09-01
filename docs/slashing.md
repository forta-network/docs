# Slashing reasons and their spirit.

For Scan Nodes operators, SLA score is the main mechanism used to determine bot assignment and rewards. However, this policy will not slash nodes for low SLA scores, since having low scores would mean the scanner is getting less work and less or no FORT rewards, and factoring the costs of running a node it would mean low SLA scanner nodes run at a loss and should therefore naturally remove themselves from the network over time.

However, there may be factors not contemplated by SLA that make a scanner node underperform, harming the health of the bot(s) it is assigned. In this case, when this type of underperformance is discovered and reported, the relevant node should get slashed for a percentage of its stake. This type of slashing proposal may therefore be a source of improvement for SLA parameters.

Additionally, a scanner node could engage in censoring, forging of alerts, malicious activity and misreporting in order to cheat the network and earn rewards in an unfair way. If proved, this behavior would merit the slashing of most of the stake (90%).

# Factors that could merit near total slashing:

## Scanner Nodes

- Censoring, forging or tampering with bots and alerts.
- Faking performance metrics.
- Not providing performance metrics.
- Any other proven malicious activity.

## Detection Bots, developers could:

- Submit bots with the intention of clogging the network (spam).
- Create bots that fail in a way that affects the scanner node, affecting the Scanner’s SLA.
- Demand an excessive amount of resources from the Scanner Node.
- Attack the Scanners, the Forta Network or another party.
- Bots whose alert misrepresent the purpose stated on their description or that fail to alert subscribers in the way they advertise.
- Any other proven malicious activity.

In both cases, adequate documentation of the processes will be published to help proposers, and communication channels will be open.

# Slashing Proposal Process

![Process](slashing_process.png)

##  Roles

### Proposer:
Individuals or bots that detect evidence of a slashable offense and propose the slashing of a staking subject, assigning initial blame and reason for the proposal.

To have a public and permissionless proposal process, and since proposing a slashing freezes the stake of the suspect staking subject (bot or scanner), proposing cannot be free.

The Proposer would need to present a FORT deposit for each proposal. This deposit is at risk of being sent to the treasury if the report is deemed in bad faith or too poorly constructed.

### Slashing Arbiter:
Technical reviewer of the slashing proposals. She needs to verify that:

1. The proposal is well constructed and in good faith. **If the proposal has merit, the deposit will be returned to the proposer. If not, the deposit will be sent to the slashing treasury.**

2. Investigate the evidence. Correct the blame and the reason if needed, presenting more evidence (for example the report blames a bot for not firing an alert, but it was the Scanner node’s fault).

3. Mark the proposal as ready for slashing.

At this point, due to the openness of the reports the verification of the evidence requires some manual processes and the Arbiters will be a committee named by the Governance Council, with appropriate expertise and without FORT incentives, with the committee further automating and decentralizing into the future.

### Slasher:

Decides to either:

- Execute the proposal, with the following effects:

-- Slashing the subject’s stake, with the tokens being split between the slashing treasury and the proposer, sending the withheld rewards back to the rewards pool.

-- Revert the slashing proposal, unfreeze the stake and assign the rewards being withheld.

Initially, we propose this role is granted to:

- The arbiter committee for partial slashes due to operational reasons.

- The Governance Council for major slashing proposals.

## Staking admin

Sets the parameters for staking and slashing.

- Slash reasons and penalty amounts.
- Amount of FORT deposit for proposals.
- % of the slashing amount going to the Proposer.
- Treasury address.

This role is initially assigned to the Council’s multisig, which will enact the results of Snapshot voting.


# Initial Parameters

- Slash reasons:

1. Operational complaint. Penalty: 15% of Min Stake
2. Malicious or fraudulent. Penalty: 90% of Stake

- 50% of slashed stake for slash Proposer.
- 1k FORT deposit for each slash proposal.
- Treasury address: [TBD]


# Evidence Format
Each Slashing Proposal must have an IPFS hosted file associated with the following format.

'''
{

    “title”: string,
    “description”: string,
    “subjectId”: string,
    “subjectType”: number,
    “penaltyId”: string,
    “checksum”: string
}
'''

- Title: title of the slash proposal, max 100 characters long.
- Description: 5000 characters max describing the case, markdown encouraged. Example:
- The logs presented (evidence_1) prove that the scanner is censoring my bot’s alerts.
- subjectId: uint256 id of the subject to slash (scanner, bot)
- subjectType: 0 for scanner, 1 for bot.
- penaltyId: bytes32 hash representing the penalty applied.
- Checksum: keccak 256 hash of all the other (key,value) pairs of the file.

Each case can have several JSON files with evidence (logs, screenshots) hosted in IPFS. Both Proposer and Arbiter must present evidence when creating or modifying the proposal.

Evidence JSON:

'''
{

    “fileURI”: string,
    “fileHash”: string,
    “fileTypeExtension”: string,
    “name”: string,
    “description”: string,
    “checksum”: string

}
'''

- fileURI: IPFS URI, example: “/ipfs/QmWQV5ZFFhEJiW8Lm7ay2zLxC2XS4wx1b2W7FfdrLMyQQc”
- fileHash: IPFS file hash, example: “QmWQV5ZFFhEJiW8Lm7ay2zLxC2XS4wx1b2W7FfdrLMyQQc”
- fileTypeExtension:”txt”, “pdf”, “png” or “jpg”
- fileName: name of the file
- description: description of what the evidence portrays. 100 char max.
- checksum: keccak 256 hash of all the other (key,value) pairs of the file.
