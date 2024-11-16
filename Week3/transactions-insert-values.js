const mysql = require("mysql2/promise");

async function insertValues() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "meetup",
  });

  try {
    const insertAccountsQuery = `
      INSERT INTO account (account_number, balance) VALUES 
      (101, 5000.00),
      (102, 3000.00);
    `;
    await connection.query(insertAccountsQuery);

    console.log("Sample data inserted into account table.");
  } finally {
    await connection.end();
  }
}

// Run the function
insertValues();
