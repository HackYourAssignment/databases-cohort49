const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");

const DATABASE_NAME = "databaseWeek3";
const COLLECTION_NAME = "bob_ross_episodes";

function getCollection(client) {
  return client.db(DATABASE_NAME).collection(COLLECTION_NAME);
}

async function createEpisode({ client, episode }) {
  const result = await getCollection(client).insertOne(episode);
  console.log(
    `Created episode "${episode.title}" with ID: ${result.insertedId}`
  );
}

async function findEpisodes({ client }) {
  const collection = getCollection(client);

  const episode2Season2 = await collection.findOne({ episode: "S02E02" });
  console.log(`Episode 2 in season 2: ${episode2Season2.title}`);

  const blackRiverEpisode = await collection.findOne({ title: "BLACK RIVER" });
  console.log(`BLACK RIVER episode: ${blackRiverEpisode.episode}`);

  const cliffEpisodes = await collection.find({ elements: "CLIFF" }).toArray();
  console.log(
    `Episodes with CLIFF: ${cliffEpisodes.map((ep) => ep.title).join(", ")}`
  );

  const cliffLighthouseEpisodes = await collection
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
    .toArray();
  console.log(
    `Episodes with both CLIFF and LIGHTHOUSE: ${cliffLighthouseEpisodes
      .map((ep) => ep.title)
      .join(", ")}`
  );
}

async function updateEpisodeTitle({ client, episodeId, newTitle }) {
  const result = await getCollection(client).updateOne(
    { episode: episodeId },
    { $set: { title: newTitle } }
  );
  console.log(
    `Updated episode ${episodeId} title to "${newTitle}": ${result.modifiedCount} document(s) modified.`
  );
}

async function updateBushes({ client }) {
  const result = await getCollection(client).updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$": "BUSH" } }
  );
  console.log(
    `Updated all occurrences of BUSHES to BUSH: ${result.modifiedCount} document(s) modified.`
  );
}

async function deleteEpisode({ client, episodeId }) {
  const result = await getCollection(client).deleteOne({ episode: episodeId });
  console.log(
    `Deleted episode ${episodeId}: ${result.deletedCount} document(s) deleted.`
  );
}

async function main() {
  if (!process.env.MONGODB_URL) {
    throw new Error(
      "Environment variable MONGODB_URL is not set. Please check your .env file."
    );
  }

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    await seedDatabase(client);

    const newEpisode = {
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "DECIDIOUS",
        "GRASS",
        "MOUNTAIN",
        "MOUNTAINS",
        "RIVER",
        "SNOWY_MOUNTAIN",
        "TREE",
        "TREES",
      ],
    };

    await createEpisode({ client, episode: newEpisode });
    await findEpisodes({ client });
    await updateEpisodeTitle({
      client,
      episodeId: "S30E13",
      newTitle: "BLUE RIDGE FALLS",
    });
    await updateBushes({ client });
    await deleteEpisode({ client, episodeId: "S31E14" });
  } catch (err) {
    console.error("Error during database operations:", err);
  } finally {
    await client.close();
  }
}

main();
