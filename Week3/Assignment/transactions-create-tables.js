const createConnection = require('./dbConnection');

async function createTables() {
  const connection = await createConnection();

  try {
    console.log("Connected to MySQL server.");

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(15, 2)
      );
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(15, 2),
        change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(100),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
      );
    `);

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await connection.end();
  }
}

createTables();
