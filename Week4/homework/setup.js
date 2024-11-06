import { MongoClient } from "mongodb";
import "dotenv/config";

export const DATABASE_NAME = "databaseWeek4";
export const COLLECTION_NAME = "accounts";
export const CLIENT = new MongoClient(process.env.MONGODB_URL);

export const setupDatabase = async () => {
  try {
    await CLIENT.connect();
    const collection = CLIENT.db(DATABASE_NAME).collection(COLLECTION_NAME);

    await collection.deleteMany({});
    console.log("Accounts collection cleaned up.");

    const sampleData = [
      {
        account_number: "101",
        balance: 4000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: new Date(),
            remark: "deposit",
          },
          {
            change_number: 2,
            amount: -100,
            changed_date: new Date(),
            remark: "withdrawal",
          },
        ],
      },
      {
        account_number: "102",
        balance: 9000,
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: new Date(),
            remark: "deposit",
          },
          {
            change_number: 2,
            amount: -200,
            changed_date: new Date(),
            remark: "withdrawal",
          },
        ],
      },
      {
        account_number: "103",
        balance: 8000,
        account_changes: [
          {
            change_number: 1,
            amount: 1500,
            changed_date: new Date(),
            remark: "deposit",
          },
          {
            change_number: 2,
            amount: -300,
            changed_date: new Date(),
            remark: "withdrawal",
          },
        ],
      },
    ];

    const result = await collection.insertMany(sampleData);
    console.log(
      `Inserted ${result.insertedCount} accounts into the collection.`
    );
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
};
