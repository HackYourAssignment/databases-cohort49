import fs from "fs";
import csv from "csv-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const loadCSV = async () => {
  const data = [];
  const collectionName = "population_data";

  fs.createReadStream("ex1-aggregation/data.csv")
    .pipe(csv())
    .on("data", (row) => {
      data.push({
        Country: row.Country,
        Year: Number(row.Year),
        Age: row.Age,
        M: Number(row.M),
        F: Number(row.F),
      });
    })
    .on("end", async () => {
      try {
        await client.connect();
        const db = client.db("databaseWeek4");
        const collection = db.collection(collectionName);

        // Clear existing data
        await collection.deleteMany({});

        // Insert new data
        await collection.insertMany(data);
        console.log("CSV data has been inserted into MongoDB");
      } catch (error) {
        console.error("Error inserting data:", error);
      } finally {
        await client.close();
      }
    });
};

loadCSV();
