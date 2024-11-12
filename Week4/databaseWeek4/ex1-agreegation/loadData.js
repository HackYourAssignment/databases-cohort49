require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const { connectToDatabase, closeDatabase } = require('./db');

async function loadCSVData() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("populationData");

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
            .on('end', async () => {
                console.log('CSV data successfully loaded to MongoDB');
                await closeDatabase();
            });
    } catch (error) {
        console.error("Error connecting:", error);
        await closeDatabase();
    }
}

loadCSVData();
