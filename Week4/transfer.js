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

    // Get accounts from the database
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

    // Update balances
    await accountsCollection.updateOne(
      { account_number: fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: Date.now(),
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
            change_number: Date.now(),
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

// Example usage:
transferMoney(101, 102, 1000, "Transfer for groceries");
