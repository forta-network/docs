# Private alerts

In certain usecases bot developers may want to keep their generated alerts private. Using encryption, bot developers can publish alerts that are unreadable to anyone but themselves. An alternative to encryption is obscurity i.e. use some sort of error code in the finding, like "42", which only the bot developer would understand.

In addition to encrypting the alerts, you likely also want to obfuscate the bot logic (as done in the example code). Bot images are stored in a public repository where anyone can inspect the contents of the image as well as the bot logic to see what is being scanned for. Check out the [pattern for hiding sensitive data](sensitive-data.md) to understand how this is implemented.

This page describes how to write a Javascript bot that emits private alerts using encryption. You can find the code for this example [here](https://github.com/forta-protocol/forta-agent-examples/tree/master/private-agent-js).

## Generating keys

[OpenPGP](https://www.openpgp.org/) public key encryption will be used in this example, but you can use any public key encryption algorithm you prefer (just make sure you understand the tradeoffs). The first step is to generate the keypair you will use for encryption. This example uses the [OpenPGP.js](https://www.npmjs.com/package/openpgp) library, but you can use any library you prefer. The project has an npm script to generate public and private keys: `npm run keygen`. This will run the `generate-keys.js` file and output a public and private key file in the project folder: public.pem and private.pem, respectively.

The public key can be distributed with the bot, so let's copy paste it into agent.js (be careful with formatting as there should be no spaces at the beginning of each line). The private key should be **secured and kept in a secret place** i.e. do not commit private.pem into version control. If you view the bot code in agent.js, you will see that the public key is setup inside the `initialize` handler function:

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

In this example, a regular finding is created the way you normally would in `handleTransaction`, and then passed through the `encryptFindings` function. This will return a list of new encrypted findings with most attributes set to "omitted". The original finding will be encrypted using the public key and then stored in the `metadata` field of the encrypted finding as a base64 string:

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

Try and run this bot using `npm start` and verify that the findings are printed. The `data` field will look like a gibberish string e.g.

```
"metadata": {
  "data": "-----BEGIN PGP MESSAGE-----\n\nwV4DnxOp2TR9DQISAQdAu9EkgSitn74NvrbYS6bCLUt0wzEgSY3ttXBVo/cF\ntE0w34HroEIRL4CjIrDJnZxaKoQXTIHw5zFqUHKcROwX8g27IDfilxg2i21B\nq2780NHy0sAJAQQtXuyjo7r+oN/H1Kl/KgB+OzBg1Jd5M0Bjx5brBXOMt30j\n52KB+4Q68VnqO5tUFc4+Cc35+ZfYzxwpNWQy7JH0q+iHuVNwk8HpU+jmR98q\nfqEIKTN1IDUM1zbZRsogPBbgjjT/kR5RnQS+Vw66TItV8ciGtSUYSF/UJBN4\nnskwMYxL/3NZzwlEw+NxplsYAu9W5AJXZiEYfDTJ6OJq9jCGWDWLIi9DsjL+\n0Nf1qwByGhuLAMdsFkLNIDhOe9vUdNFZs14umrK6\n=8WDC\n-----END PGP MESSAGE-----\n"
}
```

Great! Now that you have an bot generating encrypted findings, let's go over how to decrypt the data and use it.

## Decrypting findings

In order to decrypt the finding, you would make use of the private key in private.pem. In practice, you would subscribe to findings from your particular bot using the [Forta App](https://app.forta.network/notifications) and receive its contents via some webhook. Upon receiving the finding, you can decrypt the data using the private key.

For this example's sake, the project has a `decrypt.js` file to help you decrypt your finding data and verify that it's what you expect. If you open a `node` console from your project folder, you can decrypt the data string from your finding:

```
$ node
> const { decrypt } = require("./decrypt")
> decrypt("-----BEGIN PGP MESSAGE-----\n\nwV4DnxOp2TR...s14umrK6\n=8WDC\n-----END PGP MESSAGE-----\n").then(r => console.log(r))
```

The above code should print out the finding that was passed into the `encryptFindings` function.

## setPrivateFindings

As an added layer of security, bots can indicate that they do not want their findings indexed by Forta Explorer. An adversary could potentially look for alerts that use encryption and with enough alerts could infer what condition the bot is looking for. To avoid this, simply invoke `setPrivateFindings(true)` in the `initialize` handler:

```javascript
const { setPrivateFindings } = require("forta-agent")

async function initialize() {
  ...
  setPrivateFindings(true)
}
```

This will tell the Forta protocol not to display the emitted alerts in Forta Explorer, as well as not to associate the alert with any block/transaction. If you would like to reference the block/transaction, you would need to set the data yourself in the finding `metadata`.

## Other considerations

- Make sure to modify the README.md documentation to not reveal anything about the bot since it will be published in the bot manifest. You can keep a separate file (e.g. README_private.md) for your own internal documentation
- Be careful when populating the package.json `name` and `description` fields as these will get published in the bot manifest. You may not want these to reveal anything about the abotgent
- For bots with several files, you can encrypt all findings in the top-level agent.js file. This way you don't need to repeat encryption code across multiple files
- Do not read the public key from the public.pem file as this would make your bot vulnerable to an exploit where an attacker can replace the public.pem file with their own public key and decrypt your bot's findings on their own machine
- Make sure that unit tests are also obfuscated, or better yet, just not included in the final image. This could easily reveal what the bot is doing

Awesome! You now have a bot that encrypts findings which do not appear in Forta Explorer.
