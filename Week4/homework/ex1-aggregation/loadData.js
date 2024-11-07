require('dotenv').config();
const csvtojson = require('csvtojson');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = 'dataBaseWeek4';

async function loadData() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('populationData');

        const data = await csvtojson().fromFile('population_pyramid_1950-2022.csv');
        
        const formattedData = data.map(row => ({
            Country: row.Country,
            Year: parseInt(row.Year, 10),
            Age: row.Age,
            M: parseInt(row.M, 10),
            F: parseInt(row.F, 10)
        }));

        await collection.insertMany(formattedData);
        console.log('Data loaded successfully');
    } finally {
        await client.close();
    }
}

loadData().catch(console.error);
