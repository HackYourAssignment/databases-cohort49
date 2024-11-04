import getData from './dummyData.js';

export default async function setup(client) {
  await client.db('account_db').dropDatabase();
  const db = client.db('account_db');

  const account = db.collection('account');
  const accountChanges = db.collection('account_changes');

  await account.createIndex({ account_number: 1 }, { unique: true });
  await accountChanges.createIndex({ change_number: 1 }, { unique: true });

  await db.collection('counters').insertOne({
    _id: 'change_number',
    sequence_value: 0,
  });

  const [accounts, changes] = await getData(db);

  const result1 = await account.insertMany(accounts);
  const result2 = await accountChanges.insertMany(changes);

  return [result1, result2];
}
