import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "databaseWeek3";
const collectionName = "bob_ross_episodes";
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

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

const readEpisode = async (collection) => {
  try {
    const episode = await collection.findOne({ title: "Mountain Lake" });
    if (episode) {
      console.log("Found episode:", episode);
    } else {
      console.log("Episode not found.");
    }
  } catch (error) {
    console.error("Error reading episode:", error);
  }
};

const updateEpisode = async (collection) => {
  try {
    const updateResult = await collection.updateOne(
      { title: "Mountain Lake" },
      { $set: { title: "Mountain Lake (Updated)" } }
    );
    if (updateResult.matchedCount > 0) {
      console.log(
        `Matched ${updateResult.matchedCount} document(s), modified ${updateResult.modifiedCount} document(s)`
      );
    } else {
      console.log("No episode found to update.");
    }
  } catch (error) {
    console.error("Error updating episode:", error);
  }
};

const deleteEpisode = async (collection) => {
  try {
    const deleteResult = await collection.deleteOne({
      title: "Mountain Lake (Updated)",
    });
    if (deleteResult.deletedCount > 0) {
      console.log(`Deleted ${deleteResult.deletedCount} episode(s)`);
    } else {
      console.log("No episode found to delete.");
    }
  } catch (error) {
    console.error("Error deleting episode:", error);
  }
};

async function main() {
  let collection;

  try {
    collection = await connectToDatabase();

    await createEpisode(collection);
    await readEpisode(collection);
    await updateEpisode(collection);
    await deleteEpisode(collection);
  } catch (error) {
    console.error("Error during CRUD operations:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB.");
  }
}

main();
