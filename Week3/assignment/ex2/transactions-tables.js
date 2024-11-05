const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima',
        database: 'bank_db',
        multipleStatements: true
    });

    try {
        const createTables = `
            CREATE TABLE IF NOT EXISTS account (
                account_number INT AUTO_INCREMENT PRIMARY KEY, 
                balance DECIMAL(10,2) NOT NULL
            );
            CREATE TABLE IF NOT EXISTS account_changes (
                change_number INT AUTO_INCREMENT PRIMARY KEY,
                account_number INT NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                remark VARCHAR(255),
                FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE RESTRICT ON UPDATE RESTRICT
            );
        `;

        await connection.query(createTables);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    } finally {
        await connection.end();
    }
}

main();
