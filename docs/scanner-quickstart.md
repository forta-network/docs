# Run a Scan Node

This page contains the steps and technical recommendations to help you set up your node. Please always refer to this documentation for the most up-to-date information.

If you have not seen the full list of onboarding steps yet, please see them first through [here](https://forta.notion.site/Forta-Fortification-Network-4a8af3ab4aea480d993e5095ad0ed746). You can feel free to follow this documentation and start your node while your application is being reviewed but please also keep in mind that your application may get rejected (**update**: due to overwhelming interest, onboarding has been paused)

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

```bash
erigon-rpcdaemon --http.vhosts '*' --http.port 8545 --http.addr 0.0.0.0 --http.corsdomain '*' --http.api 'eth,net,web3,trace' --private.api.addr=localhost:9090

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

### Configure config.yml

In your Forta directory, there now is a `config.yml` file. You must configure that file so that your scan node knows how to get its blockchain data.

Your scan node will be registered to scan a single chain. To let your scan node pull chain data, you need to provide a valid `scan.jsonRpc.url`.

!!! warning "Public JSON-RPC APIs"
    While there are public endpoints available for many chains, **please note that the quality of an endpoint drives the quality of a scan node's output which in turn affects rewards and slashing**. We strongly recommend providing your own blockchain node or using a paid provider when possible.

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

## Register Scan Node

Your scan node has an Ethereum address that makes two main features possible:

- Receiving detection bots to run
- Asserting an authority on the outputted alerts
  
While this address remains as the main identity, it must be owned by a different wallet. After registration, the scan node is minted as an NFT (ERC721) and transferred to this owner. You can check the [smart contract documentation here](smart-contracts.md).

In the future, the owner wallet will allow you to disable your scan node remotely and avoid slashing while you do maintenance (for a short period) or when you decide to shut down your node entirely. Right now, `forta disable` and `forta enable` commands are available to you to do the same using the scan node private key.

To register your node to the registry contract, you can run `forta register --owner-address <address>`. **Make sure you have set the `chainId` in your config.yml correctly before executing this.** Your scan node can be registered only once and to scan a specific chain. The owner wallet address needs to be a different address than your scan node address.

!!! warning "Action requires funds"
    You need to fund your scan node address with some Polygon (Mainnet) MATIC to be able to send this transaction. You can find out your scan node address with `forta account address`.

After your registration transaction is included in the next block, you can start your node as described in the next section. However, your node will not be assigned any detection bots or generate any rewards until the application you submitted through [the application form](https://docs.google.com/forms/d/e/1FAIpQLSe7p8LYECwDJetO2eCXBzs0H7dt7aEcoisexVteCIu7wVx_pg/viewform) succeeds.

If your application succeeds, you will receive an email with a link to a second form. Once your node is running, complete this second form with your node address (found via `forta account address`) as soon as possible so Forta Foundation can stake on your behalf.  We only stake on running nodes to avoid impacting overall network reliability.

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
