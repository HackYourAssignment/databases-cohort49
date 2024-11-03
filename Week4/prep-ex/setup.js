const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("recipe_db");

    // Collections setup
    await database.createCollection("recipes");
    await database.createCollection("ingredients");
    await database.createCollection("users");

    console.log("Database setup complete!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
