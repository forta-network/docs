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

SLA is calculated per minute.  Nodes are rewarded for each minute they reliably meet the requirements of the network.

### Resource Score

Scanners must meet the requirements of the Scan Node.  All of the following requirements must be met. 

- Must run inspections recently
- Must support trace_block if required for chain (mainnet, fantom)
- Must support outbound internet access for Bots
- Must have accessible JSON-RPC API
- Must have JSON-RPC that supports net , web, and eth APIs
- Must scan same chain as registered for
- Must have a minimum amount of Ram (currently >16GB, only enforcing >8GB for now)

!!! warning "All requirements must be met"
    If any requirement is not met, the resource score will be zero, which will cause a zero SLA.

### Data Quality Score

Scanners must evaluate recent blocks.  Recent blocks are continuously evaluated by comparing the latest block analyzed with the 75th percentile block for scanners registered for the same chain.  The block used for calculations is the **maximum** block sent for the given minute.  This means it will consider the last block analyzed in the minute. 

The Data Quality Score decreases from 1 to 0 until a node's latest block is 10 minutes behind the 75th percentile.

!!! note "Exceeding the Expected Block"
    It is possible to exceed the 75th percentile, but if it FAR exceeds, it can be because the scanner is pointed to the wrong chain or other issue.  Full credit is given until a block is more than 10 minutes ahead of the 75th percentile, then the score drops to 0.

```
# Latest Block is Ahead of Expected Block
if Latest Block is ahead of Expected Block:
    if Difference is within 10 minutes Expected Block:
        return 1
    else:
        return 0

# Latest Block is Behind Expected Block
return 1 - ( (expected block - latest block) / threshold )
```

### Uptime Score

Scanners must send data at regular intervals so that the network can deliver timely alerts.  The nodes send a batch file to the Forta API every 15 seconds.  This means there should be 4 batches per minute. 

The uptime score is the percent difference between the number of batches and expected number of batches.  Due to timing, this count can flucutate between 3 and 5, but this does not impact the SLA very much, because the score is not weighted as high as others.  

However, if data is not being sent at all, all other scores will be impacted as well.  

```
uptime score = 1 - ( abs ( number of batches - 4 ) ) / 4 )
```

## Examples

### Node is 5 blocks behind on mainnet

Subscores

- Resouce score is 1
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

- Resouce score is 1
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

- Resouce score is 0
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

- Resouce score is 1  (not required for polygon)
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

### Node sends 2 batches per minute (instead of 4)

!!! note "Irregular Batch Rate"
    Generally not sending regular batches will also impact other scores.  If somehow only the number of batches is impacted but nothing else, the score is not impacted very much (as in this example).

Subscores

- Resouce score is 1
- Data Quality Score is 1 
- Uptime score is 0.5

Calculation 
```
SLA = minimum( 
    1, 
    weighted_average( 
        5 * 1,
        1 * 0.5
    ) 
)
```

Score is **0.916666667**