const mysql = require("mysql2/promise");

async function transferFunds() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "week3",
  });

  const transferAmount = 1000;
  const deductFromAccount =
    "UPDATE account SET balance = balance - ? WHERE account_number = 101";
  const addToAccount =
    "UPDATE account SET balance = balance + ? WHERE account_number = 102";
  const logChanges = `
    INSERT INTO account_changes (account_number, amount, remark) VALUES 
    (101, -?, 'Transfer to 102'),
    (102, ?, 'Transfer from 101')
  `;

  try {
    await conn.beginTransaction();

    await conn.query(deductFromAccount, [transferAmount]);
    await conn.query(addToAccount, [transferAmount]);
    await conn.query(logChanges, [transferAmount, transferAmount]);

    await conn.commit();
    console.log("Transaction Completed Successfully.");
  } catch (err) {
    console.error("Transaction Failed. Rolling back changes.");

    await conn.rollback();
    throw err;
  } finally {
    await conn.end();
  }
}

transferFunds().catch((err) => console.error("Error:", err.message));
