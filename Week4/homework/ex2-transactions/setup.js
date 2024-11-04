import getData from './dummyData.js';

export default async function setup(client) {
  //drop if exists and recreate
  const db = client.db('account_db');
  await db.dropDatabase();
  const account = db.collection('account');

  //index
  await account.createIndex({ account_number: 1 }, { unique: true });

  //populate
  const accounts = getData(db);
  return account.insertMany(accounts);
}
