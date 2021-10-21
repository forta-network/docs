# Private Agents

In certain usecases, agent developers may want to keep their agent code and generated findings private. To enable this, we apply two common techniques: code obfuscation and data encryption. Using obfuscation, agent developers can make their code unreadable so that others cannot determine the scenario it is detecting. Using encryption, agents can publish findings but make them unreadable to anyone but themselves. In this example we will describe how to make a private Javascript agent (the same code can be used for Typescript agents as well). Private Python agents may be supported in the future.

You can find the [code for this example Javascript private agent](https://github.com/forta-protocol/forta-agent-examples/tree/master/private-agent-js) in the examples repo. We start with the high gas used agent and turn it into a private agent.

## Generating keys

We will use 2048-bit RSA public key encryption in this example, but you can use any public key encryption algorithm you prefer. The first step is to generate the keypair you will use for encryption. We make use of the built-in Node.js `crypto` library, but you can use any cryptography library you prefer. As a convenience, the project has a script to generate your public and private keys: `npm run keygen`. This will run the `generate.rsa.keys.js` file and output a public and private key file in your project folder: public.pem and private.pem, respectively.

The public key can be distributed with the agent, so let's move public.pem into the src folder. The private key should be **secured and kept in a secret place** i.e. do not commit private.pem into version control. If you view the agent code in agent.js, you will see that we load the public key into memory using the `initialize` handler function:

```javascript
async function initialize() {
  PUBLIC_KEY = readFileSync(path.resolve(__dirname, "public.pem"), "utf8");
}
```

## Encrypting findings

Now, when we detect a high gas transaction we want to generate an encrypted finding. Certain attributes of the finding, like `name` and `description`, are required and can be kept unencrypted, just make sure you don't reveal anything you want to keep private. In this example, we set these attributes to "omitted". We will encrypt the data we want to keep private and store it in the `metadata` field of the finding:

```javascript
metadata: {
  data: encrypt({
    name: "High Gas Used",
    description: `Gas Used: ${gasUsed}`,
    some: "other data",
  }),
}
```

The `encrypt` function is simply encrypting the provided object using our public key and returning a base64 string representing the encrypted data. Try and run this agent using `npm start` and verify that the findings are printed. The `data` field will look like a gibberish string e.g. `SmOtmKdY...Am22ShcQ==`

Great! Now we have an agent that is generating findings and keeping the data encrypted. Now what if we want to decrypt the data and use it?

## Decrypting findings

In order to decrypt the finding, we would make use of the private key in private.pem. In practice, you would subscribe to notifications from your particular agent and receive its findings via some webhook. Upon receiving the finding, you can decrypt the data using the private key.

For example's sake, the project has a `decrypt.js` file to help you decrypt your finding data and verify that it's what you expect. If you open a `node` console from your project folder, you can decrypt the data string from your finding:

```
$ node
> const { decrypt } = require("./decrypt")
> decrypt("SmOtmKdY...Am22ShcQ==")
```

The above code should print out the same object that you passed into the `encrypt` function. Awesome!

## Obfuscating code

All agents publish their code in the form of a Docker image to a public repository. Encrypted findings by themselves are not enough to keep the agent private, since anyone can look at the code and determine what conditions its looking for. This is where obfuscation can be helpful. In this example, we are using the [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) library to obfuscate the agent code, but you can use any obfuscation library you prefer.

We only want obfuscation to occur as a publish step, so we modify the provided Dockerfile to do the obfuscation:

```
# Build stage: obfuscate Javascript
FROM node:14.15.5-alpine as builder
WORKDIR /app
COPY . .
RUN npm install -g javascript-obfuscator
RUN javascript-obfuscator ./src --output ./dist --split-strings true --split-strings-chunk-length 3

# Final stage: install production dependencies
FROM node:14.15.5-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/dist ./src
COPY package*.json ./
COPY /src/public.pem ./src
RUN npm ci --production
CMD [ "npm", "run", "start:prod" ]
```

This is a slightly modified version of the Dockerfile that comes with every Javascript/Typescript project. We are using a [multi-stage Docker build](https://docs.docker.com/develop/develop-images/multistage-build/) to keep the generated image size small. In the first stage, called the `builder` stage, we are running the `javascript-obfuscator` tool on the src directory of the agent and outputting the result to a folder called dist. In the final stage, we are copying over the obfuscated code from the builder stage and also copying over the public.pem file into the src folder.

If you want to see what the obfuscated code looks like, the project has a script you can use: `npm run obfuscate`. This will use the same javascript-obfuscator tool and output the result in a folder called obfuscated. Try running the command and open up the result in /obfuscated/agent.js. You should be able to move the obfuscated agent.js over to your src folder and verify that it still behaves the same.

## Obfuscation settings

We are using only two of the obfuscation options that javascript-obfuscator provides: split-strings and split-strings-chunk-length. You may want to tweak these settings in order to further obfuscate your code. There are a few [preset options](https://github.com/javascript-obfuscator/javascript-obfuscator#preset-options) you can experiment with to achieve your desired level of obfuscation. Keep in mind that there will be a tradeoff between obfuscation and performance when tweaking these settings.

You now have a private agent that obfuscates its code and encrypts its findings! When you are ready to publish, you can simply run the `npm run publish` command to deploy the agent. **Make sure to update the agent documentation in README.md to not reveal anything about the agent**.
