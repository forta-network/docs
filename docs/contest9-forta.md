**Forta is thrilled to announce a new Bot Development Contest**, this time diving into end user protections. Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/1UoaKI-ZDphw7nHgpZn1_tAU_UCIXeQlbeJ9zSaKXJOA/edit?ts=63444e07).

**Forta Detection bots** are pieces of logic (scripts) that look for certain transaction characteristics or state changes (e.g. anomaly detection) on smart contracts across any supported chain. Nodes run detection bots against each block of transactions. When the bots detect a specific condition or event, the network emits an alert which is stored on IPFS. For more information on creating your first detection bot, check out our [quickstart guide](quickstart.md) and [video tutorials](tutorials.md).

**Forta Detection Bot Development contests** are mini-hackathons where everyone is welcome to submit a detection bot and compete for prizes. Contest discussion, support, and announcements are available on Forta’s [Discord](https://discord.gg/KACdTEutQq).

## Rules

- You will find one challenge listed below. The challenge has a specific security concern that a Forta detection bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on [Forta App](https://app.forta.network/).
- Only the first **ten (10) QUALIFIED** submissions to the challenge that meet the requirements below will be considered.
- After ten qualified submissions are received for the challenge, we will close the form and announce it on the #contests channel at Discord. As long as submissions are open, you are welcome to build and submit detection bots!
- All developers that submit a qualifying detection bot will receive a Forta NFT.
- Cash prizes will be awarded to the winner and runner-up of the challenge:
    - **1st place will receive $3,000 USD (paid in FORT) and a unique Forta NFT.**
    - **Runner up will receive $1,000 USD (paid in FORT) and a unique Forta NFT.**
- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with a link of your bot on Github.
- This contest will run from October 11th through November 1st, after which no further submissions will be considered.
- Winners will be chosen by a panel of detection bot reviewers from Nethermind, and will be announced on November 8th.

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

The [Attack Detector Feed Bot](https://app.forta.network/bot/0x80ed808b586aeebe9cdd4088ea4dea0a8e322909c0e4493c993e060e89c09ed1) combines various alerts across the attack chain to emit a highly precise alert for protocol attacks. It does its job well and alerts emitted by this bot are shared on the [@FortaAlerts twitter handle](https://twitter.com/FortaAlerts). However, it lacks context that is needed to swiftly understand what is going on. One primary question arises on what protocols are/were attacked and where were assets drained from?

1. **Attacked Protocol/Asset Source Identification Bot**

    The [Attack Detector Feed Bot](https://app.forta.network/bot/0x80ed808b586aeebe9cdd4088ea4dea0a8e322909c0e4493c993e060e89c09ed1) aggregates all addresses observed in the underlying alerts and exposes those in the metadata fields. For instance, the Wintermute attack resulted in the following alert: [https://app.forta.network/alert/0x186becf1ad85541067d2244a3daacfdfe4e4de4733840832b0a8b0d5a8f84b9e](https://app.forta.network/alert/0x186becf1ad85541067d2244a3daacfdfe4e4de4733840832b0a8b0d5a8f84b9e)

    As can be seen, the alert contains a lot of addresses that were involved in the attack. As the attacker obtained various digital assets and used several exchanges to swap those assets and various protocols to launder the funds, who was actually attacked is lost.

    This part of the contest asks to create a bot that identifies the protocol that was likely attacked as well as asset source (e.g. Swap XYZ’s liquidity pool Asset1/Asset2) from which assets were drained from. One possible route is to look at token balance decreases and use block explorer tags to identify which protocol is used.
  
    However, it is not going to be that simple. If an attack, for instance, targets a specific liquidity pool, the tag may not exist on the block explorer and needs to be inferred from who created the liquidity pool or based on the source code of the underlying contract. Or if a particular position in a liquidity pool is targeted, it may not represent an attack on the liquidity pool, but rather on the holder of the position.

    The bot is allowed to utilize block explorer tags and block explorer information with the notable exception of the exploiter tags that are often added after an attack. It should emit an informational alert that contains both the name as well as the twitter handle of the attacked protocol and information of the asset source. Since this alert is informational only and will be combined with additional information to emit a highly precise alert, it is OK if this bot is noisy. 

    The bot should output the following captured in the metadata of the alert:

    - protocol attacked (addresses, names and twitter handle)
    - asset source (addresses, name, and twitter handle) (e.g. if ETH/USDC Uniswap V3 pool would be drained, it would list all the position holders)
    - quantification of the assets stolen
