
import {  DATABASE_NAME, COLLECTION_NAME, CLIENT } from "./setup.js";

export const transfer = async (from, to, amount, remark) => {
    
    const collection = CLIENT.db(DATABASE_NAME).collection(COLLECTION_NAME);

    let session;
    try {
        session = CLIENT.startSession();
        session.startTransaction();

        const fromAccount = await collection.findOne({ account_number: from });
        const toAccount = await collection.findOne({ account_number: to });

        if (fromAccount.balance < amount) {
            console.log("Insufficient balance transfer aborted.");
            await session.abortTransaction();
            return;
        }

        const fromBalance = fromAccount.balance - amount;
        const toBalance = toAccount.balance + amount;

        const fromChange = {
            change_number: await getMaxChangeNumber(from, collection) + 1,
            amount: -amount,
            changed_date: new Date(),
            remark: remark,
        };

        const toChange = {
            change_number: await getMaxChangeNumber(to, collection) + 1,
            amount: amount,
            changed_date: new Date(),
            remark: remark,
        };

        await collection.updateOne(
            { account_number: from },
            {
                $inc: { balance: fromBalance },
                $push: { account_changes: fromChange },
            },
            { session }
        );

        await collection.updateOne(
            { account_number: to },
            {
                $inc: { balance: toBalance },
                $push: { account_changes: toChange },
            },
            { session }
        );

        await session.commitTransaction();
        console.log(`Transfer of ${amount} from account ${from} to account ${to} was successful.`);
    } catch (error) {
        console.error("Error during transfer:", error);
        if (session) {
            console.log("transaction aborted");
            await session.abortTransaction();
        }
    } finally {
        if (session) {
            session.endSession();
        }
        await CLIENT.close();
    }
};

const getMaxChangeNumber = async (accountNumber, collection) => {
    const result = await collection.aggregate([
        { $match: { account_number: accountNumber } },
        { $unwind: "$account_changes" },
        { $group: { _id: null, maxChangeNumber: { $max: "$account_changes.change_number" } } }
    ]).toArray();
    return result.length ? result[0].maxChangeNumber : 0;
};
