## Start Docker

Ensure Docker is running by using the docker command `docker ps`.  If it is not running, start docker before running Forta.

## Start Forta

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
forta run --passphrase <your_passphrase>
```

Please prefer the systemd option to handle restarts better.

## Verify execution

Run `forta status` command to see how your scanner is doing. As more services start, this status output will be dynamically updated. If you see any yellows or reds, please check the error messages, your config and your machine's network connectivity. If you can't make any sense of it, please let us know.

You can also view the forta-scanner logs for batches of alerts.

```
docker logs -f forta-scanner
```

!!! info "Bot Assignments"
    Your scan node might not have any bots assigned.  This is okay.  As bots are added to the network, the network will assign bots to your node.

To see a list of bots that the node is running, use this command.

```
docker ps | grep forta-agent
```
