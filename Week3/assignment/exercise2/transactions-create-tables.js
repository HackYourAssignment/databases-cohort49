const mysql = require("mysql2/promise");

async function createTables() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "transaction_db",
  });
  await connection.execute(`
CREATE TABLE IF NOT EXISTS account (
account_number INT PRIMARY KEY,
balance DECIMAL(15, 2) NOT NULL 
);
`);

  await connection.execute(`
CREATE TABLE IF NOT EXISTS account_changes (
change_number INT AUTO_INCREMENT PRIMARY KEY,
account_number INT,
amount DECIMAL(15, 2),
changed_date INTEGER,
remark VARCHAR(255),
FOREIGN KEY (account_number) REFERENCES account(account_number)
);
`);

  await connection.end();
}

createTables().catch(console.error);
