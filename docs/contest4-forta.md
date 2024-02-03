**Forta is thrilled to announce the last bot development contest of 2021!**

Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/e/1FAIpQLSea63sMHQA7rlBOssTxRRrRtTMK48Texj_K4H2ohYkVsugjPA/viewform).

**Forta bots** are code scripts written in Python, Javascript and Typescript that trigger alerts when certain
conditions are met. The best bots trigger alerts when specific conditions indicate that a potential hack or exploit may be taking place and help end users prevent them. For more information on creating your first bot, check out our [quickstart guide](https://docs.forta.network/en/latest/quickstart/) and [video tutorials](https://docs.forta.network/en/latest/tutorials/).

**Forta bot developer contests** are mini-hackathons where anyone is able to submit a bot and be rewarded in NFTs, and Crypto!

Contest discussion group and announcements are available on our [Discord](https://discord.gg/KACdTEutQq).

## Rules

- You will find two challenges listed below. Each challenge has a specific security concern that a Forta bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on connect.forta.network.

- Only the first **twenty five (25) QUALIFIED** submissions to each challenge that meet the challenge requirements below will be considered.

- After twenty five qualified submissions are received for a challenge, we will close the challenge and announce it in the #agent-dev-contests channel in Discord. As long as submissions are open, you are welcome to build and submit bots for both challenges!

- **All** developers that submit a qualifying bot will receive a Forta NFT.

- Cash prizes will be awarded to the 1st, 2nd, and 3rd place bots in each challenge.
    - **1st place will receive $1,500 in USDC and a unique Forta NFT.**
    - **2nd place will receive $750 in USDC and a unique Forta NFT.**
    - **3rd place will receive $250 in USDC and a unique Forta NFT.**

- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with your bot.

- This contest will run from December 17th through December 31st, after which no further submissions will be considered. Winners will be chosen by a panel of bot reviewers from Forta community member Arbitrary Execution, and will be announced on January 7th.

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

## Challenges

1. **Influencing Governance Proposals**

    Governance proposals allow protocols to change to meet the evolving requirements of the DeFi ecosystem. Voting on these proposals occurs over a limited period of time where only those accounts that have been delegated votes may cast those votes in favor of or against the proposal. There is also a check to determine whether the delegated votes existed in the block number when the proposal was submitted.

    This challenge is to create a bot that will monitor proposals to the Uniswap Governance and the votes cast on those proposals. A finding should be created if an address casting a vote had a significant change in UNI balance in the 100 blocks leading up to the proposal starting block number. 

    Optional, but recommended: Tracking balances in the 100 blocks after the vote is cast and creating a finding if the balance decreases.

    - *GovernorBravo Contract*
        - [Github](https://github.com/gettty/uniswap-gov/blob/main/contracts/GovernorBravoDelegate.sol)
        - [Deployed Contract (Proxy)](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3)

    - *Uni Token Contract*
        - [Github](https://github.com/Uniswap/governance/blob/master/contracts/Uni.sol)
        - [Deployed](https://etherscan.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984)
<br/><br/>
    - Winner: **vvlovsky**
    - Winning bot: [https://github.com/VVlovsky/Influencing-Governance-Proposals-Agent](https://github.com/VVlovsky/Influencing-Governance-Proposals-Agent)
    - 2nd place: **Miguel Martinez**
    - 2nd place bot: [https://github.com/miguelmtzinf/forta-uniswap-governance-influence](https://github.com/miguelmtzinf/forta-uniswap-governance-influence)
    - 3rd place: **kovart**
    - 3rd place bot: [https://github.com/kovart/forta-agents/tree/main/uniswap/governance-votes](https://github.com/kovart/forta-agents/tree/main/uniswap/governance-votes)

2. **Evidence of Phishing**
   
    Users approving token transfers to an externally owned address (EOA) may be a behavior indicative of a phishing attack.
    
    This challenge is to create a bot that will detect when a high number (e.g. 10 or more) of EOAs call the `approve()` or `increaseAllowance()` methods for the same target EOA over an extend period of time (e.g. 6 hours ~ 1600 blocks). The finding should include the affected addresses, the alleged attacker's address, and the addresses and amounts of tokens involved. Be certain to filter out smart contracts (i.e. `approve()` called by a smart contract or a smart contract that is the designated spender for an `approve()` call) and EOAs for any centralized exchanges (e.g. FTX exchange: 0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2).
    
    The bot should trigger when run against the following block range: 13650638 to 13652198
    
    - ERC20 Reference
        - [`approve()`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-)
        - [`increaseAllowance()`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-increaseAllowance-address-uint256-)

    - Example phishing attacks
        - [BadgerDAO](https://rekt.news/badger-rekt/)
<br/><br/>
    - Winner: **kovart**
    - Winning bot: [https://github.com/kovart/forta-agents/tree/main/common/erc20-approve](https://github.com/kovart/forta-agents/tree/main/common/erc20-approve)
    - 2nd place: **vvlovsky**
    - 2nd place bot: [https://github.com/VVlovsky/Evidence-of-Phishing-Agent](https://github.com/VVlovsky/Evidence-of-Phishing-Agent)
    - 3rd place: **Rodrigo Pino**
    - 3rd place bot: [https://github.com/rodrigo-pino/forta-phishing-agent-ts](https://github.com/rodrigo-pino/forta-phishing-agent-ts)
