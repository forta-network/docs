# Core Concepts

## Forta Protocol

The Forta Protocol refers to the distributed and decentralized nodes collaborating to provide threat detection and prevention for smart contract transactions on supported blockchains, coordinated through a set of smart contracts deployed across multiple blockchains. One specific type of node is the scan node. The collection of all nodes and smart contracts is referred to as the Forta Protocol.

## Scan Nodes

A scan node is a specific type of Forta node that executes agents for every transaction and every new block on a specific blockchain network (may also be mempool or simulated network). The scan node manages and coordinates agents (e.g. by instantiating and running agents, and restarting agents that become unresponsive). The scan node ferries blockchain data to agents to process the transaction/block and then consolidates the report of findings to a public Forta smart contract.

## Agents

Agents refer to a set of code scripts within a Docker container that process some blockchain data (i.e. a block or transaction) and detect specific threat conditions (e.g. whether a flash loan attack occured, or whether a particular account balance fell below some threshold). Agents emit alerts for their findings. Agents are executed by scan nodes.

## Agent Registry

The Agent Registry refers to a smart contract (currently deployed on the Polygon public mainnet) that records the existence of all agent containers. Developers publish their agent manifests to this registry, and scan nodes listen for events from this contract to know how to manage the agents they are running.

## Agent Manifest

An agent manifest refers to a signed JSON document that describes the contents of an agent container. Specifically, it provides information like the agent version as well as an IPFS reference to the agent container image. Manifests are stored on the IPFS network, with their IPFS references stored in the Agent Registry.

## Disco

Disco is an open-source, decentralized and distributed container registry. This registry is used to store and distribute agent container images. Scan nodes request agent images from a Disco repository.
