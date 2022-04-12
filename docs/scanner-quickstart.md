# Run a Scan Node

!!! important "Early Decentralization Phase"
    At this phase, only Forta-approved nodes are allowed onto the network. In later phases, Forta will introduce economic security measures that will allow permissionless scan nodes.

## Scan Node Requirements

The following are the requirements for running a Forta scan node.

- 64-bit Linux distribution
- CPU with 4+ cores
- 16GB RAM
- Connection to Internet
- Docker v20.10+
- **Recommended:** Ethereum Light Node

## Install and Configure Geth Light Node

[Install Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth)

!!! note "Geth"
    Be sure to set `--http.vhosts` to allow hostname access, and enable `eth,net,web3` http apis.

Example execution
```
geth --http.vhosts '*' --mainnet --syncmode "light" --http --http.port 8545 --http.addr 0.0.0.0 --http.corsdomain '*' --http.api 'eth,net,web3'
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

Initialization creates a private key that will sign the alerts from your scan node.  You must set the $FORTA_PASSPHRASE environment variable or provide the --passphrase flag to the `init` command.

Initialize Forta using the `forta init` command

```
$ forta init --passphrase <your_passphrase>
```

This generates a config directory, a private key, and output your address

```
Scanner address: 0xAAA8C491232cB65a65FBf7F36b71220B3E695AAA

Successfully initialized at /yourname/.forta
```

Take note of the address. This is the value that will be registered in the scan node registry smart contract. If you need to find out your address later again, you can run `forta account address`.

!!! note "Forta Directory"
    By default, the forta directory is located in `~/.forta`. If you would like to use a different directory, either set the $FORTA_DIR env var or provide the `--dir` flag to the `init` command. Init command will initialize your Forta configuration and key to this directory.

### Configure systemd

If the binary ever stops, it must be restarted. If you used a package installation method, there is a Forta systemd service that can be enabled and overridden with your passphrase and config directory environment variables.

To override systemd service environment, you can set the variables in `/etc/systemd/system/forta.service.d/env.conf` like:

```ini
[Service]
Environment="FORTA_DIR=<your_forta_config_dir>"
Environment="FORTA_PASSPHRASE=<your_forta_passphrase>"
```

### Configure config.yml

In your Forta directory, there now is a `config.yml` file. You must configure that file so that your scan node knows how to get its blockchain data.

Your scan node is registered to scan a single chain. To let your scan node pull chain data, you need to provide a valid `scan.jsonRpc.url`.

!!! warning "Public JSON-RPC APIs"
    While there are public endpoints available for many chains, please note that the quality of an endpoint drives the quality of a scan node's output which in turn affects rewards and slashing. We strongly recommend providing your own blockchain node or using a paid provider when possible.

If you are scanning Ethereum mainnet, `trace.jsonRpc.url` must also be set as an endpoint that supports `trace_block` method from the Parity Trace API. If you have your own Ethereum node, you can use that node.

!!! note "JSON-RPC APIs"
    Agents are able to call JSON-RPC APIs using the scan node's configured endpoints. By default, this is the `scan.jsonRpc.url` but one can separate Agent-specific traffic by specifying a `jsonRpcProxy.jsonRpc.url`.  Ensure your endpoints can accept the appropriate level of traffic. We suggest running your own Ethereum light node for the `jsonRpcProxy.jsonRpc.url` and an Alchemy Growth plan for `trace.jsonRpc.url` and `scan.jsonRpc.url` endpoint.

**If your node is scanning chains other than Ethereum mainnet,** please checkout the final section to see options.

Example configuration to scan Ethereum mainnet:

```yaml
chainId: 1

# The proxy settings are used for agents to make their own json-rpc calls
# By default, this is set to the scan node url value
jsonRpcProxy:
  jsonRpc:
    url: http://your-node:8545

# The scan settings are used to retrieve the transactions that are analyzed
scan:
  jsonRpc:
    url: https://eth-mainnet.alchemyapi.io/v2/KEY

# The trace endpoint must support trace_block (such as alchemy)
trace:
  jsonRpc:
    url: https://eth-mainnet.alchemyapi.io/v2/KEY
```

## Register Scan Node

Your scan node has an Ethereum address which allows receiving detection bots to run and asserting an authority on the outputted alerts. While it remains as the main identity, it is ownable and manageable by a different owner wallet.

The owner wallet address you provide upon registering is able to disable your scan node later. This action is useful to avoid slashing while you do maintenance or when you shut down your node entirely. The owner wallet address needs to be a different address than your scan node address.

To register your node to the registry contract, you can run `forta register --owner-address <address>`.

!!! warning "Action requires funds"
    You need to fund your scan node address with some Polygon (Mainnet) MATIC to be able to send this transaction. You can find out your scan node address with `forta account address`.

When your transaction goes through, you can run your node as described in the next section. Your node will be assigned new bots as new ones arrive to the network.

Make sure to find us in [Discord](https://discord.gg/cE774RyA) node operator support channel and fill out the application form so your node can be fully enabled and receive bots.

!!! important "Early Decentralization Phase"
    At this phase, only Forta-approved nodes are allowed onto the network. This will be permissionless when staking becomes publicly accessible.


## Run Scan Node

### Start Docker

Ensure Docker is running use the docker command `docker ps`.  If it is not running, start docker before running Forta.

### Start Forta via systemd

Run the systemd service to start Forta

```
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

You can also view the forta-publisher logs for batches of alerts.

```
$ docker logs -f forta-publisher
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

## Monitor SLA

To monitor whether your scan node is performing well, use the [SLA-API](sla-api.md)
