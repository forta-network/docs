# Subscriptions API

The Forta Subscriptions API is a REST API that allows developers to manage their bot subscriptions programmatically (vs managing them through the [Forta App UI](https://app.forta.network/notifications)). This page describes the available API endpoints to manage your subscriptions.

## Getting Access

In order to use the Subscriptions API, a Forta API key is required. You can use the Forta App UI to generate a new API key, which will return a `keyId` as well as an `apiKey`. Both fields will need to be set in the HTTP request's `Authorization` header in the format `Bearer keyId:apiKey`.

## Create Subscription

`POST https://api.forta.network/subscriptions`

You can create a new subscription by sending a POST request to the API with a body that describes what exactly you want to subscribe to (i.e. to a specific bot or specific address). The currently supported notification types are email, Slack, Telegram, Discord and custom webhooks. A confirmation message will be sent to the specified channel when successfully subscribed (except for custom webhooks).

### Email Subscription

**NOTE**: a verification email will be sent after creating an email subscription which contains a verification link that must be clicked before notifications can be received.

For example, to subscribe to a bot with ID `0xe5c0846e6ecdcd1a1d137e42039cf0afc366cb890c12f68f40adbda1d7596cff`, the request body would be:

```
{
  "scopeId": "agent|0xe5c0846e6ecdcd1a1d137e42039cf0afc366cb890c12f68f40adbda1d7596cff",
  "notifyConfigs": [
    {
      "notifyType": "email",
      "email": "example@gmail.com"
    }
  ]
}
```

### Slack Subscription

Once you have generated a [Slack webhook](https://api.slack.com/messaging/webhooks), you can use it to receive alerts. For example, to subscribe to all alerts for address `0x473780deaf4a2ac070bbba936b0cdefe7f267dfc`, the request body would be:

```
{
  "scopeId": "address|0x473780deaf4a2ac070bbba936b0cdefe7f267dfc",
  "notifyConfigs": [
    {
      "notifyType": "slack",
      "webhook": "https://hooks.slack.com/services/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"
    }
  ]
}
```

### Telegram Subscription

Once you have generated a [Telegram bot token](https://core.telegram.org/bots/features#botfather) and chat ID, you can use them to receive alerts. For example, to subscribe to a bot with ID `0xe5c0846e6ecdcd1a1d137e42039cf0afc366cb890c12f68f40adbda1d7596cff`, the request body would be:

```
{
  "scopeId": "agent|0xe5c0846e6ecdcd1a1d137e42039cf0afc366cb890c12f68f40adbda1d7596cff",
  "notifyConfigs": [
    {
      "notifyType": "telegram",
      "webhook": "https://api.telegram.org?chat_id=1622956958&token=110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw"
    }
  ]
}
```

### Discord Subscription

Once you have generated a [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks), you can use it to receive alerts. For example, to subscribe to all alerts for address `0x473780deaf4a2ac070bbba936b0cdefe7f267dfc`, the request body would be:

```
{
  "scopeId": "address|0x473780deaf4a2ac070bbba936b0cdefe7f267dfc",
  "notifyConfigs": [
    {
      "notifyType": "discord",
      "webhook": "https://discord.com/api/webhooks/991697143234568285/ooIjNE98YHXXQVpdeNadedwMtWRTk6xsE5fIgjufDeuI9mU-b7oIUu7sSvqS4l1l8RD_"
    }
  ]
}
```

### Webhook Subscription

You can receive alerts at any custom webhook of your choice. For example, to subscribe to a bot with ID `0xe5c0846e6ecdcd1a1d137e42039cf0afc366cb890c12f68f40adbda1d7596cff`, the request body would be:

```
{
  "scopeId": "agent|0xe5c0846e6ecdcd1a1d137e42039cf0afc366cb890c12f68f40adbda1d7596cff",
  "notifyConfigs": [
    {
      "notifyType": "webhook",
      "webhook": "https://yourcustomwebhook.com"
    }
  ]
}
```

## List Subscriptions

`GET https://api.forta.network/subscriptions`

To list all of the subscriptions that your wallet address has, you can send a GET request to the subscriptions API. An example response would look like:

```
[
    {
        "scopeId": "agent|0xe5c0846e6ecdcd1a1d137e42039cf0afc366cb890c12f68f40adbda1d7596cff",
        "notifyId": "92306a4e-9c73-4ebf-8e3c-588c6893e8b0",
        "address": "0x577022b59D1C25323ab524Fe88d2F6347b5C69f1",
        "notifyConfigs": [
            {
                "notifyType": "email",
                "email": "example@gmail.com",
                "unsubscribeToken": "6bfbf583-f89b-4d64-9207-db7312e36342"
            }
        ],
        "isVerified": false,
        "isEnabled": true,
        "groupIds": null,
        "filter": null,
        "createdAt": "2022-10-21T12:41:34.005415903Z"
    }
]
```

## Update Subscription

`PUT https://api.forta.network/subscriptions/notifyId`

To update an existing subscription, you need to send a PUT request with the `notifyId` in the URL path. The subscription will be updated to whatever is in the request body (using same format as creating subscriptions).

## Get Subscription

`GET https://api.forta.network/subscriptions/notifyId`

To get information about a specific subscription, you can send a GET request with the `notifyId` in the URL path.

## Delete Subscription

`DELETE https://api.forta.network/subscriptions/notifyId`

To delete an existing subscription (i.e. unsubscribe), you need to send a DELETE request with the `notifyId` in the URL.
