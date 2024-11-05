const setupDatabase = require("./setup");
const transferMoney = require("./transfer");

async function run() {
  await setupDatabase();

  await transferMoney(101, 102, 1000, "Test transfer");
}

run();
