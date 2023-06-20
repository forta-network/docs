## Run an Ethereum Full Node

!!! important "Only for Ethereum Mainnet"
    This section was prepared only for Forta node operators who would like to point their Forta nodes to their own Ethereum Mainnet nodes. If your Forta node is scanning chains other than Ethereum Mainnet, you can safely ignore this section altogether.

If you are planning on setting up a Forta node, your own full node node is the most reliable option as a provider to your Forta node and we strongly recommend it.

The final command to run the Ethereum node will be:

```bash
erigon-rpcdaemon \
  --http.vhosts '*' --http.port 8545 \
  --http.addr 0.0.0.0 --http.corsdomain '*' \
  --http.api 'eth,net,web3,trace' --private.api.addr=localhost:9090 \
  --authrpc.addr 0.0.0.0 --authrpc.jwtsecret <secret>

erigon --private.api.addr=localhost:9090
```

!!! note "Ethereum node access"
    Be sure to set `--http.vhosts` to allow hostname access, and enable `eth,net,web3` HTTP APIs. Note that `trace` is only applicable for Ethereum mainnet.

### The Merge

To make your Ethereum node support [The Merge](https://www.alchemy.com/the-merge), your Erigon node (Execution Layer - EL) will need to be run with a beacon node (Consensus Layer - CL). Few consensus layer clients are listed below:

  - Prysm
  - Lighthouse
  - Lodestar
  - Nimbus
  - Teku

For more information on versions of these clients, please see the [Ethereum Merge announcement](https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/) blog post.

You can run consensus layer client on the same machine as the execution layer client (Erigon) by default Erigon's engine API listens on localhost. If you are running CL client on a different machine than Erigon, you will need to configure the Erigon node to connect to the CL client by passing `--authrpc.addr 0.0.0.0` and `--authrpc.vhosts <CL host>`.

### Erigon node (execution layer client)

Upgrade your node to the latest "stable" version of Erigon `2022.08.03-alpha`.

If you are running Erigon directly from the binary (and not using docker-compose), you will need to pass `--authrpc.jwtsecret <secret>`. For more information see [Erigon documentation](https://github.com/ledgerwatch/erigon#beacon-chain-consensus-layer).

If you are running Erigon using [docker-compose](https://github.com/ledgerwatch/erigon/blob/devel/docker-compose.yml), you don't have to pass any extra flags for data dir or JWT secret since these are already configured in the docker-compose file.

### Prysm (consensus layer client)

Upgrade your node to the latest "stable" version of Prysm `v3.0.0`.

#### Use Docker

You can install Prysm and run a beacon node using Docker by following [Prysm Docker](https://docs.prylabs.network/docs/install/install-with-docker).

!!! warning "Architecture Constraints"
    Running with docker might not work on Linux ARM64.

#### Install binary

Alternatively, you can install Prysm directly by downloading the Prysm client binary and make it executable.

You can run your beacon node with the following commands:

```
mkdir prysm && cd prysm

curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh \
  --output prysm.sh &&\ 
  chmod +x prysm.sh
```

##### Follow installation docs

As yet another option, you can run a beacon node using Prysm by following [Prysm Beacon Node](https://docs.prylabs.network/docs/install/install-with-script#step-4-run-a-beacon-node-using-prysm).

You will need to pass `--jwt-secret=<path_to_erigon_jwt_hex>` to the beacon node. It doesn't require `--suggested-fee-recipient` flag unless you are running a [validator](https://docs.prylabs.network/docs/install/install-with-script#step-5-run-a-validator-using-prysm).

Additionally, you can pass the `--slots-per-archive-point` flag to the beacon node. A lower number helps improve the CL API performance while increasing the storage cost. For more information on slots per archive point, please refer to [Run an archival node](https://docs.prylabs.network/docs/advanced/beacon_node_api) section in Prysm docs.

After running with any method mentioned above, you should be able to see the beacon node running and syncing. This usually takes a couple days, but it can take longer depending on your network and hardware specs.
