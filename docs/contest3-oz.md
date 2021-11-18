**Forta is thrilled to announce that we’ve partnered with OpenZeppelin to bring you our third Agent Development contest!**

Submit your entries for this contest [HERE](https://docs.google.com/forms/d/e/1FAIpQLSfTZuQBfUrdJI6b-_lLaBC2J6rcc5_sIesZHL3R4FdJkGD73A/viewform?usp=sf_link).

**Forta Agents** are code scripts written in Python or Javascript that trigger alerts when certain
conditions are met. The best Agents trigger alerts when specific conditions indicate that a potential hack or exploit may be taking place and help end users prevent them. For more information on creating your first Agent, check out our [Quickstart Guide](quickstart.md).

**Forta Agent Developer Contests** are mini-hackathons where anyone is able to submit an Agent and be rewarded in NFTs, and crypto!

Contest discussion group and announcements are available on our [Discord here](https://discord.gg/rsc55DqcCy).

You will find two challenges listed below. Each challenge has a specific security concern that a Forta Agent monitors for. Please submit your completed agents to the contest judges through the Google form linked above and on [connect.forta.network](https://connect.forta.network/).

- Only the first **twenty five (25) QUALIFIED** submissions to each challenge that meet the challenge requirements below will be considered.

- After twenty five qualified submissions are received for an individual challenge, we will close the challenge and announce it in the #agent-development-contest channel in Discord! As long as submissions are still open, you are welcome to build and submit Agents for both challenges!

- **All** developers that submit a qualifying agent will receive a Forta NFT.

- Cash prizes will be awarded to the 1st, 2nd, and 3rd place Agents in each challenge.
    - **1st place will receive $1500 in USDC and a unique Winners Forta NFT.**
    - **2nd place will receive $750 in USDC and a unique Winners Forta NFT.**
    - **3rd place will receive $250 in USDC and a unique Winners Forta NFT.**

- To be eligible for a prize, you will be asked to submit a valid email and discord username through the Google form, along with your Agent.

- This contest will run from November 18th through November 25th, after which no further submissions will be considered. Winners will be chosen by a panel of agent reviewers from Forta community member Nethermind, and will be announced on November 29th.

- For any questions, please contact a Forta Moderator on [Discord](https://discord.gg/rsc55DqcCy).

**QUALIFIED AGENT** best practices:

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
    - Does the README.md contain real blocks/transactions that will trigger alerts?
    - Does the package.json contain an appropriate name and description?

Check out [OpenZeppelin.com](https://openzeppelin.com/) for more information on our sponsor!

## Challenges

1. **TimelockController**

    The first vulnerability concerns the [TimelockController](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.3/contracts/governance/TimelockController.sol) contract.

    By exploiting this vulnerability, someone with the executor role could escalate privileges and become admin of the timelock. In the worst scenario, if the executor role was not granted to a set of trusted accounts but left "open" unrestricted, an arbitrary attacker could take full control of the timelock.

    For a detailed description of the issue refer to the [post-mortem](https://forum.openzeppelin.com/t/timelockcontroller-vulnerability-post-mortem/14958).

    The basic way that the exploit can be detected using a Forta agent is based on the particular sequence of events (logs) that it emits. As part of the execution of a batch proposal, at least the following things need to happen in this order: first the timelock delay is set to 0 emitting the events `MinDelayChange(\_, 0)` and `CallExecuted(id, ...)`, then this proposal is scheduled emitting the event `CallScheduled(id, ...)` where the id is the same as seen in the previous event. Observe that for the same proposal id `Executed` is seen before `Scheduled`, which is a violation of the expected lifecycle of a proposal. If this is observed, an alert should be generated.
    
    The above rules identify this particular exploit, but as a bonus challenge it would be interesting to alert more generally on a potential privilege escalation situation by monitoring for batch proposals where an executor becomes a proposer or admin, all but one of the proposers and executors are removed, etcetera. Other ideas are welcome.

    Note: This attack has not, as far as we know, been executed on chain.

2. **UUPSUpgradeable**
    
    The second vulnerability concerns the [UUPSUpgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.3/contracts/proxy/utils/UUPSUpgradeable.sol) contract.

    By exploiting this vulnerability, an attacker could trigger a selfdestruct of a UUPS implementation contract, leaving a proxy contract permanently broken.

    For a detailed description of the issue refer to the [post-mortem](https://forum.openzeppelin.com/t/uupsupgradeable-vulnerability-post-mortem/15680).

    In order to detect an attack, an agent needs to find `Upgraded(address)` events and then retrieve the code of the contract that emitted the event. If the code is empty, this means that the contract was selfdestructed, and an alert should be emitted.
