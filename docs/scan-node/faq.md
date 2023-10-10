# First Asked Questions

### Q1: Why is my failing node's SLA score still zero after restart?

SLA score is per hour and it is calculated after an hour is over. It could be that it is not calculated just yet.

To verify that you have eliminated the problem, please visit the [troubleshooting](troubleshoot.md) page and see the other questions on this page.

Please also make sure that you are running the latest version of the Forta node. See the [upgrade page](upgrade.md) for more details on how to keep your node _automatically_ up-to-date.

### Q2: Why is my node still having a low SLA score after changing the scan API from free API X to free API Y?

Free APIs can enforce unexpected rate limits which might disallow your node from pulling chain data, at some point. Changing from one free API to another does not guarantee that your node will start having good performance.

To avoid this kind of situations and loss of rewards, please reconsider the recommendations in the [Pick a provider](configure.md#pick-a-provider) section.

### Q3: Why do my nodes have a different score than the SLA API on the pool page?

The SLA API returns the last couple of hours by default, unless you specify a time range. The score shown on the top is the average of those hours.

The pool page on Forta App and the scan node page on Forta Explorer show the average of the past 168h (an epoch) continuously. As your node works better and time passes, this number improves. This is useful for the delegators to understand how reliable one pool is over the course of an epoch-long time window.

You might sometimes find that even though you have fixed the problem with your node and the SLA API returns a higher score, the pool page still shows a lower score. These two numbers can differ due to the time range difference explained above.

### Q4: How do I understand what `forta status all` or `forta status --show all --format oneline` is showing me?

Please visit the [troubleshooting](troubleshoot.md) page to find out more.

### Q5: Why are my rewards so low this week?

There are multiple factors that affect the rewards. While the allocated stake amount plays a large role in the proportion of rewards, having a low SLA score has a critical effect on the rewards. If the nodes do not perform well, it does not matter how much stake is deposited. Please see the [formula](../delegated-staking-rewards.md#formula) for exact details.

As an alternative, you can use the estimator to simplify the calculation:

1. Visit the [estimator spreadsheet](https://docs.google.com/spreadsheets/d/11YUl_9yzEygeH8YumAIAB1cf1nsQnrJy84gd90SQTb4/edit).
2. Make a copy of the file to your own Google Drive (File => Make a Copy).
3. Use the input cells (the yellow ones) to play with different combinations of commission and stake and see the results in the output cells.

Please note that this is _just an estimation_ and may not reflect the exact reward amounts. It is for giving pool owners and delegators a sense of possible outcomes under different conditions.

### Q6: Why are my rewards lower after accepting delegation to my pool?

You can validate the condition by using the estimator. Increasing the commission might help.

### Q7: Why is `forta status all` output showing a "not found" error in `chain-json-rpc-client.request.block-by-number.error`?

This error occurs whenever the scan node is requesting the next block from the scan API but it is not available just yet. This error is safe to ignore and does not have any side effects on the SLA score.

This is still displayed in order to capture whatever error is produced.

### Q8: Why is the forta-scanner container showing many "not found" errors?

The answer is same as Q3.

### Q9: Why is the forta-scanner container showing many "error invoking bot" errors?

The bot seems to be having a problem while handling inputs given by the node. Please check first if there is a problem with the JSON-RPC API:

```
forta status all | grep service.json-rpc-proxy.api
```

If this looks good, then please make sure that your node has enough bandwidth to make outgoing requests (using the [Speedtest CLI](https://www.speedtest.net/apps/cli) or similar).

If everything looks good and the problem is still not resolved, then it is likely that the bot operates too slowly. There is not much you can do as the operator and this will not have an effect in your node's SLA score.

### Q10: How can I register my node to another pool?

Once a scan node is registered to a pool, it cannot be moved to another pool. You can disable it, withdraw the portion of the stake for it from the pool, deposit that stake on the other pool and register a new node.

### Q11: How can I remove a node from my pool?

You cannot remove a node from a pool. You can keep it as a disabled node without any negative side effects.

### Q12: How can I run more bots on my node?

The network assigns bots to available nodes as required and the operators do not need to take any actions. Running more bots does not increase the rewards.

### Q13: Why cannot I withdraw my stake even though I initiated a withdrawal?

There is a delay of 10 days between initiating a withdrawal and actually withdrawing.

### Q14: How can I get FORT on Polygon Mainnet?

You need to first have FORT on your Ethereum Mainnet wallet and bridge it over to Polygon Mainnet. You can see this [bridge tutorial](../bridging-fort.md) if you are looking for steps.

### Q15: How can I scan another network with my node?

A scan node is registered to scan only one chain. It cannot switch to other chains and cannot scan multiple chains at once.

### Q16: How can I recover my lost node?

The scan node private key does not own or control the staked FORT.

You can safely disable the lost scan node from the pool and register a new one.

- [Disable](../scanner-pools.md#disabling-existing-nodes) the lost node from your pool on the [Forta App](https://app.forta.network).
- Do `forta init --passphrase <your-passphrase>` to initialize a new node.
- Now you have a new `~/.forta` directory with a new private key.
- Copy your backed up config to `~/.forta/config.yml` or configure that file from scratch.
- [Register the scan node](register.md).

That's it!
