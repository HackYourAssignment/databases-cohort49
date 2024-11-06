import fs from 'fs';
import csv from 'csv-parser';
import { connectToDatabase, disconnectFromDatabase } from './connection.js';

async function importData() {
  const db = await connectToDatabase();
  const collection = db.collection('population');

  const results = [];

  fs.createReadStream('./population_pyramid_1950-2022.csv')
    .pipe(csv())
    .on('data', (data) =>
      results.push({
        Country: data.Country,
        Year: parseInt(data.Year),
        Age: data.Age,
        M: parseInt(data.M),
        F: parseInt(data.F),
      }),
    )

    .on('end', async () => {
      try {
        await collection.insertMany(results);
        console.log('Data imported successfully!');
      } catch (error) {
        console.error('Error importing data:', error);
      } finally {
        await disconnectFromDatabase();
      }
    });
}

importData();
