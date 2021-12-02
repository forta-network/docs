# Private Agents

In certain usecases, agent developers may want to keep their agent code and generated findings private. Two common techniques can be used to enable this: code obfuscation and data encryption. Using obfuscation, agent developers can make their code unreadable so that others cannot determine the scenario it is detecting. Using encryption, agent developers can publish findings that are unreadable to anyone but themselves. An alternative to encryption is obscurity i.e. use some sort of error code in the finding, like "42", which only the agent developer would understand.

This guide describes how to make a private Javascript agent using obfuscation and encryption (the same code can be used for Typescript agents as well). Private Python agents may be supported in the future. You can find the complete [code for this example Javascript private agent](https://github.com/forta-protocol/forta-agent-examples/tree/master/private-agent-js) in the examples repo. Let's start with the high gas used agent and turn it into a private agent.

## Generating keys

[OpenPGP](https://www.openpgp.org/) public key encryption will be used in this example, but you can use any public key encryption algorithm you prefer (just make sure you understand the tradeoffs). The first step is to generate the keypair you will use for encryption. This example uses the [OpenPGP.js](https://www.npmjs.com/package/openpgp) library, but you can use any library you prefer. As a convenience, the project has a script to generate your public and private keys: `npm run keygen`. This will run the `generate-keys.js` file and output a public and private key file in your project folder: public.pem and private.pem, respectively.

The public key can be distributed with the agent, so let's copy paste it into agent.js (beware of formatting as there should be no spaces at the beginning of each line). The private key should be **secured and kept in a secret place** i.e. do not commit private.pem into version control. If you view the agent code in agent.js, you will see that the public key is setup inside the `initialize` handler function:

```javascript
let publicKey;
const publicKeyString = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEYaX/KBYJKwYBBAHaRw8BAQdAS373U8tIP2ZjYfzY2tBVzmXgl8UWafEW
...
Ei3R2xv3QQEA3Luc1EhUZGuSdvjWhg7YZXJVTOCISdTNrdnodw99kQI=
=YYoH
-----END PGP PUBLIC KEY BLOCK-----
`;

async function initialize() {
  publicKey = await openpgp.readKey({
    armoredKey: publicKeyString,
  });
}
```

## Encrypting findings

Now, when a high gas transaction is detected, the agent needs to generate an encrypted finding. In this example, a regular finding is created the way you normally would in `handleTransaction`, and then passed through the `encryptFindings` function. This will return a list of new encrypted findings with most attributes set to "omitted". The original finding will be encrypted using the public key and then stored in the `metadata` field of the encrypted finding as a base64 string:

```javascript
async function encryptFindings(findings) {
  return Promise.all(
    findings.map(async (finding) => {
      // encrypt the original finding
      const originalFindingString = JSON.stringify(finding);
      const message = await openpgp.createMessage({
        text: originalFindingString,
      });
      const encryptedOriginalFinding = await openpgp.encrypt({
        message,
        encryptionKeys: publicKey,
      });

      // create a new finding with most fields replaced with the string 'omitted'
      const omittedString = "omitted";
      const encryptedFinding = Finding.fromObject({
        name: omittedString,
        description: omittedString,
        alertId: omittedString,
        protocol: omittedString,
        severity: FindingSeverity.Unknown,
        type: FindingType.Unknown,
        metadata: {
          data: encryptedOriginalFinding.toString("base64"), // nest the original finding into the metadata
        },
      });

      return encryptedFinding;
    })
  );
}
```

Try and run this agent using `npm start` and verify that the findings are printed. The `data` field will look like a gibberish string e.g.
```
"metadata": {
  "data": "-----BEGIN PGP MESSAGE-----\n\nwV4DnxOp2TR9DQISAQdAu9EkgSitn74NvrbYS6bCLUt0wzEgSY3ttXBVo/cF\ntE0w34HroEIRL4CjIrDJnZxaKoQXTIHw5zFqUHKcROwX8g27IDfilxg2i21B\nq2780NHy0sAJAQQtXuyjo7r+oN/H1Kl/KgB+OzBg1Jd5M0Bjx5brBXOMt30j\n52KB+4Q68VnqO5tUFc4+Cc35+ZfYzxwpNWQy7JH0q+iHuVNwk8HpU+jmR98q\nfqEIKTN1IDUM1zbZRsogPBbgjjT/kR5RnQS+Vw66TItV8ciGtSUYSF/UJBN4\nnskwMYxL/3NZzwlEw+NxplsYAu9W5AJXZiEYfDTJ6OJq9jCGWDWLIi9DsjL+\n0Nf1qwByGhuLAMdsFkLNIDhOe9vUdNFZs14umrK6\n=8WDC\n-----END PGP MESSAGE-----\n"
}
```

Great! Now that you have an agent generating encrypted findings, let's go over how to decrypt the data and use it.

## Decrypting findings

In order to decrypt the finding, you would make use of the private key in private.pem. In practice, you would subscribe to findings from your particular agent using [Forta Explorer](https://explorer.forta.network/) and receive its contents via some webhook. Upon receiving the finding, you can decrypt the data using the private key.

For this example's sake, the project has a `decrypt.js` file to help you decrypt your finding data and verify that it's what you expect. If you open a `node` console from your project folder, you can decrypt the data string from your finding:

```
$ node
> const { decrypt } = require("./decrypt")
> decrypt("-----BEGIN PGP MESSAGE-----\n\nwV4DnxOp2TR...s14umrK6\n=8WDC\n-----END PGP MESSAGE-----\n").then(r => console.log(r))
```

The above code should print out the high gas finding that was passed into the `encryptFindings` function. Awesome!

## Obfuscating code

All agents publish their code in the form of a Docker image to a public repository. Encrypted findings by themselves are not enough to keep the agent private since anyone can look at the code and determine what conditions its looking for. This is where obfuscation can be helpful. In this example, the [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) library is used to obfuscate the agent code, but you can use any library you prefer.

The obfuscation of the code can be done using the `npm run obfuscate` command. This will take all of the Javascript files in the src folder and output obfuscated versions of each file (with the same name) to the dist folder. Under the hood, the script is running the `javascript-obfuscator` tool and passing it some obfuscation options stored in obfuscation-config.js. 

It is recommended to obfuscate *before* publishing your agent so that you can verify the results of the obfuscation and make sure it meets your expectations. You can also try running the obfuscated code to verify that it still works by moving the obfuscated files over to the src folder.

## Obfuscation settings

The obfuscation-config.js contains a number of settings for manipulating the code. You may want to tweak these settings in order to further obfuscate your code. There are a few [preset options](https://github.com/javascript-obfuscator/javascript-obfuscator#preset-options) you can experiment with to achieve your desired level of obfuscation. Keep in mind that there will be a tradeoff between obfuscation and performance when tweaking these settings.

Be careful if tweaking the obfuscation-config.js settings, as some of the options could potentially break your code. For example, the `selfDefending` option will prevent your code from running if it is formatted in any way after being obfuscated. See the [complete list of options](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options) to get a better understanding.

## Other considerations

- Make sure to modify the README.md documentation to not reveal anything about the agent. You can keep a separate file (e.g. README_private.md) for your own internal documentation
- You will notice that the Dockerfile is slightly modified to copy the obfuscated source code from the dist folder instead of the src folder. The rest of the Dockerfile is the same
- For agents with several files, you can encrypt all findings in the top-level agent.js file. This way you don't need to repeat encryption code across multiple files
- If there are any json files you include with your agent (e.g. ABI.json), convert them into Javascript (.js) files so that they also get obfuscated and don't reveal anything about the agent
- The `javascript-obfuscator` tool can output different results based on the same settings, so make sure to verify the obfuscated result is good enough for you
- Do not read the public key from the public.pem file as this would make your agent vulnerable to an exploit where an attacker can replace the public.pem file with their own public key and decrypt your agent's findings on their own machine
- Make sure that unit tests are also obfuscated, or better yet, just not included in the final image. This could easily reveal what the agent is doing

You now have a private agent that obfuscates its code and encrypts its findings! When you are ready to publish, you can simply run the `npm run publish` or `npm run push` command to deploy the agent.