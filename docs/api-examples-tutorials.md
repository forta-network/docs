# Example Queries and Tutorials

You can also view all examples and tutorials at [forta-network.github.io/forta-api](https://forta-network.github.io/forta-api/).

## Example Queries
We provided some example queries for you to try in the [API Sandbox](https://studio.apollographql.com/sandbox?document=query%20exampleQuery%20%7B%0A%20%23%20first%205%20alerts%0A%20alerts%20%7B%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20endCursor%20%7B%0A%20%20%20%20%20%20%20%20alertId%0A%20%20%20%20%20%20%20%20blockNumber%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20alerts%20%7B%0A%20%20%20%20%20%20createdAt%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20protocol%0A%20%20%20%20%20%20findingType%0A%20%20%20%20%20%20source%20%7B%0A%20%20%20%20%20%20%20%20transactionHash%0A%20%20%20%20%20%20%20%20block%20%7B%0A%20%20%20%20%20%20%20%20%20%20number%0A%20%20%20%20%20%20%20%20%20%20chainId%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20bot%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20severity%0A%20%20%20%20%20%20metadata%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&endpoint=https%3A%2F%2Fapi.forta.network%2Fgraphql):

* [Recent alerts emitted by a specific bot](#recent-alerts-emitted-by-a-specific-bot)
* [Today's alerts associated with certain addresses](#todays-alerts-associated-with-certain-addresses)
* [Past alerts by block number or date range](#past-alerts-by-block-number-or-date-range)
* [A list of blockchain projects](#a-list-of-blockchain-projects)
* [Details of a blockchain project](#details-of-a-blockchain-project)

## Tutorials

* [Query alerts for analysis with python](#query-alerts-for-analysis-with-python)


## Recent alerts emitted by a specific bot

You can also view [this example query on github](https://forta-network.github.io/forta-api/example_queries/recent_alerts.html).
<iframe
  src="https://forta-network.github.io/forta-api/example_queries/recent_alerts.html"
  style="width:100%; height:500px;" frameborder="0"
></iframe>

## Today's alerts associated with certain addresses

You can also view [this example query on github](https://forta-network.github.io/forta-api/example_queries/todays_alerts.html).
<iframe
  src="https://forta-network.github.io/forta-api/example_queries/todays_alerts.html"
  style="width:100%; height:500px;" frameborder="0"
></iframe>

## Past alerts by block number or date range

You can also view [this example query on github](https://forta-network.github.io/forta-api/example_queries/past_alerts.html).
<iframe
  src="https://forta-network.github.io/forta-api/example_queries/past_alerts.html"
  style="width:100%; height:500px;" frameborder="0"
></iframe>

## A list of blockchain projects

You can also view [this example query on github](https://forta-network.github.io/forta-api/example_queries/blockchain_projects_list.html).
<iframe
  src="https://forta-network.github.io/forta-api/example_queries/blockchain_projects_list.html"
  style="width:100%; height:500px;" frameborder="0"
></iframe>

## Details of a blockchain project

You can also view [this example query on github](https://forta-network.github.io/forta-api/example_queries/blockchain_project.html).
<iframe
  src="https://forta-network.github.io/forta-api/example_queries/blockchain_project.html"
  style="width:100%; height:500px;" frameborder="0"
></iframe>

## Query alerts for analysis with python

You can also view [this tutorial on github](https://forta-network.github.io/forta-api/tutorials/analysis_in_python.html).
<iframe
  src="https://forta-network.github.io/forta-api/tutorials/analysis_in_python.html"
  style="width:100%; height:500px;" frameborder="0"
></iframe>
