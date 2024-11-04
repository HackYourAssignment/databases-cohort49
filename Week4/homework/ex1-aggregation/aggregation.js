import { MongoClient } from 'mongodb';

if (process.env.MONGODB_URI == null) throw Error(`no uri in .env`);

const client = new MongoClient(process.env.MONGODB_URI);

async function main() {
  await client.connect();

  const collection = client
    .db('population_pyramid_1950-2022')
    .collection('population_pyramid_1950-2022');

  const result1 = await populationByYear('Netherlands', collection);
  const result2 = await continentsPopulation(2020, '100+', collection);

  console.log([result1, result2]);
}

main()
  .catch(console.error)
  .finally(() => client.close());

function populationByYear(country, collection) {
  const pipeline = [
    {
      $match: {
        Country: country,
      },
    },
    {
      $group: {
        _id: '$Year',
        countPopulation: {
          $sum: {
            $add: ['$F', '$M'],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  return collection.aggregate(pipeline).toArray();
}

function continentsPopulation(year, age, collection) {
  const pipeline = [
    {
      $match: {
        Country: {
          $in: [
            'ASIA',
            'AFRICA',
            'EUROPE',
            'NORTHERN AMERICA',
            'LATIN AMERICA AND THE CARIBBEAN',
            'OCEANIA',
            'AUSTRALIA',
          ],
        },
        Year: year,
        Age: age,
      },
    },
    {
      $set: {
        TotalPopulation: {
          $sum: ['$M', '$F'],
        },
      },
    },
    {
      $sort: {
        Country: 1,
      },
    },
  ];

  return collection.aggregate(pipeline).toArray();
}
