import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('databaseWeek4');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}
async function disconnectFromDatabase() {
  await client.close();
  console.log('Disconnected from MongoDB');
}

module.exports = { connectToDatabase, disconnectFromDatabase };
