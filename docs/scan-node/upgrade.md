# Keep Your Node Up-To-Date

## Deprecation

All nodes need to start running the latest **container** versions within 7 days after the latest release, by default. [The releases made on GitHub](https://github.com/forta-network/forta-node/releases) may contain a release config that overrides the version support and reduces the deprecation time:

```yaml
# @begin release_config
deprecationPolicy:
  supportedVersions:
    - v0.7.9
  activatesInHours: 72
# @end release_config
```

The nodes which run unallowed versions may receive a low SLA score.

## Auto-updates

To help you in this process, the node software includes an auto-updater that detects new container images, pulls, stops old containers and starts new containers.

In order to ensure that this feature works at all times, please set the registry API to a reliable one, as suggested in the [Configure Registry API](configure.md#configure-registry-api) section.

Each node updates at a specific time within 24 hours, unless overridden by the config in [the release made on GitHub](https://github.com/forta-network/forta-node/releases):
```yaml
# @begin release_config
autoUpdateInHours: 6
# @end release_config
```

To receive the container update without stopping the bots and updating the CLI, please do
```
docker kill forta-updater
```
and the updater container will pick up the latest release when it is started again.

!!! note "Manual Update"
    You need manual update through APT or YUM only if you need to receive the latest CLI features. As in the above example, CLI of an older version is able to successfully run the service container image of the newer version.

To disable the auto-update behavior, you can add this to your config:

```yaml
autoUpdate:
  disable: true
```

!!! warning "Disabling Auto-Updates"
    Disabling this feature is strongly discouraged. Not following the latest version can cause loss of rewards.

## Check the running version

Starting with v0.7.10, `forta version` outputs the CLI and container version separately. While using the CLI from versions provides a better experience, it is only necessary to have the latest container version.

Example output:

```json
$ forta version
{
  "cli": {
    "commit": "ef621ff8cf9e467e021630a6c0367214883e1130",
    "ipfs": "QmbnNB1iyrNthzSptqxXkdz4RHfU3g5Y7QesLhbmv5xrF2",
    "version": "v0.1.2"
  },
  "containers": {
    "commit": "ef621ff8cf9e467e021630a6c0367214883e1130",
    "ipfs": "QmbnNB1iyrNthzSptqxXkdz4RHfU3g5Y7QesLhbmv5xrF2",
    "version": "v0.2.3"
  }
}
```

Container version will be visible after running the node in the following steps.
