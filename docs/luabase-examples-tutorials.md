# Example SQL Queries & Tutorials

## SQL Queries

### Known Ethereum Exploiter Addresses

```sql
SELECT DISTINCT address as banned_address,
                tag as wallet_tag,
                label as etherscan_label
FROM ethereum.tags WHERE label in ('heist', 'exploit', 'phish-hack')
```

## Tutorials

* [Scam Detector Feed Bot Alert Analysis in Forta blog post: Luabase Integrates with the Forta Network](https://forta.org/blog/luabase-integrates-with-the-forta-network/).


