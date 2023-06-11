## Resources

You can use any machine from any cloud hosting provider or your very own phyiscal computer, as long as the option you choose is able to satisfy the resource requirements.

The following are the host requirements for running **one** Forta scan node.

- 64-bit Linux distribution
- CPU with 4+ cores
- 16GB RAM
- Connection to internet
- Docker v20.10+
- 100GB SSD

!!! important "Running multiple nodes"
    If you would like to use a big machine to run multiple scan nodes, please isolate each node by using virtual machines and dedicate the resources listed above to each node.

	Trying to run multiple scan nodes in one machine without isolation can cause loss of rewards.

!!! important "Security"
    Forta scan node software uses isolation techniques to prevent detection bot code from executing malicious actions. Please make sure you take extra measures and strengthen your host machines:

      - Implement iptables rules to disallow access to sensitive subnetworks.
      - Do not equip your machines with strong cloud privileges.

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
