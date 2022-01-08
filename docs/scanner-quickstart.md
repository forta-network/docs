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
$ sudo echo 'deb [signed-by=/usr/share/keyrings/forta-keyring.asc] https://dist.forta.network/repositories/apt stable main' > /etc/apt/sources.list.d/forta.list
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

Take note of the address. This is the value that will be registered in the scan node registry smart contract.

!!! note "Forta Directory"
    By default, the forta directory is located in `~/.forta`. If you would like to use a different directory, either set the $FORTA_DIR env var or provide the `--dir` flag to the `init` command. Init command will initialize your Forta configuration and key to this directory.

### Configure systemd

If the binary ever stops, it must be restarted.  If you used a package installation method, there is a forta systemd service that can now be updated with your passphrase and config directory.

Run this command to find your service file:

```
systemctl cat forta.service
```

Edit the file, and replace `<PASSPHRASE>` and `<CONFIG_DIR>` with the correct values.

Example Config
```
[Unit]
Description=Forta
After=network-online.target
Wants=network-online.target systemd-networkd-wait-online.service

StartLimitIntervalSec=500
StartLimitBurst=5

[Service]
Restart=on-failure
RestartSec=15s

ExecStart=/usr/bin/forta run --passphrase <PASSPHRASE> --dir <CONFIG_DIR>

[Install]
WantedBy=multi-user.target
```

### Configure config.yml

In your Forta directory, there now is a `config.yml` file. You must configure that file so that your scan node knows how to get its blockchain data.

Set the `scan.jsonRpc` and `trace.jsonRpc` values. If you have your own Ethereum node, you can use that node. The trace endpoint must support `trace_block` from the Parity Trace API.

!!! note "JSON-RPC APIs"
    The scan node will request every transaction on a target chain, which can add up to a lot of requests. Ensure your endpoints can accept the appropriate level of traffic.  
    
    We suggest running your own ethereum light node for the `scan.jsonRpc` and an Alchemy Growth plan for `trace.jsonRpc` endpoint.  

!!! warning "Public JSON-RPC APIs"
    While there are public endpoints available for many chains, please note that the quality of an endpoint will drive the quality of a scan node's output.  
    
    When Forta node economics are introduced, the quality of a scan node's output will drive rewards and slashing.  We strongly recommend providing your own ethereum light node or using a paid provider when possible.

Example configuration

```yaml
chainId: 1

# The scan settings are used to retrieve the transactions that are analyzed
scan:
  jsonRpc:
    url: https://mainnet.infura.io/v3/KEY

# The trace endpoint must support trace_block (such as alchemy)
trace:
  jsonRpc:
    url: https://eth-mainnet.alchemyapi.io/v2/KEY

```

## Register Scan Node

Please contact the Forta team and provide your node address.  Once approved, we will add your node to the Forta network.

!!! important "Early Decentralization Phase"
    At this phase, only Forta-approved nodes are allowed onto the network. In later phases, Forta will introduce economic security measures that will allow permissionless scan nodes.

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

View the forta-publisher logs for batches of alerts.

```
$ docker logs -f forta-publisher
```

!!! note "Agent Assignments"
    Your scan node might not have any agents assigned.  This is okay.  As agents are added to the network, the network will assign agents to your node.

To see a list of agents that the node is running, use this command.

```
$ docker ps | grep forta-agent
```
