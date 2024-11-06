const { MongoClient } = require("mongodb");

async function getContinentData(year, age) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("databaseWeek4");
  const collection = db.collection("ex1-aggregation");

  const result = await collection
    .aggregate([
      { $match: { Year: year, Age: age } },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] },
        },
      },
    ])
    .toArray();

  client.close();
  return result;
}

module.exports = getContinentData;
