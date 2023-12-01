# Scan Node SLA

## What is SLA?

The Forta Network must have reliable scan nodes.  Forta evaluates the performance of nodes using an SLA calculation so that the network can prioritize Bot assignments and issue rewards.  

There are three expectations of scanners

- **Scanners must meet the minimum requirements of the network**
- **Scanners must analyze recent data**
- **Scanners must be online and regularly send data**

Therefore, an **SLA Score** incorporates these expectations.

## What is a good SLA?

Higher is better.  Rewardable SLAs are between .75 and 1. 

## Monitor SLA

See the [SLA API](sla-api.md) to monitor SLA.

## Calculating SLA

SLA is a minimum between the **Resource Score** and a weighted average of the **Data Quality Score** and the **Uptime Score**

```
SLA = minimum( 
    resource score, 
    weighted_average( 
        5 * data quality score,
        1 * uptime score
    ) 
)
```

SLA is calculated per hour. Nodes are rewarded for each hour they reliably meet the requirements of the network.

### Resource Score

Scanners must meet the requirements of the Scan Node.  All of the following requirements must be met. 

- [Must run the latest container version](scan-node/upgrade.md)
- Must have run inspections recently
- Must support `trace_block` if required for chain (Ethereum Mainnet, Fantom)
- Must support outbound internet access for Bots
- Must have accessible JSON-RPC API
- Must have a JSON-RPC API that supports `eth` module
- Must scan the same chain as registered for
- Must support the minimum memory requirement (currently 16GB)
- Must load an automated hourly test bot at least once per 2-hour period
- Must not fail Proof of Detection

!!! warning "All requirements must be met"
    If any requirement is not met, the resource score will be zero, which will cause a zero SLA score.

### Data Quality Score

!!! important "Alternative naming"
    This score is also known as `input performance` in the SLA API response.

All scanners report the latest known block in the batches they send. This score is calculated by measuring a scanner's distance to the latest block at the time of reporting.

Each scanner reports at an arbitrary time within any given minute. If the scanner reported at 13:05:34, then the closest block can be estimated by using:

- `report_time_seconds`: Seconds elapsed within a given minute. This value is 34.
- `current_minute_max`: The highest block reported in minute 13:05:00. Let's use 20.
- `previous_minute_max`: The highest block reported in minute 13:04:00. Let's use 12.

and then by doing

```
previous_minute_max + ((current_minute_max - previous_minute_max) * (report_time_seconds / 60))
```

If we evaluate the numbers above, the elapsed blocks can be calculated as 5 and the estimated block number becomes `12 + 5 = 17`. Then this number is compared with the block number the scanner reported and divided by a threshold. There are two possible outcomes:

- If the reported block is at least 17, then the score is 1.
- If the reported block is e.g. 15 and the threshold is 10 blocks, then the score is `1 - ((17 - 15) / 10) = 0.8`.

!!! note "Reporting too high block numbers"
    The SLA calculation takes into account that some scanners can report extremely high block numbers. The selection of max numbers and final SLA calculation makes sure that these scanners are defaulted to zero because of their faulty operation.

### Proof of Detection
Scan nodes must execute assigned bots, provide metrics and deliver any alerts emitted by them. If a scan node falsely claims bot execution, censors or tampers with any alert, SLA score will be 0 for the whole scan node pool for the calculated hour.

There are two types of failures:

#### Missing Proof

If a scan node sends more than 30 `agent.health.success` metrics, the mechanism assumes that the bot was healthy enough to emit a proof. In case the node does not emit an alert, it will be treated as Proof of Detection failure.

#### Bad Proof

SLA calculator recalculates the hash given by the bot. If there is a mismatch, then it means that the node did not do the work it was deemed to do and fails Proof of Detection.

### Uptime Score

!!! important "Alternative naming"
    This score is also known as `reporting success` in the SLA API response.

Scanners must send data at regular intervals so that the network can deliver timely alerts. The nodes send a batch file to the Forta API

- every 15 seconds if the node is running bots and there are new alerts,
- every 1 minute if the node is running bots but there are no alerts,
- a few times in an hour if the node is not running any bots.

The minute score of uptime is the percent difference between the number of batches and the expected number of batches.  Due to timing and alert rate, this count can fluctuate between 0 and 5 in a minute, but this does not impact the SLA very much, because the score is not weighted as high as others.

If data is not being sent at all, all other scores will be impacted as well.

Hourly uptime is measured by adding up all of the minute scores within an hour. While idle scan nodes are expected to report at a lower rate, the bot-assigned nodes are expected to report every minute. In both situations, the uptime score derived from the sum falls proportionally as the total score from reported minutes approaches zero.

```
uptime score = 1 - ( abs ( number of batches - 4 ) ) / 4 )
```

## Examples

### Node is 5 blocks behind on mainnet

Subscores

- Resource score is 1
- Data Quality Score is 0.8837
- Uptime score is 1

Calculation 
```
SLA = minimum( 
    1, 
    weighted_average( 
        5 * .8837,
        1 * 1
    ) 
)
```

Score is **0.9031**

### Node is 100 blocks behind on mainnet

(mainnet uses ~13s blocks, yielding 43 blocks in 10 minutes)

Subscores

- Resource score is 1
- Data Quality Score is 0, because 43 blocks is the threshold
- Uptime score is 1

Calculation 
```
SLA = minimum( 
    1, 
    weighted_average( 
        5 * 0,
        1 * 1
    ) 
)
```

Score is **0.166666**

### Node does not support trace_block on mainnet

Subscores

- Resource score is 0
- Data Quality Score is 1
- Uptime score is 1

Calculation 
```
SLA = minimum( 
    0, 
    weighted_average( 
        5 * 1,
        1 * 1
    ) 
)
```

Score is **0**

### Node does not support trace_block on polygon

Subscores

- Resource score is 1  (because trace is not required for polygon)
- Data Quality Score is 1
- Uptime score is 1

Calculation 
```
SLA = minimum( 
    1, 
    weighted_average( 
        5 * 1,
        1 * 1
    ) 
)
```

Score is **1**
