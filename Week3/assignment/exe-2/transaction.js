import createConnection from './dbconnection.js';

async function transferAmount() {
  const connectionData = await createConnection();
  try {
    await connectionData.beginTransaction();
    await connectionData.execute(`
      UPDATE accounts SET balance = balance - 1000 WHERE account_number = 101;
    `);
    console.log('account 101 debited successfully');
    await connectionData.execute(`
      INSERT INTO accounts_change (account_number, balance, remark) VALUES
      (101, -1000.00, 'Transfer to account 102');
    `);
    console.log('TRANSFER TO account 102 recorded successfully');
    await connectionData.execute(`
      UPDATE accounts SET balance = balance + 1000 WHERE account_number = 102;
    `);
    console.log('account 102 credited successfully');
    await connectionData.execute(`
      INSERT INTO accounts_change (account_number, balance, remark) VALUES
      (102, 100.00, 'Transfer from account 101');
    `);
    console.log('TRANSFER FROM account 101 recorded successfully');

    await connectionData.commit();
    console.log('Transaction committed successfully');
  } catch (error) {
    await connectionData.rollback();
    console.log('Transaction rolled back');
  } finally {
    await connectionData.end();
  }
}
transferAmount();
