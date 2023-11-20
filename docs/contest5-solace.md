**Forta is thrilled to announce the first bot development contest of 2022, co-sponsored by Solace!**

Submit your entries for this contest [**HERE**](https://forms.gle/Aya5hsdAemwB8gno7).

**Forta bots** are code scripts written in Python, Javascript and Typescript that trigger alerts when certain
conditions are met. The best bots trigger alerts when specific conditions indicate that a potential hack or exploit may be taking place and help end users prevent them. For more information on creating your first bot, check out our [quickstart guide](https://docs.forta.network/en/latest/quickstart/) and [video tutorials](https://docs.forta.network/en/latest/tutorials/).

**Forta bot developer contests** are mini-hackathons where anyone is able to submit a bot and be rewarded in NFTs, stablecoins, and crypto.

Contest discussion, support, and announcements are available on Forta’s [Discord](https://discord.com).

## Rules

- You will find five challenges listed below. Each challenge has a specific security concern that a Forta bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on [Forta App](https://app.forta.network/).

- Only the first **ten (10) QUALIFIED** submissions to each challenge that meet the challenge requirements below will be considered.

- After ten qualified submissions are received for a challenge, we will close the challenge and announce it in the #agent-dev-contests channel in Discord. As long as submissions are open, you are welcome to build and submit bots for all challenges!

- All developers that submit a qualifying bot will receive a Forta NFT.

- Cash prizes will be awarded to the winner of each of the 5 challenges - win or go home!
    - **1st place will receive $1,000 in $SOLACE and a unique Forta NFT.**

- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with your bot.

- This contest will run from March 1st through March 8th, after which no further submissions will be considered. Winners will be chosen by a panel of bot reviewers from Forta community member Limechain, and will be announced on March 12th.

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

1. **Monitoring Whales on Solace**

    Listen for large `Transfer` events (>= 1M SOLACE) (on the ETH blockchain)

    - SOLACE Contract: 0x9c051f8a6648a51ef324d30c235da74d060153ac (ETH)
    - SOLACE Docs: [https://docs.solace.fi/docs/dev-docs/intro](https://docs.solace.fi/docs/dev-docs/intro)
    <br/><br/>
    - Winner: **vvlovsky**
    - Winning bot: [https://app.forta.network/bot/0x7d63...1f07](https://app.forta.network/bot/0x7d631d5f2c51d939b6d38cee614c535da1d84606fdf46bd75973099ddc251f07) ([source code](https://github.com/VVlovsky/Forta-Solace-Agents/tree/master/whales-monitoring-agent))

2. **BondTeller Monitoring for Basic Functions**

    Monitor when `pause()`, `unpause()`, `setTerms()`, `setFees()`, or `setAddresses()` are called on BondTeller contracts (important governance functions). Also listen for `Paused`, `Unpaused`, `TermsSet`, `FeesSet`, `AddressesSet` events. Tip: You should monitor **all** BondTeller contracts

    - DAI BondTeller Contract: 0x501ACe677634Fd09A876E88126076933b686967a (ETH)
    - BondTeller Docs: [https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20](https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20)
    <br/><br/>
    - Winner: **hyodar**
    - Winning bot: [https://app.forta.network/bot/0x022e...aee9](https://app.forta.network/bot/0x022eb176480a2cd02ef5cb928a48fce47578afa79a9a7d861c7d22ff8426aee9) ([source code](https://github.com/Hyodar/forta-agents/tree/master/bondteller-governance-solace))

3. **BondTeller Monitoring Whale Alert**

    Listen for large deposits (>= 1M SOLACE tokens created). Tip: You should monitor **all** BondTeller contracts

    - DAI BondTeller Contract: 0x501ACe677634Fd09A876E88126076933b686967a (ETH)
    - BondTeller Docs: [https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20](https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20)
    <br/><br/>
    - Winner: **karmacoma**
    - Winning bot: [https://app.forta.network/bot/0x407c...c276](https://app.forta.network/bot/0x407cf0397de5fc49f8e1329b556dcc5b91286d66532a8ecd979214d7cbc3c276) ([source code](https://github.com/karmacoma-eth/forta-solace-bondteller-whale-alert))

4. **StakingRewards Monitoring**

    Report when `setRewards()` or `setTimes()` are called (important governance functions). Also listen for `RewardsSet` and `FarmTimesSet` events.

    - StakingRewards Contract: 0x501ace3D42f9c8723B108D4fBE29989060a91411 (ETH)
    - StakingRewards Docs: [https://docs.solace.fi/docs/dev-docs/contracts/staking/StakingRewards](https://docs.solace.fi/docs/dev-docs/contracts/staking/StakingRewards)
    <br/><br/>
    - Winner: **miguelmtzinf**
    - Winning bot: [https://app.forta.network/bot/0xda27...e6ee](https://app.forta.network/bot/0xda27257407055ba19ddf476e199ba03ff10d6a6ac140c0495e2c487cddbbe6ee) ([source code](https://github.com/miguelmtzinf/forta-solace-monitoring-staking-rewards))

5. **BondDepository Monitoring**

    Report when Teller added or removed by listening for `TellerAdded` and `TellerRemoved` events

    - BondDepository Contract: 0x501ACe2f00EC599D4FDeA408680e192f88D94D0D (ETH)
    - BondDepository Docs: [https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondDepository](https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondDepository)
    <br/><br/>
    - Winner: **vvlovsky**
    - Winning bot: [https://app.forta.network/bot/0x143f...c15d](https://app.forta.network/bot/0x143f7fd87abb8aff430bdf0a5d94ce8da09159c2fc509f72f6a34838eb9bc15d) ([source code](https://github.com/VVlovsky/Forta-Solace-Agents/tree/master/bonddepository-monitoring-agent))
