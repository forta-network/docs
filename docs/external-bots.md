# External bots

"External bots" are a new type of detection bot that run outside of the Forta Network (i.e. not on a scan node) but can still submit alerts. This can be helpful if you want to run a detection bot using your private IP while still contributing intel. External bots are still required to register on-chain in order to submit alerts.

The responsibility to execute the bot lies with the developer. You can run your external bot in any environment suitable to you and submit alerts using the GraphQL API directly or using the convenient SDK methods as described below.

## Publishing an external bot

Publishing an external bot is largely similar to publishing a normal bot. You can publish using the Forta App UI or the CLI. This step will register your bot ID in the on-chain bot registry.

### via Forta App

To publish an external bot using the Forta App, you simply need to check the "External Bot" checkbox (under the "Docker Image" field) on the [Deploy Bot](https://app.forta.network/deploy-agent) form.

![External bot UI](external-bots-ui.png)

You can then proceed with publishing by filling in the remaining fields.

### via CLI

To publish an external bot using the CLI, all you need to do is set the `external` property in your package.json like this:

```
{
  ...
  "external": true,
  ...
}
```

The command to publish the bot is the exact same: `forta-agent publish` (or `npm run publish`).

## Submitting alerts

Before you can submit any alerts, you need to [generate an API key](api-keys.md) in order to interact with the GraphQL API. Any alerts submitted can be queried for through the GraphQL API or via the Forta Explorer UI.

### via the SDK

The SDK provides a convenient method to submit alerts called `sendAlerts` (or `send_alerts` in Python). **Make sure to set the `FORTA_API_KEY` environment variable with your API key first**. You can submit a list of alerts or an individual alert using the same `Finding` object as before. The key difference is that you need to specify the `botId` for which you are submitting an alert (this also implies you can submit alerts for different bots in the same request).

Here is some example Typescript usage:

```js
import {
  sendAlerts,
  Finding,
  FindingType,
  FindingSeverity,
  Label,
  EntityType,
} from "forta-agent";

const response = await sendAlerts({
  botId: "0x42265c815a3f2cc137bcd30f6688760ac0201911ce6006576b4b3e7f6e62ddc6",
  finding: Finding.from({
    name: `test ${Date.now()}`,
    description: "this is a test",
    alertId: "TEST_1",
    type: FindingType.Exploit,
    severity: FindingSeverity.Info,
    labels: [
      Label.from({
        entityType: EntityType.Address,
        entity: "0x87fb424282bd043de413aa74153af074d8c9bbb5",
        confidence: 0.95,
        label: "Attacker",
        metadata: {
          some: "data",
        },
      }),
      Label.from({
        entityType: EntityType.Unknown,
        entity: "test",
        confidence: 0.15,
        label: "Hacker",
      }),
    ],
    source: {
      chains: [
        {
          chainId: 137,
        },
      ],
      transactions: [
        {
          chainId: 137,
          hash: "0xcc8dedfbc2c2757e793ccc781746a8996658541885017314ced5138ae6009f26",
        },
        {
          chainId: 1,
          hash: "0x0ce941aae4eecdd1cae0fe4c90e8c3b14a84f346b669c60e654b2eecd736b9b6",
        },
      ],
    },
    addresses: ["0x87fb424282bd043de413aa74153af073d8c9bbb5"],
    metadata: {
      chain: "137",
    },
    uniqueKey: `TEST-${Date.now()}`,
    timestamp: new Date(1694214981000), // you can specify when this alert was created (defaults to now)
  }),
});
console.log(response);
```

As well as some example Python usage:

```python
import os
from datetime import datetime
from forta_agent import Finding, Label, FindingType, FindingSeverity, EntityType, send_alerts

response = send_alerts([{
    "bot_id": "0x075384e577be5c17efdc6cec5e80b3f84fb5b40257d8ecdd8ab0a542f8a6e084",
    "finding": Finding({
        "name": f'test {datetime.now()}',
        "description": "this is a test",
        "alert_id": "TEST_1",
        "type": FindingType.Exploit,
        "severity": FindingSeverity.Info,
        "labels": [
            Label({
              "entityType": EntityType.Address,
              "entity": "0x87fb424282bd043de413aa74153af073d8c9bbb5",
              "confidence": 0.95,
              "label": "Attacker",
              "metadata": {
                  "some": "data",
              },
            }),
            Label({
                "entityType": EntityType.Unknown,
                "entity": "test",
                "confidence": 0.15,
                "label": "Hacker",
            }),
        ],
        "source": {
            "chains": [
                {
                    "chainId": 137,
                },
            ],
            "transactions": [
                {
                    'chainId': 137,
                    'hash': "0xcc8dedfbc2c2757e793ccc781746a8996658541885017314ced5138ae6009f26",
                },
                {
                    'chainId': 1,
                    'hash': "0x0ce941aae4eecdd1cae0fe4c90e8c3b14a84f346b669c60e654b2eecd736b9b6",
                },
            ],
        },
        "addresses": ["0x87fb424282bd043de413aa74153af073d8c9bbb5"],
        "metadata": {
            "chain": "137",
        },
        "uniqueKey": f'TEST-{datetime.now().timestamp()}',
        "timestamp": datetime.fromtimestamp(1694214981)
    })
}, {
    "bot_id":  "0x075384e577be5c17efdc6cec5e80b3f84fb5b40257d8ecdd8ab0a542f8a6e084",
    "finding": Finding({
        "name": f'test {datetime.now()}',
        "description": "this is a test",
        "alert_id": "TEST_1",
        "type": FindingType.Exploit,
        "severity": FindingSeverity.Info
    })
},
])
print(response)

```

### via the GraphQL API

If you want to interact with the GraphQL API directly, you can access the endpoint at [https://api.forta.network/graphql](https://api.forta.network/graphql). **Make sure to set the `Authorization` header with your API key first**. The name of the mutation to submit alerts is `sendAlerts`. Check out the schema to understand the inputs and their types.
