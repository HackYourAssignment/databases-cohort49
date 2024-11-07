require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function setup() {
    try {
        // Connect to MongoDB Atlas
        await client.connect();
        const database = client.db('dataBaseWeek4');
        const accounts = database.collection('accounts'); 
        
        // Clean the accounts collection
        await accounts.deleteMany({});
        
        // Insert sample account data
        const sampleData = [
            {
                account_number: 101,
                balance: 5000,
                account_changes: []
            },
            {
                account_number: 102,
                balance: 3000,
                account_changes: []
            }
        ];
        
        await accounts.insertMany(sampleData);
        console.log("Sample data inserted successfully.");
    } catch (err) {
        console.error('Error setting up the database:', err);
    } finally {
        await client.close();
    }
}

setup();
