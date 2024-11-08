const mysql = require('mysql2/promise');

async function insertSampleData() {
    const config = {
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'userdb'
    };

    const connection = await mysql.createConnection(config);

    try {
        await connection.execute(`INSERT INTO account (account_number, balance) VALUES (?, ?), (?, ?)`, [101, 5000, 102, 3000]);
        console.log("Sample data inserted successfully.");
    } catch (error) {
        console.error("Error inserting sample data:", error.message);
    } finally {
        await connection.end();
    }
}

insertSampleData().catch(console.error);
