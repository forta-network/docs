# Smart Contracts


Forta Network uses smart contracts to coordinate registration and ownership of Scanner Nodes and Detection Bots (referred by their former name of Agents in this release), the assignments of Bots and Scanners, the accepted Scanner Node software version and the economic safety mechanisms of the network via the ERC20 FORT Token.

To learn more, read the [smart contracts github repo](https://github.com/forta-network/forta-contracts), or the documentation for the contracts in this site.


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
| Access | [0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3](https://polygonscan.com/address/0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3) | [0xc855d842ff0af97b0d18cc81eecbb702ea1a0706](https://polygonscan.com/address/0xc855d842ff0af97b0d18cc81eecbb702ea1a0706) |
| Agents (Detection Bots) | [0x61447385B019187daa48e91c55c02AF1F1f3F863](https://polygonscan.com/address/0x61447385B019187daa48e91c55c02AF1F1f3F863) | [0xb779fF917F824740Dd64C0568C346A4C918EF095](https://polygonscan.com/address/0xb779fF917F824740Dd64C0568C346A4C918EF095) |
| Scanners **(Deprecated)** | [0xbF2920129f83d75DeC95D97A879942cCe3DcD387](https://polygonscan.com/address/0xbF2920129f83d75DeC95D97A879942cCe3DcD387) | [0x75c46283dE6b08bE4bb4425b94aC338f2802e3B0](https://polygonscan.com/address/0x75c46283dE6b08bE4bb4425b94aC338f2802e3B0) |
| Scanner Pools | [0x90FF9C193D6714E0e7a923b2Bd481Fb73FEC731d](https://polygonscan.com/address/0x90FF9C193D6714E0e7a923b2Bd481Fb73FEC731d) | [0xA27317F2F17617d8325605bD87252bCc6A64fD40](https://polygonscan.com/address/0xA27317F2F17617d8325605bD87252bCc6A64fD40) |
| Dispatch | [0xd46832F3f8EA8bDEFe5316696c0364F01b31a573](https://polygonscan.com/address/0xd46832F3f8EA8bDEFe5316696c0364F01b31a573) | [0x5eED79eC2D48be67e6D956C59110f123116C3EAD](https://polygonscan.com/address/0x5eED79eC2D48be67e6D956C59110f123116C3EAD) |
| Forwarder | -- | [0x356A8ee5D3bCc183c2c7853F11D19f4C7622396F](https://polygonscan.com/address/0x356A8ee5D3bCc183c2c7853F11D19f4C7622396F) |
| Forta Token (Bridged) | [0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1](https://polygonscan.com/address/0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1) | [0xd6b3139108e271c812acc6ffebad28e935d61e24](https://polygonscan.com/address/0xd6b3139108e271c812acc6ffebad28e935d61e24) |
| Staking | [0xd2863157539b1D11F39ce23fC4834B62082F6874](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874) | [0x543D94657fA8C710818f0D9F7eDeC7F4Ca03CCDA](https://polygonscan.com/address/0x543D94657fA8C710818f0D9F7eDeC7F4Ca03CCDA) |
| StakingParameters | [0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a](https://polygonscan.com/address/0x587969Add789c13F64Bcc34Ff253BD9BFB78f38a) | [0x183f482B927F81FdF11919f098be299eE5dc3CD1](https://polygonscan.com/address/0x183f482B927F81FdF11919f098be299eE5dc3CD1) |
| ScannerNodeVersion | [0x4720c872425876B6f4b4E9130CDef667aDE553b2](https://polygonscan.com/address/0x4720c872425876B6f4b4E9130CDef667aDE553b2) | [0xCFF69D7e4db098772c85831f4318A1897647488E](https://polygonscan.com/address/0xCFF69D7e4db098772c85831f4318A1897647488E) |
| SlashingController | [0x6927C25ff30ed86F86A863d987590A1d77509bDb](https://polygonscan.com/address/0x6927C25ff30ed86F86A863d987590A1d77509bDb) | [0xE7e33d453980e8023d54A70A40753bA7617B08F3](https://polygonscan.com/address/0xE7e33d453980e8023d54A70A40753bA7617B08F3) |
| StakeAllocator | [0x5B73756e637A77Fa52e5Ce71EC6189A4C775c6FA](https://polygonscan.com/address/0x5B73756e637A77Fa52e5Ce71EC6189A4C775c6FA) | [0x2b8AB51156501FBbF122F1001bC6134629f343d5](https://polygonscan.com/address/0x2b8AB51156501FBbF122F1001bC6134629f343d5) |
| RewardsDistributor | [0xf7239f26b79145297737166b0c66f4919af9c507](https://polygonscan.com/address/0xf7239f26b79145297737166b0c66f4919af9c507) | [0x70B1b7756868d03a5fC7AFb63657475b59BA5Ff9](https://polygonscan.com/address/0x70B1b7756868d03a5fC7AFb63657475b59BA5Ff9) |
| ScannerToScannerPoolMigration | [0x1365fa3FE7F52db912daBc8e439f0843461fee16](https://polygonscan.com/address/0x1365fa3FE7F52db912daBc8e439f0843461fee16) | [0xEBb33FD780757d745213CF57838c0E5b66D824Bc](https://polygonscan.com/address/0xEBb33FD780757d745213CF57838c0E5b66D824Bc) |




### Goerli Testnet

| Name | Proxy | Implementation |
| -- | -- | -- |
| Forta Token | [0x848F1fF1fa76Dc882Ca2F3521265ba3F27e42158](https://goerli.etherscan.io/address/0x848f1ff1fa76dc882ca2f3521265ba3f27e42158) | [0x1b8CCBf5E8dBE1599905349E24b92a61175F9A10](https://goerli.etherscan.io/address/0x1b8CCBf5E8dBE1599905349E24b92a61175F9A10) |


### Mumbai Testnet

| Name | Proxy | Implementation |
| ----- | ----- | -------------- |
| Access | [0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64](https://mumbai.polygonscan.com/address/0xbb12476ab9f27d3b441964B0aFC03D14a82e1D64) | [0xDCFC2E4037a5d5524A957D7771C6Fd328f1D8ECE](https://mumbai.polygonscan.com/address/0xDCFC2E4037a5d5524A957D7771C6Fd328f1D8ECE) |
| Agents (Detection Bots) | [0x4519Eaeb9A5c1a9d870Fe35452E54AD04E6e8428](https://mumbai.polygonscan.com/address/0x4519Eaeb9A5c1a9d870Fe35452E54AD04E6e8428) | [0x36b6b021CCE5cF26E9462dd3c76F835e12F636F1](https://mumbai.polygonscan.com/address/0x36b6b021CCE5cF26E9462dd3c76F835e12F636F1) |
| Scanners **(Deprecated)** | [0x569c785b4744e582c65a12827726fc03c8d08a4a](https://mumbai.polygonscan.com/address/0x569c785b4744e582c65a12827726fc03c8d08a4a) | [0x0FF4A7603EB4FB7A5c8D4cd25199046942fb968B](https://mumbai.polygonscan.com/address/0x0FF4A7603EB4FB7A5c8D4cd25199046942fb968B) |
| Scanner Pools | [0xfD745747eC40B439feE9248Ae9D57EB846F7eBF5](https://mumbai.polygonscan.com/address/0xfD745747eC40B439feE9248Ae9D57EB846F7eBF5) | [0x075C9fbDa553e4D616dC301aEB5347fa42A79096](https://mumbai.polygonscan.com/address/0x075C9fbDa553e4D616dC301aEB5347fa42A79096) |
| Dispatch | [0x4B71C61400F5da35518DE10dEcd21D1Aa4d7f283](https://mumbai.polygonscan.com/address/0x4B71C61400F5da35518DE10dEcd21D1Aa4d7f283) | [0x485F9c35d90E639f5B591DA5281199Ae59A9794F](https://mumbai.polygonscan.com/address/0x485F9c35d90E639f5B591DA5281199Ae59A9794F) |
| Forwarder | -- | [0x4E29Cea6D64be860f5eAba110686DcB585f393D6](https://mumbai.polygonscan.com/address/0x4E29Cea6D64be860f5eAba110686DcB585f393D6) |
| Forta Token (Bridged) | [0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3](https://mumbai.polygonscan.com/address/0x107Ac13567b1b5D84691f890A5bA07EdaE1a11c3) | [0x21b1b0f8e9182c92c2a81f43f305ce25994d9d57](https://mumbai.polygonscan.com/address/0x21b1b0f8e9182c92c2a81f43f305ce25994d9d57) |
| Staking | [0x64d5192F03bD98dB1De2AA8B4abAC5419eaC32CE](https://mumbai.polygonscan.com/address/0x64d5192F03bD98dB1De2AA8B4abAC5419eaC32CE) | [0xc02de30306d913C46610ae0ad5C296CE7D3060AE](https://mumbai.polygonscan.com/address/0xc02de30306d913C46610ae0ad5C296CE7D3060AE) |
| StakingParameters | [0x02304eC24ba2996a83F595D7cf80e5571a406EFA](https://mumbai.polygonscan.com/address/0x02304eC24ba2996a83F595D7cf80e5571a406EFA) | [0x22C74d1Ef9568EEc71E6EBe7b338A9E381eb99c8](https://mumbai.polygonscan.com/address/0x22C74d1Ef9568EEc71E6EBe7b338A9E381eb99c8) |
| ScannerNodeVersion | [0x67D4d0654D6Ba56d41a7A6Ec8f33430c3d778201](https://mumbai.polygonscan.com/address/0x67D4d0654D6Ba56d41a7A6Ec8f33430c3d778201) | [0x52a53DCC546c09CECe279F5549d0958433912802](https://mumbai.polygonscan.com/address/0x52a53DCC546c09CECe279F5549d0958433912802) |
| SlashingController | [0xdc4A1Fe7D5c5546458463F6546bf6Fbe6a1a9704](https://mumbai.polygonscan.com/address/0xdc4A1Fe7D5c5546458463F6546bf6Fbe6a1a9704) | [0xc500d015E69721Ec3D29955EBF15bf9b8Ad832eA](https://mumbai.polygonscan.com/address/0xc500d015E69721Ec3D29955EBF15bf9b8Ad832eA) |
| StakeAllocator | [0x4b4272E78ec45A08D91B495c690078e3B196904C](https://mumbai.polygonscan.com/address/0x4b4272E78ec45A08D91B495c690078e3B196904C) | [0x1064ac57d149CF99fCda690625676787C4C4Ad5a](https://mumbai.polygonscan.com/address/0x1064ac57d149CF99fCda690625676787C4C4Ad5a) |
| RewardsDistributor | [0xb23696793ffc58315Ed8e4c63cf1ef454a7479EC](https://mumbai.polygonscan.com/address/0xb23696793ffc58315Ed8e4c63cf1ef454a7479EC) | [0x253Eca8E7f01708b7dFD7277D814c33451A2211B](https://mumbai.polygonscan.com/address/0x253Eca8E7f01708b7dFD7277D814c33451A2211B) |
| ScannerToScannerPoolMigration | [0x1b2D1D6aCD3381d355dAa1133CFc1fe384917cC8](https://mumbai.polygonscan.com/address/0x1b2D1D6aCD3381d355dAa1133CFc1fe384917cC8) | [0xB983B38dd4620419E5214A3bFE2E7Ed827859586](https://mumbai.polygonscan.com/address/0xB983B38dd4620419E5214A3bFE2E7Ed827859586) |
