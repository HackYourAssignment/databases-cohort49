require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = "databaseWeek4";
const collectionName = "populationData";

async function getTotalPopulationByCountry(country) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db(dbName).collection(collectionName);

        const result = await collection.aggregate([
            { $match: { Country: country } },
            { $group: { _id: "$Year", countPopulation: { $sum: { $add: ["$M", "$F"] } } } },
            { $sort: { _id: 1 } }
        ]).toArray();

        console.log(result);
        return result;
    } catch (error) {
        console.error("Error in getTotalPopulationByCountry:", error);
        throw error;
    } finally {
        await client.close();
    }
}

async function getPopulationByYearAndAge(year, age) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db(dbName).collection(collectionName);

        const result = await collection.aggregate([
            {
                $match: {
                    Country: {
                        $in: [
                            "AFRICA",
                            "ASIA",
                            "EUROPE",
                            "LATIN AMERICA AND THE CARIBBEAN",
                            "NORTHERN AMERICA",
                            "OCEANIA",
                        ],
                    },
                    Year: parseInt(year, 10),
                    Age: age,
                }
            },
            { $addFields: { TotalPopulation: { $add: ["$M", "$F"] } } }
        ]).toArray();

        console.log(result);
        return result;
    } catch (error) {
        console.error("Error in getPopulationByYearAndAge:", error);
        throw error;
    } finally {
        await client.close();
    }
}

// Main function to invoke both methods
async function main() {
    try {
        console.log("Fetching total population by country:");
        await getTotalPopulationByCountry("Netherlands");

        console.log("\nFetching population by year and age:");
        await getPopulationByYearAndAge(2020, "100+");
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

main();
