const eventOrder = require("./constants");

class customFSPromises {
  constructor({ cryptoHelper }) {
    this.cryptoHelper = cryptoHelper;
  }

  async writeFile(filename, data, encoding = "") {
    const encryptedText = await this.cryptoHelper.encrypt(data);

    return Object.values({
      filename,
      encryptedText,
      encoding,
    });
  }

  configure() {
    const configuration = new Map();
    const writeFileOptions = {
      when: eventOrder.beforeOriginalCall,
      fn: this.writeFile.bind(this),
    };

    configuration.set(this.writeFile.name, writeFileOptions);

    return configuration;
  }
}

module.exports = customFSPromises;
