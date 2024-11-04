import { MongoClient } from 'mongodb';
import setup from './setup.js';
import getNextChangeNumber from './getNextChangeNumber.js';

if (process.env.MONGODB_URI == null) throw Error(`no uri in .env`);

const client = new MongoClient(process.env.MONGODB_URI);

async function main() {
  //setup: connect => reset => session
  await client.connect();
  if (process.argv[2] === 'reset') await setup(client);

  const db = client.db('account_db');
  const account = db.collection('account');
  const accountChanges = db.collection('account_changes');

  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      const transferData = [101, 102, 1000.0, session];

      await checkBalanceAndExistence(...transferData, account); //throws error

      const [transaction, log] = await Promise.all([
        await performTransaction(...transferData, account),
        await logTransaction(...transferData, accountChanges, db),
      ]);

      console.log(
        'Success! \n\n** transaction result:\n',
        transaction,
        '\n\n** log result:\n',
        log,
      );
    });
  } finally {
    session?.endSession();
    client?.close();
  }
}

main();

async function checkBalanceAndExistence(
  senderAccountNumber,
  receiverAccountNumber,
  minBalance,
  session,
  collection,
) {
  const findOne = (accountNumber) =>
    collection.findOne({ account_number: accountNumber }, { session });

  const [sender, receiver] = await Promise.all([
    findOne(senderAccountNumber),
    findOne(receiverAccountNumber),
  ]);

  if (!(receiver && sender?.balance >= minBalance))
    throw new Error('An account does not exist or insufficient balance.');

  return [sender, receiver];
}

async function performTransaction(
  senderAccountNumber,
  receiverAccountNumber,
  amount,
  session,
  collection,
) {
  const updateOne = (accountNumber, balanceChange) =>
    collection.updateOne(
      { account_number: accountNumber },
      { $inc: { balance: balanceChange } },
      { session },
    );

  return Promise.all([
    updateOne(senderAccountNumber, -amount),
    updateOne(receiverAccountNumber, amount),
  ]);
}

function logTransaction(
  senderAccountNumber,
  receiverAccountNumber,
  amount,
  session,
  collection,
  db,
) {
  const logOne = async (accountNumber, balanceChange, remark) => {
    const change_number = await getNextChangeNumber(db);

    return collection.insertOne(
      {
        change_number,
        account_number: accountNumber,
        amount: balanceChange,
        changed_date: new Date(),
        remark,
      },
      { session },
    );
  };

  return Promise.all([
    logOne(
      senderAccountNumber,
      -amount,
      `transfer to account ${receiverAccountNumber}`,
    ),
    logOne(
      receiverAccountNumber,
      amount,
      `transfer from account ${senderAccountNumber}`,
    ),
  ]);
}
