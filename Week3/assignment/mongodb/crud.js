import { MongoClient, ServerApiVersion } from "mongodb";
import seedDatabase from "../mongodb/seedDatabase.js";

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
});

async function createEpisode(data) {
    const result = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .insertOne(data);
    console.log('Episode added:', result.insertedId);
}

async function readEpisodes() {
    const episodes = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .find()
        .toArray();
    console.log('Episodes:', episodes);
}

async function updateEpisode(id, data) {
    const result = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .updateOne({ _id: id }, { $set: data });
    console.log('Episode updated:', result.modifiedCount);
}

async function deleteEpisode(id) {
    const result = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .deleteOne({ _id: id });
    console.log('Episode deleted:', result.deletedCount);
}

async function findEpisodes() {
    const findEpisodeTwoTitle = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .findOne({ episode: "S02E02" });
    console.log(`The title of episode 2 in season 2 is ${findEpisodeTwoTitle.title}`);

    const findBlackRiver = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .findOne({ title: "BLACK RIVER" });
    console.log(`The season and episode number of the "BLACK RIVER" episode is ${findBlackRiver.episode}`);

    const cursorOne = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .find({ elements: "CLIFF" });
    const findAllCliffs = await cursorOne.toArray();
    const findAllCliffsTitles = findAllCliffs.map((el) => el.title);
    console.log(`The episodes that Bob Ross painted a CLIFF are ${findAllCliffsTitles.join(", ")}`);

    const cursorTwo = await client
        .db("databaseWeek3")
        .collection("bob_ross_episodes")
        .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } });
    const findAllCliffsAndLighthouses = await cursorTwo.toArray();
    const findAllCliffsAndLighthousesTitles = findAllCliffsAndLighthouses.map((el) => el.title);
    console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${findAllCliffsAndLighthousesTitles.join(", ")}`);
}

async function main() {
    if (!uri) {
        throw new Error(`Environment variable 'MONGODB_URL' is not set. Please configure your environment correctly.`);
    }

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        await seedDatabase(client);

        await createEpisode({
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

        await findEpisodes();

        await updateEpisode("S30E13", { title: "BLUE RIDGE FALLS" });

        await deleteEpisode("S31E14");
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

main();
