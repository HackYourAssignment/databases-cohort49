require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('databaseWeek3');
        const collection = database.collection('bob_ross_episodes');

        // Example CRUD operations

        // 1. Create
        const newEpisode = { title: "Happy Little Trees", elements: ["trees", "happy", "brush"] };
        const insertResult = await collection.insertOne(newEpisode);
        console.log('Inserted document:', insertResult.insertedId);

        // 2. Read
        const episodes = await collection.find().toArray();
        console.log('All episodes:', episodes);

        // 3. Update
        const updateResult = await collection.updateOne(
            { title: "Happy Little Trees" },
            { $set: { title: "Happy Little Forest" } }
        );
        console.log('Updated documents:', updateResult.modifiedCount);

        // 4. Delete
        const deleteResult = await collection.deleteOne({ title: "Happy Little Forest" });
        console.log('Deleted documents:', deleteResult.deletedCount);
        
    } catch (error) {
        console.error('Error occurred while performing operations:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main().catch(console.error);
