# Adding labels to findings

Labels provide a way to add more contextual data to findings generated by Forta bots. This information can be used to answer questions like "which addresses have been involved in flashloan attacks?" or "which blocks contain exploits?". The Forta bot SDK provides an easy way to specify labels which this page will describe.

## Adding labels

Bots return `Finding` objects from their handler functions, which now includes a `labels` field to specify a list of labels to add. Here is an example of adding labels:

```javascript
Finding.from({
  name: "High Tether Transfer",
  description: "High amount of USDT transferred",
  alertId: "FORTA-1",
  severity: FindingSeverity.High,
  type: FindingType.Suspicious,
  labels: [
    {
      entityType: EntityType.Address,
      entity: "0x062dB680e5DCA653248432fC1B4F788E41c83234",
      label: "attacker",
      confidence: 0.9,
    },
    {
      entityType: EntityType.Transaction,
      entity:
        "0xfb141d179b40d895ba227c26860d7f49744fe50bdf89a6e6e21978c09c7ac05f",
      label: "flashloan-attack",
      confidence: 0.7,
    },
  ],
});
```

The first label in the above code snippet is saying with 90% certainty that the specified address is an attacker. The second label is saying with 70% certainty that the specified transaction is a flashloan attack.

You can add one or more label objects to a Finding. Each label object should specify all the 4 required fields: `entity`, `entityType`, `label` and `confidence`. The `label` field can be any string you choose to allow flexibility of supporting many different types of labels. The `entity` is the item being described and is of `entityType` which supports 5 different types: `Address`, `Transaction`, `Block`, `Url` and `Unknown`. The `confidence` level should be a number between 0 and 1.

## Removing labels

You can also remove labels from entities which works very similarly to adding labels. The only difference is setting the `remove` field to the boolean true value on the label. For example, if we wanted to now remove the "flashloan-attack" label from the transaction that we specified above, we can do this in a subsequent finding like so:

```javascript
Finding.from({
  name: "High Tether Transfer",
  description: "High amount of USDT transferred",
  alertId: "FORTA-1",
  severity: FindingSeverity.High,
  type: FindingType.Suspicious,
  labels: [
    {
      entityType: EntityType.Transaction,
      entity:
        "0xfb141d179b40d895ba227c26860d7f49744fe50bdf89a6e6e21978c09c7ac05f",
      label: "flashloan-attack",
      confidence: 0.7,
      remove: true,
    },
  ],
});
```

Notice that all values of the label are the same, but we just added `remove: true`.

## Querying labels

You can query for labels using the Forta Labels API which currently returns a list of label events. These label events tell you when certain labels were added/removed, ordered by timestamp. You can access the REST API at `https://api.forta.network/labels/events`.

If instead you only want the _latest state_ of the labels for an entity (i.e. instead of all the add/remove label events as above), you can use the endpoint at `https://api.forta.network/labels/state`.

The API supports the following query parameters (**at least one** of `entities`, `labels`, or `sourceIds` is required):

- `entities` - comma-delimited string of entities to query e.g. `?entities=0x062dB680e5DCA653248432fC1B4F788E41c83234,0x062dB680e5DCA653248432fC1B4F788E41c83235`
- `labels` - comma-delimited string of labels to query e.g. `?labels=attacker,exploit`
- `sourceIds` - comma-delimited string of source IDs which can include bot IDs but also things like Etherscan e.g. `?sourceIds=etherscan,0xbotId`
- `entityType` - string of one of the supported entity types e.g. `?entityType=ADDRESS`
- `limit` - maximum number of label events to return
- `pageToken` - for retrieving pages of paginated results

Here is an example API response:

```javascript
{
  "pageToken": 1234567890,
  "events": [
    {
      "id": "0x41e32412deaac79caf9ed12c71054ba97f15c360aa83e3270b5750305df0ae8d",
      "created_at": "2023-01-04T19:34:54.463513035Z",
      "label": {
        "label": "exploit",
        "confidence": 1,
        "entity": "0xfcf6738cabd9ce27f908a480ecaea53219fc08f4",
        "entityType": "ADDRESS",
        "remove": false
      },
      "source": {
        "id": "etherscan"
      }
    }
  ]
}
```