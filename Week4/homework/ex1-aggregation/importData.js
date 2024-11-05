const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const connectToDatabase = require("../dbConnection");

async function importCSV() {
  const db = await connectToDatabase();
  const collection = db.collection("populationData");

  const results = [];
  fs.createReadStream(path.join(__dirname, "population_pyramid_1950-2022.csv"))
    .pipe(csv())
    .on("data", (data) =>
      results.push({
        Country: data.Country,
        Year: parseInt(data.Year),
        Age: data.Age,
        M: parseInt(data.M),
        F: parseInt(data.F),
      })
    )
    .on("end", async () => {
      await collection.insertMany(results);
      console.log("Data imported successfully");
      process.exit();
    });
}

importCSV();
