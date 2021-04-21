const CryptoHelper = require("./src/cryptoHelper");
const app = require("./src/app");
const CustomFSPromises = require("./src/customFSPromises");
const Decorator = require("./src/decorator");

(async () => {
  const config = {
    cryptoKey: "uER94-5xKSL-slw24-x3p2ku",
  };

  const cryptoHelper = await CryptoHelper.setup(config);

  const customFSPromises = new CustomFSPromises({ cryptoHelper }).configure();

  Decorator.decorateModule(customFSPromises, require("fs").promises);

  await app.run();
})();
