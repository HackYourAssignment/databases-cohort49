const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

conn.connect();

const createTables = `
  CREATE TABLE account (
    account_number INT PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL
  );

  CREATE TABLE account_changes (
    change_number INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT,
    amount DECIMAL(10, 2),
    changed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
  );
`;

conn.query(createTables, function (err) {
  if (err) throw err;
  console.log("Tables created successfully!");
  conn.end();
});
