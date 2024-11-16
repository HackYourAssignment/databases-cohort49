import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getTotalPopulationByContinent = async (year, age) => {
  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("population_data");

    const result = await collection
      .aggregate([
        { $match: { Year: year, Age: age } },
        {
          $group: {
            _id: "$Country",
            M: { $sum: "$M" },
            F: { $sum: "$F" },
            TotalPopulation: { $sum: { $add: ["$M", "$F"] } },
          },
        },
        {
          $group: {
            _id: {
              $cond: {
                if: {
                  $in: [
                    "$_id",
                    ["AFRICA", "OCEANIA", "ASIA", "EUROPE", "AMERICAS"],
                  ],
                },
                then: "$_id",
                else: "Other",
              },
            },
            TotalPopulation: { $sum: "$TotalPopulation" },
            M: { $sum: "$M" },
            F: { $sum: "$F" },
          },
        },
        {
          $project: {
            _id: 0,
            Continent: "$_id",
            Year: year,
            Age: age,
            TotalPopulation: 1,
            M: 1,
            F: 1,
          },
        },
      ])
      .toArray();

    console.log(result);
  } catch (error) {
    console.error("Error during aggregation:", error);
  } finally {
    await client.close();
  }
};

getTotalPopulationByContinent(2020, "100+");
