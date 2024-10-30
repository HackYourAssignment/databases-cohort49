const mysql = require('mysql2/promise');

async function createTables() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima',
        database: 'bank_db'
});

try {
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS account_changes (
            change_number INT AUTO_INCREMENT PRIMARY KEY,
            account_number INT,
            amount DECIMAL(10, 2),
            changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            remark VARCHAR(255),
            FOREIGN KEY (account_number) REFERENCES accounts(account_number)
            )
        `);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error.message);
    } finally {
        connection.end();
    }
}

createTables();