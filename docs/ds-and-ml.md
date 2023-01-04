# Data science and machine learning on Forta

Check out this short clip below to learn more about how the open-source data on Forta can be used by the community to create next-generation security solutions.

<p align="center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Uw7n5_mV9aQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

## Detection Bots and Templates Utilizing ML

* [Anomalous Gas Usage Bot](https://github.com/kovart/forta-gas-agent)
* [Anomalous Token Transfers Detection Machine Learning Bot](https://github.com/forta-network/starter-kits/tree/main/anomalous-token-transfers-ml-py)
* [Smart Price Changes Bot](https://github.com/0xidase/Smart-Price-Changes-Agent)
* [Time Series Analyzer Bot Template](https://github.com/forta-network/starter-kits/tree/main/time-series-analyzer-template)
* [Malicious Smart Contract ML Bot](https://github.com/forta-network/starter-kits/tree/main/malicious-smart-contract-ml-py#malicious-smart-contract-ml)
* [Text Message Sentiment Analysis Deep Learning Bot](https://github.com/forta-network/forta-bot-examples/tree/master/tx-message-sentiment-analysis-py)

Did you create a ML bot? Share it with the community on the [ML Discord Channel](https://discord.com/invite/tpWYdjyc6Q)!

## Data Science Competitions

* (Completed) [Ethereum Phishing Scam Detection Competition](https://www.kaggle.com/competitions/forta-protect-web3)
* More coming up soon!

## Blog posts and Guides

* [Blog: How Forta’s Predictive ML Models Detect Attacks Before Exploitation](https://forta.org/blog/how-fortas-predictive-ml-models-detect-attacks-before-exploitation/)
* [Blog: Leveraging Machine Learning with Forta to Improve Web3 Security](https://forta.org/blog/leveraging-machine-learning-to-improve-web3-security/)
* [Blog: Time Series Analysis with Forta](https://forta.org/blog/time-series-analysis-with-forta/)
* [Blog: Predicting Phishing Scams: A Kaggle Competition](https://forta.org/blog/predicting-phishing-kaggle/)
* [Guide: Implementing Time Series Analysis](https://docs.forta.network/en/latest/time-series-analysis/)
* [Guide: Deploying ML Models in Detection Bots](https://docs.forta.network/en/latest/deploying-ml-models/)

## ML Best Practices

* [Secure your machine learning with Semgrep](https://blog.trailofbits.com/2022/10/03/semgrep-maching-learning-static-analysis/)
* [Never a dill moment: Exploiting machine learning pickle files](https://blog.trailofbits.com/2021/03/15/never-a-dill-moment-exploiting-machine-learning-pickle-files/)

## Sources for Training Data and Labels

Do you see any missing resource the community can use below? Contribute to [the docs](https://github.com/forta-network/docs).

### Blockchain Data

* [BigQuery Public Blockchain Datasets](https://github.com/blockchain-etl/public-datasets) - Available to query using BigQuery on [Google Cloud Platform](https://cloud.google.com/free).
* [Ethereum ETL](https://ethereum-etl.readthedocs.io/en/latest/) - Tool to convert blockchain data into CSV formats and relational databases.
* [Transaction event](https://docs.forta.network/en/latest/python/#transactionevent) and [block event](https://docs.forta.network/en/latest/python/#blockevent) is available in Forta Bot Container. You can also collect training data on the fly and train periodically like this [Re-entrancy on Uniswap Time Series Bot](https://explorer.forta.network/bot/0x1e3ec10394a46d44ec0802f9e27162236cd61a1f7c13767f0c9ada7b48def6ae)

### Labels

* [Forta Labelled datasets](https://github.com/forta-network/labelled-datasets) - Web3 threat related labelled datasets for data analysis and machine learning developments.
* [EtherScamDB](https://github.com/CryptoScamDB/EtherScamDB) - Open-source db that keeps track of ethereum scams and involved addresses.
* [Forta API](https://github.com/forta-network/forta-api) - Query critical alerts via the Forta API and use them as [weak labels](https://www.thoughtworks.com/en-us/insights/blog/data-science-and-analytics/weak-labeling).
* [web3rekt.com](https://www.web3rekt.com/) - Query known blockchain incidents and scams.
* [XBlock](https://xblock.pro/#/) - Access to all blockchain datasets used in academic research.


## Historical Alerts Access

<p align="center">
    <img alt="Forta Community" src="../forta-community.png">
</p>

There’s a unique opportunity for the community to take advantage of the open data and collaborate on new data science and machine learning solutions together. For example, the community can begin to extract trends and insights from historical alerts that may be helpful to improving blockchain security. And with the right tools and data, Forta can also begin to detect threats and exploits before they happen with increasing accuracy over time.

Do you need access to historical alerts soon for data analysis or for your bot? If so, check out [Forta API](api.md).

## Join the Forta ML Discord

Do you have ideas on how machine learning can be used on the Forta Network? Share your thoughts and ideas on the [ML Discord Channel](https://discord.com/invite/tpWYdjyc6Q)
