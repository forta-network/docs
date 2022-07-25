## Security - Development

Code reuse and leveraging audited smart contract libraries help to reduce the overall attack surface of a protocol. The Forta Network leveraged [OpenZeppelin's open source smart contract libraries](https://www.openzeppelin.com/contracts) for certain of its smart contracts. Overall, the principle of least privilege and access control was implemented (e.g. see [role usage](https://docs.forta.network/en/latest/contracts/components/Roles/) of Forta's smart contracts). 

The principle of least privilege does not just apply to smart contracts, but all other dependent code relevant components, such as GitHub code repositories (e.g. secured by 2FA on all accounts) and processes (e.g. code review requirements for critical pull requests).

Forta's governance process is grounded by a community governance framework that consists of a [Forta's governance process](https://docs.forta.network/en/latest/governance/) (supported by off-chain governance voting on [Snapshot](https://snapshot.org/#/forta.eth)) as well as the Forta Governance Council to which the community delegated decision power to. This Council has control of the 4/7 Gnosis Safe Council multisig wallets that require a majority of Council members to execute proposals and/or changes to the protocol. The distributed and two-step nature of proposal execution mitigates development risk due to governance.
