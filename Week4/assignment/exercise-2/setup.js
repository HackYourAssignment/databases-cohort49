const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "databaseWeek3";
const collectionName = "ex2_transactions";

async function setupAccounts() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

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
    console.log("Accounts set up successfully.");
  } catch (error) {
    console.error("Error setting up accounts:", error);
  } finally {
    await client.close();
  }
}

module.exports = setupAccounts;
