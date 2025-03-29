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
| Forta Token | [0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29](https://etherscan.io/address/0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29) | [0xc855d842ff0aF97B0D18Cc81eEcbb702EA1a0706](https://etherscan.io/address/0xc855d842ff0af97b0d18cc81eecbb702ea1a0706) |

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
| RewardsDistributor | [0xf7239f26b79145297737166b0c66f4919af9c507](https://polygonscan.com/address/0xf7239f26b79145297737166b0c66f4919af9c507) | [0x27C2E1B7ABD320459C26F90d524e9A5964c93850](https://polygonscan.com/address/0x27c2e1b7abd320459c26f90d524e9a5964c93850) |
| ScannerToScannerPoolMigration | [0x1365fa3FE7F52db912daBc8e439f0843461fee16](https://polygonscan.com/address/0x1365fa3FE7F52db912daBc8e439f0843461fee16) | [0xAb94300F91DA64637C94b6c4159AC805d23C7cF8](https://polygonscan.com/address/0xAb94300F91DA64637C94b6c4159AC805d23C7cF8) |
| General Plan | [0x4e0c80548e67a6e05464e540729222eb9812444d](https://polygonscan.com/address/0x4e0c80548e67a6e05464e540729222eb9812444d) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |
| Scam Detector Plan | [0x54089510aec879ca42e08bc4b166be8362b56bb2](https://polygonscan.com/address/0x54089510aec879ca42e08bc4b166be8362b56bb2) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |
| Rug Pull Detector Plan | [0x525d8d73f11a8586482f4f74c105d9d8b7cf73da](https://polygonscan.com/address/0x525d8d73f11a8586482f4f74c105d9d8b7cf73da) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |
| Spam Detector Plan | [0x6453379cbc14f7a277319b6c8b7577ae78524968](https://polygonscan.com/address/0x6453379cbc14f7a277319b6c8b7577ae78524968) | [0x64a3328cf61025720c26de2a87b6d913fa6e376a](https://polygonscan.com/address/0x64a3328cf61025720c26de2a87b6d913fa6e376a) |
| Sybil Defender Plan | [0xFc4ea1cB01D9a48711a481BC6af08590E661612c](https://polygonscan.com/address/0xFc4ea1cB01D9a48711a481BC6af08590E661612c) | [0x64A3328Cf61025720c26dE2a87B6d913fA6e376a](https://polygonscan.com/address/0x64A3328Cf61025720c26dE2a87B6d913fA6e376a) |
| Attack Detector Plan | [0x4Fd7019EaB30fF7347d215Fe1510d05e6FD420a4](https://polygonscan.com/address/0x4Fd7019EaB30fF7347d215Fe1510d05e6FD420a4) | [0x64A3328Cf61025720c26dE2a87B6d913fA6e376a](https://polygonscan.com/address/0x64A3328Cf61025720c26dE2a87B6d913fA6e376a) |


**Sepolia Testnet**

| Name | Proxy | Implementation |
| -- | -- | -- |
| Forta Token | [0x95d9a757ad9C25999ffE93f3067221F04ce1Cc79](https://sepolia.etherscan.io/address/0x95d9a757ad9C25999ffE93f3067221F04ce1Cc79) | [0x786e4446bB39F5480310FE98c48d2d5e6129A4cC](https://sepolia.etherscan.io/address/0x786e4446bb39f5480310fe98c48d2d5e6129a4cc) |

**Base Sepolia Testnet**

| Name | Proxy | Implementation |
| ----- | ----- | -------------- |
| Access | [0x3063152eb36007dEbEA023Caa6725da166bB149c](https://sepolia.basescan.org/address/0x3063152eb36007dEbEA023Caa6725da166bB149c) | [0xbEC4ADBEFc7B9B2BC1277F77B3dFa9a20C72297d](https://sepolia.basescan.org/address/0xbec4adbefc7b9b2bc1277f77b3dfa9a20c72297d) |
| Agents (Detection Bots) | [0x0C8B8DeC21Aa72179e8C4703a9B55d9Db061D423](https://sepolia.basescan.org/address/0x0C8B8DeC21Aa72179e8C4703a9B55d9Db061D423) | [0x94bb1C019F23da25e6186831c88372422050bAE8](https://sepolia.basescan.org/address/0x94bb1c019f23da25e6186831c88372422050bae8) |
| Scanner Pools | [0x786e4446bB39F5480310FE98c48d2d5e6129A4cC](https://sepolia.basescan.org/address/0x786e4446bB39F5480310FE98c48d2d5e6129A4cC) | [0xd3BF0042aEDcB9d41cdaaC647249Bf1c7102f764](https://sepolia.basescan.org/address/0xd3bf0042aedcb9d41cdaac647249bf1c7102f764) |
| Dispatch | [0x452C7044B9977de45ed7621ba0Bb77E312663157](https://sepolia.basescan.org/address/0x452C7044B9977de45ed7621ba0Bb77E312663157) | [0x74bc6EF72B84581aCAB56bd180c1C7A0CCaeECD3](https://sepolia.basescan.org/address/0x74bc6ef72b84581acab56bd180c1c7a0ccaeecd3) |
| Forwarder | -- | [0x4cf374988bDb78Ba81D59f915612D7D74ef93380](https://sepolia.basescan.org/address/0x4cf374988bDb78Ba81D59f915612D7D74ef93380) |
| Forta Token (Bridged) | [0x38C0F07ECA98b87757Fb76C56Be779b79C676062](https://sepolia.basescan.org/address/0x38C0F07ECA98b87757Fb76C56Be779b79C676062) | [0xcB31e349c6229cDC3560d80368092aC89095Ca38](https://sepolia.basescan.org/address/0xcb31e349c6229cdc3560d80368092ac89095ca38) |
| Staking | [0x1ed86971E4C4f3d13b6b8030D80C7D609de7139c](https://sepolia.basescan.org/address/0x1ed86971e4c4f3d13b6b8030d80c7d609de7139c) | [0xC6fE33F0BAd197fE65673Eff0D4e959e277fb401](https://sepolia.basescan.org/address/0xc6fe33f0bad197fe65673eff0d4e959e277fb401) |
| StakeSubjectGateway | [0x7691a7505666fCe7d3512Fd2ec5d731c6CB6C399](https://sepolia.basescan.org/address/0x7691a7505666fce7d3512fd2ec5d731c6cb6c399) | [0x98fb54aF7f508E83b35d81C65158bC8449128BB9](https://sepolia.basescan.org/address/0x98fb54af7f508e83b35d81c65158bc8449128bb9) |
| ScannerNodeVersion | [0x58376C1982Da91B54d508335D9c9B43F1AC9E54D](https://sepolia.basescan.org/address/0x58376C1982Da91B54d508335D9c9B43F1AC9E54D) | [0x860757a3e9b72deD32CF15ea64f5425533442Fd9](https://sepolia.basescan.org/address/0x860757a3e9b72ded32cf15ea64f5425533442fd9) |
| SlashingController | [0x1Eca2C733AecaeB2c2E89F7fA526E00fB4A74eDe](https://sepolia.basescan.org/address/0x1Eca2C733AecaeB2c2E89F7fA526E00fB4A74eDe) | [0x18Ca964A5C1a5778fA3519ca6E2Dfc449A5b675b](https://sepolia.basescan.org/address/0x18ca964a5c1a5778fa3519ca6e2dfc449a5b675b) |
| StakeAllocator | [0xc054a3DABfFEb0279E62669FB699a33D4cC5fC62](https://sepolia.basescan.org/address/0xc054a3DABfFEb0279E62669FB699a33D4cC5fC62) | [0xBe9209E216Bc22b375b87267f009d75286d56B4A](https://sepolia.basescan.org/address/0xbe9209e216bc22b375b87267f009d75286d56b4a) |
| RewardsDistributor | [0x414E8777Df3e3Af4Ed3e4bA9A2266779F86558e4](https://sepolia.basescan.org/address/0x414E8777Df3e3Af4Ed3e4bA9A2266779F86558e4) | [0x10888Cc63B0E2c1FEA7A501bC0be4a4E126A4b45](https://sepolia.basescan.org/address/0x10888cc63b0e2c1fea7a501bc0be4a4e126a4b45) |

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





