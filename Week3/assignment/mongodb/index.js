const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");
require("dotenv").config();

async function createEpisodeExercise(client) {
  const episodeData = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
  };

  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne(episodeData);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Find the title of episode 2 in season 2
  const episode2Season2 = await collection.findOne({ episode: "S02E02" });
  console.log(
    `The title of episode 2 in season 2 is ${episode2Season2 ? episode2Season2.title : "Not Found"}`
  );

  // Find the season and episode number of the episode called "BLACK RIVER"
  const blackRiverEpisode = await collection.findOne({ title: "BLACK RIVER" });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode ? blackRiverEpisode.episode : "Not Found"}`
  );

  // Find all episode titles where Bob Ross painted a CLIFF
  const cliffEpisodes = await collection.find({ elements: "CLIFF" }).toArray();
  const cliffEpisodeTitles = cliffEpisodes.map((ep) => ep.title).join(", ");
  console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffEpisodeTitles}`);

  // Find all episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE
  const cliffAndLighthouseEpisodes = await collection.find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } }).toArray();
  const cliffAndLighthouseTitles = cliffAndLighthouseEpisodes.map((ep) => ep.title).join(", ");
  console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseTitles}`);
}

async function updateEpisodeExercises(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Update the title for episode 13 in season 30
  const updateTitleResult = await collection.updateOne(
    { episode: "S30E13" },
    { $set: { title: "BLUE RIDGE FALLS" } }
  );
  console.log(`Ran a command to update episode 13 in season 30 and it updated ${updateTitleResult.modifiedCount} episodes`);

  // Replace "BUSHES" with "BUSH" in all documents
  const updateBushesResult = await collection.updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$[elem]": "BUSH" } },
    { arrayFilters: [{ elem: "BUSHES" }] }
  );
  console.log(`Ran a command to update all the BUSHES to BUSH and it updated ${updateBushesResult.modifiedCount} episodes`);
}

async function deleteEpisodeExercise(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Delete episode 14 in season 31
  const deleteResult = await collection.deleteOne({ episode: "S31E14" });
  console.log(`Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`);
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    await client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
