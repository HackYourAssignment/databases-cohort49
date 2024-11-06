import { closeDatabaseConnection, connectToDatabase } from "../db.js";

const setupAccounts = async () => {
  const db = await connectToDatabase();
  const accounts = db.collection("accounts");

  accounts.deleteMany({});

  await accounts.insertMany([
    {
      account_number: 101,
      balance: 2000,
      account_changes: [],
    },
    {
      account_number: 102,
      balance: 3000,
      account_changes: [],
    },
  ]);

  console.log("Data inserted to accounts collection");
};

export default setupAccounts;
