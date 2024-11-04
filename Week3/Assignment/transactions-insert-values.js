const createConnection = require('./dbConnection');

async function insertValues() {
  const connection = await createConnection();

  try {
    console.log("Connected to MySQL server.");

    await connection.execute(`
      INSERT INTO account (account_number, balance) VALUES
      (101, 5000.00),
      (102, 3000.00);
    `);

    await connection.execute(`
      INSERT INTO account_changes (account_number, amount, remark) VALUES
      (101, 1000.00, 'Initial Balance'),
      (102, 2000.00, 'Initial Balance');
    `);

    console.log("Values inserted successfully.");
  } catch (error) {
    console.error("Error inserting values:", error);
  } finally {
    await connection.end();
  }
}

insertValues();
