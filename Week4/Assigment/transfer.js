const { MongoClient } = require("mongodb");

async function transfer(fromAccount, toAccount, amount, remark) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("databaseWeek4");
  const collection = db.collection("accounts");

  const session = client.startSession();
  session.startTransaction();

  try {
    const from = await collection.findOne({ account_number: fromAccount });
    const to = await collection.findOne({ account_number: toAccount });

    if (from.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const changeNumberFrom = from.account_changes.length + 1;
    const changeNumberTo = to.account_changes.length + 1;

    await collection.updateOne(
      { account_number: fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: changeNumberFrom,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      },
      { session }
    );

    await collection.updateOne(
      { account_number: toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: changeNumberTo,
            amount,
            changed_date: new Date(),
            remark,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();
    console.log("Transfer complete");
  } catch (error) {
    console.error("Transfer failed:", error);
    await session.abortTransaction();
  } finally {
    session.endSession();
    client.close();
  }
}

module.exports = transfer;
