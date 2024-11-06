const mysql = require("mysql2/promise");

async function insertTables() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "transaction_db",
  });
  await connection.execute(`
    INSERT INTO account (account_number, balance) VALUES
    (101, 5000.00),
    (102, 3000.00);
     `);
  await connection.end();
}

insertTables().catch(console.error);
