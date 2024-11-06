import { closeDatabaseConnection, connectToDatabase } from "../db.js";

const main = async (year, age) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("population");

    const aggCursor = await collection.aggregate(
      [
        {
          $match: {
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
        { $match: { Year: year, Age: age } },
        {
          $addFields: {
            TotalPopulation: {
              $add: [
                {
                  $convert: {
                    input: "$F",
                    to: "int",
                    onError: 0,
                    onNull: 0,
                  },
                },
                {
                  $convert: {
                    input: "$M",
                    to: "int",
                    onError: 0,
                    onNull: 0,
                  },
                },
              ],
            },
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );

    await aggCursor.forEach((element) => {
      console.log(element);
    });
  } catch (error) {
    console.log("Error connecting:", error);
  } finally {
    await closeDatabaseConnection();
  }
};

main("2020", "100+");
