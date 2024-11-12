const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
    await client.connect();
    return client.db("databaseWeek4");
}

async function closeDatabase() {
    await client.close();
}

module.exports = { connectToDatabase, closeDatabase };
