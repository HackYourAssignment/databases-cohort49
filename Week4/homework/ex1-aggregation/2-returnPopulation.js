import { closeDatabaseConnection, connectToDatabase } from "../db.js";

const main = async (country) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("population");

    const aggCursor = await collection.aggregate([
      { $match: { Country: "Netherlands" } },
      {
        $addFields: {
          combinedPopulation: { $add: ["$M", "$F"] },
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
    ]);

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
