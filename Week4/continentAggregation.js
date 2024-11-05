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
          $lookup: {
            from: "continents",
            localField: "_id",
            foreignField: "Country",
            as: "continent_info",
          },
        },
        {
          $project: {
            _id: 0,
            Country: { $arrayElemAt: ["$continent_info.Country", 0] },
            Year: year,
            Age: age,
            M: 1,
            F: 1,
            TotalPopulation: 1,
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

// Example usage:
getTotalPopulationByContinent(2020, "100+");
