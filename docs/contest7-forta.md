**Forta is thrilled to announce a new Bot Development Contest**, this time we dive into attack simulation. Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/1ji2CkTaAg03oeUpUHZWaTN6tvsvdtaJBbaucmd71xMs/edit?usp=sharing).

**Forta Detection bots** are pieces of logic (scripts) that look for certain transaction characteristics or state changes (e.g. anomaly detection) on smart contracts across any supported chain. Nodes run detection bots against each block of transactions. When the bots detect a specific condition or event, the network emits an alert which is stored on IPFS. For more information on creating your first detection bot, check out our [quickstart guide](quickstart.md) and [video tutorials](tutorials.md).

**Forta Detection Bot Development contests** are mini-hackathons where everyone is welcome to submit a detection bot and compete for prizes. Contest discussion, support, and announcements are available on Forta’s [Discord](https://discord.gg/rsc55DqcCy).

## Rules

- You will find one challenge listed below. The challenge has a specific security concern that a Forta detection bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on [Forta App](https://app.forta.network/).
- Only the first **ten (10) QUALIFIED** submissions to the challenge that meet the requirements below will be considered.
- After ten qualified submissions are received for the challenge, we will close the form and announce it on the #contests channel at Discord. As long as submissions are open, you are welcome to build and submit detection bots!
- All developers that submit a qualifying detection bot will receive a Forta NFT.
- Cash prizes will be awarded to the winner and runner-up of the challenge:
    - **1st place will receive $3,000 USD (paid in FORT) and a unique Forta NFT.**
    - **Runner up will receive $1,000 USD (paid in FORT) and a unique Forta NFT.**
- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with a link of your bot on Github.
- This contest will run from June 16th through July 7th, after which no further submissions will be considered.
- Winners will be chosen by a panel of detection bot reviewers from Limechain, and will be announced on July 12th.

For any questions, please contact a Forta Moderator on **Discord**.

## Assessment Criteria

- Bot implementation
    - Does the code correctly alert according to the challenge description?
    - Does the code make appropriate use of Forta SDK and built-in functions?
    - Does the code contain comments?
    - Is the code well-formatted and easy to read?
- Testing
    - Do all tests run and pass?
    - Are there negative test cases? i.e. when alerts should not be created
    - Are there positive test cases? i.e. when alerts should be created
- Documentation
    - Does the README.md have a concise description of bot functionality?
    - Does the README.md contain well-formatted descriptions of each alert?
    - (If Applicable) Does the README.md contain real blocks/transactions that will trigger alerts?
    - Does the package.json contain an appropriate name and description?

See Forta’s [Code Review checklist](https://github.com/forta-network/bot-review-checklist) for a detailed description of how to develop a high quality bot.

## Challenges

1. **Attack Simulation**

    Forta detection bots monitor transactions and blocks for suspicious or malicious activity. However, detection bots can do more to identify these behaviors; and more importantly can do so even before any funds are diverted from a protocol.

    As outlined in the recent blog post [Detecting Exploits Before Funds Are Lost Using Attack Simulation - Saddle Finance Case Study](https://forta.org/blog/attack-simulation/), bots can simulate attacks utilizing a locally forked version of the blockchain using Ganache.

    The goal of this bot is to successfully identify the Saddle Finance and similar attacks on block [14684300](https://etherscan.io/block/14684300) with a critical alert utilizing a simulation approach:

    1. Upon suspicious contract creation, the bot should create a local folks of the blockchain using ganache (see [https://docs.forta.network/en/latest/tx-simulation](tx-simulation.md) for details on how to do so)
    2. Invoke the functions of the created smart contract
    3. Assess whether state changes (e.g. large balance changes) occur to determine whether exploitation occurred
    4. Emit a critical alert

    Note that invocation of the functions of the created smart contract can easily be simulated - as it was the case for the Saddle Finance attack - if it is parameterless. However, when parameters are involved, it becomes more difficult, and contest participants are encouraged to venture into opcode analysis and fuzzing to handle those cases.

    Further, assessing whether state changes are indicative of an exploit need to be broad (e.g. assessing native, ERC-20, ERC-721, and ERC-1155 balances), where these balances are changing (e.g. is the contract creator or contract invoker seeing large balance increases?), and whether the magnitude of the change is actually indicative of an exploit. Given this bot will result in a critical alert, the precision should be high (aka noise level low).
