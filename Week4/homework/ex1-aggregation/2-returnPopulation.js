import { closeDatabaseConnection, connectToDatabase } from "../db.js";

const main = async (country) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("population");

    const aggCursor = await collection.aggregate(
      [
        { $match: { Country: country } },
        {
          $addFields: {
            combinedPopulation: {
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
        {
          $group: {
            _id: "$Year",
            countPopulation: {
              $sum: "$combinedPopulation",
            },
          },
        },
        { $sort: { _id: 1 } },
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

main("Netherlands");
