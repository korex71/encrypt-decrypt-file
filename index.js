const app = require("./src/app");
const CryptoHelper = require("./src/cryptoHelper");
const CustomFSPromises = require("./src/customFSPromises");
const Decorator = require("./src/decorator");
const ParseArgs = require("./src/parseArgs");
const readline = require("readline");

const args = new ParseArgs(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const config = {
    cryptoKey: args.key, // "8 * 24 Char = 192bits || aes-192"
  };

  const cryptoHelper = await CryptoHelper.setup(config);

  const customFSPromises = new CustomFSPromises({ cryptoHelper }).configure();

  Decorator.decorateModule(customFSPromises, require("fs").promises);

  rl.question("Delete original file after proccess? [Y/N]: ", async (res) => {
    let opt = res.toLowerCase();

    if (opt != "y" && opt != "n") {
      process.stdout.write("\n\nInvalid option.");
      process.exit(1);
    }

    await app.run({ args }, opt == "y" ? true : false);

    rl.close();
  });
})();
