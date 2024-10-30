import { MongoClient, ServerApiVersion } from "mongodb";

import seedDatabase from "./seedDatabase.js";

async function createEpisodeExercise(client) {
  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne({
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
    });

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  const findEpisodeTwoTitle = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });

  console.log(
    `The title of episode 2 in season 2 is ${findEpisodeTwoTitle.title}`
  );

  const findBlackRiver = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${findBlackRiver.episode}`
  );

  const cursorOne = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: "CLIFF" });

  const findAllCliffs = await cursorOne.toArray();
  const findAllCliffsTitles = findAllCliffs.map((el) => el.title);

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${findAllCliffsTitles.join(
      ", "
    )}`
  );

  const cursorTwo = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } });

  const findAllCliffsAndLighthouses = await cursorTwo.toArray();
  const findAllCliffsAndLighthousesTitles = findAllCliffsAndLighthouses.map(
    (el) => el.title
  );

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${findAllCliffsAndLighthousesTitles.join(
      ", "
    )}`
  );
}

async function updateEpisodeExercises(client) {
  const updateEp13 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateEp13.modifiedCount} episodes`
  );

  const updateBushes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateMany({ elements: "BUSHES" }, { $set: { "elements.$": "BUSH" } });

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateBushes.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  const deleteEp = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });

  console.log(
    `Ran a command to delete episode and it deleted ${deleteEp.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
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
    client.close();
  }
}

main();
