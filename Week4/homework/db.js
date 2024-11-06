import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "databaseWeek4";
const client = new MongoClient(url);

export const connectToDatabase = async () => {
  await client.connect();
  console.log("Successfully connected to the database");
  return client.db(dbName);
};

export const closeDatabaseConnection = async () => {
  await client.close();
};
