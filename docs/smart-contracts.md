# Smart Contracts


Forta Network uses smart contracts to coordinate registration and ownership of Scanner Nodes and Detection Bots (referred by their former name of Agents in this release), the assignments of Bots and Scanners, the accepted Scanner Node software version and the economic safety mechanisms of the network via the ERC20 FORT Token.

To learn more, read the [smart contracts github repo](https://github.com/forta-protocol/forta-contracts), or the documentation for the contracts in this site.


# Deployments

Most of the contracts in Forta Network are [upgradeable](https://docs.openzeppelin.com/contracts/4.x/upgradeable).
If you are going to interact with an Upgradeable contract, **always use the Proxy address**.


### Ethereum Mainnet

| Name | Proxy | Implementation |
| -- | -- | -- |
| Forta Token | [0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29](https://etherscan.io/address/0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29) | [0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a](https://etherscan.io/address/0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a) |


### Polygon

| Name | Proxy | Implementation |
| ----- | ----- | -------------- |
| Access | [0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3](https://polygonscan.com/address/0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3) | [0xd60D162c3335eB3EC4BEcA9F97218FAa4839f007](https://polygonscan.com/address/0xd60D162c3335eB3EC4BEcA9F97218FAa4839f007) |
| Router | [0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64](https://polygonscan.com/address/0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64) | [0x200Daf0a67B91bda59B57d436a3538E60C87c381](https://polygonscan.com/address/0x200Daf0a67B91bda59B57d436a3538E60C87c381) |
| Agents (Detection Bots) | [0x61447385B019187daa48e91c55c02AF1F1f3F863](https://polygonscan.com/address/0x61447385B019187daa48e91c55c02AF1F1f3F863) | [0x2194564d6ea21bf03c057977A85b64D757596332](https://polygonscan.com/address/0x2194564d6ea21bf03c057977A85b64D757596332) |
| Scanners | [0xbF2920129f83d75DeC95D97A879942cCe3DcD387](https://polygonscan.com/address/0xbF2920129f83d75DeC95D97A879942cCe3DcD387) | [0x6083aeF817EDC5835d47290534e06dc5c51411b1](https://polygonscan.com/address/0x6083aeF817EDC5835d47290534e06dc5c51411b1) |
| Dispatch | [0xd46832F3f8EA8bDEFe5316696c0364F01b31a573](https://polygonscan.com/address/0xd46832F3f8EA8bDEFe5316696c0364F01b31a573) | [0xCF68cEEfa02Da937a5Ac65B26Bcc9255e0D6fA88](https://polygonscan.com/address/0xCF68cEEfa02Da937a5Ac65B26Bcc9255e0D6fA88) |
| Forwarder | -- | [0x356A8ee5D3bCc183c2c7853F11D19f4C7622396F](https://polygonscan.com/address/0x356A8ee5D3bCc183c2c7853F11D19f4C7622396F) |
| Forta Token (Bridged) | [0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1](https://polygonscan.com/address/0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1) | [0xdEc964c65B265F038b07a6524598498b3Deb0e51](https://polygonscan.com/address/0xdEc964c65B265F038b07a6524598498b3Deb0e51) |
| Staking | [0xd2863157539b1D11F39ce23fC4834B62082F6874](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874) | [0x355e16B4874A1559529229F2A2c40f026c7b816a](https://polygonscan.com/address/0x355e16B4874A1559529229F2A2c40f026c7b816a) |
| StakingParameters | [0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a](https://polygonscan.com/address/0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a) | [0xa2c0D02AE91ACb1517958de05513379d0C601358](https://polygonscan.com/address/0xa2c0D02AE91ACb1517958de05513379d0C601358) |
| ScannerNodeVersion | [0x4720c872425876B6f4b4E9130CDef667aDE553b2](https://polygonscan.com/address/0x4720c872425876B6f4b4E9130CDef667aDE553b2) | [0x58BB8Cb8C21032A23EB6ECC99430F0CEEE29B10b](https://polygonscan.com/address/0x58BB8Cb8C21032A23EB6ECC99430F0CEEE29B10b) |




### Goerli Testnet

| Name | Proxy | Implementation |
| -- | -- | -- |
| Forta Token | [0x848F1fF1fa76Dc882Ca2F3521265ba3F27e42158](https://goerli.etherscan.io/address/0x848f1ff1fa76dc882ca2f3521265ba3f27e42158) | [0x1b8CCBf5E8dBE1599905349E24b92a61175F9A10](https://goerli.etherscan.io/address/0x1b8CCBf5E8dBE1599905349E24b92a61175F9A10) |


### Mumbai Testnet

| Name | Proxy | Implementation |
| ----- | ----- | -------------- |
| Access | [0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64](https://mumbai.polygonscan.com/address/0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64) | [0xDCFC2E4037a5d5524A957D7771C6Fd328f1D8ECE](https://mumbai.polygonscan.com/address/0xDCFC2E4037a5d5524A957D7771C6Fd328f1D8ECE) |
| Router | [0x61447385B019187daa48e91c55c02AF1F1f3F863](https://mumbai.polygonscan.com/address/0x61447385B019187daa48e91c55c02AF1F1f3F863) | [0x4b3857DD81424c2BCdD338C5B2D2d9a287642c64](https://mumbai.polygonscan.com/address/0x4b3857DD81424c2BCdD338C5B2D2d9a287642c64) |
| Agents (Detection Bots) | [0x5Cf7008aC441Ec1797fAfA4EE132eA4277E9239B](https://mumbai.polygonscan.com/address/0x5Cf7008aC441Ec1797fAfA4EE132eA4277E9239B) | [0x3db7d890640957CCeeAA5411675fDfd678AC187d](https://mumbai.polygonscan.com/address/0x3db7d890640957CCeeAA5411675fDfd678AC187d) |
| Scanners | [0xa30c3951f85941bfe474620dA25DEb90283C99D7](https://mumbai.polygonscan.com/address/0xa30c3951f85941bfe474620dA25DEb90283C99D7) | [0x9A97d4f5f4711c2d629DA4D8Be072700eF15cb3e](https://mumbai.polygonscan.com/address/0x9A97d4f5f4711c2d629DA4D8Be072700eF15cb3e) |
| Dispatch | [0x634C83F3213CcfC895A4e6A2c137b2B572fa64ad](https://mumbai.polygonscan.com/address/0x634C83F3213CcfC895A4e6A2c137b2B572fa64ad) | [0x20b89b26a92Fb40536a27770BA03fd65ad7124eC](https://mumbai.polygonscan.com/address/0x20b89b26a92Fb40536a27770BA03fd65ad7124eC) |
| Forwarder | -- | [0x4E29Cea6D64be860f5eAba110686DcB585f393D6](https://mumbai.polygonscan.com/address/0x4E29Cea6D64be860f5eAba110686DcB585f393D6) |
| Forta Token (Bridged) | [0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3](https://mumbai.polygonscan.com/address/0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3) | [0x21b1b0f8e9182c92c2a81f43f305ce25994d9d57](https://mumbai.polygonscan.com/address/0x21b1b0f8e9182c92c2a81f43f305ce25994d9d57) |
| Staking | [0x8a5EEfA2BAb332DD7666d885e9C9d2775221EB1c](https://mumbai.polygonscan.com/address/0x8a5EEfA2BAb332DD7666d885e9C9d2775221EB1c) | [0x46DF428Fe81441468308D6dBa54f2c4D6C98fd51](https://mumbai.polygonscan.com/address/0x46DF428Fe81441468308D6dBa54f2c4D6C98fd51) |
| StakingParameters | [0x2441Ce5eB269505f30F6F434D21E039438aaC342](https://mumbai.polygonscan.com/address/0x2441Ce5eB269505f30F6F434D21E039438aaC342) | [0x1837CF2B32B25B6dDb4d8D004B3DC423d1d72243](https://mumbai.polygonscan.com/address/0x1837CF2B32B25B6dDb4d8D004B3DC423d1d72243) |
| ScannerNodeVersion | [0x67D4d0654D6Ba56d41a7A6Ec8f33430c3d778201](https://mumbai.polygonscan.com/address/0x67D4d0654D6Ba56d41a7A6Ec8f33430c3d778201) | [0x627Baa46bAC06e6E61E237C9bCCf8d0ec9eA165D](https://mumbai.polygonscan.com/address/0x627Baa46bAC06e6E61E237C9bCCf8d0ec9eA165D) |

