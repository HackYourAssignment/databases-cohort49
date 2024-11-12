require('dotenv').config();
const { MongoClient } = require('mongodb');

async function getTotalPopulationByCountry(country) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db("databaseWeek4").collection("populationData");

        const result = await collection.aggregate([
            { $match: { Country: country } },
            { $group: { _id: "$Year", countPopulation: { $sum: { $add: ["$M", "$F"] } } } },
            { $sort: { _id: 1 } }
        ]).toArray();

        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

async function getPopulationByYearAndAge(year, age) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db("databaseWeek4").collection("populationData");

        const result = await collection.aggregate([
            { $match: { Year: year, Age: age } },
            { $addFields: { TotalPopulation: { $add: ["$M", "$F"] } } }
        ]).toArray();

        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

module.exports = { getTotalPopulationByCountry, getPopulationByYearAndAge };
