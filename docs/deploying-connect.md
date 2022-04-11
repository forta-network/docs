# Deploying your bot with Forta Connect

This page covers how to deploy your bot using [Forta Connect](https://connect.forta.network/). You can also check out this short video tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/bEDsc0LtGD8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Pushing your bot image

Before you head over to Forta Connect, you will need one piece of information: your bot's image reference. You can get the image reference by running the following command (**make sure your Docker is running before proceeding**):

```
npm run push
```

This will build your bot image and push it to a repository where scan nodes can find it. Once completed, you should see a message in your output similar to:

```
successfully pushed image with reference bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2
```
Copy the image reference (i.e. `bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2`) to your clipboard and head over to [Forta Connect](https://connect.forta.network/).

## Import your keyfile into Metamask

Forta Connect will use your Metamask to send the deployment transaction. You can import your keyfile (located in ~/.forta) with the following steps:

1. In Metamask, click the Accounts dropdown and then click on Import Account
2. Select the JSON File option from the Type dropdown
3. Click on Choose File and navigate to your keyfile (in ~/.forta) and select it
4. Enter the password for your keyfile in the Password box
5. Click the Import button

Your keyfile should now be in Metamask.

## Connect your Metamask to Forta Connect

You will need to connect your Metamask to Forta Connect with the following steps:

1. On the Forta Connect website, click the Connect Wallet button on the top right
2. A Metamask dialog will appear asking you to select which account to connect. Select your imported account, click Next and then click Connect
3. In another Metamask dialog you will be asked to switch to the Polygon network. Click the Switch Network button
4. Another Metamask dialog will ask you to sign a message to login. Click the Sign button

Your Metamask should now be connected to Forta Connect. You should see a Create Agent button on the top right of the page

## Deploying

In order to deploy your bot, you will need to complete a short form:

1. Click the Create Agent button to bring up the form. The bot ID will be automatically generated for you
2. Fill in the rest of the fields with your bot's information like name, description and version
3. For the Documentation field, select the README.md from your project folder. This will be uploaded to IPFS and the hash will be shown
4. For the Image field, paste in the image reference you copied earlier from the `npm run push` command
5. If your code repository is public, fill in the Repository field
6. Click the Create button
7. A Metamask dialog will appear asking you to sign the metadata of your bot. Click the Sign button
8. Another Metamask dialog will appear asking you to sign the deployment transaction. Note: the transaction will be gasless (i.e. it won't cost you anything). Click the Sign button

When successfully deployed, you should see a dialog on Forta Connect saying your bot was created.

Congratulations! You have successfully deployed your first Forta bot!

Great job getting this far! You have created a project, developed a bot, written and run a test, and deployed it to the Forta network. We encourage you to share your bots with the [Discord community](https://discord.gg/DUju5Dh4J9) as a way to showcase your ideas or receive general feedback! For any questions or feedback you may have, you can find us in the [Forta Discord server](https://discord.gg/DUju5Dh4J9) as well.

Continue to the next page where you can learn more about [subscribing to alerts](subscribing.md).