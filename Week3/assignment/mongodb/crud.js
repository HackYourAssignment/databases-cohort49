const { connect } = require('./db');

async function createEpisode(data) {
    const db = await connect();
    const result = await db.collection('bob_ross_episodes').insertOne(data);
    console.log('Episode added:', result.insertedId);
}

async function readEpisodes() {
    const db = await connect();
    const episodes = await db.collection('bob_ross_episodes').find().toArray();
    console.log('Episodes:', episodes);
}

async function updateEpisode(id, data) {
    const db = await connect();
    await db.collection('bob_ross_episodes').updateOne({ _id: id}, { $set: data });
    console.log('Episode updated');
}

async function deleteEpisode(id, data) {
    const db = await connect();
    await db.collection('bob_ross_episodes').deleteOne({ _id: id}, { $set: data });
    console.log('Episode deleted');
}

module.exports = { createEpisode, readEpisodes, updateEpisode, deleteEpisode };