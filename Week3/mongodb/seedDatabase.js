import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import data from "./data.json"; // This will work now
dotenv.config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to database for seeding");

    const db = client.db("databaseWeek3");
    const collection = db.collection("bob_ross_episodes");

    // Clean up the collection before seeding
    await collection.deleteMany({});
    console.log("Cleaned the collection");

    // Insert data from data.json
    const insertResult = await collection.insertMany(data);
    console.log(`Inserted ${insertResult.insertedCount} episodes`);
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await client.close();
  }
};

seedDatabase();
