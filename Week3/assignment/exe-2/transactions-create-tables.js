import createConnection from './dbconnection.js';

async function createTables() {
  const createAccountTable = `
      CREATE TABLE IF NOT EXISTS accounts (
      account_number INT PRIMARY KEY,
      balance DECIMAL(10, 2) NOT NULL
    );
    `;

  const createAccountChangeTable = `
      CREATE TABLE IF NOT EXISTS accounts_change (

      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT NOT NULL,
      balance DECIMAL(10, 2) NOT NULL, changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      remark VARCHAR(255) NOT NULL,
      FOREIGN KEY (account_number) REFERENCES accounts(account_number)
    );
  `;
  const connection = await createConnection();
  try {
    await connection.execute(createAccountTable);
    console.log('accounts table created successfully');
    await connection.execute(createAccountChangeTable);
    console.log('accounts_change table created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await connection.end();
  }
}
createTables();
