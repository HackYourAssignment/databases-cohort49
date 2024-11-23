require('dotenv').config();
const { MongoClient } = require('mongodb');

async function transfer(fromAccount, toAccount, amount, remark) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    // Move client.connect() and session definition outside of try block
    await client.connect();
    const session = client.startSession();

    try {
        session.startTransaction();

        const collection = client.db("databaseWeek4").collection("accounts");

        const fromAccountData = await collection.findOne({ account_number: fromAccount });
        const toAccountData = await collection.findOne({ account_number: toAccount });

        await collection.updateOne(
            { account_number: fromAccount },
            {
                $inc: { balance: -amount },
                $push: {
                    account_changes: {
                        change_number: fromAccountData.account_changes.length + 1,
                        amount: -amount,
                        changed_date: new Date(),
                        remark: remark
                    }
                }
            },
            { session }
        );

        await collection.updateOne(
            { account_number: toAccount },
            {
                $inc: { balance: amount },
                $push: {
                    account_changes: {
                        change_number: toAccountData.account_changes.length + 1,
                        amount: amount,
                        changed_date: new Date(),
                        remark: remark
                    }
                }
            },
            { session }
        );

        await session.commitTransaction();
        console.log(`Transferred ${amount} from account ${fromAccount} to account ${toAccount}`);
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction failed:", error);
    } finally {
        // Ensure session and client are properly closed
        session.endSession();
        await client.close();
    }
}

module.exports = transfer;
