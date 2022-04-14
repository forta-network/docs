# Long running tasks

Both `handleBlock` and `handleTransaction` functions are required to return within a timeout specified by the network (currently 30 seconds). This should be enough time for most bots to complete, but if you need longer for your bot (e.g. you need to execute many network calls) you can still return findings asynchronously.

This page covers how to execute long running tasks using a Javascript example bot. The code for this example can be found [here](https://github.com/forta-protocol/forta-agent-examples/tree/master/long-running-task-js).

## Triggering an asynchronous task

The main concept behind this technique is to fire an asynchronous function inside of the `handleBlock` handler and cache any generated findings in-memory. Each time `handleBlock` is called, we check whether our long running task should be triggered and also whether there are any findings in our cache to return:

```javascript
let findingsCache = [];
let isTaskRunning = false;

async function runLongTask(blockNumber) {
  isTaskRunning = true;

  // long-running code goes here and adds any findings to findingsCache

  isTaskRunning = false;
}

async function handleBlock(blockEvent) {
  // make sure only one task is running at a time
  if (!isTaskRunning) {
    runLongTask(blockEvent.blockNumber);
  }

  let findings = [];

  // check if we have any findings cached
  if (findingsCache.length > 0) {
    findings = findingsCache;
    findingsCache = [];
  }

  return findings;
}
```

The `runLongTask` function above is declared as `async` and is where the long running code would be placed. Note that when it is invoked in `handleBlock`, we are not `await`ing it (so that it runs in the background). The `isTaskRunning` flag also ensures that there is only ever one long running task executing.

## Other considerations

- Since the finding may be returned at a later point in time, it will not be associated with the block that triggered it. To get around this, you can store all the information you need from the block inside the `metadata` of the finding
- The long running task is being triggered from `handleBlock` in the example, which should fire on average every 15 seconds for Ethereum mainnet. You may want more regular fixed intervals to trigger your task, in which case you can use the Node.js `setInterval` function and invoke it from the bot's `initialize` handler
- The above example uses a simple flag (i.e. `isTaskRunning`) to ensure only one task is running, but based on your requirements you may customize this logic further e.g. making sure a minimum amount of time has passed before triggering the next task

Great! You now have a bot that can execute tasks longer than Forta's specified timeout and return findings.
