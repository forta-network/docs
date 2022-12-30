**Forta is thrilled to announce that we’ve partnered with OpenZeppelin to bring you our third bot development contest!**

Submit your entries for this contest [HERE](https://docs.google.com/forms/d/e/1FAIpQLSfTZuQBfUrdJI6b-_lLaBC2J6rcc5_sIesZHL3R4FdJkGD73A/viewform?usp=sf_link).

**Forta bots** are code scripts written in Python or Javascript that trigger alerts when certain
conditions are met. The best bots trigger alerts when specific conditions indicate that a potential hack or exploit may be taking place and help end users prevent them. For more information on creating your first bot, check out our [Quickstart Guide](quickstart.md).

**Forta bot developer contests** are mini-hackathons where anyone is able to submit a bot and be rewarded in NFTs, and crypto!

Contest discussion group and announcements are available on our [Discord here](https://discord.com/invite/tpWYdjyc6Q).

You will find two challenges listed below. Each challenge has a specific security concern that a Forta bot monitors for. Please submit your completed bots to the contest judges through the Google form linked above and on [connect.forta.network](https://connect.forta.network/).

- Only the first **twenty five (25) QUALIFIED** submissions to each challenge that meet the challenge requirements below will be considered.

- After twenty five qualified submissions are received for an individual challenge, we will close the challenge and announce it in the #agent-development-contest channel in Discord! As long as submissions are still open, you are welcome to build and submit bots for both challenges!

- **All** developers that submit a qualifying bot will receive a Forta NFT.

- Cash prizes will be awarded to the 1st, 2nd, and 3rd place bots in each challenge.
    - **1st place will receive $1500 in USDC and a unique Winners Forta NFT.**
    - **2nd place will receive $750 in USDC and a unique Winners Forta NFT.**
    - **3rd place will receive $250 in USDC and a unique Winners Forta NFT.**

- To be eligible for a prize, you will be asked to submit a valid email and discord username through the Google form, along with your bot.

- This contest will run from November 18th through December 2nd, after which no further submissions will be considered. Winners will be chosen by a panel of bot reviewers from Forta community member Nethermind, and will be announced on December 4th.

- For any questions, please contact a Forta Moderator on [Discord](https://discord.com/invite/tpWYdjyc6Q).

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

Check out [OpenZeppelin.com](https://openzeppelin.com/) for more information on our sponsor!

## Challenges

1. **TimelockController**

    The first vulnerability concerns the [TimelockController](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.3/contracts/governance/TimelockController.sol) contract.

    By exploiting this vulnerability, someone with the executor role could escalate privileges and become admin of the timelock. In the worst scenario, if the executor role was not granted to a set of trusted accounts but left "open" unrestricted, an arbitrary attacker could take full control of the timelock.

    For a detailed description of the issue refer to the [post-mortem](https://forum.openzeppelin.com/t/timelockcontroller-vulnerability-post-mortem/14958).

    The basic way that the exploit can be detected using a Forta bot is based on the particular sequence of events (logs) that it emits. As part of the execution of a batch proposal, at least the following things need to happen in this order: first the timelock delay is set to 0 emitting the events `MinDelayChange(\_, 0)` and `CallExecuted(id, ...)`, then this proposal is scheduled emitting the event `CallScheduled(id, ...)` where the id is the same as seen in the previous event. Observe that for the same proposal id `Executed` is seen before `Scheduled`, which is a violation of the expected lifecycle of a proposal. If this is observed, an alert should be generated.
    
    The above rules identify this particular exploit, but as a bonus challenge it would be interesting to alert more generally on a potential privilege escalation situation by monitoring for batch proposals where an executor becomes a proposer or admin, all but one of the proposers and executors are removed, etcetera. Other ideas are welcome.

    Note: This attack has not, as far as we know, been executed on chain.

    - Winner: **@kovart#3924**
    - Winning bot: [https://github.com/kovart3/contest-3-1](https://github.com/kovart3/contest-3-1)
    - 2nd Place: **@vvlovsky#6572**
    - 2nd Place bot: [https://github.com/VVlovsky/TimelockController-Exploit-Agent](https://github.com/VVlovsky/TimelockController-Exploit-Agent)
    - 3rd Place: **@Roderick#4932**
    - 3rd Place bot: [https://github.com/rodrigo-pino/timelock-agent-ts](https://github.com/rodrigo-pino/timelock-agent-ts)

2. **UUPSUpgradeable**
    
    The second vulnerability concerns the [UUPSUpgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.3/contracts/proxy/utils/UUPSUpgradeable.sol) contract.

    By exploiting this vulnerability, an attacker could trigger a selfdestruct of a UUPS implementation contract, leaving a proxy contract permanently broken.

    For a detailed description of the issue refer to the [post-mortem](https://forum.openzeppelin.com/t/uupsupgradeable-vulnerability-post-mortem/15680).

    In order to detect an attack, a bot needs to find `Upgraded(address)` events and then retrieve the code of the contract that emitted the event. If the code is empty, this means that the contract was selfdestructed, and an alert should be emitted.

    - Winner: **@karmacoma#4155**
    - Winning bot: [https://github.com/karmacoma-eth/forta-uups-agent](https://github.com/karmacoma-eth/forta-uups-agent)
    - 2nd Place: **@kovart#3924**
    - 2nd Place bot: [https://github.com/kovart3/contest-3-2](https://github.com/kovart3/contest-3-2)
    - 3rd Place: **@nfmelendez#2069**
    - 3rd Place bot: [https://github.com/nfmelendez/oz-uupsupgradeable-contract-agent](https://github.com/nfmelendez/oz-uupsupgradeable-contract-agent)
