# Storing sensitive data

There are cases where developers need to store sensitive information in their agent code (e.g. some API key) or just hide their agent logic from the public. While Forta does not currently support storage of secrets (since all agent images are stored in a public repository), developers can still use code obfuscation as a way to hide sensitive data.

It should be noted that obfuscation is not the same as encryption, and that obfuscation can potentially be reversed with enough effort. With this in mind, we do not recommend storing high-value secrets in your agents i.e. private keys with lots of funds. However, secrets that can be easily replaced can still be obfuscated (e.g. Etherscan API keys). The goal is to deter the average person from opening up your agent image and copy/pasting your secrets.

This page will demonstrate how to obfuscate your code using an example Javascript agent. You can find the code for this example [here](ADD LINK TO GITHUB EXAMPLE).

## Obfuscating code

In this example, the [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) library is used to obfuscate the agent code, but you can use any library you prefer.

We added an npm script to the project to run the obfuscator tool over our code: `npm run obfuscate`. This will take all of the Javascript files in the src folder and output obfuscated versions of each file with the same name to the obfuscated folder (if using Typescript, you should obfuscate the compiled Javascript files in the dist folder instead). If there are any json files you include with your agent (e.g. ABI.json), consider converting them into Javascript (.js) files so that they also get obfuscated and don't reveal anything about the agent. Under the hood, the script is running the `javascript-obfuscator` tool and passing it some obfuscation options stored in obfuscation-config.js.

It is recommended to obfuscate _before_ publishing your agent so that you can verify the results of the obfuscation and make sure it meets your expectations. You can also try running the obfuscated code to verify that it still works by moving the obfuscated files over to the src folder. Please note that the `javascript-obfuscator` tool can output different results based on the same settings, so make sure to verify the obfuscated result is good enough for you

## Obfuscation settings

The obfuscation-config.js contains a number of settings for manipulating the code. You may want to tweak these settings in order to further obfuscate your code. There are a few [preset options](https://github.com/javascript-obfuscator/javascript-obfuscator#preset-options) you can experiment with to achieve your desired level of obfuscation. Keep in mind that there will be a tradeoff between obfuscation and performance when tweaking these settings.

Be careful if tweaking the obfuscation-config.js settings, as some of the options could potentially break your code. For example, the `selfDefending` option will prevent your code from running if it is formatted in any way after being obfuscated. See the [complete list of options](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options) to get a better understanding.

## Updating the Dockerfile

The Dockerfile in the example is slightly modified to copy the obfuscated source code from the obfuscated folder instead of the src folder. This will ensure only the obfuscated code gets published in the agent image.

You now have an obfuscated agent
