const { MongoClient } = require("mongodb");

async function getTotalPopulation(country) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("databaseWeek4");
  const collection = db.collection("ex1-aggregation");

  const result = await collection
    .aggregate([
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } },
        },
      },
      { $sort: { _id: 1 } },
    ])
    .toArray();

  client.close();
  return result;
}

module.exports = getTotalPopulation;
