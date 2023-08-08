# Deploying your bot with Forta App

This page covers how to deploy your bot using [Forta App](https://app.forta.network/).

## Enable logging (optional)

Forta provides a logging feature that can be used to see what's happening inside of your bot across multiple scan nodes. To enable this feature, you need to add/uncomment the following line in the bot **Dockerfile**:

```Dockerfile
LABEL "network.forta.settings.agent-logs.enable"="true"
```

After deploying, you can [view bot logs](maintaining.md#viewing-bot-logs) using the Forta API.

## Documentation

Documentation for your bot is **required** in order to deploy. It should let others know what conditions your bot is detecting and what sort of alerts it will fire. Documentation will always be in the README.md file in your project folder (we have provided example documentation to help you get started). Please update the README.md for your specific bot.

You will also find the [Forta Detection Bot License](https://github.com/forta-network/forta-bot-sdk/blob/master/starter-project/LICENSE.md){:target="_blank"} included in your project LICENSE.md file (and copied over in your Dockerfile). This is **required** for every detection bot deployed to the network.

## Pushing your bot image

Before you head over to Forta App, you will need one piece of information: your bot's image reference. You can get the image reference by running the following command (**make sure your Docker is running before proceeding**):

```
npm run push
```

This will build your bot image and push it to a repository where scan nodes can find it. Once completed, you should see a message in your output similar to:

```
successfully pushed image with reference bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2
```
Copy the image reference (i.e. `bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2`) to your clipboard and head over to [Forta App](https://app.forta.network/).

## Import your keyfile into Metamask

Forta App will use your Metamask to send the deployment transaction. You can import your keyfile (located in ~/.forta) with the following steps:

1. In Metamask, click the Accounts dropdown and then click on Import Account
2. Select the JSON File option from the Type dropdown
3. Click on Choose File and navigate to your keyfile (in ~/.forta) and select it
4. Enter the password for your keyfile in the Password box
5. Click the Import button

Your keyfile should now be in Metamask.

## Connect your Metamask to Forta App

You will need to connect your Metamask to Forta App with the following steps:

1. On the Forta App website, click the "Log in with wallet" button on the top right
2. A Metamask dialog will appear asking you to select which account to connect. Select your imported account, click Next and then click Connect
3. Another Metamask dialog will ask you to sign a message to login. Click the Sign button

Your Metamask should now be connected to Forta App. You should see your wallet address appear on the menu at the top right of the page.

## Deploying

In order to deploy your bot, you will need to complete a short form by navigating to the Detection Bots page (from the menu at the top right):

1. Click the Deploy Bot button to bring up the form. The bot ID will be automatically generated for you
2. Fill in the rest of the fields with your bot's information like name, description, version and which blockchains you want to scan (currently supported chains are Ethereum, Polygon, Binance Smart Chain, Avalanche, Arbitrum, Optimism, and Fantom)
3. For the Documentation field, select the README.md from your project folder. This will be uploaded to IPFS
4. For the Docker Image field, paste in the image reference you copied earlier from the `npm run push` command
5. If your code repository is public, fill in the Repository field
6. Click the "Sign to proceed" button
7. A Metamask dialog will appear asking you to sign the bot metadata. Click the Sign button
8. A confirmation form will display your bot metadata, including the IPFS hash of the bot metadata and documentation. If these look good, click the Deploy Bot button to initiate the deployment transaction
9. A Metamask dialog will appear asking you to confirm the deployment transaction. Review the details and click the Confirm button

## Staking

In order to enable your bot, it must be staked with 100 FORT tokens. You can easily stake on your bot by following the steps [here](stake-on-detection-bot.md).

Congratulations! You have successfully deployed your first Forta bot!

Great job getting this far! You have created a project, developed a bot, written and run a test, and deployed it to the Forta network. We encourage you to share your bots with the [Discord community](https://discord.com/invite/fortanetwork) as a way to showcase your ideas or receive general feedback! For any questions or feedback you may have, you can find us in the [Forta Discord server](https://discord.com/invite/fortanetwork) as well.

Continue to the next page where you can learn more about [subscribing to alerts](subscribing.md).