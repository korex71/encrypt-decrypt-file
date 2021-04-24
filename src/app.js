const { promises, writeFileSync, readFileSync, unlinkSync } = require("fs");

async function run({ args }, del) {
  // const fileTarget = "super-security-file.text.enc";
  if (args.mode == "encrypt") execEncrypt(args, del);
  else if (args.mode == "decrypt") execDecrypt(args, del);
}

async function execEncrypt({ filename }, del) {
  console.log(`Writing ${filename} to -> ${filename}.enc`);

  const text = readFileSync(filename);

  await promises.writeFile(filename + ".enc", text);

  if (del) unlinkSync(filename);

  console.log("Finished");
}

async function execDecrypt({ filename }, del) {
  const decrypted = (await promises.readFile(filename)).toString();

  const file = filename.includes(".enc")
    ? filename.replace(".enc", "")
    : filename;

  console.log(`Writing ${filename} to -> ${file}`);

  writeFileSync(file, decrypted, { encoding: "utf-8" });

  if (del) unlinkSync(filename);

  console.log("Finished");
}

module.exports = { run };
