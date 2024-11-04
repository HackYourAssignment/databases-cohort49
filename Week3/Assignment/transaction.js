const createConnection = require('./dbConnection');

async function transferAmount() {
  const connection = await createConnection();

  try {
    console.log("Connected to MySQL server.");

    await connection.beginTransaction();

    await connection.execute(`
      UPDATE account
      SET balance = balance - 1000
      WHERE account_number = 101;
    `);

    await connection.execute(`
      UPDATE account
      SET balance = balance + 1000
      WHERE account_number = 102;
    `);

    await connection.execute(`
      INSERT INTO account_changes (account_number, amount, remark) VALUES
      (101, -1000, 'Transfer to account 102'),
      (102, 1000, 'Transfer from account 101');
    `);

    await connection.commit();
    console.log("Transaction completed successfully.");
  } catch (error) {
    await connection.rollback();
    console.error("Error in transaction:", error);
  } finally {
    await connection.end();
  }
}

transferAmount();
