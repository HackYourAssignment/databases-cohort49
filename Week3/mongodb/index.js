import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("databaseWeek3");
    const collection = db.collection("bob_ross_episodes");

    // Perform CRUD operations here...
    await createEpisode(collection);
    await readEpisode(collection);
    await updateEpisode(collection);
    await deleteEpisode(collection);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection to the database
    await client.close();
  }
}

// CREATE: Insert a new episode
const createEpisode = async (collection) => {
  const newEpisode = {
    title: "Mountain Lake",
    season: 1,
    episode: 1,
    elements: ["Mountain", "Lake", "Waterfall"],
  };

  try {
    const insertResult = await collection.insertOne(newEpisode);
    console.log(`Inserted episode with id: ${insertResult.insertedId}`);
  } catch (error) {
    console.error("Error inserting episode:", error);
  }
};

// READ: Find an episode by title
const readEpisode = async (collection) => {
  try {
    const episode = await collection.findOne({ title: "Mountain Lake" });
    console.log("Found episode:", episode);
  } catch (error) {
    console.error("Error reading episode:", error);
  }
};

// UPDATE: Update the title of an episode
const updateEpisode = async (collection) => {
  try {
    const updateResult = await collection.updateOne(
      { title: "Mountain Lake" },
      { $set: { title: "Mountain Lake (Updated)" } }
    );
    console.log(
      `Matched ${updateResult.matchedCount} document(s), modified ${updateResult.modifiedCount} document(s)`
    );
  } catch (error) {
    console.error("Error updating episode:", error);
  }
};

// DELETE: Delete an episode by title
const deleteEpisode = async (collection) => {
  try {
    const deleteResult = await collection.deleteOne({
      title: "Mountain Lake (Updated)",
    });
    console.log(`Deleted ${deleteResult.deletedCount} episode(s)`);
  } catch (error) {
    console.error("Error deleting episode:", error);
  }
};

// Execute the main function
main();
