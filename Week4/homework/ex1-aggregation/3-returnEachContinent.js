import { closeDatabaseConnection, connectToDatabase } from "../db.js";

const main = async (year, age) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("population");

    const aggCursor = await collection.aggregate([
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
          Year: 2020,
          Age: "100+",
        },
      },
      {
        $addFields: {
          TotalPopulation: { $add: ["$F", "$M"] },
        },
      },
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

main("2020", "100+");
