const mysql = require('mysql2/promise');

async function insertValues() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima',
        database: 'bank_db'
    });

    try {
        await connection.execute(`
            INSERT INTO account (account_number, balance) VALUES (101, 5000), (102, 3000)`);
        console.log('Sample data inserted successfully');
    }   catch (error) {
        console.error('Error inserting data:', error.message);
    } finally {
        connection.end();
    }
}

insertValues();