const setupAccounts = require("./setup");
const transfer = require("./transfer");

async function main() {
  await setupAccounts();

  await transfer(101, 102, 1000, "Payment for services");
}

main().catch(console.error);
