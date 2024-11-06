const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");

async function importData() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("databaseWeek4");
  const collection = db.collection("ex1-aggregation");

  await collection.deleteMany({});

  fs.createReadStream("ex1-aggregation/data.csv")
    .pipe(csv())
    .on("data", async (row) => {
      await collection.insertOne({
        Country: row.Country,
        Year: parseInt(row.Year),
        Age: row.Age,
        M: parseInt(row.M),
        F: parseInt(row.F),
      });
    })
    .on("end", () => {
      console.log("Data imported successfully");
      client.close();
    });
}

importData();
