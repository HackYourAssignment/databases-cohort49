require("dotenv").config();
const connectToDatabase = require("../dbConnection");

async function setupDatabase() {
  const db = await connectToDatabase();
  const accounts = db.collection("accounts");

  await accounts.deleteMany({});

  const sampleData = [
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

  await accounts.insertMany(sampleData);
  console.log("Accounts collection has been set up with sample data.");
}

module.exports = setupDatabase;
