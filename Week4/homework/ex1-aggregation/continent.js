import { connectToDatabase, disconnectFromDatabase } from './connection.js';

const getTotalPopulationByContinent = async (year, age) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('population');

    const aggCursor = await collection.aggregate([
      {
        $match: {
          country: {
            $in: [
              'AFRICA',
              'ASIA',
              'EUROPE',
              'LATIN AMERICA AND THE CARIBBEAN',
              'NORTHERN AMERICA',
              'OCEANIA',
            ],
          },
          year: year,
          age: age,
        },
      },
      {
        $addFields: {
          TotalPopulation: {
            $add: [{ $toInt: '$M' }, { $toInt: '$F' }],
          },
        },
      },
      {
        $group: {
          _id: '$Country',
          Year: { $first: '$Year' },
          Age: { $first: '$Age' },
          M: { $sum: '$M' },
          F: { $sum: '$F' },
          TotalPopulation: { $sum: '$TotalPopulation' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result = await aggCursor.toArray();

    console.log(result);

    return result;
  } catch (error) {
    console.log('Error connecting:', error);
  } finally {
    await disconnectFromDatabase();
  }
};

getTotalPopulationByContinent(2020, '100+')
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
