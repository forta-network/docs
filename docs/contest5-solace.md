**Forta is thrilled to announce the first Agent Development Contest of 2022, co-sponsored by Solace!**

Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/1RPk5rOC8jRCt2Ht0WaVC-ybTLqArbJ5T1K0uXbIFItY/edit).

**Forta Agents** are code scripts written in Python, Javascript and Typescript that trigger alerts when certain
conditions are met. The best Agents trigger alerts when specific conditions indicate that a potential hack or exploit may be taking place and help end users prevent them. For more information on creating your first Agent, check out our [quickstart guide](https://docs.forta.network/en/latest/quickstart/) and [video tutorials](https://docs.forta.network/en/latest/tutorials/).

**Forta Agent Developer Contests** are mini-hackathons where anyone is able to submit an Agent and be rewarded in NFTs, stablecoins, and crypto.

Contest discussion, support, and announcements are available on Forta’s [Discord](https://discord.gg/rsc55DqcCy).

## Rules

- You will find five challenges listed below. Each challenge has a specific security concern that a Forta Agent monitors for. Please submit your completed agents to the contest judges through the Google form linked above and on [Forta Explorer](https://explorer.forta.network/).

- Only the first **ten (10) QUALIFIED** submissions to each challenge that meet the challenge requirements below will be considered.

- After fifteen qualified submissions are received for a challenge, we will close the challenge and announce it in the #agent-dev-contests channel in Discord. As long as submissions are open, you are welcome to build and submit Agents for the challenges!

- All developers that submit a qualifying agent will receive a Forta NFT.

- Cash prizes will be awarded to the winner of each of the 5 challenges - win or go home!
    - **1st place will receive $1,000 in $SOLACE and a unique Forta NFT.**

- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with your Agent.

- This contest will run from March 1st through March 8th, after which no further submissions will be considered. Winners will be chosen by a panel of agent reviewers from Forta community member Limechain, and will be announced on March 12th.

For any questions, please contact a Forta Moderator on **Discord**.

## Assessment Criteria

- Agent implementation
    - Does the code correctly alert according to the challenge description?
    - Does the code make appropriate use of Forta SDK and built-in functions?
    - Does the code contain comments?
    - Is the code well-formatted and easy to read?

- Testing
    - Do all tests run and pass?
    - Are there negative test cases? i.e. when alerts should not be created
    - Are there positive test cases? i.e. when alerts should be created

- Documentation
    - Does the README.md have a concise description of agent functionality?
    - Does the README.md contain well-formatted descriptions of each alert?
    - (If Applicable) Does the README.md contain real blocks/transactions that will trigger alerts?
    - Does the package.json contain an appropriate name and description?

See Forta’s [Code Review checklist](https://github.com/forta-protocol/agent-review-checklist) for a detailed description of how to develop a high quality agent.

## Challenges

1. **Monitoring Whales on Solace**

    Listen for large `Transfer` events (>= 1M SOLACE) (on the ETH blockchain)

    - SOLACE Contract: 0x9c051f8a6648a51ef324d30c235da74d060153ac (ETH)
    - SOLACE Docs: [https://docs.solace.fi/docs/dev-docs/intro](https://docs.solace.fi/docs/dev-docs/intro)

2. **BondTeller Monitoring for Basic Functions**

    Monitor when `pause()`, `unpause()`, `setTerms()`, `setFees()`, or `setAddresses()` are called on BondTeller contracts (important governance functions). Also listen for `Paused`, `Unpaused`, `TermsSet`, `FeesSet`, `AddressesSet` events. Tip: You should monitor **all** BondTeller contracts

    - DAI BondTeller Contract: 0x501ACe677634Fd09A876E88126076933b686967a (ETH)
    - BondTeller Docs: [https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20](https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20)

3. **BondTeller Monitoring Whale Alert**

    Listen for large deposits (>= 1M SOLACE tokens created). Tip: You should monitor **all** BondTeller contracts

    - DAI BondTeller Contract: 0x501ACe677634Fd09A876E88126076933b686967a (ETH)
    - BondTeller Docs: [https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20](https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondTellerErc20)

4. **StakingRewards Monitoring**

    Report when `setRewards()` or `setTimes()` are called (important governance functions). Also listen for `RewardsSet` and `FarmTimesSet` events.

    - StakingRewards Contract: 0x501ace3D42f9c8723B108D4fBE29989060a91411 (ETH)
    - StakingRewards Docs: [https://docs.solace.fi/docs/dev-docs/contracts/staking/StakingRewards](https://docs.solace.fi/docs/dev-docs/contracts/staking/StakingRewards)

5. **BondDepository Monitoring**

    Report when Teller added or removed by listening for `TellerAdded` and `TellerRemoved` events

    - BondDepository Contract: 0x501ACe2f00EC599D4FDeA408680e192f88D94D0D (ETH)
    - BondDepository Docs: [https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondDepository](https://docs.solace.fi/docs/dev-docs/contracts/bonds/BondDepository)
