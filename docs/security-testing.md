## Security - Testing and Review

Testing and review starts with a good understanding of the network itself through documentation, transparency, and open-source nature around the components of the network. Key pieces of the network are summarized below:

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


Testing of the code happens through GitHub Actions on each pull request and gated upon successful tests. 

Adopting an attacker mindset, Forta's efforts spanned beyond secure design, development, deployment and testing towards enlisting external security experts to assess the network after it was built. This helps to surface erroneous assumptions and uncover security gaps that may have remained hidden. Forta primarily engaged OpenZeppelin's excellent smart contract auditing expertise as well as Dedalo's web2 and broad threat assessment expertise for other critical components of the network. All their reports/findings are linked below:

- [Dedalo's Airdrop Assessment, June 17th 20222](../2022Q2-FortaAirdrop-AuditReport.pdf)
- <a href="../Forta Network Airdrop Audit Report.pdf">OpenZeppelin's Airdrop Smart Contract Audit, June 9th 2022</a>
- [Dedalo's Forta Scan Node Assessment, April 7th 2022](../2022Q1-V2-FortaNode-AuditReport.pdf)
- <a href="../OZ Forta Protocol Audit.pdf">OpenZeppelin's Protocol Audit, February 7th 2022</a>
- [Dedalo's Web Security Assessment, January 5th 2022 ](../Forta-Report-DDL-05-01-2022.pdf)
