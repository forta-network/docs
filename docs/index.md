---
hide:
  - toc
---

# Overview

Welcome to the Forta Developer SDK documentation!

Forta is the first decentralized, community-based runtime security network for smart contracts. Protocol teams, investors and individuals can use Forta to monitor public blockchain transaction activity and receive alerts on security, financial, operational and governance related threats for their own or dependent protocols.

The two primary components of Forta are threat detection agents and scan nodes:

- Agents are scripts that look for suspicious transaction characteristics or state changes (e.g. anomaly detection) on smart contracts across any Layer 1, Layer 2, or sidechain.
- Scan nodes are responsible for running agents. When agents detect a specific condition or event, an alert is triggered from the network.

Forta will maintain a public registry of all alerts, and anyone interested in the security of a contract can consume relevant alerts via the [Forta Explorer](https://explorer.forta.network/) or API (coming soon).

Anyone can become an agent developer and submit agents to be certified by the network. Agents can currently be written using the [Javascript SDK](https://www.npmjs.com/package/forta-agent) or [Python SDK](https://pypi.org/project/forta-agent/) and can be submitted for community feedback [here](https://discord.gg/2KaMS9wvPS).

Get started by [building your first agent](quickstart.md). Join our community [Discord](https://discord.gg/DUju5Dh4J9) for help and to chat with other developers and our team!

**Forta is currently in the public testnet phase**

_Javascript SDK version: 0.0.29_<br>
_Python SDK version: 0.0.9_<br>
_Last updated: November 9th, 2021_
