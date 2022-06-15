## Security - Deployment

Deployment overall is handled through GitHub CI and OpenZeppelin's Defender product. For off-chain assets, critical pull requests go through a required review that upon the merge are gated by successful tests. Smart contract deployments are handled through OpenZeppelin's Defender product and relayers and are controlled by multisigs. As such, even with a breach of an individual developer, the network can not be changed. 

### Multi-Sig
Forta is managed through three main Gnosis Safe Multi Sig contracts: 
        [0xC0eb11fBC755D31c6FECEaAc8760ddCb88C64fE1](https://etherscan.io/address/0xC0eb11fBC755D31c6FECEaAc8760ddCb88C64fE1) (Ethereum mainnet). 4/7 controlled by the [council members](https://gov.forta.network/t/forta-proposal-permissionless-launch-fp-1/202/7)
        [0x30ceaeC1d8Ed347B91d45077721c309242db3D6d](https://polygonscan.com/address/0x30ceaeC1d8Ed347B91d45077721c309242db3D6d) (Polygon mainnet). 4/7 controlled by the [council members](https://gov.forta.network/t/forta-proposal-permissionless-launch-fp-1/202/7)
        [0xd1d4FaFd400fCD643132bb7eAF7682eE97E09C3e](https://polygonscan.com/address/0xd1d4FaFd400fCD643132bb7eAF7682eE97E09C3e) (Polygon mainnet). 3/6 controlled by members of the core development team.

### Contract Administration
Forta contracts are managed through [OpenZeppelin's Defender product](https://defender.openzeppelin.com/) utilizing relays to manage smart contract deployment and maintenance.

### Forta On-Chain Monitoring
Forta on-chain activity is monitored by [Forta Detection Bots](https://app.forta.network/agents/forta) and feeds into Forta's incident response process. The following detection bots were developed specifically for the smart contracts. The code is available on [GitHub](https://github.com/LimeChain/forta-bots)
- [Forta Access Control Role Changed](https://explorer.forta.network/agent/0x8e5cfc52606ac22590cf872711f81df8a0d81e3e110dee4f3fb00fafadc962c2)
- [Forta Access Manager - Router Updated](https://explorer.forta.network/agent/0xacd82110ea6551078e40b58cebd83b9f29c09b5cf85200a5ec9244e374035e6c)
- [Forta Admin Bot Scanner Disable](https://explorer.forta.network/agent/0x15022cd09034e6247336e5937f2c738d572d5f42a9c3fd53551f8c6c1766994b)
- [Forta Agent Updated](https://explorer.forta.network/agent/0x2f2d455136d8584088e2c5466d5c7b5a77f95ef40dca3e8c1ba0990b363c24e9)
- [Forta Agents Linked](https://explorer.forta.network/agent/0x9e1e98b397bcbe38e1604f03f36e91aeb1e9a2a719d5a68dc7ae327d2bf33ca8)
- [Forta Core Monitoring](https://explorer.forta.network/agent/0x6dbd2e5c9e7c2261c6d36d7f8a2bd66974d8917b311dff1738589e6d6a1fced2)
- [Forta Emitting Upgraded](https://explorer.forta.network/agent/0x04feb3b868f738cfac42faa29a24179ddd25018be8e09c5ef05655c7cfd69522)
- [Forta Mint Mainnet](https://explorer.forta.network/agent/0xd76cb2ce08c467ad328caa9582bfc3c226964ae8dd922ee7ae0bcdb9e8b4f5ce)
- [Forta Scanner Node Software Updated](https://explorer.forta.network/agent/0x33bb8d279150938d062ce3d98dea48514828971611a5b9a64789576bb0a0152c)
- [Forta Staking Events](https://explorer.forta.network/agent/0x83fad460c7e30ad0a4ec8f082fbd068edfe6e0f02cacd4e136120b201ed83a05)
- [Forta Staking Parameters](https://explorer.forta.network/agent/0x16d30698283b688f7266b2fcd9d6c5edc8e0551a212edcd2d010e54a8ffcf0ba)
- [Forta High Number Of Bot Deployments](https://explorer.forta.network/agent/0xef163df6a354c8166d51eba7fb3b16bfc21e1b7be414fa0fe5c19e53794f65de)
- [Forta Routing Updated](https://explorer.forta.network/agent/0xef163df6a354c8166d51eba7fb3b16bfc21e1b7be414fa0fe5c19e53794f65de)
- [Forta Stake Controller Changed](https://explorer.forta.network/agent/0xc44bf7b5f04444e8939ed0c29a90fc772baf3df6d2abb3edbd03adc31e9b5cf6)
- [Forta Stake Threshold Changed](https://explorer.forta.network/agent/0xe600b501cad9eae7e6885721cb44d0d79e98d7413f5cf8b75f848692ebb635ad)
- [Forta Token Role Changes](https://explorer.forta.network/agent/0xe6eebc466ba3dc71bf701719f8012bd9e1c80bfa63224684271be80ea2f93338)
- [Forta Whitelist Disabling](https://explorer.forta.network/agent/0x11b5412d0d56b1b7bec8b15f18e8976416b93482961c50cf1161fbf9c4445c70)

Forta is monitored by the bots in the [Threat Detection Kits](https://docs.forta.network/en/latest/threat-detection-kits/).

### Forta Off-Chain Monitoring
Lastly, several operational monitors exist around the performance of the network, such as latency, API usage, deployments, etc. 





