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
    const createTables = `
        CREATE TABLE IF NOT EXISTS account (
            account_number INT AUTO_INCREMENT PRIMARY KEY, 
            balance INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS account_changes (
            change_number INT AUTO_INCREMENT PRIMARY KEY,
            account_number INT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            changed_date DATE NOT NULL,
            remark VARCHAR(255),
            FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE RESTRICT ON UPDATE RESTRICT
        );
    `;

    await connection.query(createTables);
    console.log("tables created");
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};

main();
