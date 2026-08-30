# Acquiring Polygon POL

As of October 18th 2021, Forta smart contracts (including the Bot Registry) have been moved to Polygon, a blockchain scaling solution that enables faster and cheaper transactions. You will need [POL](https://coinmarketcap.com/currencies/polygon/) tokens in order to pay gas fees on Polygon when deploying your bot. This guide will walk you through converting your ETH (on Ethereum mainnet) to POL (on Polygon mainnet). To learn more about Polygon, visit their [website](https://polygon.technology/).

**If you already have POL tokens on Ethereum mainnet, you can transfer them over to Polygon using the bridge in step 3.**

## 1. Import your keyfile into Metamask

1. In Metamask, click the Accounts dropdown and then click on Import Account
2. Select the JSON File option from the Type dropdown
3. Click on Choose File and navigate to your keyfile (in ~/.forta) and select it
4. Enter the password for your keyfile in the Password box
5. Click the Import button

Your keyfile should now be in Metamask. **Make sure there is some ETH in this account.**

## 2. Add Polygon network to your Metamask

1. In Metamask, click the Network dropdown and then click on Custom RPC
2. Fill in the following fields:
    - Network Name: `Polygon Mainnet`
    - RPC URL: `https://polygon-rpc.com/`
    - Chain ID: `137`
    - Currency Symbol: `POL`
    - Explorer URL: `https://polygonscan.com/`
3. Click the Save button

You can now interact with the Polygon network using your Metamask.

## 3. Move ETH to Polygon using the bridge

1. Navigate to the [Polygon bridge](https://wallet.polygon.technology)
2. Connect your Metamask wallet if needed (you will be prompted to sign a message)
3. Select Ether from the dropdown as the token to transfer
4. Enter how much ETH you want to transfer (for reference, 1 [POL](https://coinmarketcap.com/currencies/polygon/) will allow you to publish ~80 bots)
5. Click the Transfer button, then click Continue on the following dialogs
6. In the Metamask transaction dialog, review the gas fees and click Confirm
7. Wait for the transaction to complete on Ethereum mainnet
8. Verify your account balance on Polygon mainnet using the [Polygon block explorer](https://polygonscan.com/). You should have received **WETH** as an ERC-20 transfer (may take a few minutes to complete)

You have now transferred ETH from Ethereum mainnet over to Polygon mainnet.

## 4. Swap ETH for POL using the swap tool

1. Navigate to the [Polygon swap tool](https://wallet.polygon.technology/swap/)
2. Connect your Metamask wallet if needed (you will be prompted to sign a message)
3. Select how much POL you want to receive (for reference, 1 [POL](https://coinmarketcap.com/currencies/polygon/) will allow you to publish ~80 bots)
4. Select WETH as the token to swap (will be labelled "Ether (PoS-WETH)")
5. Click the Approve button
6. Click the Swap button
7. Wait for the transaction to complete on Polyon mainnet
8. Verify your account balance on Polygon mainnet using the [Polygon block explorer](https://polygonscan.com/). You should have received the specified amount of **POL**

You should now have POL tokens on Polygon mainnet in order to pay gas fees! You can now continue [deploying your bot](deploying.md).

