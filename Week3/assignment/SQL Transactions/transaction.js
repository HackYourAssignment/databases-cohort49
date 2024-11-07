const mysql = require('mysql2/promise');

async function transferAmount(sender, receiver, amount) {
    const config = {
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'userdb'
    };

    const connection = await mysql.createConnection(config);

    try {
        // Start the transaction
        await connection.beginTransaction();

        // Check sender's balance
        const [senderResult] = await connection.execute(`SELECT balance FROM account WHERE account_number = ?`, [sender]);
        const senderBalance = senderResult[0]?.balance;

        if (!senderBalance || senderBalance < amount) {
            throw new Error("Insufficient funds or account not found.");
        }

        // Deduct amount from sender's account
        await connection.execute(`UPDATE account SET balance = balance - ? WHERE account_number = ?`, [amount, sender]);

        // Add amount to receiver's account
        await connection.execute(`UPDATE account SET balance = balance + ? WHERE account_number = ?`, [amount, receiver]);

        // Log the changes in account_changes table for both accounts
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await connection.execute(`INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, ?, ?)`,
            [sender, -amount, now, `Transferred to account ${receiver}`]);
        await connection.execute(`INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, ?, ?)`,
            [receiver, amount, now, `Received from account ${sender}`]);

        // Commit transaction
        await connection.commit();
        console.log("Transaction successful.");
    } catch (error) {
        // Rollback transaction in case of an error
        await connection.rollback();
        console.error("Transaction failed:", error.message);
    } finally {
        await connection.end();
    }
}

transferAmount(101, 102, 1000).catch(console.error);
