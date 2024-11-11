import { MongoClient } from "mongodb";
import "dotenv/config";

const DATABASE_NAME = "databaseWeek4";
const COLLECTION_NAME = "population";
const client = new MongoClient(process.env.MONGODB_URL);

const getCollection = (client) => {
  return client.db(DATABASE_NAME).collection(COLLECTION_NAME);
};

const getPopulationByCountry = async (client, country) => {
  try {
    const result = await getCollection(client)
      .aggregate([
        { $match: { Country: country } },
        {
          $group: {
            _id: "$Year",
            populationCount: { $sum: { $add: ["$M", "$F"] } },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const continentsInformation = async (client, year, age) => {
  try {
    const result = await getCollection(client)
      .aggregate([
        {
          $match: {
            Year: year,
            Age: age,
            Country: {
              $in: [
                "AFRICA",
                "ASIA",
                "EUROPE",
                "LATIN AMERICA AND THE CARIBBEAN",
                "NORTHERN AMERICA",
                "OCEANIA",
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            Country: 1,
            Year: 1,
            Age: 1,
            M: 1,
            F: 1,
            TotalPopulation: {
              $add: ["$M", "$F"],
            },
          },
        },
        {
          $sort: { Country: 1 },
        },
      ])
      .toArray();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  try {
    await client.connect();
    await getPopulationByCountry(client, "Netherlands");
    await continentsInformation(client, 2020, "100+");
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await client.close();
  }
};

main();
