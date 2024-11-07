import { MongoClient, ServerApiVersion } from 'mongodb';

import seedDatabase from './seedDatabase.js';

async function createEpisodeExercise(client) {
  const newEpisode = {
    episode: 13,
    title: 'BLUE RIDGE FALLS',
    season: 9,
    elements: ['MOUNTAIN', 'TREES', 'RIVER'],
  };
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .insertOne(newEpisode);
  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`,
  );
}

async function findEpisodesExercises(client) {
  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  const episode2 = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ season: 2, episode: 2 });

  console.log(`The title of episode 2 in season 2 is ${episode2.title}`);

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const blackRiver = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ title: 'BLACK RIVER' });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiver.episode}`,
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
  const cliffEpisodes = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: 'CLIFF' })
    .toArray();

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes
      .map((episode) => episode.title)
      .join(', ')}`,
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  const cliffAndLighthouseEpisodes = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: { $all: ['CLIFF', 'LIGHTHOUSE'] } })
    .toArray();
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodes
      .map((episode) => episode.title)
      .join(', ')}`,
  );
}

async function updateEpisodeExercises(client) {
  const updateResult1 = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateOne(
      { season: 30, episode: 13 },
      { $set: { title: 'BLUE RIDGE FALLS' } },
    );
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateResult1.modifiedCount} episodes`,
  );

  const updateResult2 = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateMany({ elements: 'BUSHES' }, { $set: { 'elements.$': 'BUSH' } });

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateResult2.modifiedCount} episodes`,
  );
}

async function deleteEpisodeExercise(client) {
  const deleteResult = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .deleteOne({ season: 31, episode: 14 });

  console.log(
    `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`,
  );
}

async function main() {
  if (!process.env.MONGODB_URL) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`,
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
    client.close();
  }
}

main();
