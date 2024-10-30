require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require("fs");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to database");

    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");

    await seedDatabase(collection);
    await createEpisode(collection, {
      title: "Episode 1",
      elements: ["Tree", "Mountain"],
    });
    await readEpisodes(collection);
    await updateEpisode(collection, "Episode 1", {
      elements: ["Tree", "Mountain", "Sky"],
    });
    await deleteEpisode(collection, "Episode 1");
  } finally {
    await client.close();
  }
}

async function seedDatabase(collection) {
  await collection.deleteMany({});
  console.log("Database cleared");

  const data = JSON.parse(fs.readFileSync("data.json"));
  const result = await collection.insertMany(data);
  console.log(`${result.insertedCount} documents were inserted`);
}

async function createEpisode(collection, episode) {
  const result = await collection.insertOne(episode);
  console.log(
    `New episode created with the following id: ${result.insertedId}`
  );
}

async function readEpisodes(collection) {
  const episodes = await collection.find({}).toArray();
  console.log("Episodes found:", episodes);
}

async function updateEpisode(collection, title, updates) {
  const result = await collection.updateOne(
    { title: title },
    { $set: updates }
  );
  console.log(`${result.modifiedCount} document(s) was/were updated`);
}

async function deleteEpisode(collection, title) {
  const result = await collection.deleteOne({ title: title });
  console.log(`${result.deletedCount} document(s) was/were deleted`);
}

main().catch(console.error);
