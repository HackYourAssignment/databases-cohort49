import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";
import { closeDatabaseConnection, connectToDatabase } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFileName = path.join(__dirname, "./population_pyramid_1950-2022.csv");

const createDataArray = async () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFileName)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log("CSV file was successfully read!");
        resolve(results);
      });
  });
};

const seedData = async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("population");

    await collection.insertMany(results);
    console.log("Data was successfully inserted!");
  } catch (error) {
    console.log("Error connecting:", error);
  } finally {
    await closeDatabaseConnection();
  }
};

const results = await createDataArray();
// await seedData(results);
