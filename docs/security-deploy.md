## Security - Deployment & Smart Contracts

The Foundation has required deployment through GitHub CI and OpenZeppelin's Defender product. For off-chain assets, critical pull requests must go through a required review that upon the merge are gated by successful tests, node scanner software is gated through a state update in the ScannerNodeVersion contract, and smart contract deployments/changes are handled through OpenZeppelin’s Defender product and relayers and are controlled by multisigs. This process ensures that the Forta Network cannot be changed, even in the event of a security breach by an individual involved in any of the development processes.

Lastly, most of the contracts in the Forta Network are [upgradeable](https://docs.openzeppelin.com/contracts/4.x/upgradeable). Therefore, if you are going to interact with an Upgradeable contract, **always use the Proxy address**.


### Multi-Sig
Forta is managed through three main Gnosis Safe Multi Sig contracts: 

- [0xC0eb11fBC755D31c6FECEaAc8760ddCb88C64fE1](https://etherscan.io/address/0xC0eb11fBC755D31c6FECEaAc8760ddCb88C64fE1) (Ethereum mainnet). 4/7 controlled by the [Council members](https://gov.forta.network/t/forta-proposal-permissionless-launch-fp-1/202/7)
- [0x30ceaeC1d8Ed347B91d45077721c309242db3D6d](https://polygonscan.com/address/0x30ceaeC1d8Ed347B91d45077721c309242db3D6d) (Polygon mainnet). 4/7 controlled by the [Council members](https://gov.forta.network/t/forta-proposal-permissionless-launch-fp-1/202/7)
- [0xd1d4FaFd400fCD643132bb7eAF7682eE97E09C3e](https://polygonscan.com/address/0xd1d4FaFd400fCD643132bb7eAF7682eE97E09C3e) (Polygon mainnet). The Council members may delegate certain roles and corresponding signing authority. Currently, administrative roles have been delegated to a 3/9 multisig with members of the Foundation staff and certain members of the original core development team.

The Council multisigs have the following roles:

**Ethereum Mainnet**

- Forta Token (0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29): ADMIN_ROLE

**Polygon Mainnet**

- Forta Token (Bridged) (0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1): ADMIN_ROLE
- Access (0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3): DEFAULT_ADMIN_ROLE, AGENT_ADMIN_ROLE, ENS_MANAGER_ROLE, SCANNER_ADMIN_ROLE, SCANNER_VERSION_ROLE, SLASHER_ROLE, STAKING_ADMIN_ROLE, UPGRADER_ROLE

The administrative multisig has the following roles:

**Polygon Mainnet**

- Access (0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3): AGENT_ADMIN_ROLE, DISPATCHER_ROLE, ENS_MANAGER_ROLE, SCANNER_POOL_ADMIN_ROLE, SCANNER_VERSION_ROLE, SLASHER_ROLE, SWEEPER_ROLE, UPGRADER_ROLE

### Roles

Complete list of roles with a description:

- Forta Token (0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29):
    - ADMIN_ROLE: General admin role granted to account with ability to set ENS and upgrade contract.
    - MINTER_ROLE: Role granted to account with the access to mint more FORT tokens.
- Forta Token (Bridged) (0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1):
    - ADMIN_ROLE: General admin role granted to account with ability to set ENS and upgrade contract.
- Access (0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3):
    - DEFAULT_ADMIN_ROLE: General admin role that is set during the initialization of the Access contract. Most notable ability is to grant new roles to other accounts and/or contracts.
    - ENS_MANAGER_ROLE: Role granted to an account with the ability to set ENS reverse registration.
    - UPGRADER_ROLE: Role granted to an account with the ability to upgrade a proxy to use a new implementation.
    - AGENT_ADMIN_ROLE: Role granted to account with the ability to set the bot stake threshold, activate frontrunning protection, and enable and/or disable a given bot.
    - SCANNER_ADMIN_ROLE: Role granted to account with the ability to set the stake threshold for a given chain, and enable and/or disable a given scanner.
    - SCANNER_POOL_ADMIN_ROLE: Role granted to account with the ability to set the scanner pool stake parameters, set scanner node registration delay, and update the amount of enabled scanners in a pool.
    - SCANNER_2_SCANNER_POOL_MIGRATOR_ROLE: Role granted to ScannerToScannerPoolMigration contract to be able to de-register scanners from the previous system and register scanner pools under delegated staking.
    - DISPATCHER_ROLE: Role granted to account with ability to assign and/or unassign bots to scanner nodes.
    - MIGRATION_EXECUTOR_ROLE: Role granted to account with ability to migrate scanners. Role granted to a Forta controlled EOA, [0xe9a105b355A14D11eA3468410Dfe6B31998C8384](https://polygonscan.com/address/0xe9a105b355a14d11ea3468410dfe6b31998c8384).
    - SLASHER_ROLE: Role granted to the SlashingController contract to slash a stake subject.
    - SWEEPER_ROLE: Role granted to account with ability to transfer out tokens mistakenly sent to the staking contract.
    - REWARDER_ROLE: Role granted to account with ability to reward scanner pools. Role granted to a Forta controlled EOA, [0x15d3c7e811582Be09Bb8673cD603Bb2F22D1e47B](https://polygonscan.com/address/0x15d3c7e811582Be09Bb8673cD603Bb2F22D1e47B).
    - SLASHING_ARBITER_ROLE: Role granted to account with ability to execute various actions in the slashing process. Role granted to the 2/3 Arbiter multisig, [0x044f6Db7F0ba9e5F0AccD797E2AD5B1bA4E1E853](https://polygonscan.com/address/0x044f6Db7F0ba9e5F0AccD797E2AD5B1bA4E1E853). Slashing detailed further [here](https://docs.forta.network/en/latest/slashing-policy/).
    - STAKING_CONTRACT_ROLE: Role granted to the Staking contract with the ability to increase or decrease a subject’s stake allocation.
    - STAKING_ADMIN_ROLE: Role granted to account with the ability to set the percentage of a delegator’s stake than can be slashed.
    - ALLOCATOR_CONTRACT_ROLE: Role granted to the Allocator contract with the ability to increase and/or decrease a subject's allocated stake amount for rewards calculation.
    - SCANNER_VERSION_ROLE: Role granted to an account with the ability to set a new scanner node version.
    - SCANNER_BETA_VERSION_ROLE: Role granted to an account with the ability to set a new scanner node beta version.

### Contract Administration
Forta contracts are managed through [OpenZeppelin's Defender product](https://defender.openzeppelin.com/) utilizing relays to manage smart contract deployment and maintenance.

### Deployed Smart Contract Addresses

Forta Network uses smart contracts to coordinate registration and ownership of Scanner Nodes and Detection Bots (referred to by their former name of Agents in this release), the assignments of Bots and Scanners, the accepted Scanner Node software version and the economic safety mechanisms of the network via the ERC20 FORT Token.

To learn more, read the [smart contracts GitHub repo](https://github.com/forta-network/forta-contracts), [the documentation for the contracts](smart-contracts.md), or the smart contract architecture diagram in the [_Design_ page](security-design.md).


**Ethereum Mainnet**

| Name | Proxy | Implementation |
| -- | -- | -- |
| Forta Token | [0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29](https://etherscan.io/address/0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29) | [0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a](https://etherscan.io/address/0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a) |

**Polygon**

| Name | Proxy | Implementation |
| ----- | ----- | -------------- |
| Access | [0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3](https://polygonscan.com/address/0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3) | [0x739707848131F41aCd1d78A56FE0eA02052811Df](https://polygonscan.com/address/0x739707848131F41aCd1d78A56FE0eA02052811Df) |
| Agents (Detection Bots) | [0x61447385B019187daa48e91c55c02AF1F1f3F863](https://polygonscan.com/address/0x61447385B019187daa48e91c55c02AF1F1f3F863) | [0xE7e6c9A579eF43FfE629F9B99a9e4585ae69ED9c](https://polygonscan.com/address/0xE7e6c9A579eF43FfE629F9B99a9e4585ae69ED9c) |
| Scanners **(Deprecated)** | [0xbF2920129f83d75DeC95D97A879942cCe3DcD387](https://polygonscan.com/address/0xbF2920129f83d75DeC95D97A879942cCe3DcD387) | [0x75c46283dE6b08bE4bb4425b94aC338f2802e3B0](https://polygonscan.com/address/0x75c46283dE6b08bE4bb4425b94aC338f2802e3B0) |
| Scanner Pools | [0x90FF9C193D6714E0e7a923b2Bd481Fb73FEC731d](https://polygonscan.com/address/0x90FF9C193D6714E0e7a923b2Bd481Fb73FEC731d) | [0x92FA117c7c071cC11b544931c46c9e3096d6FcB1](https://polygonscan.com/address/0x92FA117c7c071cC11b544931c46c9e3096d6FcB1) |
| Dispatch | [0xd46832F3f8EA8bDEFe5316696c0364F01b31a573](https://polygonscan.com/address/0xd46832F3f8EA8bDEFe5316696c0364F01b31a573) | [0xB5F1A9C329924Fe8203A91aa891182d4E331fF0A](https://polygonscan.com/address/0xB5F1A9C329924Fe8203A91aa891182d4E331fF0A) |
| Forwarder | -- | [0x356A8ee5D3bCc183c2c7853F11D19f4C7622396F](https://polygonscan.com/address/0x356A8ee5D3bCc183c2c7853F11D19f4C7622396F) |
| Forta Token (Bridged) | [0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1](https://polygonscan.com/address/0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1) | [0xd6b3139108e271c812acc6ffebad28e935d61e24](https://polygonscan.com/address/0xd6b3139108e271c812acc6ffebad28e935d61e24) |
| Staking | [0xd2863157539b1D11F39ce23fC4834B62082F6874](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874) | [0xeA359707f17Aeb000c9385b4Bfd1cC7be62d4Bc7](https://polygonscan.com/address/0xeA359707f17Aeb000c9385b4Bfd1cC7be62d4Bc7) |
| StakeSubjectGateway | [0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a](https://polygonscan.com/address/0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a) | [0x6C85A754F9c79178D9701e91C29C995f227D7551](https://polygonscan.com/address/0x6C85A754F9c79178D9701e91C29C995f227D7551) |
| ScannerNodeVersion | [0x4720c872425876B6f4b4E9130CDef667aDE553b2](https://polygonscan.com/address/0x4720c872425876B6f4b4E9130CDef667aDE553b2) | [0x61dE69E421d50F7290373fc38751f694ff1e1984](https://polygonscan.com/address/0x61dE69E421d50F7290373fc38751f694ff1e1984) |
| SlashingController | [0x6927C25ff30ed86F86A863d987590A1d77509bDb](https://polygonscan.com/address/0x6927C25ff30ed86F86A863d987590A1d77509bDb) | [0x525a90638330473bE7bB756465ca443a03b53068](https://polygonscan.com/address/0x525a90638330473bE7bB756465ca443a03b53068) |
| StakeAllocator | [0x5B73756e637A77Fa52e5Ce71EC6189A4C775c6FA](https://polygonscan.com/address/0x5B73756e637A77Fa52e5Ce71EC6189A4C775c6FA) | [0x8A9B40aE0cCa4f602CA3E4f68114b69C794571F0](https://polygonscan.com/address/0x8A9B40aE0cCa4f602CA3E4f68114b69C794571F0) |
| RewardsDistributor | [0xf7239f26b79145297737166b0c66f4919af9c507](https://polygonscan.com/address/0xf7239f26b79145297737166b0c66f4919af9c507) | [0xfc3642038a312Ff983BdBC1F5C900eEC20AaFfB6](https://polygonscan.com/address/0xfc3642038a312Ff983BdBC1F5C900eEC20AaFfB6) |
| ScannerToScannerPoolMigration | [0x1365fa3FE7F52db912daBc8e439f0843461fee16](https://polygonscan.com/address/0x1365fa3FE7F52db912daBc8e439f0843461fee16) | [0xAb94300F91DA64637C94b6c4159AC805d23C7cF8](https://polygonscan.com/address/0xAb94300F91DA64637C94b6c4159AC805d23C7cF8) |
| General Plan | [0x4e0c80548e67a6e05464e540729222eb9812444d](https://polygonscan.com/address/0x4e0c80548e67a6e05464e540729222eb9812444d) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |
| Scam Detector Plan | [0x54089510aec879ca42e08bc4b166be8362b56bb2](https://polygonscan.com/address/0x54089510aec879ca42e08bc4b166be8362b56bb2) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |
| Rug Pull Detector Plan | [0x525d8d73f11a8586482f4f74c105d9d8b7cf73da](https://polygonscan.com/address/0x525d8d73f11a8586482f4f74c105d9d8b7cf73da) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |
| Spam Detector Plan | [0x6453379cbc14f7a277319b6c8b7577ae78524968](https://polygonscan.com/address/0x6453379cbc14f7a277319b6c8b7577ae78524968) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |

**Goerli Testnet**

| Name | Proxy | Implementation |
| -- | -- | -- |
| Forta Token | [0x848F1fF1fa76Dc882Ca2F3521265ba3F27e42158](https://goerli.etherscan.io/address/0x848f1ff1fa76dc882ca2f3521265ba3f27e42158) | [0x86f09B8B8d0315Cca71a89953Aa3f7982a122eAd](https://goerli.etherscan.io/address/0x86f09B8B8d0315Cca71a89953Aa3f7982a122eAd) |

**Mumbai Testnet**

| Name | Proxy | Implementation |
| ----- | ----- | -------------- |
| Access | [0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64](https://mumbai.polygonscan.com/address/0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64) | [0x5Da21607E9e2bCA241E0EA46e27cea3bB8404505](https://mumbai.polygonscan.com/address/0x5Da21607E9e2bCA241E0EA46e27cea3bB8404505) |
| Agents (Detection Bots) | [0x4519Eaeb9A5c1a9d870Fe35452E54AD04E6e8428](https://mumbai.polygonscan.com/address/0x4519Eaeb9A5c1a9d870Fe35452E54AD04E6e8428) | [0xD25Fd5B722606d08A5DdCD00e969513d06d98d89](https://mumbai.polygonscan.com/address/0xD25Fd5B722606d08A5DdCD00e969513d06d98d89) |
| Scanners **(Deprecated)** | [0x569c785b4744e582c65a12827726fc03c8d08a4a](https://mumbai.polygonscan.com/address/0x569c785b4744e582c65a12827726fc03c8d08a4a) | [0x0FF4A7603EB4FB7A5c8D4cd25199046942fb968B](https://mumbai.polygonscan.com/address/0x0FF4A7603EB4FB7A5c8D4cd25199046942fb968B) |
| Scanner Pools | [0x9BBEBf9CB94666464D8a5978363B4943D36A05E4](https://mumbai.polygonscan.com/address/0x9BBEBf9CB94666464D8a5978363B4943D36A05E4) | [0x72eaaBB3f5908D5Ac4Fce00285B5af120BA3EcAC](https://mumbai.polygonscan.com/address/0x72eaaBB3f5908D5Ac4Fce00285B5af120BA3EcAC) |
| Dispatch | [0x4B71C61400F5da35518DE10dEcd21D1Aa4d7f283](https://mumbai.polygonscan.com/address/0x4B71C61400F5da35518DE10dEcd21D1Aa4d7f283) | [0x0ed550214869C3c3D5C05b97A8Bb9388125C4919](https://mumbai.polygonscan.com/address/0x0ed550214869C3c3D5C05b97A8Bb9388125C4919) |
| Forwarder | -- | [0x4E29Cea6D64be860f5eAba110686DcB585f393D6](https://mumbai.polygonscan.com/address/0x4E29Cea6D64be860f5eAba110686DcB585f393D6) |
| Forta Token (Bridged) | [0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3](https://mumbai.polygonscan.com/address/0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3) | [0x21b1b0f8e9182c92c2a81f43f305ce25994d9d57](https://mumbai.polygonscan.com/address/0x21b1b0f8e9182c92c2a81f43f305ce25994d9d57) |
| Staking | [0x64d5192F03bD98dB1De2AA8B4abAC5419eaC32CE](https://mumbai.polygonscan.com/address/0x64d5192F03bD98dB1De2AA8B4abAC5419eaC32CE) | [0x8fd9d47e80f1d711aA97C4926e5E7CB3462455E8](https://mumbai.polygonscan.com/address/0x8fd9d47e80f1d711aA97C4926e5E7CB3462455E8) |
| StakeSubjectGateway | [0x02304eC24ba2996a83F595D7cf80e5571a406EFA](https://mumbai.polygonscan.com/address/0x02304eC24ba2996a83F595D7cf80e5571a406EFA) | [0x40998890c1ad5B22CBe2deB9671E9df91b79dd16](https://mumbai.polygonscan.com/address/0x40998890c1ad5B22CBe2deB9671E9df91b79dd16) |
| ScannerNodeVersion | [0x67D4d0654D6Ba56d41a7A6Ec8f33430c3d778201](https://mumbai.polygonscan.com/address/0x67D4d0654D6Ba56d41a7A6Ec8f33430c3d778201) | [0xAA42d92242eA0a6195452C6B64B4Dc5D4282e0a5](https://mumbai.polygonscan.com/address/0xAA42d92242eA0a6195452C6B64B4Dc5D4282e0a5) |
| SlashingController | [0x9bc159c97fA36282F0362C56586BA16BeB9F656a](https://mumbai.polygonscan.com/address/0x9bc159c97fA36282F0362C56586BA16BeB9F656a) | [0xC43E5C075e4081209F337f0431D8c488Cd61B522](https://mumbai.polygonscan.com/address/0xC43E5C075e4081209F337f0431D8c488Cd61B522) |
| StakeAllocator | [0x698A6400dE3865fC9E8A6dB22302AAb3372Cebd9](https://mumbai.polygonscan.com/address/0x698A6400dE3865fC9E8A6dB22302AAb3372Cebd9) | [0x70FBC65e20DFe5ACDA5665f98A6CdA98800cC637](https://mumbai.polygonscan.com/address/0x70FBC65e20DFe5ACDA5665f98A6CdA98800cC637) |
| RewardsDistributor | [0x404afc59Cacd74A28d0D5651460Cc950b42FAf08](https://mumbai.polygonscan.com/address/0x404afc59Cacd74A28d0D5651460Cc950b42FAf08) | [0x09803F257AB3D8a390837640ED9D9F4Eb22c1453](https://mumbai.polygonscan.com/address/0x09803F257AB3D8a390837640ED9D9F4Eb22c1453) |
| ScannerToScannerPoolMigration | [0xd6F0cDcc0200B5582784973873801A4Ec8712423](https://mumbai.polygonscan.com/address/0xd6F0cDcc0200B5582784973873801A4Ec8712423) | [0x84D8F29994983768d698C71f6816F61B6a42DE49](https://mumbai.polygonscan.com/address/0x84D8F29994983768d698C71f6816F61B6a42DE49) |

**Pause Functionality**

Currently, Forta does not implement _Pause_ functionality in its smart contracts. In lieu of _Pause_ functionality, the contracts’ upgradability could be utilized to pause the contracts in the event of responding to an incident. Additionally, Forta does not incorporate the usage of Oracles, and therefore has no risk of Oracle manipulation attacks.

**Timelock**

Forta has no implementation of a _Timelock_. Since changes to the contracts require an execution from the 4/7 Forta Council multisig, this process fulfills the need of a _Timelock_’s functionality.

### Forta On-Chain Monitoring
Forta on-chain activity is monitored by [Forta Detection Bots](https://app.forta.network/bots/forta) and feeds into Forta Network's incident response process. The following detection bots were developed specifically for the Forta smart contracts. The code is available on [GitHub](https://github.com/LimeChain/forta-bots).

- [Forta Access Control Role Changed](https://app.forta.network/bot/0x8e5cfc52606ac22590cf872711f81df8a0d81e3e110dee4f3fb00fafadc962c2)
- [Forta Access Manager - Router Updated](https://app.forta.network/bot/0xacd82110ea6551078e40b58cebd83b9f29c09b5cf85200a5ec9244e374035e6c)
- [Forta Admin Bot Scanner Disable](https://app.forta.network/bot/0x15022cd09034e6247336e5937f2c738d572d5f42a9c3fd53551f8c6c1766994b)
- [Forta Agent Updated](https://app.forta.network/bot/0x2f2d455136d8584088e2c5466d5c7b5a77f95ef40dca3e8c1ba0990b363c24e9)
- [Forta Agents Linked](https://app.forta.network/bot/0x9e1e98b397bcbe38e1604f03f36e91aeb1e9a2a719d5a68dc7ae327d2bf33ca8)
- [Forta Core Monitoring](https://app.forta.network/bot/0x6dbd2e5c9e7c2261c6d36d7f8a2bd66974d8917b311dff1738589e6d6a1fced2)
- [Forta Emitting Upgraded](https://app.forta.network/bot/0x04feb3b868f738cfac42faa29a24179ddd25018be8e09c5ef05655c7cfd69522)
- [Forta Mint Mainnet](https://app.forta.network/bot/0xd76cb2ce08c467ad328caa9582bfc3c226964ae8dd922ee7ae0bcdb9e8b4f5ce)
- [Forta Scanner Node Software Updated](https://app.forta.network/bot/0x33bb8d279150938d062ce3d98dea48514828971611a5b9a64789576bb0a0152c)
- [Forta Staking Events](https://app.forta.network/bot/0x83fad460c7e30ad0a4ec8f082fbd068edfe6e0f02cacd4e136120b201ed83a05)
- [Forta Staking Parameters](https://app.forta.network/bot/0x16d30698283b688f7266b2fcd9d6c5edc8e0551a212edcd2d010e54a8ffcf0ba)
- [Forta High Number Of Bot Deployments](https://app.forta.network/bot/0xef163df6a354c8166d51eba7fb3b16bfc21e1b7be414fa0fe5c19e53794f65de)
- [Forta Routing Updated](https://app.forta.network/bot/0xef163df6a354c8166d51eba7fb3b16bfc21e1b7be414fa0fe5c19e53794f65de)
- [Forta Stake Controller Changed](https://app.forta.network/bot/0xc44bf7b5f04444e8939ed0c29a90fc772baf3df6d2abb3edbd03adc31e9b5cf6)
- [Forta Stake Threshold Changed](https://app.forta.network/bot/0xe600b501cad9eae7e6885721cb44d0d79e98d7413f5cf8b75f848692ebb635ad)
- [Forta Token Role Changes](https://app.forta.network/bot/0xe6eebc466ba3dc71bf701719f8012bd9e1c80bfa63224684271be80ea2f93338)
- [Forta Whitelist Disabling](https://app.forta.network/bot/0x11b5412d0d56b1b7bec8b15f18e8976416b93482961c50cf1161fbf9c4445c70)

Forta is also monitored by the bots in the [Threat Detection Kits](https://docs.forta.network/en/latest/threat-detection-kits/).

### Forta Off-Chain Monitoring
Lastly, several operational monitors exist around the performance of the network, such as latency, API usage, deployments, etc. 





