require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
    try {
        await client.connect();
        const database = client.db('databaseWeek3');
        const collection = database.collection('bob_ross_episodes');

        // Clear existing data
        await collection.deleteMany({});

        // Load data from JSON file
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

        // Insert data into the collection
        const insertResult = await collection.insertMany(data);
        console.log('Inserted documents:', insertResult.insertedCount);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.close();
    }
}

seedDatabase().catch(console.error);
