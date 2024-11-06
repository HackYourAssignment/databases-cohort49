require('dotenv').config();
const { MongoClient } = require('mongodb');

async function setupAccounts() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const collection = client.db("databaseWeek4").collection("accounts");

        // Clear existing data
        await collection.deleteMany({});

        // Insert initial accounts
        await collection.insertMany([
            {
                account_number: 101,
                balance: 5000,
                account_changes: [
                    { change_number: 1, amount: 5000, changed_date: new Date(), remark: "Initial Balance" }
                ]
            },
            {
                account_number: 102,
                balance: 3000,
                account_changes: [
                    { change_number: 1, amount: 3000, changed_date: new Date(), remark: "Initial Balance" }
                ]
            }
        ]);

        console.log("Accounts setup completed.");
    } finally {
        await client.close();
    }
}

setupAccounts();
