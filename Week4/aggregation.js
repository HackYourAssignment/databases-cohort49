import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getTotalPopulationByCountry = async (country) => {
  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("population_data");

    const result = await collection
      .aggregate([
        { $match: { Country: country } },
        {
          $group: {
            _id: "$Year",
            countPopulation: { $sum: { $add: ["$M", "$F"] } },
          },
        },
        { $sort: { _id: 1 } }, // Sort by Year
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
getTotalPopulationByCountry("Netherlands");
