require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function transferAmount(fromAccountNumber, toAccountNumber, amount, remark) {
    const session = client.startSession(); // Start the session for transactions
    
    try {
        // Connect to MongoDB Atlas
        await client.connect();
        const database = client.db('dataBaseWeek4');
        const accounts = database.collection('accounts');
        
        session.startTransaction(); // Start the transaction
        
        // Find the sender account
        const senderAccount = await accounts.findOne({ account_number: fromAccountNumber });
        if (!senderAccount || senderAccount.balance < amount) {
            throw new Error('Insufficient funds');
        }

        // Find the receiver account
        const receiverAccount = await accounts.findOne({ account_number: toAccountNumber });
        if (!receiverAccount) {
            throw new Error('Receiver account not found');
        }

        // Update the sender account balance
        await accounts.updateOne(
            { account_number: fromAccountNumber },
            { 
                $inc: { balance: -amount },
                $push: { 
                    account_changes: {
                        change_number: senderAccount.account_changes.length + 1,
                        amount: -amount,
                        changed_date: new Date(),
                        remark: `Transferred to account ${toAccountNumber}: ${remark}`
                    }
                }
            },
            { session }
        );

        // Update the receiver account balance
        await accounts.updateOne(
            { account_number: toAccountNumber },
            { 
                $inc: { balance: amount },
                $push: { 
                    account_changes: {
                        change_number: receiverAccount.account_changes.length + 1,
                        amount: amount,
                        changed_date: new Date(),
                        remark: `Received from account ${fromAccountNumber}: ${remark}`
                    }
                }
            },
            { session }
        );

        // Commit the transaction
        await session.commitTransaction();
        console.log("Transaction successful.");
    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        console.error('Transaction failed:', error.message);
    } finally {
        session.endSession();
        await client.close();
    }
}

module.exports = { transferAmount };
