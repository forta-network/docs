# Scan Node SLA API

To evaluate health of nodes in the network, Forta calculates a score (SLA) based on node activity.  This score is a 0-1 score where higher is better.  This calculation will evolve as more factors are considered.

## SLA Calculation

See [SLA](sla.md) for details regarding the composition of the SLA score.

## API

To make this score visible, we now have an API that anyone can call for a given scanner address.  Simply curl the API to get a summary report for the period you are interested in.

### Request

URL
```
GET https://api.forta.network/stats/sla/scanner/{scannerAddress}
```

Request Parameters

  - `startTime` - Start of date range to consider, in RFC3339 (YYYY-MM-DDTHH:MM:SSZ) (Default: 2 hours ago)
  - `endTime` - End of date range to consider, in RFC3339 (YYYY-MM-DDTHH:MM:SSZ) (Default: 1 hour ago)

Example (Most Recent available Hour)
```
https://api.forta.network/stats/sla/scanner/0x58ee631aaef6882a392da1c25486ee181ff1b7d5
```

Example (The day of 2022-03-06)
```
https://api.forta.network/stats/sla/scanner/0x58ee631aaef6882a392da1c25486ee181ff1b7d5?startTime=2022-03-06T00:00:00Z&endTime=2022-03-07T00:00:00Z
```

### Response

Fields

  - `scannerId` - ID of scanner requested
  - `startTime` - Start time considered for SLA calculations
  - `endTime` - End time considered for SLA calculations
  - `statistics` - Score statistics for the period 
    - `min` - Minimum minute-level score for the period 
    - `max` - Maximum minute-level score for the period 
    - `p50` - 50th Percentile minute-level score for the period 
    - `avg` - Average minute-level score for the period 
  - `lowestScores` - 10 lowest scores for the period (sorted by score ASC)
    - `minute` - Minute for this minute-level score
    - `score` - Score for this minute
    - `inputs` - Inputs considered in the subscores
        - `batch_count` - Number of batches sent in this minute
        - `expected_batch_count` - Expected number of batches for the minute
        - `latest_block` - Latest block sent by scan node in this minute
        - `expected_latest_block` - 75th Percentile block for all peers for this network
        - `latest_block_threshold` - Threshold used for evaluation of the latest block 
        - `inspection_score` - The Resource score for the node (see [SLA](sla.md) for details)
        - `expected_inspection_score` - Always 1 (for reference)
    - `scores` - Subscores that led to overall score for this minute
        - `name` - Name of score
        - `value` - Value of score (0-1)
        - `weight` - Weight towards overall score
    
Subscores

  - `batch_score` - 0-1 score for `batch_count` vs `expected_batch_count`
    - Score is proportional (4 = 1, 3 = 0.75, 2 = 0.50, 1 = 0.25, 0 = 0)
    - Exceeding also decreases score (4 = 1, 5 = 0.75, 6 = 0.50, 7 = 0.25, 8 = 0)
  - `latest_block` - 0-1 score for `latest_block` vs `expected_latest_block`
    - Full credit for being at or above `expected_latest_block` (within 100 blocks)
    - Decreases from 1 to 0 if `latest_block` is below `expected_latest_block`, until 100 blocks behind (score = 0)

Example Response
```
{
  "scannerId": "0x58ee631aaef6882a392da1c25486ee181ff1b7d5",
  "startTime": "2022-03-09T11:05:05.459518321Z",
  "endTime": "2022-03-09T12:05:05.459518321Z",
  "statistics": {
    "min": 1,
    "max": 1,
    "p50": 1,
    "avg": 1
  },
  "lowestScores": [
    {
      "minute": "2022-03-09T11:15:00Z",
      "score": 1,
      "inputs": {
        "batch_count": 4,
        "expected_batch_count": 4,
        "latest_block": 14352229,
        "expected_latest_block": 14352229
      },
      "scores": [
        {
          "name": "batch_count",
          "value": 1,
          "weight": 1
        },
        {
          "name": "latest_block",
          "value": 1,
          "weight": 5
        }
      ]
    }, x 10
  ]
}
```

