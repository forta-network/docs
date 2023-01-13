# Transfer Bot Ownership

Each Bot is an ERC-721 NFT and is minted to the creator of the Bot. This means that the owner can invoke the ERC-721 `transferFrom` function, and it change the owner of the Bot.

These instructions walk through transferring ownership via the polyscan UI.

!!! note "Bot is the same as Agent"
    Forta renamed Agents to Bots, but the smart contract still uses the Agent terminology. They are the same exact thing. An Agent ID is the same as a Bot ID.

!!! warning "Transferring does not affect Stake Ownership"
    After transferring ownership, **the current stake on the bot is still owned by the previous staker**. It is recommended to separately stake on the bot as the new owner, which will allow the previous staker to withdrawl their stake without disabling your bot.

## Transferring Bot Ownership

### Visit the **Bot Registry**
[https://polygonscan.com/address/0x61447385B019187daa48e91c55c02AF1F1f3F863](https://polygonscan.com/address/0x61447385B019187daa48e91c55c02AF1F1f3F863)

### Click the **Contract** tab and **Write as Proxy** and connect using **Connect to Web 3**

<img src="../registry-write-as-proxy.png" alt="Write as Proxy" width="800"/>

!!! note "Connect the Owner Wallet"
    Please connect a wallet that is the current owner or the transaction will not be allowed.  If the owner used the SDK with a local private key, one will need to import that key into Metamask/Wallet to use this site.  The key file can be found in `$HOME/.forta/.keys/`

### Fill out the `transferFrom` command as follows

- **from**: The current owner (must be the connected wallet)
- **to**: the new address
- **tokenId**: the hexadecimal Bot ID for the bot

<img src="../transfer-from-form.png" alt="Write as Proxy" width="800"/>

### Execute the transaction by clicking **Write** and sign the transaction

## Alternative to Transferring

Instead of transfering ownership of a bot, one can also create a new bot and refer to the image of the existing bot.  This mints a new ERC-721 with a new Bot ID.  Any updates to this new bot will not affect the old bot.  