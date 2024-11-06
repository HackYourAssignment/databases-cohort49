const { MongoClient } = require("mongodb");

async function setupAccounts() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("databaseWeek4");
  const collection = db.collection("accounts");

  await collection.deleteMany({});

  const accounts = [
    {
      account_number: 101,
      balance: 5000,
      account_changes: [],
    },
    {
      account_number: 102,
      balance: 3000,
      account_changes: [],
    },
  ];

  await collection.insertMany(accounts);
  console.log("Accounts setup complete");
  client.close();
}

module.exports = setupAccounts;
