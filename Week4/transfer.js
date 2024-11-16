import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const transferMoney = async (fromAccount, toAccount, amount, remark) => {
  const session = client.startSession();

  try {
    session.startTransaction();

    const db = client.db("bank");
    const accountsCollection = db.collection("accounts");
    const counterCollection = db.collection("counters");

    const fromAccountDoc = await accountsCollection.findOne({
      account_number: fromAccount,
    });
    const toAccountDoc = await accountsCollection.findOne({
      account_number: toAccount,
    });

    if (!fromAccountDoc || !toAccountDoc) {
      throw new Error("Account not found");
    }

    if (fromAccountDoc.balance < amount) {
      throw new Error("Insufficient funds");
    }

    const changeNumberDoc = await counterCollection.findOneAndUpdate(
      { _id: "changeNumber" },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after", session }
    );

    const changeNumber = changeNumberDoc.value.seq;

    await accountsCollection.updateOne(
      { account_number: fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: changeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      },
      { session }
    );

    await accountsCollection.updateOne(
      { account_number: toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: changeNumber,
            amount,
            changed_date: new Date(),
            remark,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();
    console.log("Transaction successful");
  } catch (error) {
    console.error("Error during transaction:", error);
    await session.abortTransaction();
  } finally {
    session.endSession();
    await client.close();
  }
};

transferMoney(101, 102, 1000, "Transfer for groceries");
