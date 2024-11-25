import { connectToDatabase, disconnectFromDatabase } from './connection.js';

const main = async (country) => {
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

  await aggCursor.forEach((element) => console.log(element));
  await disconnectFromDatabase();
};

main('Afghanistan');
