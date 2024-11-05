const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "databaseWeek3";
const collectionName = "ex2_transactions";

async function transfer(fromAccount, toAccount, amount, remark) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const session = client.startSession();
    session.startTransaction();
    try {
      const fromAcc = await collection.findOne(
        { account_number: fromAccount },
        { session },
      );
      const toAcc = await collection.findOne(
        { account_number: toAccount },
        { session },
      );

      if (!fromAcc || !toAcc) {
        throw new Error("One or both accounts do not exist.");
      }

      await collection.updateOne(
        { account_number: fromAccount },
        {
          $set: { balance: fromAcc.balance - amount },
          $push: {
            account_changes: {
              change_number: fromAcc.account_changes.length + 1,
              amount: -amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session },
      );

      await collection.updateOne(
        { account_number: toAccount },
        {
          $set: { balance: toAcc.balance + amount },
          $push: {
            account_changes: {
              change_number: toAcc.account_changes.length + 1,
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session },
      );

      await session.commitTransaction();
      console.log(
        `Transferred ${amount} from account ${fromAccount} to account ${toAccount}.`,
      );
    } catch (error) {
      console.error("Transaction cancelled:", error);
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error during transfer:", error);
  } finally {
    await client.close();
  }
}

module.exports = transfer;
