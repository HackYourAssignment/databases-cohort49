import { closeDatabaseConnection, connectToDatabase } from "../db.js";

const transfer = async (from, to, amount, remark) => {
  try {
    const db = await connectToDatabase();
    const accounts = db.collection("accounts");
    const session = db.client.startSession();

    // start transaction
    session.startTransaction();

    try {
      //get account From
      const accountFrom = await accounts.findOne({ account_number: from });
      //get account To
      const accountTo = await accounts.findOne({ account_number: to });

      // check is balance > amount
      if (accountFrom.balance < amount) {
        throw new Error("Not enough money to transfer");
      }

      const fromChangeNum = accountFrom.account_changes.length + 1;
      const toChangeNum = accountTo.account_changes.length + 1;

      // transfer money
      // -- update account 1
      await accounts.updateOne(
        { account_number: from },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: fromChangeNum,
              amount: -amount,
              changed_data: new Date(),
              remark,
            },
          },
        },
        { session }
      );

      // -- update account 2
      await accounts.updateOne(
        { account_number: to },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number: toChangeNum,
              amount: amount,
              changed_data: new Date(),
              remark,
            },
          },
        },
        { session }
      );

      // commit transaction
      await session.commitTransaction();
      console.log("Transaction succeed");
    } catch (error) {
      await session.abortTransaction();
      console.log("Transaction aborted:", error);
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log("Error connecting:", error);
  } finally {
    await closeDatabaseConnection();
  }
};

export default transfer;
