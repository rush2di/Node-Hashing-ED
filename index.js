var CryptoJS = require("crypto-js");

const choices = {
  ENCRYPTION: "ENCRYPTION",
  DECRYPTION: "DECRYPTION",
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

const encryptInterface = () => {
  let key = null;
  let value = null;
  rl.question(`Please enter text you want to encrypt\n`, (valueInput) => {
    value = valueInput;
    rl.question(`Please enter key you want to use\n`, (keyInput) => {
      key = keyInput;
      console.log(`
        Your input ==> ${valueInput}
        Input has been encrypted, copy your results 
        ===> ${CryptoJS.AES.encrypt(valueInput, keyInput).toString()}`);
      rl.close();
    });
  });
};

const decryptInterface = () => {
  let key = null;
  let hash = null;
  rl.question(`Please enter your hash\n`, (hashInput) => {
    hash = hashInput;
    rl.question(`Please enter your key\n`, (keyInput) => {
      key = keyInput;
      const bytes = CryptoJS.AES.decrypt(hashInput, keyInput);
      console.log(`
      Your hash ==> ${hashInput}
      Input has been decrypted, here are your results 
      ===> ${bytes.toString(CryptoJS.enc.Utf8)}`);
      rl.close();
    });
  });
};

rl.question(
  `What do you want, ${choices.ENCRYPTION} or ${choices.DECRYPTION}?\n`,
  (choice) => {
    console.log(JSON.stringify(choice, null, 2));
    switch (choice) {
      case choices.ENCRYPTION:
        encryptInterface();
        break;
      case choices.DECRYPTION:
        decryptInterface();
        break;
      default:
        rl.close();
        break;
    }
  }
);
