**Forta is thrilled to announce the last Agent Development Contest of 2021!**

Submit your entries for this contest [**HERE**](https://docs.google.com/forms/d/e/1FAIpQLSea63sMHQA7rlBOssTxRRrRtTMK48Texj_K4H2ohYkVsugjPA/viewform).

**Forta Agents** are code scripts written in Python, Javascript and Typescript that trigger alerts when certain
conditions are met. The best Agents trigger alerts when specific conditions indicate that a potential hack or exploit may be taking place and help end users prevent them. For more information on creating your first Agent, check out our [quickstart guide](https://docs.forta.network/en/latest/quickstart/) and [video tutorials](https://docs.forta.network/en/latest/tutorials/).

**Forta Agent Developer Contests** are mini-hackathons where anyone is able to submit an Agent and be rewarded in NFTs, and Crypto!

Contest discussion group and announcements are available on our [Discord](https://discord.gg/rsc55DqcCy).

## Rules

- You will find two challenges listed below. Each challenge has a specific security concern that a Forta Agent monitors for. Please submit your completed agents to the contest judges through the Google form linked above and on connect.forta.network.

- Only the first **twenty five (25) QUALIFIED** submissions to each challenge that meet the challenge requirements below will be considered.

- After twenty five qualified submissions are received for a challenge, we will close the challenge and announce it in the #agent-dev-contests channel in Discord. As long as submissions are open, you are welcome to build and submit Agents for both challenges!

- **All** developers that submit a qualifying agent will receive a Forta NFT.

- Cash prizes will be awarded to the 1st, 2nd, and 3rd place Agents in each challenge.
    - **1st place will receive $1,500 in USDC and a unique Forta NFT.**
    - **2nd place will receive $750 in USDC and a unique Forta NFT.**
    - **3rd place will receive $250 in USDC and a unique Forta NFT.**

- To be eligible for a prize, you will be asked to submit a valid email and Discord username through the Google form, along with your Agent.

- This contest will run from December 17th through December 31st, after which no further submissions will be considered. Winners will be chosen by a panel of agent reviewers from Forta community member Arbitrary Execution, and will be announced on January 7th.

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

## Challenges

1. **Influencing Governance Proposals**

    Governance proposals allow protocols to change to meet the evolving requirements of the DeFi ecosystem. Voting on these proposals occurs over a limited period of time where only those accounts that have been delegated votes may cast those votes in favor of or against the proposal. There is also a check to determine whether the delegated votes existed in the block number when the proposal was submitted.

    This challenge is to create an agent that will monitor proposals to the Uniswap Governance and the votes cast on those proposals. A finding should be created if an address casting a vote had a significant change in UNI balance in the 100 blocks leading up to the proposal starting block number.

    Optional, but recommended: Tracking balances in the 100 blocks after the vote is cast and creating a finding if the balance decreases.

    - *GovernorAlpha Contract*
        - [Github](https://github.com/Uniswap/governance/blob/master/contracts/GovernorAlpha.sol)
        - [Deployed Contract](https://etherscan.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984)

    - *Uni Token Contract*
        - [Github](https://github.com/Uniswap/governance/blob/master/contracts/Uni.sol)
        - [Deployed](https://github.com/Uniswap/governance/blob/master/contracts/Uni.sol)

2. **Evidence of Phishing**

    Users approving token transfers to an externally owned address (EOA) is a highly suspicious behavior that likely indicates a phishing attack.

    This challenge is to create an agent that will detect when a large (>10) number of EOAs call the `approve()` or `increaseAllowance()` methods for the same target EOA over one day (approximately 6000 blocks). The finding should include the affected addresses, the alleged attacker's address, and the addresses and amounts of tokens involved. Be certain to filter out smart contracts.

    - ERC20 Reference
        - [`approve()`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-)
        - [`increaseAllowance()`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-increaseAllowance-address-uint256-)

    - Example phishing attacks
        - [BadgerDAO](https://rekt.news/badger-rekt/)
