# Run a Scan Node

This page contains the steps and technical recommendations to help you set up your node. Please always refer to this documentation for the most up-to-date node setup and configuration details.

For other information including rewards, please check out our [node operators page](https://forta.notion.site/Node-Operators-Forta-Network-4a8af3ab4aea480d993e5095ad0ed746) if you have not visited yet.

## Scan Node Requirements

The following are the requirements for running a Forta scan node.

- 64-bit Linux distribution
- CPU with 4+ cores
- 16GB RAM
- Connection to Internet
- Docker v20.10+
- 100GB SSD (in addition to full node requirements)
- **Recommended:** Full node (any chain)

### Example: Run your Ethereum full node

If you are planning on setting up a Forta node, your own full node node is the most reliable option as a provider to your Forta node.

Starting from September 6, your Erigon node (Execution Layer) needs to run with a beacon node (Consensus Layer). For more details, please make sure you visit [The Merge](#the-merge) section on this page.

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

## Synchronize system time

To produce correct timestamps on the alerts and avoid authorization problems at the time of publishing alerts, **you must ensure at all times that the system time is correct.** If the system time is not correct, your node will fail to publish alerts and may generate no rewards as a result.

We suggest using `systemd-timesyncd` which is widely available and sufficient as a time synchronization daemon. After started, it will periodically synchronize the system time in background.

To enable, `systemd-timesyncd` and check the result, you can do:
```
$ sudo systemctl enable systemd-timesyncd
$ sudo systemctl start systemd-timesyncd
$ timedatectl status
               Local time: Tue 2022-01-01 17:00:00 -03
           Universal time: Tue 2022-01-01 20:00:00 UTC
                 RTC time: Tue 2022-01-01 20:00:00
                Time zone: America/Argentina/Buenos_Aires (-03, -0300)
System clock synchronized: yes
              NTP service: active  <------------------- (it worked)
          RTC in local TZ: no
```

## Install and Configure Docker

[Install Docker](https://docs.docker.com/engine/install/) (at least v20.10) 

Add a file called `daemon.json` to your `/etc/docker` directory with the following contents:

```
{
   "default-address-pools": [
        {
            "base":"172.17.0.0/12",
            "size":16
        },
        {
            "base":"192.168.0.0/16",
            "size":20
        },
        {
            "base":"10.99.0.0/16",
            "size":24
        }
    ]
}
```

!!! warning "Avoid networking conflicts"
    Please confirm these network ranges don't conflict with your node's network, especially if you use VPC peering, VPNs, or other non-trivial networking settings.

Restart docker with `systemctl restart docker`

Ensure docker is running.  You can run `docker ps` and you should not get any errors and see a list of header columns.

!!! note "Run Docker as a non-root user"
    To run docker as a non-root user, do the following:

    Add the docker group (it may already exist)

    ```
    sudo groupadd docker
    ```

    Add your user to that group.

    ```
    sudo usermod -aG docker your-user
    ```

    **You must exit and login again to take effect**

!!! warning "Make sure Docker is running"
    Once `docker ps` gives you a list of headers, continue to the next section.

## Install Forta

The Forta scan node software is available for popular 64-bit Linux distributions using official Forta repositories. Package installation methods are verifiable (auto-verified during installation) and help you install required dependencies.

### Install via YUM (CentOS, Fedora, Red Hat Enterprise Linux etc.)

```
$ sudo curl https://dist.forta.network/repositories/yum/Forta.repo -o /etc/yum.repos.d/Forta.repo -s
$ sudo yum install forta
```

### Install via APT (Ubuntu, Debian etc.)

```
$ sudo curl https://dist.forta.network/pgp.public -o /usr/share/keyrings/forta-keyring.asc -s
$ echo 'deb [signed-by=/usr/share/keyrings/forta-keyring.asc] https://dist.forta.network/repositories/apt stable main' | sudo tee -a /etc/apt/sources.list.d/forta.list
$ sudo apt-get update
$ sudo apt-get install forta
```

### Install Manually

[Install Docker](https://docs.docker.com/get-docker/) (at least v20.10) 

Download the latest x86-64 release binary and install

```
$ sudo curl https://dist.forta.network/artifacts/forta -o /usr/local/bin/forta
```

Make the binary executable

```
$ sudo chmod 755 /usr/local/bin/forta
```


## Initial Setup

Forta scan node's CLI allows you to set up your first Forta configuration directory along with creating and managing your scan node's private key.

### Initialize Forta Directory

Initialization creates a private key that will sign the alerts from your scan node.  You must set the `FORTA_PASSPHRASE` environment variable or provide the --passphrase flag to the `init` command.

Initialize Forta using the `forta init` command

```
$ forta init --passphrase <your_passphrase>
```

!!! note "Forta Directory"
    By default, the forta directory is located in `~/.forta`. If you would like to use a different directory, either set the `FORTA_DIR` env var or provide the `--dir` flag to every command. Init command will initialize your Forta configuration and key to this directory.

This command generates a config directory, a private key and outputs your address.

```
Scanner address: 0xAAA8C491232cB65a65FBf7F36b71220B3E695AAA

Successfully initialized at /yourname/.forta
```

This is the value that will be registered in the scan node registry smart contract (as `uint256`).
If you need to find out your address later again, you can run `forta account address`.

### Backup Forta Directory

🚨 **If you delete scan node data without backup, you cannot restore your scan node.** 🚨

🔐 **You should never lose your private key in `~/.forta/.keys` and your passphrase.** 🔐

To avoid losing the control of your node address and save yourself configuration time, you can back up your Forta directory at `~/.forta` to some place only you can access. At the time of setting up your node on a new server and restore your scan node data, it is sufficient to just copy the backed up Forta directory to `~/.forta`. After doing this, you can verify that it has worked by doing `forta account address` and seeing if the outputted node address is correct.

Without your passphrase, your private key cannot be decrypted so backing up your passphrase is as equally important as backing up the directory. Losing the passphrase is another way of losing your private key file in `~/.forta/.keys`. If you choose to back up your passphrase, make sure you store it in a different location than your `~/.forta` directory to reduce risks of losing the control of your node if a backup location of yours gets exposed to an attacker.


### Recovery

!!! important "Not required for node setup"
    If you have visited this documentation to set up your node, you can safely skip this _Recovery_ section. It is placed here to inform you about potential problems if you lose data and for troubleshooting if needed later.

_"I lost my scan node data, now what?"_

Losing the scan node private key will require you to transfer your stake to a new scan node address after you finish setting up your new node. Same applies if your node private key and/or passphrase was stolen and you would like to switch to a new address.

**The scan node private key does not own or control the staked FORT.**

The first thing to check to see is if you own the shares to your stake by querying `11. sharesOf` method in Forta staking contract [on Polygonscan](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874#readProxyContract) by inputting:

- **subjectType:** 0

- **subject:** Your scan node address

- **account:** Your owner wallet address

If the result is 0 after clicking the _Query_ button, your owner wallet does not own the stake shares for your node and thus you cannot move your stake.

If you are able to move your stake, you can follow the steps in the [_Stake on your Scan Node_ section](https://docs.forta.network/en/latest/stake-on-scan-node/). Due to security reasons, this can take time.


### Configure systemd

If `forta` ever stops running, it must be restarted. If you used a package installation method, there is a Forta systemd service that can be enabled and overridden with your passphrase and config directory environment variables.

**Please do not modify the original `forta.service` file and instead prefer the override recommended here.** This is needed because the original file will be replaced next time you update `forta` through `yum` or `apt`.

To override systemd service environment, you can set the variables in `/etc/systemd/system/forta.service.d/env.conf` like:

```ini
[Service]
Environment="FORTA_DIR=<your_forta_config_dir>"
Environment="FORTA_PASSPHRASE=<your_forta_passphrase>"
```

!!! note "Alternative Systemd Override Path"
    In our previous tests, it was confirmed that this approach works in Ubuntu, Debian, CentOS and Fedora. However, it has been reported by several node operators that it sometimes does not work as expected in some distributions. If you are not able to make this work using the suggested path above, you can try writing to `/lib/systemd/system/forta.service.d/env.conf` instead, as an alternative.

### Configure Chain APIs

In your Forta directory, there now is a `config.yml` file. You must configure that file so that your scan node knows how to get its blockchain data.

Your scan node will be registered to scan a single chain. To let your scan node pull chain data, you need to provide a valid `scan.jsonRpc.url`.

!!! warning "Public JSON-RPC APIs"
    While there are public endpoints available for many chains, **please note that the quality of an endpoint drives the quality of a scan node's output which in turn affects rewards and slashing.** *We strongly recommend providing your own blockchain node or using [Alchemy](alchemy-partnership.md) to setup your Forta node*

If you are scanning Ethereum mainnet, `trace.jsonRpc.url` must also be set as an endpoint that supports `trace_block` method. If you have your own Ethereum node that supports it (e.g. Erigon), you can use that node. If not, you can use an endpoint from a paid plan like Alchemy Growth plan.

!!! note "JSON-RPC APIs"
    Detection bots are able to call JSON-RPC APIs using the scan node's configured endpoints. By default, this is the `scan.jsonRpc.url` but one can separate bot-specific traffic by specifying a `jsonRpcProxy.jsonRpc.url`. We suggest setting this as your own node's JSON-RPC API endpoint if you are running one. If not, it is better to set this as a different JSON-RPC API endpoint than `scan.jsonRpc.url`.

**If your node is scanning chains other than Ethereum mainnet,** please checkout the final section to see options.

Here is an example configuration to scan Ethereum mainnet using Alchemy Growth plan:

```yaml
chainId: 1

# The scan settings are used to retrieve the transactions that are analyzed
scan:
  jsonRpc:
    url: https://eth-mainnet.alchemyapi.io/v2/KEY

trace:
  jsonRpc:
    url: https://eth-mainnet.alchemyapi.io/v2/KEY

# The proxy settings are used for detection bots to make their own json-rpc calls.
# By default, this is set to the scan node url value. We recommend setting
# this differently than the scan node url value if you are using a paid plan.
jsonRpcProxy:
  jsonRpc:
    url: http://different-api:8545
```

Another example configuration to scan Ethereum mainnet using your Erigon node, which is much simpler:

```yaml
chainId: 1

scan:
  jsonRpc:
    url: http://your-node:8545

trace:
  jsonRpc:
    url: http://your-node:8545

# Defaulting to scan node url because it is not set - the best option when running a node
# jsonRpcProxy:
#   jsonRpc:
#     url: http://your-node:8545
```

### Configure Registry API

There are a set of Forta smart contracts on Polygon, which allows finding out:

- the latest list of bots which a scan node should run
- the latest Forta node service Docker image release

All Forta nodes are expected to run with the latest release and the latest list of the assigned bots. To be able to read these values, Forta nodes use `https://polygon-rpc.com` by default. Please consider changing this to a free Polygon API with high availability, e.g. Alchemy Polygon API, by adding the following configuration:

```yaml
registry:
  jsonRpc:
    url: https://polygon-mainnet.g.alchemy.com/v2/<your-alchemy-api-key>
```

### Custom Telemetry (Optional)

You can specify a custom telemetry handler in the `config.yml` file if you would like to receive health reports from your nodes regularly:

```yaml
telemetry:
  customUrl: http://my.telemetry.data.handler.url
```

The forwarded content is a gzipped JSON which is similar to the `forta status --format json` output.

```json
[
  ...
  {
    "name": "forta.container.forta-scanner.service.agent-pool.agents.total",
    "status": "ok",
    "details": "14"
  },
  {
    "name": "forta.container.forta-scanner.service.block-analyzer.event.input.time",
    "status": "ok",
    "details": "2022-08-17T10:36:20Z"
  },
  {
    "name": "forta.container.forta-scanner.service.block-analyzer.event.output.time",
    "status": "ok",
    "details": "2022-08-17T10:36:20Z"
  },
  {
    "name": "forta.container.forta-scanner.service.block-feed.last-block",
    "status": "info",
    "details": "15358230"
  }
  ...
]
```

### Auto-Updates (Optional)

When you install `forta`, set up your node and run it, the CLI starts new service containers which contain the actual work Forta nodes need to do. There is a dynamic updater which is able to follow the "scanner version" smart contract and trigger a node auto-update to get these service containers replaced with the latest version.

Let's assume that you have installed `forta` v0.5.0 through APT or YUM. When you configure and run your node, what happens next is:

- CLI starts the updater with the v0.5.0 container image (bootstrap version)
- Updater detects from the smart contract that v0.5.1 is the latest
- CLI learns this, stops the updater, downloads the v0.5.1 image
- CLI starts the updater with the v0.5.1 container image
- CLI starts the supervisor with the v0.5.1 container image
- Supervisor starts new containers on the same host

There is a linear 24h release schedule mechanism which allows each node to auto-update at different moments. To receive the updates immediately whenever there is a new release, it is sufficient to restart `forta` and it will follow the steps described above.

!!! note "Manual Update"
    You need manual update through APT or YUM only if you need to receive the latest CLI features. As in the above example, CLI of an older version is able to successfully run the service container image of the newer version.

To disable the auto-update behavior, you can add this to your config:

```yaml
autoUpdate:
  disable: true
```

!!! warning "Disabling Auto-Updates"
    Disabling this feature is strongly discouraged. This feature is designed to make updates more comfortable for you and not following the latest version can cause loss of rewards.

## Register Scan Node

Your scan node has an Ethereum address that makes two main features possible:

- Receiving detection bots to run
- Asserting an authority on the outputted alerts
  
While this address remains as the main identity, it must be owned by a different wallet. After registration, the scan node is minted as an NFT (ERC721) and transferred to this owner. You can check the [smart contract documentation here](smart-contracts.md).

In the future, the owner wallet will allow you to disable your scan node remotely and avoid slashing while you do maintenance (for a short period) or when you decide to shut down your node entirely. Right now, `forta disable` and `forta enable` commands are available to you to do the same using the scan node private key.

To register your node to the registry contract, you can run `forta register --owner-address <address>`. **Make sure you have set the `chainId` in your config.yml correctly before executing this.** Your scan node can be registered only once and to scan a specific chain. The owner wallet address needs to be a different address than your scan node address.

!!! warning "Action requires funds"
    You need to fund your scan node address with some Polygon (Mainnet) MATIC to be able to send this transaction. You can find out your scan node address with `forta account address`.

## Stake FORT

To ensure network reliablity, Forta Network requires staking FORT tokens on your node. You can follow the [staking guide](https://docs.forta.network/en/latest/stake-on-scan-node/) to learn how to manage stake for a node.

!!! warning "All nodes require stake"
    Unstaked nodes node will not be assigned any detection bots and will not generate any rewards.

Forta Network makes good use of the stake by enforcing two main mechanisms:

- **Rewarding:** Node operators are incentivized with rewards to ensure that their Forta nodes are running with good health and as expected. To gain rewards, a node operator must `deposit()` the minimum amount of FORT required using the staking contract.
- **Slashing:** Node operators are discouraged from harmful actions. Upon detection, they lose rewards and a determined amount is removed from the deposited stake. This can cause the staked amount to go under minimum required and the node to enter into disabled state.

## Run Scan Node

### Start Docker

Ensure Docker is running use the docker command `docker ps`.  If it is not running, start docker before running Forta.

### Start Forta via systemd

Run the systemd service to start Forta

```
sudo systemctl daemon-reload
sudo systemctl enable forta
sudo systemctl start forta
```

### Start Forta manually

Run the `forta run` command to start processing blocks.

```
$ forta run --passphrase <your_passphrase>
```

### Verify Execution

Run `forta status` command to see how your scanner is doing. As more services start, this status output will be dynamically updated. If you see any yellows or reds, please check the error messages, your config and your machine's network connectivity. If you can't make any sense of it, please let us know.

You can also view the forta-scanner logs for batches of alerts.

```
$ docker logs -f forta-scanner
```

!!! note "Bot Assignments"
    Your scan node might not have any bots assigned.  This is okay.  As bots are added to the network, the network will assign bots to your node.

To see a list of bots that the node is running, use this command.

```
$ docker ps | grep forta-agent
```

## Scanning other chains

It's best to use your own full node for scanning. If you don't have a node, here are some API alternatives that you can use:

### BSC

You can choose from public BSC endpoints at https://docs.binance.org/smart-chain/developer/rpc.html.

```yaml
chainId: 56

scan:
  jsonRpc:
    url: https://bsc-dataseed.binance.org/

trace:
  enabled: false
```

### Polygon

```yaml
chainId: 137

scan:
  jsonRpc:
    url: https://polygon-rpc.com/

trace:
  enabled: false
```

### Avalanche

```yaml
chainId: 43114

scan:
  jsonRpc:
    url: https://api.avax.network/ext/bc/C/rpc

trace:
  enabled: false
```

### Arbitrum

```yaml
chainId: 42161

scan:
  jsonRpc:
    url: https://arb1.arbitrum.io/rpc

trace:
  enabled: false
```

### Optimism

```yaml
chainId: 10

scan:
  jsonRpc:
    url: https://mainnet.optimism.io

trace:
  enabled: false
```

### Fantom

```yaml
chainId: 250

scan:
  jsonRpc:
    url: https://rpc.ftm.tools/

trace:
  jsonRpc:
    url: https://rpcapi-tracing.fantom.network/
```

## Monitor SLA

To monitor whether your scan node is performing well, use the [SLA-API](sla-api.md)

## The Merge

!!! important "Only for Ethereum Mainnet"
    This section was prepared only for Forta node operators who would like to point their Forta nodes to their own Ethereum Mainnet nodes. If your Forta node is scanning chains other than Ethereum Mainnet, you can safely ignore this section altogether.

To prepare for [The Merge](https://www.alchemy.com/the-merge), your Erigon node (Execution Layer - EL) will need to be run with a beacon node (Consensus Layer - CL). Few consensus layer clients are listed below:

  - Prysm
  - Lighthouse
  - Lodestar
  - Nimbus
  - Teku

For more information on versions of these clients, please see the [Ethereum Merge announcement](https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/) blog post. **Make sure to upgrade your clients to these versions before September 6**

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

#### Follow installation docs

As yet another option, you can run a beacon node using Prysm by following [Prysm Beacon Node](https://docs.prylabs.network/docs/install/install-with-script#step-4-run-a-beacon-node-using-prysm).

You will need to pass `--jwt-secret=<path_to_erigon_jwt_hex>` to the beacon node. It doesn't require `--suggested-fee-recipient` flag unless you are running a [validator](https://docs.prylabs.network/docs/install/install-with-script#step-5-run-a-validator-using-prysm). Additionally you can pass `--slots-per-archive-point=1` to the beacon node to improve the performance of API retrieval. For more information on slots per archive point, please see [Prysm Beacon Node API Rationale](https://docs.prylabs.network/docs/advanced/beacon_node_api#rationale).

After running with any method mentioned above, you should be able to see the beacon node running and syncing. This usually takes a couple days, but it can take longer depending on your network and hardware specs.
