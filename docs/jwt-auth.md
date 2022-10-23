# Bot Authentication for third-party API's

There may be a case where you want your detection bot to make an external call to an API you own. The Forta bot sdk provides the following methods for generating a JWT token which allows bots make authorized requests to external APIs by using the scan node's identity which the detection bot is running on:

- `fetchJwt(claims, expiresAt)` See method details [javascript/typescript](sdk.md#fetchjwt),[python](python.md#fetch_jwt)
- `decodeJwt(token)` See method details [javascript/typescript](sdk.md#decodejwt),[python](python.md#decode_jwt)
- `verifyJwt(token)` See method details [javascript/typescript](sdk.md#verifyjwt),[python](python.md#verify_jwt)

!!! warning "It is up to the external API to verify the returned JWT. See an example [here](jwt-auth.md#detection-bot-authentication-example)."

## Detection Bot Authentication

Suppose you own an api service and you want your detection bot to have access to your api service. You can generate a JWT token which will contain the following additional fields in it's data:

- `bot-id`: address of your deployed detection bot

Here is an example of a detection bot generating a JWT during its initilization, then decoding the token to a json object or dict:

``` typescript

const initialize: Initialize = async () => {
  const token = await fetchJwt()
  const decodedTokenData = decodeJwt(token)
  
  ...
}
```

``` python
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

Every field above except for `bot-id` is defined in the [JWT standard](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims#registered-claims). Additional claims can also be encoded in the JWT token using the first input `claims`, you also specify when the token should expire as the second input:

``` typescript
const initialize: Initialize = async () => {
  const token = await fetchJwt({key: "value"}, new Date(Date.now() + 5000 /*5 seconds*/))
  const decodedTokenData = decodeJwt(token)

  ...
}
```

``` python
def initialize():
    token = fetch_jwt({'key': 'value'})
    decoded_token_data = decode_jwt(token)

    ...
```

which will result in a `decodedTokenData` like below:

```
{
  "bot-id": "0x13k387b37769ce24236c403e76fc30f01fa774176e1416c861yfe6c07dfef71f",
  "exp": 1660119443,
  "iat": 1660119413,
  "jti": "qkd5cfad-1884-11ed-a5c9-02420a639308",
  "nbf": 1660119383,
  "sub": "0x556f8BE42f76c01F960f32CB1936D2e0e0Eb3F4D",
  "key": "value"
}
```

A useful tool for manually decoding tokens is [this web app](https://jwt.io/) provided by auth0.

## Detection Bot Authentication Example

Imagine you have a backend service that exposes an API endpoint that you would like your detection bot to be authorized to use. Here is an example express api endpoint that uses a JWT for authentication at the host name of `external-api`. This server has a GET endpoint the returns data from an applications database (this example does not add any additional claims):

``` typescript
import express, { Request, Response } from "express";
import { verifyJwt } from "forta-agent";

const PATH = `/example-endpoint`;
const PORT = 3000;

const app = express();
const requestRouter = express.Router();

interface DecodedJwt {
  header: any,
  payload: any
}

requestRouter.get(PATH, async (request: Request, response: Response) => {

    // Assuming the JWT token is passed in the header "x-access-token". You can choose a different method to pass the JWT
    const token = req.headers["x-access-token"];

    const isValidJwt: boolean = await verifyJwt(token);

    // If you add additional claims such as api keys or secrets your verification logic can use those as well
    if(isValidJwt) {
      // Fetch data from database and return it in response
      ...
    } else {
      // return 401 error for invalid JWT
    }
})

app.use("/", requestRouter)

app.listen(PORT, () => {
  console.log(`Server starting`)
})

```

Your bot could call this endpoint like the following (using axios for external calls):

``` typescript

let storedToken: string

const initialize: Initialize = async () => {
  const token = await fetchJwt({key: "value"}, new Date(Date.now() + 5000 /* 5 seconds */))
  storedToken = token;
}

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  
  ...
  const response = await axios.get('https://external-api/example-endpoint', {
  headers: {
    'x-access-token': storedToken
  }

  ... // Do other stuff
}

```