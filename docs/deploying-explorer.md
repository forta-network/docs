# Deploying your agent with Forta Explorer

This page covers how to deploy your agent using [Forta Explorer](https://explorer.forta.network/).

## Pushing your agent image

Before you head over to Forta Explorer, you will need one piece of information: your agent's image reference. You can get the image reference by running the following command (**make sure your Docker is running before proceeding**):

```
npm run push
```

This will build your agent image and push it to a repository where scan nodes can find it. Once completed, you should see a message in your output similar to:

```
successfully pushed image with reference bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2
```
Copy the image reference (i.e. `bafybeifutbdhewyz7lfl4z7bfry6xfscaewwhe4n3uqi2gdj67js6plwre@sha256:3904d36d3527ae4135e479dd223c37dde1e6052ae47fdbf3305ebd506d4e34d2`) to your clipboard and head over to [Forta Explorer](https://explorer.forta.network/).

## Import your keyfile into Metamask

Forta Explorer will use your Metamask to send the deployment transaction. You can import your keyfile (located in ~/.forta) with the following steps:

1. In Metamask, click the Accounts dropdown and then click on Import Account
2. Select the JSON File option from the Type dropdown
3. Click on Choose File and navigate to your keyfile (in ~/.forta) and select it
4. Enter the password for your keyfile in the Password box
5. Click the Import button

Your keyfile should now be in Metamask.

## Connect your Metamask to Forta Explorer

You will need to connect your Metamask to Forta Explorer with the following steps:

1. On the Forta Explorer website, click the "Log in with wallet" button on the top right
2. A Metamask dialog will appear asking you to select which account to connect. Select your imported account, click Next and then click Connect
3. Another Metamask dialog will ask you to sign a message to login. Click the Sign button

Your Metamask should now be connected to Forta Explorer. You should see your wallet address appear on the menu at the top right of the page.

## Deploying

In order to deploy your agent, you will need to complete a short form by navigating to the My Agents page (from the menu at the top right):

1. Click the Deploy Agent button to bring up the form. The agent ID will be automatically generated for you
2. Fill in the rest of the fields with your agent's information like name, description, version and which blockchains you want to scan
3. For the Documentation field, select the README.md from your project folder. This will be uploaded to IPFS
4. For the Docker Image field, paste in the image reference you copied earlier from the `npm run push` command
5. If your code repository is public, fill in the Repository field
6. Click the "Sign to proceed" button
7. A Metamask dialog will appear asking you to sign the agent metadata. Click the Sign button
8. A confirmation form will display your agent metadata, including the IPFS hash of the agent metadata and documentation. If these look good, click the Deploy Agent button to initiate the deployment transaction
9. A Metamask dialog will appear asking you to confirm the deployment transaction. Review the details and click the Confirm button

When successfully deployed, you should see the agent status as Enabled on the My Agents page.

Congratulations! You have successfully deployed your first Forta Agent!

Great job getting this far! You have created a project, developed an agent, written and run a test, and deployed it to the Forta protocol. We encourage you to share your agents with the [Discord community](https://discord.gg/DUju5Dh4J9) as a way to showcase your ideas or receive general feedback! For any questions or feedback you may have, you can find us in the [Forta Discord server](https://discord.gg/DUju5Dh4J9) as well.

Continue to the next page where you can learn more about [subscribing to alerts](subscribing.md).