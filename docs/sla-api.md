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
  - `showMinutes` - Enables the `lowestMinutes` list in the response (Default: false)

Example (Most Recent available Hour)
```
https://api.forta.network/stats/sla/scanner/0x58ee631aaef6882a392da1c25486ee181ff1b7d5
```

Example (The day of 2022-09-07)
```
https://api.forta.network/stats/sla/scanner/0x58ee631aaef6882a392da1c25486ee181ff1b7d5?startTime=2022-09-07T00:00:00Z&endTime=2022-09-08T00:00:00Z&showMinutes=true
```

### Response

Fields

  - `scannerId` - ID of scanner requested
  - `startTime` - Start time considered for SLA calculations
  - `endTime` - End time considered for SLA calculations
  - `scoreFormula` - Short explanation about how the score is calculated
  - `statistics` - Score statistics for the period 
    - `min` - Minimum hour-level score for the period 
    - `max` - Maximum hour-level score for the period 
    - `p50` - 50th Percentile hour-level score for the period 
    - `avg` - Average hour-level score for the period 
  - `lowestScores` - Hour scores for the period (sorted by score ASC)
    - `minute` - Hour for this hour summary score
    - `score` - Score for this hour
    - `inputs` - Inputs considered in the subscores
        - `input_performance` - Average of all latest block scores from reported minutes
        - `expected_input_performance` - Always 1 (for reference)
        - `reporting_success` - Sum of batch scores of all reported minutes in the hour
        - `expected_min_reporting_success` - Strict for bot-assigned nodes
        - `expected_max_reporting_success` - The number of minutes in one hour
        - `inspection_score` - The Resource score for the node (hour average) (see [SLA](sla.md) for details)
        - `expected_inspection_score` - Always 1 (for reference)
    - `scores` - Subscores that led to overall score for this hour
        - `name` - Name of score
        - `value` - Value of score (0-1)
        - `weight` - Weight towards overall score
  - `lowestMinutes` - 10 lowest minute scores for the period (sorted by score ASC) (enabled with `?showMinutes=true`)
    - `minute` - Minute for this minute score
    - `score` - Score for this minute
    - `inputs` - Inputs considered in the subscores
        - `batch_count` - Number of batches sent in this minute
        - `expected_batch_count` - Expected number of batches for the minute
        - `latest_block` - Latest block sent by scan node in this minute
        - `expected_latest_block` - 75th Percentile block for all peers for this network
        - `latest_block_threshold` - Threshold used for evaluation of the latest block 
        - `inspection_score` - The Resource score for the node (see [SLA](sla.md) for details)
    - `scores` - Subscores that led to overall score for this minute
        - `name` - Name of score
        - `value` - Value of score (0-1)
        - `weight` - Weight towards overall score
    
### Subscores

From minutes:

  - `batch_score` - 0-1 score for `batch_count` vs `expected_batch_count`
    - Score is proportional (4 = 1, 3 = 0.75, 2 = 0.50, 1 = 0.25, 0 = 0)
    - Exceeding also decreases score (4 = 1, 5 = 0.75, 6 = 0.50, 7 = 0.25, 8 = 0)

  - `latest_block` - 0-1 score for `latest_block` vs `expected_latest_block`
    - Full credit for being at or above `expected_latest_block` (within 100 blocks)
    - Decreases from 1 to 0 if `latest_block` is below `expected_latest_block`, until 100 blocks behind (score = 0)


Example Response
```
{
   "scannerId":"0x9DC6B3679DF5d3327612d6882680F22F984C5F24",
   "startTime":"2022-09-07T10:13:58.247904993Z",
   "endTime":"2022-09-07T11:13:58.247904993Z",
   "statistics":{
      "min":1,
      "max":1,
      "p50":1,
      "avg":1
   },
   "lowestScores":[
      {
         "minute":"2022-09-07T10:00:00Z",
         "score":1,
         "inputs":{
            "batch_count":215,
            "expected_min_batch_count":0,
            "expected_max_batch_count":0,
            "reporting_success":60,
            "expected_min_reporting_success":59,
            "expected_max_reporting_success":60,
            "latest_block_threshold":0,
            "latest_block":0,
            "expected_latest_block":0,
            "input_performance":1,
            "expected_input_performance":1,
            "inspection_score":1,
            "expected_inspection_score":1
         },
         "scores":[
            {
               "name":"input_performance",
               "value":1,
               "weight":5
            },
            {
               "name":"reporting_success",
               "value":1,
               "weight":1
            }
         ]
      }
   ],
   "lowestMinutes":[
      {
         "minute":"2022-09-07T11:29:00Z",
         "score":0,
         "inputs":{
            "batch_count":4,
            "expected_min_batch_count":1,
            "expected_max_batch_count":4,
            "reporting_success":0,
            "expected_min_reporting_success":0,
            "expected_max_reporting_success":0,
            "latest_block_threshold":40,
            "latest_block":15490042,
            "expected_latest_block":15490040,
            "input_performance":0,
            "expected_input_performance":0,
            "inspection_score":1,
            "expected_inspection_score":0
         },
         "scores":[
            {
               "name":"batch_count",
               "value":1,
               "weight":1
            },
            {
               "name":"latest_block",
               "value":1,
               "weight":5
            }
         ]
      }
   ]
}
```
