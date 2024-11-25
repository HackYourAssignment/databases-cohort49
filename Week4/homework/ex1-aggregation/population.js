import { connectToDatabase, disconnectFromDatabase } from './connection.js';
const getTotalPopulationPerYear = async (country) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('population');
    const aggCursor = await collection.aggregate([
      { $match: { Country: country } },
      {
        $addFields: {
          combinedPopulation: {
            $add: [{ $toInt: '$F' }, { $toInt: '$M' }],
          },
        },
      },
      {
        $group: {
          _id: '$Year',
          countPopulation: { $sum: '$combinedPopulation' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const result = await aggCursor.toArray();

    return result;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await disconnectFromDatabase();
  }
};

getTotalPopulationPerYear('Afghanistan')
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
