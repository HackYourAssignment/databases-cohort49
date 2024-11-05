const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("databaseweek4");
    const collection = db.collection("ex1_aggregation");

    async function getTotalPopulationByCountry(country) {
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
      return result;
    }

    async function getPopulationByYearAndAge(year, age) {
      const result = await collection
        .aggregate([
          { $match: { Year: year, Age: age } },
          {
            $project: {
              Country: 1,
              Year: 1,
              Age: 1,
              M: 1,
              F: 1,
              TotalPopulation: { $add: ["$M", "$F"] },
            },
          },
        ])
        .toArray();
      return result;
    }
    const netherlandsPopulation = await getTotalPopulationByCountry(
      "Netherlands",
    );
    console.log("Netherlands Population by Year:", netherlandsPopulation);

    const continentPopulation2020 = await getPopulationByYearAndAge(
      2020,
      "100+",
    );
    console.log(
      "Population details for 2020 and Age 100+:",
      continentPopulation2020,
    );
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
