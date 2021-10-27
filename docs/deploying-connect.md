# Deploying your agent with Forta Connect

This page covers how to deploy your agent using the [Forta Connect](https://connect.forta.network/) dapp.

## Pushing your agent image

Before you head over to Forta Connect, you will need one piece of information: your agent's image reference. You can get the image reference by running the following command (**make sure your Docker is running before proceeding**):

```
npm run push
```

This will build your agent image and push it to a repository where scan nodes can find it. Once completed, you should see a message in your output similar to `successfully pushed image with reference bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2`. Copy the image reference to your clipboard and head over to [Forta Connect](https://connect.forta.network/).

## Import your keyfile into Metamask

Forta Connect will use your Metamask to send the deployment transaction. You can import your keyfile (located in ~/.forta) with the following steps:

1. In Metamask, click the Accounts dropdown and then click on Import Account
2. Select the JSON File option from the Type dropdown
3. Click on Choose File and navigate to your keyfile (in ~/.forta) and select it
4. Enter the password for your keyfile in the Password box
5. Click the Import button

Your keyfile should now be in Metamask.

## Connect your Metamask to Forta Connect

You will need to connect your Metamask to the Forta Connect dapp with the following steps:

1. On the Forta Connect website, click the Connect Wallet button on the top right
2. A Metamask dialog will appear asking you to select which account to connect. Select your imported account, click Next and then click Connect
3. In another Metamask dialog you will be asked to switch to the Polygon network. Click the Switch Network button
4. Another Metamask dialog will ask you to sign a message to login. Click the Sign button

Your Metamask should now be connected to Forta Connect. You should see a Create Agent button on the top right of the page

## Deploying

The Create Agent form will need to be populated in order to deploy. The agent ID will be automatically generated for you. Fill in the rest of the form with your agent's information. Also, paste in the image reference you copied earlier into the Image field. Once the form is complete, click the Create button.

## Verifying your agent

Once your agent is published and picked up by a scan node, you can view the findings it generates using the [Forta Explorer](https://explorer.forta.network/). You can filter findings using your agent ID. Once you are done verifying your agent and if you will not be using the alerts it generates (i.e. you were just testing out Forta), we ask that you please disable the agent using Forta Connect.

Great job getting this far! You have created a project, developed an agent, written and run a test, and deployed it to the Forta protocol.

We encourage you to share your agents with the [Discord community](https://discord.gg/DUju5Dh4J9) as a way to showcase your ideas or receive general feedback! For any questions or feedback you may have, you can find us in the [Forta Discord server](https://discord.gg/DUju5Dh4J9) as well.
