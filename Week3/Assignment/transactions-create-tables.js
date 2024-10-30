const createTables = `
CREATE TABLE account (
  account_number INT PRIMARY KEY,
  balance DECIMAL(15, 2)
);

CREATE TABLE account_changes (
  change_number INT AUTO_INCREMENT PRIMARY KEY,
  account_number INT,
  amount DECIMAL(15, 2),
  change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  remark VARCHAR(100),
  FOREIGN KEY (account_number) REFERENCES account(account_number)
);
`;

module.exports = createTables;