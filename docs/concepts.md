# Core Concepts

## Forta Network

The Forta Network refers to the distributed and decentralized nodes collaborating to provide threat detection and prevention for smart contract transactions on supported blockchains, coordinated through a set of smart contracts deployed across multiple blockchains. One specific type of node is the scan node. The collection of all nodes and smart contracts is referred to as the Forta Network.

## Scan Nodes

A scan node is a specific type of Forta node that executes detection bots for every transaction and every new block on a specific blockchain network (may also be mempool or simulated network). The scan node manages and coordinates bots (e.g. by instantiating and running bots, and restarting bots that become unresponsive). The scan node ferries blockchain data to bots to process the transaction/block. To learn more about scan nodes, see our [FAQ](faq.md#how-do-i-run-a-scan-node) section.

## Detection Bots

Detection bots refer to a set of code scripts within a Docker container that process some blockchain data (i.e. a block or transaction) and detect specific threat conditions (e.g. whether a flash loan attack occured, or whether a particular account balance fell below some threshold). Bots emit alerts for their findings. Bots are executed by scan nodes. To learn more about bots, see our [FAQ](faq.md#what-makes-a-good-bot) section.

## Bot Registry

The Bot Registry refers to a smart contract (currently deployed on the Polygon public mainnet) that records the existence of all detection bots. Developers publish their bot manifests to this registry, and scan nodes listen for events from this contract to know how to manage the bots they are running.

## Bot Manifest

A bot manifest refers to a signed JSON document that describes the contents of a bot container. Specifically, it provides information like the bot version as well as an IPFS reference to the bot container image. Manifests are stored on the IPFS network, with their IPFS references stored in the Bot Registry.

## Disco

Disco is an open-source, decentralized and distributed container registry. This registry is used to store and distribute bot container images. Scan nodes request bot images from a Disco repository.
