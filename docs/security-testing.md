## Security - Testing and Review

Testing and review starts with a good understanding of the Forta Network itself through documentation, transparency, and public nature of the primary components of the network. Key pieces of the network are summarized below:

- Contracts (prod and test)

    - [Polygon and Ethereum mainnet](https://docs.forta.network/en/latest/smart-contracts/)
    - [Mumbai and Goerli Test Net](https://docs.forta.network/en/latest/smart-contracts/)

- Github repos (private and public)
    
    Public:

    - [Scan Node software for the Forta Network](https://github.com/forta-network/forta-node)
    - [Forta Go Libraries](https://github.com/forta-network/forta-core-go)
    - [Forta Detection Bot SDK and CLI tool](https://github.com/forta-network/forta-bot-sdk)
    - [Forta Contracts](https://github.com/forta-network/forta-contracts)
    - [Forta Threat Detection Kits](https://github.com/forta-network/starter-kits)
    - [Airdrop Autotasks](https://github.com/forta-network/airdrop-autotask)
    
    Private:

    - [Forta Assigners](https://github.com/forta-network/forta-assigner)
    - [Forta Infra](https://github.com/forta-network/forta-infra)
    - [Forta Airdrop Interface](https://github.com/forta-network/airdrop-interface)
    - [Forta Airdrop Contracts](https://github.com/forta-network/airdrop)
    - [Forta GraphQL API](https://github.com/forta-network/forta-alerts-api)


Testing of the code must happen through GitHub Actions on each pull request and gated upon successful tests. Code coverage data for the contract's tests can be found in the Codecov dashboard [here](https://app.codecov.io/github/forta-network/forta-contracts). (Note: Code coverage tests exclude contracts in the `contracts/components/_old` folder since those are deprecated contracts.)

Adopting an attacker mindset, the Foundation went beyond employing secure design, development, deployment and testing and enlisted external security experts to assess the Forta Network after it was built. This helped to surface erroneous assumptions and uncover security gaps that may have remained hidden. Forta primarily engaged OpenZeppelin's smart contract auditing expertise as well as Dedalo's web2 and broad threat assessment expertise for other critical components of the Network. All such reports/findings are linked below:

- [Dedalo's Airdrop Assessment, June 17th 2022](../2022Q2-FortaAirdrop-AuditReport.pdf)
- <a href="../Forta Network Airdrop Audit Report.pdf">OpenZeppelin's Airdrop Smart Contract Audit, June 9th 2022</a>
- [Dedalo's Forta Scan Node Assessment, April 7th 2022](../2022Q1-V2-FortaNode-AuditReport.pdf)
- <a href="../OZ Forta Protocol Audit.pdf">OpenZeppelin's Protocol Audit, February 7th 2022</a>
- [Dedalo's Web Security Assessment, January 5th 2022 ](../Forta-Report-DDL-05-01-2022.pdf)
- [MixBytes' Security Assessment of slash proposal changes, September 2nd 2022](https://github.com/forta-network/forta-contracts/commit/c940dc39b94bc8be6c298deab92a3dd55527f321)
- [Consensys' Security Assessment of Delegated Staking, November 2022](https://consensys.net/diligence/audits/2022/11/forta-delegated-staking/)
- <a href="../Forta Staking Vault Final Report (March 2024)_">OpenZeppelin's Staking Vault Audit, March 11th 2024</a>