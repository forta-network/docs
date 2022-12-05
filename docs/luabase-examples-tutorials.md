# Example SQL Queries & Tutorials

## SQL Queries

### Known Ethereum Exploiter Addresses

```sql
SELECT DISTINCT address as banned_address,
                tag as wallet_tag,
                label as etherscan_label
FROM ethereum.tags WHERE label in ('heist', 'exploit', 'phish-hack')
```

### Malicious Smart Contract Detection Dataset

Query the dataset used to train the [malicious smart contract ML bot](https://github.com/forta-network/starter-kits/tree/main/malicious-smart-contract-ml-py).
```sql
SELECT * FROM forta.malicious_contract_detection_dataset
```

Query and convert dataset into a pandas dataframe for data analysis or ML training.
```python
import requests
from os import environ

LUABASE_API_KEY = environ['LUABASE_API_KEY']
LUABASE_QUERY_URL = "https://q.luabase.com/run"
MALICIOUS_CONTRACT_SQL = '''
SELECT contract_address,
       decompiled_opcodes,
       malicious
FROM forta.malicious_contract_detection_dataset
'''

def get_luabase_data(sql: str, limit: int = 1_000_000) -> pd.DataFrame:
    payload = {
        "block": {
            "details": {
                "sql": sql,
                "limit": limit,
                "parameters": {}
            }
        },
        "api_key": LUABASE_API_KEY,
    }
    headers = {"content-type": "application/json"}
    response = requests.request("POST", LUABASE_QUERY_URL, json=payload, headers=headers)
    data = response.json()
    return pd.DataFrame(data['data'])


get_luabase_data(MALICIOUS_CONTRACT_QUERY)
```

For more details on how the dataset was created, please check out [this data collection notebook](https://github.com/forta-network/starter-kits/blob/main/malicious-smart-contract-ml-py/data_collection.ipynb).


## Tutorials

* [Scam Detector Feed Bot Alert Analysis in Forta blog post: Luabase Integrates with the Forta Network](https://forta.org/blog/luabase-integrates-with-the-forta-network/).


