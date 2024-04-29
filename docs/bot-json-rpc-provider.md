# V2 Bot JSON-RPC Provider Setup

With v2 detection bots, developers can scan any EVM-compatible chain by bringing their own RPC endpoints. This guide discusses a few options for setting up your bot's RPC provider for local development and production.

## Public RPC URLs

The simplest way to get started is to use a public RPC endpoint for your specific chain. These endpoints are free to use, but typically come with rate limits to prevent misuse. Depending on the rate limits, your bot's performance will vary. Unless you are certain that your bot will stay within the set limits, we don't recommend using public RPC URLs in production. However, you may find these convenient for local development.

## Private RPC URLs

Another common way to communicate with RPC providers is to create a private RPC endpoint which typically contains some sort of secret API key within the URL itself. These are usually offered through a freemium payment model with more generous rate limits. However, hardcoding the RPC URL (and secret API key) within the bot itself is a security issue because the bot Docker images are stored in a public repository which anyone can view. For this reason, private RPC URLs are better suited for local development but not for production.

## JWT-Authenticated RPC URLs

Certain RPC providers have the option to create a JWT-authenticated RPC endpoint that can **_only be accessed by scan nodes that are running your bot_**. Setting up this kind of RPC endpoint is easy and requires registering the Forta public key with the provider. Suggested providers that support this kind of authentication mechanism include (but are not limited to) [Alchemy](https://www.alchemy.com/), [dRPC](https://drpc.org/) and [Infura](https://www.infura.io/). The main benefit of using such a RPC endpoint is that you can hardcode the RPC URL into the bot without giving away public access to anyone who can view the bot's Docker image.

### Registering the Forta public key

For example, to [create a JWT-authenticated RPC URL on Alchemy](https://docs.alchemy.com/docs/how-to-use-jwts-for-api-requests) you would do the following:

1. Go to the [Alchemy JWT Public Keys dashboard](https://dashboard.alchemy.com/settings/jwt-public-keys)
2. Click "Import Public Key"
3. Enter a name for this new key
4. Select the App ID (i.e. RPC endpoint) you want to associate with the public key
5. Copy and paste the Forta public key (as seen below)
6. Click "Create" to register the key
7. Click on the created key's name to expand it and view the key ID e.g. `67694d31-0d90-47a4-8241-0a8546958512a`
8. Use the key ID inside your bot e.g.

=== "Typescript/Javascript"

    ``` Typescript
    scanEthereum({
      rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2',
      rpcKeyId: '67694d31-0d90-47a4-8241-0a8546958512a',
      ...
    })
    ```

=== "Python"

    ``` Python
    scan_ethereum({
      'rpc_url': 'https://eth-mainnet.g.alchemy.com/v2',
      'rpc_key_id': '67694d31-0d90-47a4-8241-0a8546958512a',
      ...
    })
    ```

### Forta public key

```
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0hsWiVoSFlrUsYPDRPjJ
n9zghdlcVREmfSZgzdr5u//Y7Cv97waAhSB3xN8qjst5Uy/rD7fFD/6GN6FHMMg+
fu0f/pLPJSby/mu+YBCg1LtsAXlLub8LaY20xUb4cBNHy++SzI1cQOjkqH9/vHO7
V2aS3tc6+OS62Dy6NstB4ITskLmZdA8fJdye2LWS/DS95K37DCfIgFqxktFDovjW
oCbJPTL4A/0Bs7tCEjUb4X7Z5v065W7Ly8W3W0m3oM09Bwr018WE+EzsSthE+E98
nGpOUiStgoaKlDMRY+zrcjOTCHPzLn7C5aUOsyGuRJF+vy37ouq4YZSlbg87FcGw
XuLONya3ZDR0caDMFOtD+fuDmFMSKk52ua+afNTygn5jDAGr+RNWcfGx0OeSbwO0
5zmQ1FkIiqkoScunGFE74hYLcdCFx8CiwZzhKiwx2wRvgXnjzkZVCYZ6RwsyWADw
MqHcc+S/+hYLUg0UNNHVSD+aJDjzneOc/DKL2h7Y3cdjX7tfJPobOaguYF+JdEzj
VjL3a0dfT/2BHyzlpPBwCmSOZQwUqyzJV05rQfoVeqyZJhp6e1hTwTWi4Fff7TH5
/jtZ8cixEzCblehA3dDD5XEvaWDEG+n0Qk6ZeH016c2dkrkLMQoHR+p+p3KL6PoW
0xyzcLXL4r5ALWLwpeqSaasCAwEAAQ==
-----END PUBLIC KEY-----
```

## Local RPC URLs

Note that JWT-authenticated RPC URLs can only work inside of a scan node (i.e. only in production). When developing locally, these URLs will not work as they require a scan node environment. To work around this when developing locally, you can specify a local RPC URL in your bot that will be used **_only when running locally_**. This way you can use public/private RPC URLs locally without exposing them to the world. For example, you would put the public/private URLs inside your `forta.config.json` like so:

```json
{
  ...
  "localRpcUrls": {
    "1": "https://cloudflare-eth.com/",
    "137": "https://polygon-rpc.com"
  }
}
```

and then use them inside your bot like this:

=== "Typescript/Javascript"

    ``` Typescript
    scanEthereum({
      localRpcUrl: '1',
      rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2', // only used in prod
      rpcKeyId: '67694d31-0d90-47a4-8241-0a8546958512a', // only used in prod
      ...
    })
    ```

=== "Python"

    ``` Python
    scan_polygon({
      'local_rpc_url': '137',
      'rpc_url': 'https://polygon-mainnet.g.alchemy.com/v2', # only used in prod
      'rpc_key_id': '89694d31-0c50-58b4-8241-0e0543959513b', # only used in prod
      ...
    })
    ```
