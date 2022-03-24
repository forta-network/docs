# API Access

!!! important "Beta Mode"
    (February 2022) The API is in beta mode. If you see any bugs or issues, please let us know at [github:forta-protocol/forta-api](https://github.com/forta-protocol/forta-api/issues/new/choose).

Forta currently supports free [GraphQL](https://graphql.org/) API access to alerts and blockchain projects data.

## How can I access the API?

!!! note "API Keys"
    API keys are not required at this time.

The API endpoint is [https://api.forta.network/graphql](https://api.forta.network/graphql).

If you'd like an interactive interface for building and testing a query, please check out the [API Sandbox](https://studio.apollographql.com/sandbox?document=query%20exampleQuery%20%7B%0A%20%23%20first%205%20alerts%0A%20alerts%20%7B%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20endCursor%20%7B%0A%20%20%20%20%20%20%20%20alertId%0A%20%20%20%20%20%20%20%20blockNumber%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20alerts%20%7B%0A%20%20%20%20%20%20createdAt%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20protocol%0A%20%20%20%20%20%20findingType%0A%20%20%20%20%20%20source%20%7B%0A%20%20%20%20%20%20%20%20transactionHash%0A%20%20%20%20%20%20%20%20block%20%7B%0A%20%20%20%20%20%20%20%20%20%20number%0A%20%20%20%20%20%20%20%20%20%20chainId%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20agent%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20severity%0A%20%20%20%20%20%20metadata%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&endpoint=https%3A%2F%2Fapi.forta.network%2Fgraphql).

## How can I contribute?

If you'd like to report a bug, request a feature, or ask any questions about the API, please check out the [forta-api github repository](https://github.com/forta-protocol/forta-api#contribute). We will be tracking all feature requests, bug reports, and feedback there.
