**Forta is thrilled to announce a new Bot Development Contest**, this time in data science. Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/e/1FAIpQLScxVAezQzvCrxL62hx_Did6t_CKkoKMsL0YbEDZXch1RTkCbw/viewform).

**Forta Detection bots** are pieces of logic (scripts) that look for certain transaction characteristics or state changes (e.g. anomaly detection) on smart contracts across any supported chain. Nodes run detection bots against each block of transactions. When the bots detect a specific condition or event, the network emits an alert which is stored on IPFS. For more information on creating your first detection bot, check out our [quickstart guide](quickstart.md) and [video tutorials](tutorials.md).

**Forta Detection Bot Development contests** are mini-hackathons where everyone is welcome to submit a detection bot and compete for prizes. Contest discussion, support, and announcements are available on Forta’s [Discord](https://discord.gg/rsc55DqcCy).

## Rules

- You will find two challenges listed below. Each challenge has a specific security concern that a Forta detection bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on Forta Explorer.
- Only the first **ten (10) QUALIFIED** submissions to each challenge that meet the requirements below will be considered.
- After ten qualified submissions are received for each challenge, we will close the form and announce it on the #contests channel at Discord. As long as submissions are open, you are welcome to build and submit detection bots for all challenges!
- All developers that submit a qualifying detection bot will receive a Forta NFT.
- Cash prizes will be awarded to the winner, runner-up and third place of each of the two challenges
    - **1st place will receive $3,000 in USDC and a unique Forta NFT.**
    - **Runner up will receive $1,500 in USDC and a unique Forta NFT.**
    - **Third place will receive $500 in USDC and a unique Forta NFT.**
- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with a link of your bot on Github.
- This contest will run from April 27th through May 11th, after which no further submissions will be considered.
- Winners will be chosen by a panel of detection bot reviewers from Limechain, and will be announced on May 18th.

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

1. **Monitor unusual high gas usage**

    Detection bots so far are alerting on high gas usage. However, gas changes over time (based on block congestion, which adjusts the base fee) and also may have a different baseline depending on the protocol (e.g. OpenSea gas usage may be generally higher than Uniswap’s)

    Goal of the bot is to alert on unusual high gas usage for a specific protocol. As such, bot will need to maintain a list of baselines for a set of contract addresses. This should not be hard coded, but dynamically generated. 

    It’s recommended that you take a look at time series analysis taking into account seasonality (remember detection bots can be authored in Python, which have a slew of libraries). Sensitivity of alerts should be configurable.

    The bot should operate on all Forta supported chains (if applicable).

    An example set of transactions can be found in the Ronin hack e.g. the chart below shows the priority fee gas for the Ronin bridge.

    ![Ronin gas usage](roningasusage.png)

    <br/><br/>
    - Winner: **soptq**
    - Winning bot: [https://explorer.forta.network/agent/0xe2786...4555](https://explorer.forta.network/agent/0xe27867c40008e0e3533d6dba7d3c1f26a61a3923bc016747d131f868f8f34555)
    - 2nd place: **kovart**
    - 2nd place bot: [https://explorer.forta.network/agent/0x3054...13ed](https://explorer.forta.network/agent/0x30547600c8b10757a559fc94a124cc27e560c8fe3af66087d8a8fadb309513ed)
    - 3rd place: **hex.marc**

2. **Monitor unusual price changes**

    DeFi often relies on on-chain oracles. Some of these - if liquidity is low - can be easily manipulated driving prices up/down to subsequently perform actions that drain funds.

    The goal of this detection bot is to identify significant price swings using time series analysis. As such, the bot will need to maintain a list of baselines for each price feed for the top 5 major price feed providers. This should not be hard coded, but dynamically generated. Sensitivity of alerts should be configurable.

    The bot should operate on all Forta supported chains (if applicable).

    An example set of transactions can be found in the Beanstalk hack e.g. the chart below shows the price manipulation of the ETH/INV price ([https://etherscan.io/dex/sushiswap/0x328dfd0139e26cb0fef7b0742b49b0fe4325f821](https://etherscan.io/dex/sushiswap/0x328dfd0139e26cb0fef7b0742b49b0fe4325f821) on April 2nd 2022).

    ![Inverse DAO price chart](inversedao.png)

    <br/><br/>
    - Winner: **vvlovsky**
    - Winning bot: [https://explorer.forta.network/agent/0xe2786...4555](https://explorer.forta.network/agent/0xe27867c40008e0e3533d6dba7d3c1f26a61a3923bc016747d131f868f8f34555)
    - 2nd place: **khayalievartur**