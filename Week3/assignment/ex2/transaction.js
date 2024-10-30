const mysql = require('mysql2/promise');

async function transferFunds () {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima',
        database: 'bank_db'
    });

    try {
        await connection.beginTransaction();
        await connection.execute(`UPDATE accounts SET balance = balance - 1000 WHERE account_number = 101`);
        await connection.execute(`UPDATE accounts SET balance = balance + 1000 WHERE account_number = 102`);

        await connection.execute(`INSERT INTO account_changes (account_number, amount, remark) VALUES (101, -1000, 'Transfer to 102), (102, 1000, 'Transfer from 101')`);

        await connection.commit();
        console.log('Transaction completed successfully');
    } catch (error) {
        await connection.rollback();
        console.error('Transaction failed:', error.message);
    } finally {
        connection.end();
    }
}

transferFunds();