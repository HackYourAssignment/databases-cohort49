import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function setup() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('databaseWeek4');
    const accountsCollection = db.collection('accounts');

    await accountsCollection.deleteMany({});

    const sampleAccounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 5000,
            changed_date: new Date(),
            remark: 'Initial deposit',
          },
        ],
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [
          {
            change_number: 1,
            amount: 3000,
            changed_date: new Date(),
            remark: 'Initial deposit',
          },
        ],
      },
    ];

    await accountsCollection.insertMany(sampleAccounts);
    console.log('Sample accounts inserted into the database');
  } catch (error) {
    console.error('Error in setup:', error);
  } finally {
    await client.close();
  }
}

setup();
