require("dotenv").config();
const connectToDatabase = require("../homework/connection-db");

async function transferMoney(fromAccountNumber, toAccountNumber, amount, remark) {
    const db = await connectToDatabase();
    const accounts = db.collection("accounts");

    const session = db.client.startSession();
    session.startTransaction();

    try {
        const fromAccount = await accounts.findOne({ account_number: fromAccountNumber }, { session });
        const toAccount = await accounts.findOne({ account_number: toAccountNumber }, { session });

        if (!fromAccount || !toAccount) throw new Error("One or both accounts not found.");
        if (fromAccount.balance < amount) throw new Error("Insufficient funds.");

        await accounts.updateOne(
            { account_number: fromAccountNumber },
            {
                $inc: { balance: -amount },
                $push: {
                    account_changes: {
                        change_number: fromAccount.account_changes.length + 1,
                        amount: -amount,
                        changed_date: new Date(),
                        remark,
                    },
                },
            },
            { session }
        );

        await accounts.updateOne(
            { account_number: toAccountNumber },
            {
                $inc: { balance: amount },
                $push: {
                    account_changes: {
                        change_number: toAccount.account_changes.length + 1,
                        amount: amount,
                        changed_date: new Date(),
                        remark,
                    },
                },
            },
            { session }
        );

        await session.commitTransaction();
        console.log(`Transferred ${amount} from account ${fromAccountNumber} to account ${toAccountNumber}`);
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction failed:", error);
    } finally {
        session.endSession();
    }
}

module.exports = transferMoney;
