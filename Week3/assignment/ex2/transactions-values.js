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
        const insertData = `
            INSERT INTO account (account_number, balance) VALUES 
                (101, 5000), 
                (102, 3000), 
                (103, 7500);

            INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES 
                (101, 4000, '2024-10-30', 'deposit'), 
                (102, 2000, '2024-10-27', 'withdrawal'), 
                (103, 6000, '2024-10-25', 'deposit');
        `;

        await connection.query(insertData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error.message);
    } finally {
        await connection.end();
    }
}

main();
