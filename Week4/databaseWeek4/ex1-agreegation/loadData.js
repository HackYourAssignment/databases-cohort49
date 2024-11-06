require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

async function loadCSVData() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const collection = client.db("databaseWeek4").collection("populationData");

        // Clear existing data for a fresh start
        await collection.deleteMany({});

        // Read and insert CSV data into MongoDB
        fs.createReadStream('population_pyramid_1950-2022.csv')
            .pipe(csv())
            .on('data', async (row) => {
                const document = {
                    Country: row.Country,
                    Year: parseInt(row.Year, 10),
                    Age: row.Age,
                    M: parseInt(row.M, 10),
                    F: parseInt(row.F, 10)
                };
                await collection.insertOne(document);
            })
            .on('end', () => {
                console.log('CSV data successfully loaded to MongoDB');
                client.close();
            });
    } catch (error) {
        console.error("Error:", error);
    }
}

loadCSVData();
