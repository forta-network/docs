**The Forta Foundation is thrilled to announce a new Bot Development Contest**, this time diving into end user protections. Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/e/1FAIpQLSe_5TJiam3-6uXg4psnknPw2BqvHFHA9s4akYc6TuFu5YJHNw/viewform?usp=sf_link).

**Forta Detection bots** are pieces of logic (scripts) that look for certain transaction characteristics or state changes (e.g. anomaly detection) on smart contracts across any supported chain. Nodes run detection bots against each block of transactions. When the bots detect a specific condition or event, the network emits an alert which is stored on IPFS. For more information on creating your first detection bot, check out our [quickstart guide](quickstart.md) and [video tutorials](tutorials.md).

**Forta Detection Bot Development contests** are mini-hackathons where everyone is welcome to submit a detection bot and compete for prizes. Contest discussion, support, and announcements are available on Forta’s [Discord](https://discord.com/invite/fortanetwork).

## Rules

- You will find one challenge listed below. The challenge has a specific security concern that a Forta detection bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on [Forta App](https://app.forta.network/).
- Only the first **ten (10) QUALIFIED** submissions to the challenge that meet the requirements below will be considered.
- After ten qualified submissions are received for the challenge, we will close the form and announce it on the #contests channel at Discord. As long as submissions are open, you are welcome to build and submit detection bots!
- All developers that submit a qualifying detection bot will receive a Forta NFT.
- Cash prizes will be awarded to the winner and runner-up of the challenge:
    - **1st place will receive $5,000 USD (paid in FORT) and a unique Forta NFT.**
    - **2nd place will receive $1,000 USD (paid in FORT) and a unique Forta NFT.**
    - **3rd place will receive $500 USD (paid in FORT) and a unique Forta NFT.**
- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with a link of your bot on Github.
- This contest will run from Nov 7st through Nov 21st, after which no further submissions will be considered.
- Winners will be chosen by a panel of detection bot reviewers from Nethermind, and will be announced on November 30th.

For any questions, please contact a Forta Moderator on **Discord**.

## Assessment Criteria

- Bot implementation
    - Does the code correctly alert according to the challenge description?
    - Does the code make appropriate use of Forta SDK and built-in functions?
    - Does the bot operate on all Forta supported chains?
    - Does the code contain comments?
    - Is the code well-formatted and easy to read?
- Alert efficacy
    - How well does the bot perform its task? A curated set of past attacks will be used to assess. Note, since these bots are used to join with other bots, noise level is not a concern.
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

Anomalous funding and Money Laundering are essential steps attackers take when attacking a protocol or end users. 

Funding is the first signal emitted about an attacker for imminent attacks. Detection coverage is of utmost importance, but existing detection bot coverage is limited to protocol specific bots, like Tornado Cash and Aztec.

The goal of this contest is to develop a detection bot that identifies mixers, bridges, exchanges generically, such that any funding and money laundering activities from those protocols can be flagged. Note, that mixers and bridges have a some of the following characteristics, which could be incorporated in the bot logic:
- Many deposits and withdrawals
- Withdrawals often are deposited to brand new EOAs
- The mixers/ bridges have existed for some time 
- Mixers and bridges are often flagged in block explorers with appropriate tags 
- They have been used by attackers in the past

The bot should emit two alerts:
1. Address is funded by a likely mixer/bridge/exchange. This alert should emit two types of alerts: one alert on newly funded accounts and one on existing accounts being funded. Differentiating bridges, mixers, exchanges should be made in the alert. Note, the bot should not use any hard coded addresses.
2. Address is engaged in money laundering behavior using a likely mixer/bridge/exchange. This alert should be configurable per the US dollar value of the tokens being laundered. Differentiating bridges, mixers, exchanges should be made in the alert. Note, the bot should not use any hard coded addresses.
