import mysql from 'mysql';
import connection from './dbconnection.js';

async function insertSampleData() {
  const connectionData = await mysql.createConnection(connection);

  try {
    await connectionData.execute(`
      INSERT INTO accounts (account_number, balance) VALUES
       (101, 1000.00),
       (102, 2000.00),
       (103, 3000.00);
    `);
    console.log('accounts table data inserted successfully');

    await connectionData.execute(`
      INSERT INTO accounts_change (account_number, balance, remark) VALUES
       (101, 0.00, 'Initial balance'),
       (102, 0.00, 'Initial balance');
    `);
    console.log('accounts_change table data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await connectionData.end();
  }
}
insertSampleData();
