class parseArgs {
  constructor(argv) {
    const args = argv.slice(2);

    if (args.length == 0 || args.length != 3) {
      process.stdout.write(
        "\nExpected formats:\n\t--encrypt filename 24 chars key\n\t--decrypt filename key used to encrypt."
      );
      process.stdout.write(
        `\n\nUsed format: ${args.toString().split(",").join(" ")}\n`
      );
      return process.exit(1);
    }

    if (args[2].length != 24) {
      process.stdout.write("\nKey must be 24 characters.\n");
      return process.exit(1);
    }

    return {
      mode: args[0].slice(2),
      filename: args[1],
      key: args[2],
    };
  }

  mode = this.mode;
  filename = this.filename;
  key = this.key;
}

module.exports = parseArgs;

/*
  Encrypt expected
  [
    --encrypt,
    filename,
    encrypt key
  ]
  Decrypt expected
  [
    --decrypt,
    filename,
    key used to encrypt
  ]
*/
