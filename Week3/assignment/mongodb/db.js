require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.DB_URI;

const client = new MongoClient(uri, { userNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('databaseweek3');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
}

module.exports = { connect };