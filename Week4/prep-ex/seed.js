const { MongoClient } = require("mongodb");
const recipe = require("./recipe");
const ingredient = require("./ingredient");
const user = require("./user");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function seedData() {
  try {
    await client.connect();
    const db = client.db("recipe_db");

    // Insert sample data
    await db.collection("recipes").insertOne(recipe);
    await db.collection("ingredients").insertOne(ingredient);
    await db.collection("users").insertOne(user);

    console.log("Sample data inserted successfully!");
  } finally {
    await client.close();
  }
}

seedData().catch(console.dir);
