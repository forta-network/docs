# Forta Risk Graph MCP

A guide for new users: what it is, how to connect, and how to get the most out of it.

## What it is

The Forta Risk Graph is a live map of on-chain positions, governance, oracles, lending markets and liquidity pools, with every relationship between them priced in dollars. The MCP connector puts that graph inside your AI assistant. You ask in plain English, and the assistant queries the graph, does the arithmetic, and answers with dollar figures and addresses you can verify yourself. You never write a query.

The point of a graph, rather than a dashboard, is depth. A vault depends on a market, which depends on a collateral token, which depends on that token's admin key, which depends on a custodian. Each hop is a separate thing that can fail, and each one is walkable.

## Connecting

**Claude Code**

```bash
claude mcp add --transport http forta-risk-graph https://risk-graph-mcp.forta.network/mcp
```

**Claude Cowork** — add this MCP server in your connector settings:

```
https://risk-graph-mcp.forta.network/mcp
```

Authenticate with the email address you provided, then make sure it is toggled on for the chat you are working in, not just installed at the account level. If your assistant reports no Forta tools, that toggle is almost always why.

!!! note
    For those using Cowork, there have been issues with a frequent need to re-authenticate. We are working on a fix for this.

## Networks supported

- Ethereum Mainnet

## What the Risk Graph knows

A real-time view of:

- **Tokens and holdings** — around 2.3 million holdings, over a million of them priced, so any wallet, Safe or contract balance is queryable, alongside supply, price, and wrapped and bridged versions.
- **Vaults** — where a vault's assets are actually allocated, market by market, with each share.
- **Lending** — about 1,550 markets with supplied, borrowed, available liquidity, collateral and LTV, and 54,000 borrower positions across 10 protocols totalling roughly $27 billion of debt.
- **Liquidity** — over 145,000 pools, with pairs and fee tiers.
- **Oracles** — price feeds, and which markets depend on them.
- **Governance** — admin keys, owners, upgrade authority, and signer sets plus thresholds for around 24,000 multisigs.
- **Attribution** — exchange wallets, protocol contracts and known entities, sourced and labelled.

Two things the MCP was built for:

1. **Dependency mapping** — take a vault, wallet or asset you care about, and understand its key dependencies in dollar terms.
2. **Blast radius** — take an asset, oracle feed, admin address, etc., and understand what gets impacted if it fails.

The graph goes multiple hops deep, highlighting indirect and non-obvious relationships.

## MCP skills

If you're using Claude, we have a packaged skill called **Forta Risk Analysis** that runs the full end-to-end analysis and produces a standardized report.

**GitHub repo:** [forta-network/forta-risk-skills](https://github.com/forta-network/forta-risk-skills)

## Prompt library

To start, we suggest using template prompts. The Forta Risk Analysis skill was developed with these prompts in mind. To use, copy and paste the prompt below into Claude and insert the relevant token/vault addresses.

Template report prompts:

1. **Dependency report** — `Using the forta risk analysis skill, give me a dependency report for vault: [insert vault address]`
2. **Blast radius report** — `Using the forta risk analysis skill, give me a blast radius report for token [insert token address] impact on vault [insert vault address] / wallet [insert wallet address]`

## Reading the answers

Exposure figures are presented in USD terms and calculated using a "worst-case scenario" outcome. It answers how much is on the line if something fails — not how likely that is, and not what you would expect to lose. Overlapping dependencies are combined as a union rather than summed together, because a token, its admin key and its oracle all point at the same underlying position.

**Hops** specifies how direct or indirect the dependency is. The graph currently supports a depth of 6 hops.

## Advanced: other questions you can ask

**Your own exposure**

- Which dependencies are shared across more than one of my positions?
- Compare these two vaults and tell me which has more exposure concentration.

**If something fails**

- If this stablecoin depegged, which protocols, markets, etc. lose money, and how much?
- What is the blast radius of this admin key?
- Which vaults and protocols would be hit if this price feed returned a bad number?

**Governance and control**

- Who can upgrade this contract?
- How many signatures does this multisig need, and who are the signers?
- What else does this same admin key control, and how much value?

**Oracles, liquidity and counterparties**

- Is the same feed pricing more than one position here, and what is the combined exposure?
- How much of this vault could be withdrawn today, given the liquidity in its markets?
- Who are the largest borrowers against this reserve, and what does the biggest owe?
