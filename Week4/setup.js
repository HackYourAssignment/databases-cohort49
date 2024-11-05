import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const setupDatabase = async () => {
  try {
    await client.connect();
    const db = client.db("bank");
    const accountsCollection = db.collection("accounts");

    // Clean up the collection
    await accountsCollection.deleteMany({});

    // Insert sample account data
    const accounts = [
      { account_number: 101, balance: 5000, account_changes: [] },
      { account_number: 102, balance: 2000, account_changes: [] },
    ];

    await accountsCollection.insertMany(accounts);
    console.log("Database setup complete");
  } catch (error) {
    console.error("Error during setup:", error);
  } finally {
    await client.close();
  }
};

// Run the setup
setupDatabase();
