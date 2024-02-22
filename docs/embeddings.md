# Embeddings

Embeddings provide a way to store vector representations of entities, and query by the similarities of entities.
information can be used to answer questions like "which addresses are the most similar addresses to this scammer?" or 
"Are there any addresses extremely similar to this attacker?". The Forta bot SDK provides an easy way to specify 
embedding which this page will describe.

## Adding embeddings

Easiest way to share an embedding is to do it within a label. Bots can return labels as part of their findings, 
which now includes embeddings. Here is an example of adding embeddings:

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
      embedding: [0.1121, 0.522533, 0.952825]  
    }
  ],
});
```

You can only add one embedding per label

## Removing embeddings

To remove embeddings, you simply need to remove the label attached to the embedding. If you send the same label and 
set the `remove` boolean field to true, It will remove the label and associated embedding

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

## Querying embeddings

You can think about embeddings as a new feature on top of labels. To make a similarity search based on embeddings, you need to use the boolean flag `state: true`. The reason for that 
is the state will render all previous FP-mitigations and do a similarity search on the latest version of your label.

```graphql
query Labels($input: LabelsInput) {
  labels(input: $input) {
    labels {
      id
      label {
        confidence
        embedding
        entity
        entityType
        label
        metadata
        remove
        uniqueKey
      }
    }
  }
}
```

This input will give you the most similar labels to your vector:
```graphql
{
  "input": {
    "first":10,
    "state": true,
    "embedding": [0.1,0.2,0.1],
  }
}
```

If you want to only get embeddings lower than a specific distance, you can add a distance filter to your query:
```graphql
{
  "input": {
    "first":10,
    "state": true,
    "embedding": [0.1,0.2,0.1],
    "distance": 0.4
  }
}
```


You can query for embeddings using the [Forta GraphQL API](https://docs.forta.network/en/latest/forta-api-reference/). 
