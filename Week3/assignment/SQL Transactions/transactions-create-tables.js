const mysql = require('mysql2/promise');

async function createTables() {
    const config = {
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'userdb'
    };

    const connection = await mysql.createConnection(config);

    try {
        await connection.execute(`CREATE TABLE IF NOT EXISTS account (
            account_number INT PRIMARY KEY,
            balance DECIMAL(15, 2)
        )`);

        await connection.execute(`CREATE TABLE IF NOT EXISTS account_changes (
            change_number INT AUTO_INCREMENT PRIMARY KEY,
            account_number INT,
            amount DECIMAL(15, 2),
            changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            remark VARCHAR(255),
            FOREIGN KEY (account_number) REFERENCES account(account_number)
        )`);

        console.log("Tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error.message);
    } finally {
        await connection.end();
    }
}

createTables().catch(console.error);
