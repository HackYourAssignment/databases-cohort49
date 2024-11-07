require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = 'dataBaseWeek4';

async function getTotalPopulationByCountry(country) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('populationData');

        const result = await collection.aggregate([
            { $match: { Country: country } },
            {
                $group: {
                    _id: '$Year',
                    countPopulation: { $sum: { $add: ['$M', '$F'] } }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

getTotalPopulationByCountry("Netherlands").catch(console.error);

async function getContinentDataByYearAndAge(year, age) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('populationData');

        const result = await collection.aggregate([
            { $match: { Year: year, Age: age } },
            {
                $addFields: {
                    TotalPopulation: { $add: ['$M', '$F'] }
                }
            }
        ]).toArray();

        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}


getContinentDataByYearAndAge(2020, "100+").catch(console.error);

