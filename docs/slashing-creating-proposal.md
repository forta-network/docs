# Creating a Slashing Proposal.

Anyone that detects a slashable offence perpetrated by a Scan Node or Bot may report a Slash Proposal, if they meet the following requirements:

## Requirements.

- Have 1000 FORT bridged to Polygon, per proposal. ** This deposit can be slashed if the proposal does not follow appropiate formatting, it is malicious, false or spam**. Check the [slashing process](./slashing-process.md) for more info.
- Present verifiable evidence, in the form of screen captures, log files or any file that proves the accusations.
- Have knowledge of uploading files to IPFS.
- Is able to present evidence following Forta's the [Evidence Format](#evidence-format)
- Is able to interact with the SlashingController contract, either via [PolygonScan](https://polygonscan.com/) or interacting directly with the contracts via a web3 library and JSON RPC endpoint.


!!! warning "Proposal Deposit slashing"
    This deposit can be slashed if the proposal does not follow appropiate formatting, it is malicious, false or spam.
    Follow carefully this guide to follow correct conventions.

## Incentives.






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
