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

## How to determine the right sharding configuration?

Sharding is needed if your bot is unable to keep up with the transaction throughput of the chain. It essentially is too slow. For instance, BSC adds a block every 3 seconds; recently, there are about 70 tx in each block on average. This means, the bot needs to process a tx in approximately 40ms. If your bot is slower than this, the bot may fall behind and transactions are dropped. 

The first step would be to assess whether the bot indeed drops transactions. The bot health page provides insights through the Dropped view ([example](https://explorer.forta.network/bot/0xa91a31df513afff32b9d85a2c2b7e786fdd681b3cdd8d93d6074943ba31ae400)).

Second, start measuring the performance of your bot through a unit test. In this test, you would want to exercise the different code paths of your bot (the cheap and expensive paths) and calculate a weighted average processing time based on the performance of these code paths ([example](https://github.com/forta-network/starter-kits/blob/main/funding-tornado-cash-py/src/agent_test.py)). 

Once the performance is known, one can derive a sharding configuration. For instance, if your bot takes 120ms on average to process a transaction, it would be too slow for the BSC chain. In that case, you would want to distribute the transactions to approximately 3 shards.

Once configured, it is essential to deploy the bot and review the bot stats page. You tested your bot on your local machine and the performance of your machine may differ from the scan nodes on the network. Some experimentation and iteration may be needed to utilize sharding in a way where every transaction/block gets processed reliably.