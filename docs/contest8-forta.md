**Forta is thrilled to announce a new Bot Development Contest**, this time we dive into attack simulation. Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/1msQSVJ_1bk1xAW4qdtG7iqTTNc1DcD0omsF0yEzd3Ak/edit?ts=62fba676).

**Forta Detection bots** are pieces of logic (scripts) that look for certain transaction characteristics or state changes (e.g. anomaly detection) on smart contracts across any supported chain. Nodes run detection bots against each block of transactions. When the bots detect a specific condition or event, the network emits an alert which is stored on IPFS. For more information on creating your first detection bot, check out our [quickstart guide](quickstart.md) and [video tutorials](tutorials.md).

**Forta Detection Bot Development contests** are mini-hackathons where everyone is welcome to submit a detection bot and compete for prizes. Contest discussion, support, and announcements are available on Forta’s [Discord](https://discord.com/invite/fortanetwork).

## Rules

- You will find one challenge listed below. The challenge has a specific security concern that a Forta detection bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on [Forta App](https://app.forta.network/).
- Only the first **ten (10) QUALIFIED** submissions to the challenge that meet the requirements below will be considered.
- After ten qualified submissions are received for the challenge, we will close the form and announce it on the #contests channel at Discord. As long as submissions are open, you are welcome to build and submit detection bots!
- All developers that submit a qualifying detection bot will receive a Forta NFT.
- Cash prizes will be awarded to the winner and runner-up of the challenge:
    - **1st place will receive $3,000 USD (paid in FORT) and a unique Forta NFT.**
    - **Runner up will receive $1,000 USD (paid in FORT) and a unique Forta NFT.**
- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with a link of your bot on Github.
- This contest will run from August 31st through September 20th, after which no further submissions will be considered.
- Winners will be chosen by a panel of detection bot reviewers from Nethermind, and will be announced on October 5th.

For any questions, please contact a Forta Moderator on **Discord**.

## Assessment Criteria

- Bot implementation
    - Does the code correctly alert according to the challenge description?
    - Does the code make appropriate use of Forta SDK and built-in functions?
    - Does the code contain comments?
    - Is the code well-formatted and easy to read?
- Alert efficacy
    - How noisy is the bot (will be evaluated based on transactions from Sept 12th to Sep 18th)?
    - How well does the bot identify the attacker addresses (contracts/ EOAs)?
    - How well does the bot describe the scam identified?
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

1. **Scams**

    In 2021, Chainanalysis - in their [2022 cyber crime report](https://go.chainalysis.com/2022-Crypto-Crime-Report.html) - estimated scam losses far exceed losses of DeFi hacks with 7.7B and 2.3B respectively. Forta’s mission is to secure web3. So far, Forta’s efforts have primarily focused on securing on-chain protocols through monitoring of all on-chain activity. However, opportunities exist for Forta to protect end users as well.

    In December 2021, BAYC owners became victim of a scam (see [https://medium.com/@investigationsbyzachxbt/scammers-in-paris-32b8e3c039ba](https://medium.com/@investigationsbyzachxbt/scammers-in-paris-32b8e3c039ba)); in August 2022, Curve Finance users were tricked into token approvals, which were quickly drained out of user’s wallets ([https://rekt.news/curve-finance-rekt/](https://rekt.news/curve-finance-rekt/)).

    Commonly, these attacks are referred to as ice phishing attacks and a community developed bot exists to identify these ice phishing attacks (see [Ice Phishing 2.0 bot](https://explorer.forta.network/bot/0x8badbf2ad65abc3df5b1d9cc388e419d9255ef999fb69aac6bf395646cf01c14)). However, the alerts the bot emits are too noisy identifying many approval events that are not part of an actual scam.

    The purpose of this contest is to create a new bot that is permitted to consume any existing alerts (e.g. through the get_alerts SDK function) (those alerts can be augmented with additional bots) as well as external data sources (e.g. twitter data/ web site HTML code) to identify these scams with high precision, aka low false positive rate. The goal is to identify the two attacks in question but do so with 50% precision (in other words, 50% of the alerts raised by the bot should identify actual scams). One way to accomplish this is to combine existing alerts in a way that is consistent with the attack stages associated with attacks: funding, preparation, exploitation, and money laundering as done by the [Alert Combiner bot](https://explorer.forta.network/bot/0x80ed808b586aeebe9cdd4088ea4dea0a8e322909c0e4493c993e060e89c09ed1). The alert combiner utilizes simple heuristics; a better way may be described in [Attack chain detection paper by Sexton J., Storlie C., Neil, J.](https://www.researchgate.net/publication/282791039_Attack_chain_detection)