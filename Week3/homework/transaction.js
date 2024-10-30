import mysql from "mysql2/promise";
import { initializeConnection } from "./transactions-insert-values.js";

async function transaction(connection) {
  try {
    await connection.beginTransaction();
    console.log("Transaction begun");

    await connection.query(
      "UPDATE account SET balance = balance - 1000 WHERE account_number = 101 ;"
    );
    await connection.query(
      "UPDATE account SET balance = balance + 1000 WHERE account_number = 102 ;"
    );
    await connection.query(
      `INSERT INTO account_change ( account_number, amount, changed_date, remark) VALUES  
    ( 101, 1000, '2024-10-30', 'successful transaction 1000 transferred '),
    ( 102, 1000, '2014-10-30', 'successful transaction 1000 received')`
    );

    await connection.commit();
    console.log("Transaction committed successfully.");
  } catch (error) {
    await connection.rollback();
    console.log("Transaction rolled back.");
    console.log("Error: ", error.message);
    console.log(error.stack);
  }
}

const main = async () => {
  const connection = await initializeConnection();

  try {
    await transaction(connection);
  } finally {
    await connection.end();
  }
};

main().catch((e) => {
  console.error(e);
});
