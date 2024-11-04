const mysql = require("mysql2/promise");

async function insertValues() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "week3",
  });

  await connection.execute(`
        INSERT INTO account (account_number, balance) VALUES
        (101, 5000.00),
        (102, 3000.00);
    `);

  console.log("Sample data inserted into account table.");
  await connection.end();
}

insertValues().catch(console.error);
