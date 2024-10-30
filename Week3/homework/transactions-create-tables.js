import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

async function createTables() {
  try {
    await connection.query(" DROP DATABASE IF EXISTS transactions")
    await connection.query("CREATE DATABASE IF NOT EXISTS transactions");
    await connection.query("USE transactions");
    

    const createTableAccount =
      `CREATE TABLE IF NOT EXISTS account  ( account_number INT AUTO_INCREMENT PRIMARY KEY, balance INT);`;

    const createTableChange =
      `CREATE TABLE IF NOT EXISTS account_change  (change_number INT AUTO_INCREMENT PRIMARY KEY, account_number INT, amount INT, changed_date DATE, remark TEXT, FOREIGN KEY (account_number) REFERENCES account(account_number) );`;

    await connection.query(createTableAccount);
    await connection.query(createTableChange);

    console.log("Tables created");
  } catch (error) {
    console.log("Error creating tables:", error.message);
    console.log(error.stack);
  }finally{
    connection.end()
  }
}
createTables();