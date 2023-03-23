# Increasing bot throughput with sharding

Some detection bots may have difficulty keeping up with the volume of blocks/transactions (either because of the bot's logic, or due to the speed of the blockchain being scanned). One solution is to use sharding to increase throughput for your detection bot. With sharding, you can increase the number of instances of your detection bot and split the blocks/transactions across these instances.

By default, each detection bot is deployed to multiple scan nodes (currently, 3 per each chain being scanned) and each of these 3 bot instances receive **all** of the blocks/transactions for the chain being scanned. Another way to say this: by default, a detection bot _targets_ 3 instances with only 1 _shard_ per instance.

## Enabling sharding

To enable sharding, you need to configure it in your package.json using the `chainSettings` property. Here is a simple example of a sharding configuration:

```
"chainSettings":{
   "1": {
      "shards": 2,
      "target": 2
   }
}
```

The above configuration only applies to the Ethereum chain (as indicated by the `"1"` key), and targets 2 bot instances with 2 shards each i.e. the total number of bot shards will be 2 x 2 = 4. Each shard will receive only half of the Ethereum blocks/transactions. With this configuration in package.json, you just need to publish the bot using `npm run publish` to deploy the shards.

Currently, the maximum number of possible shards is 6. It is also worth mentioning that each shard can potentially be running on a different scan node.

## More configuration examples

Here is a slightly more complex sharding configuration in package.json for a detection bot scanning multiple chains:

```
"chainIds": [1, 137, 56, 10],
"chainSettings": {
    "default": {
        shards: 2,
        target: 3,
    },
    "137": {
       shards: 3,
       target: 2,
    }
}
```

In this configuration, the bot is deployed to 4 different chains (as indicated by `chainIds`). The sharding configuration specifies a `default` target of 3 instances with 2 shards each (the default sharding config will be used for chains where a specific config is not given). Also, the config specifies that on the Polygon chain (`137`) the bot should target 2 instances with 3 shards each.
