const mysql = require("mysql2/promise");

async function transferAmount() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "transaction_db",
  });

  try {
    await connection.beginTransaction();

    await connection.execute(`
        UPDATE account
        SET balance = balance -  1000
        WHERE account_number = 101;
        `);

    await connection.execute(`
            INSERT INTO account_changes (account_number, amount, remark)
            VALUES (101, -1000, 'Transfer to account 102');
          `);

    await connection.execute(`
        UPDATE account
        SET balance = balance + 1000
        WHERE account_number = 102;
        `);

    await connection.execute(`
            INSERT INTO account_changes (account_number, amount, remark)
            VALUES (102, 1000, 'Transfer from account 101');
          `);

    await connection.commit();
    console.log("Transfer successful!");
  } catch (error) {
    await connection.rollback();
    console.error("Transfer failed:", error.message);
  } finally {
    await connection.end();
  }
}

transferAmount();
