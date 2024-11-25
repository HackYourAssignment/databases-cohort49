import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  const session = client.startSession();
  try {
    await session.startTransaction();

    const db = client.db('databaseWeek4');
    const accountsCollection = db.collection('accounts');

    // Find the 'from' and 'to' accounts
    const fromAccount = await accountsCollection.findOne({
      account_number: fromAccountNumber,
    });
    const toAccount = await accountsCollection.findOne({
      account_number: toAccountNumber,
    });

    if (!fromAccount || !toAccount) {
      throw new Error('One or both accounts not found');
    }

    // Check if 'from' account has enough balance
    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds in the 'from' account");
    }

    // Transfer logic
    const newFromBalance = fromAccount.balance - amount;
    const newToBalance = toAccount.balance + amount;

    // Increment the change_number for both accounts
    const newFromChangeNumber = fromAccount.account_changes.length + 1;
    const newToChangeNumber = toAccount.account_changes.length + 1;

    // Update both accounts
    await accountsCollection.updateOne(
      { account_number: fromAccountNumber },
      {
        $set: { balance: newFromBalance },
        $push: {
          account_changes: {
            change_number: newFromChangeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark: `Transferred to account ${toAccountNumber}: ${remark}`,
          },
        },
      },
      { session },
    );

    await accountsCollection.updateOne(
      { account_number: toAccountNumber },
      {
        $set: { balance: newToBalance },
        $push: {
          account_changes: {
            change_number: newToChangeNumber,
            amount: amount,
            changed_date: new Date(),
            remark: `Transferred from account ${fromAccountNumber}: ${remark}`,
          },
        },
      },
      { session },
    );

    await session.commitTransaction();
    console.log(
      `Transferred ${amount} from account ${fromAccountNumber} to account ${toAccountNumber}`,
    );
  } catch (error) {
    console.error('Error during transaction:', error);
    await session.abortTransaction();
  } finally {
    session.endSession();
    await client.close();
  }
}

export default transfer;
