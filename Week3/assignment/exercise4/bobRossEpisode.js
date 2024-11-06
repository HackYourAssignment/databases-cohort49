const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const dbName = "databaseWeek3";
const collectionName = "bob_ross_episodes";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDB() {
  await client.connect();
  console.log("Connected to MongoDB");
  const collection = client.db(dbName).collection(collectionName);
  return { client, collection };
}

module.exports = { connectToDB };
