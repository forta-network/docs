["letting bots make authorized requests to external APIs by using the scan node's identity, without letting the scan node modify the requests"]: <>

["The scan node now supports a new endpoint that will give your bot a JWT upon request, that a bot dev can then use to call a self-hosted API that then can verify that"]: <>

["The Bot can call whatever it wants externally - and that external thing has to verify the JWT & verify the smart contract that the scanner is valid"]: <>
# Bot Authentication for third-party API's

There may be a case where you want your detection bot to make an external call to an API you own. The Forta bot sdk provides the following methods for generating a JWT token which allows bots make authorized requests to external APIs by using the scan node's identity which the detection bot is running on:

- `fetchJwtToken(claims, expiresAt)` See method details [javascript/typescript](sdk.md#fetchjwttoken),[python](python.md#fetchjwttoken)
- `decodeJwtToken(token)` See method details [javascript/typescript](sdk.md#decodejwttoken),[python](python.md#decodejwttoken)

!!! warning "It is up to the external API to verify the JWT & verify the smart contract in the JWT data"

## Detection Bot Authentication

Suppose you own an api service and you want your detection bot to have access to your api service. You can generate a JWT token which will contain the following additional fields in it's data:

- `bot-id`: address of your deployed detection bot

Here is an example of a detection bot generating a JWT token on every handleBlock callback:

``` javascript

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const token = await fetchJwtToken({})
  const decodedTokenData = decodeJwtToken(token)
  return [];
}
```

``` python
def handle_block(block_event):
    token = fetch_Jwt_token({}, datetime.now())
    decoded_token_data = decode_Jwt_token(token)
    return []
```

In this case `token` would be a JWT token and the `decodedTokenData` will look something like this:

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

Additional data can also be encoded in the JWT token using the `claims` input:

``` javascript
const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const token = await fetchJwtToken({key: "value"})
  const decodedTokenData = decodeJwtToken(token)
  return [];
}
```

``` python
def handle_block(block_event):
    token = fetch_Jwt_token({'key': 'value'}, )
    decoded_token_data = decode_Jwt_token(token)
    return []
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
  "key": value
}
```