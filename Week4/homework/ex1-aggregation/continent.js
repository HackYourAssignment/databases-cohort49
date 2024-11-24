import { connectToDatabase, disconnectFromDatabase } from './connection.js';

const getTotalPopulationByContinent = async (year, age) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('population');

    const aggCursor = await collection.aggregate([
      {
        $match: {
          Country: {
            $in: [
              'AFRICA',
              'ASIA',
              'EUROPE',
              'LATIN AMERICA AND THE CARIBBEAN',
              'NORTHERN AMERICA',
              'OCEANIA',
            ],
          },
          Year: year,
          Age: age,
        },
      },
      {
        $addFields: {
          TotalPopulation: {
            $add: [{ $toInt: '$M' }, { $toInt: '$F' }],
          },
        },
      },
    ]);

    const result = await aggCursor.toArray();

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
