import { MongoClient } from 'mongodb';
import setup from './setup.js';

/**
 * Handles the transfer of funds between accounts.
 *
 * @param {Object} transfer - Details of the transfer.
 * @param {number} transfer.sender - The account number of the sender.
 * @param {number} transfer.receiver - The account number of the receiver.
 * @param {number} transfer.amount - The amount to be transferred.
 */

async function main(transfer) {
  //check
  Object.values(transfer).forEach((value) => {
    if (typeof value !== 'number') throw new Error('Invalid Arguments');
  });

  //setup: connect => reset => session
  if (process.env.MONGODB_URI == null) throw Error(`no uri in .env`);
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  if (process.argv[2] === 'reset') await setup(client);

  const db = {
    collection: client.db('account_db').collection('account'),
    session: client.startSession(),
  };

  //start
  try {
    const result = await db.session.withTransaction(async () => {
      const logNumbers = await checkBalanceAndExistence(transfer, db); //throws error and returns {sender: nextChangeNumber, receiver ...}
      return await performAndLogTransaction(transfer, logNumbers, db);
    });

    console.log('Success! \n\n** Result:\n', result);
  } catch (e) {
    console.log(e);
  } finally {
    db?.session?.endSession();

    const check = await db.collection
      .find({
        $or: [
          { account_number: transfer.sender },
          { account_number: transfer.receiver },
        ],
      })
      .toArray();
    console.log(JSON.stringify(check, null, 2));

    client?.close();
  }
}

main({ sender: 101, receiver: 102, amount: 260.0 });

async function checkBalanceAndExistence(transfer, database) {
  const { sender, receiver, amount } = transfer;
  const { collection, session } = database;

  const findOne = (accountNumber) =>
    collection.findOne({ account_number: accountNumber }, { session });

  //get
  const senderDoc = await findOne(sender);
  const receiverDoc = await findOne(receiver);

  //check
  if (!(receiverDoc && senderDoc?.balance >= amount))
    throw new Error('An account does not exist or insufficient balance.');

  //returns the number for next transaction log
  return {
    sender: senderDoc.account_changes.length + 1,
    receiver: receiverDoc.account_changes.length + 1,
  };
}

async function performAndLogTransaction(transfer, logNumbers, db) {
  const { sender, receiver, amount } = transfer;

  const senderTransaction = {
    accountNumber: sender,
    balanceChange: -amount,
    changeNumber: logNumbers.sender,
    remark: `transfer to account ${receiver}`,
  };

  const receiverTransaction = {
    accountNumber: receiver,
    balanceChange: amount,
    changeNumber: logNumbers.receiver,
    remark: `transfer from account ${sender}`,
  };
  //update sender and receiver accounts
  return [
    await transaction(senderTransaction, db),
    await transaction(receiverTransaction, db),
  ];
}

//a helper function to make the transaction in one side
//can be used in one sided financial transactions
function transaction(transaction, database) {
  const { accountNumber, balanceChange, changeNumber, remark } = transaction;
  const { collection, session } = database;

  const filter = { account_number: accountNumber };
  const update = {
    $inc: { balance: balanceChange },
    $push: {
      account_changes: {
        change_number: changeNumber,
        account_number: accountNumber,
        amount: balanceChange,
        changed_date: new Date(),
        remark,
      },
    },
  };

  return collection.updateOne(filter, update, { session });
}
