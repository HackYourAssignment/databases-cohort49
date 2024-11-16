const mysql = require("mysql2/promise");

async function runQueries(connection, queries) {
  for (const query of queries) {
    await connection.query(query);
  }
}

async function createTables() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "meetup",
  });

  const queries = [
    `
      CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(10, 2) NOT NULL
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
      )
    `,
  ];

  try {
    await runQueries(connection, queries);
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await connection.end();
  }
}

// Run the function
createTables();
