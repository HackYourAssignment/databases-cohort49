const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDatabase() {
  await client.connect();
  return client.db('recipe_db');
}

async function closeDatabase() {
  await client.close();
}

module.exports = { connectToDatabase, closeDatabase };
