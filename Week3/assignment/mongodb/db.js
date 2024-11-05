require('dotenv').config();
const { MongoClient } = require('mongodb');
const data = require('../mongodb/data.json');
const uri = process.env.DB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Connects to MongoDB and returns the database instance.
 * @returns {Promise<Db>}
 */
async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('databaseWeek3');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
}

/**
 * Drops and recreates the collection using data from a JSON file.
 * Ensures consistent data for testing purposes.
 * @param {MongoClient} client 
 */
async function seedDatabase(client) {
    const db = client.db('databaseWeek3');
    const collectionExists = await db.listCollections({ name: 'bob_ross_episodes' }).hasNext();

    if (collectionExists) {
        const bobRossCollection = db.collection('bob_ross_episodes');

        await bobRossCollection.deleteMany({});

        const documents = data.map((dataItem) => {
            const { EPISODE, TITLE, ...depictionData } = dataItem;
            const elements = Object.keys(depictionData).filter(key => depictionData[key] === 1);

            return {
                episode: EPISODE,
                title: TITLE.replaceAll('"', ''),
                elements,
            };
        });

        await bobRossCollection.insertMany(documents);
        console.log("Database seeded successfully.");
    } else {
        throw new Error("The collection `bob_ross_episodes` does not exist!");
    }
}

async function main() {
    try {
        const db = await connect();
        await seedDatabase(client);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

main().catch(console.error);
