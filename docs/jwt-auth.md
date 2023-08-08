# JWT authentication for bots

There may be cases where you need to call a private API, perhaps to save some state or load some secret. The SDK provides the following methods for generating a JWT token which enables bots to make authorized requests to external APIs:

- `fetchJwt(claims, expiresAt)` See method details [javascript](sdk.md#fetchjwt)/[python](python.md#fetch_jwt)
- `decodeJwt(token)` See method details [javascript](sdk.md#decodejwt)/[python](python.md#decode_jwt)
- `verifyJwt(token)` See method details [javascript](sdk.md#verifyjwt)/[python](python.md#verify_jwt)

!!! warning "It is up to the external API to verify the returned JWT. See an example [here](jwt-auth.md#detection-bot-authentication-example)."

## Generate a token

You can generate a JWT token using the `fetchJwt` method which will contain the [standard JWT fields](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims#registered-claims), as well as an additional field called `bot-id` which will be the bot ID of your detection bot. The returned JWT is signed by the scan node that is running the bot (the `sub` field contains the scan node address). Here is an example of a detection bot generating a JWT during its initialization and decoding it:

``` typescript title="Typescript"
import { fetchJwt, decodeJwt } from 'forta-agent'

const initialize: Initialize = async () => {
  const token = await fetchJwt()
  const decodedTokenData = decodeJwt(token)
  ...
}
```

``` python title="Python"
from forta_agent import fetch_jwt, decode_jwt

def initialize(block_event):
    token = fetch_jwt({})
    decoded_token_data = decode_jwt(token)
    ...
```

In this case `token` would be a JWT and `decodedTokenData` will look something like this:

```
{
  "bot-id": "0x13k387b37769ce24236c403e76fc30f01fa774176e1416c861yfe6c07dfef71f",
  "exp": 1660119443,
  "iat": 1660119413,
  "jti": "qkd5cfad-1884-11ed-a5c9-02420a639308",
  "nbf": 1660119383,
  "sub": "0x556f8BE42f76c01F960f32CB1936D2e0e0Eb3F4D"
}
```

Additional claims can also be encoded in the JWT using the `claims` parameter. You can also specify when the token should expire as the second parameter:

``` typescript title="Typescript"
const initialize: Initialize = async () => {
  const token = await fetchJwt({key: "value"}, new Date(Date.now() + 5000 /*5 seconds*/))
  const decodedTokenData = decodeJwt(token)
  ...
}
```

``` python title="Python"
def initialize():
    token = fetch_jwt({'key': 'value'})
    decoded_token_data = decode_jwt(token)
    ...
```

A useful tool for manually decoding tokens is [this web app](https://jwt.io/) provided by Auth0.

## Verify the token

The JWT token will need to be verified by the receiving server/API. The SDK provides a convenient method called `verifyJwt` that will ensure the token is not expired, the signature is valid, and that the bot is currently assigned to the scan node. 

Here is an example Express API that uses the JWT for authentication. The server has a GET endpoint that returns data from some database:

``` typescript
import express, { Request, Response } from "express";
import { verifyJwt } from "forta-agent";

const app = express();
const router = express.Router();

router.get('/example-endpoint', async (request: Request, response: Response) => {
    // Assuming the JWT token is passed in the "x-access-token" header
    const token = request.headers["x-access-token"];

    const isValidJwt: boolean = await verifyJwt(token);

    // If you add additional claims you can verify those as well
    if (isValidJwt) {
      // Fetch data from database and return it in response
    } else {
      // return 401 error for invalid JWT
    }
})

app.use("/", router)

app.listen(8080, () => {
  console.log(`Server starting`)
})

```

Your bot could call this endpoint like the following:

``` typescript
let token: string

const initialize: Initialize = async () => {
  token = await fetchJwt({key: "value"}, new Date(Date.now() + 5000 /* 5 seconds */))
}

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const response = await axios.get('https://yourapi.com/example-endpoint', {
    headers: {
      'x-access-token': token
    }}
  )
  ... // Do other stuff
}
```