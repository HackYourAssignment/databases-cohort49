import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "company",
  multipleStatements: true,
});

const main = async () => {
  try {
    const makeTransfer = `
        UPDATE account SET balance = balance - 1000 WHERE account_number = 1;
        UPDATE account SET balance = balance + 1000 WHERE account_number = 2;
        
        INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES 
        (1, -1000, NOW(), 'transfer to account 2'),
        (2, 1000, NOW(), 'transfer from account 1');
    `;

    await connection.beginTransaction();
    await connection.query(makeTransfer);
    await connection.commit();
    console.log("transaction succeed");
  } catch (error) {
    await connection.rollback();
    console.error(error);
  } finally {
    await connection.end();
  }
};

main();
