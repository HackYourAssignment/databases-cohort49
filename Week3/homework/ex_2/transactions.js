import mysql from 'mysql2/promise';
import { databaseConnection } from './connectionOptions.js';

export const pool = mysql.createPool(databaseConnection);

/*in case the account_numbers and the amount of money
is passed the query should use the .execute() method.

Here a hardcoded queries are used for simplicity 
and to show the transaction management.
*/

async function main() {
  //necessary for transactions. Otherwise a pool automatically establish connection
  const conn = await pool.getConnection();

  try {
    //(autocommit) is managed by mysql2 transactions

    await conn.query(`
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
    `);
    await conn.beginTransaction();

    const [sender, receiver] = await getAccountsAndLockThem(conn);

    isExistAndEnoughBalance(sender, receiver); //throws error if not

    await Promise.all([performTransaction(conn), logTransaction(conn)]);

    await conn.commit(); //if everything is ok, commit the transaction

    console.log('Success: 1000 transferred from account 101 to account 102');
  } catch (err) {
    await conn.rollback();
    console.error(err);
  } finally {
    conn.release();
    pool.end();
  }
}

main();

function getAccountsAndLockThem(conn) {
  const sender = `
    SELECT * FROM account
    WHERE account_number = 101
    FOR UPDATE;
  `;
  const reciever = `
    SELECT * FROM account
    WHERE account_number = 102
    FOR UPDATE;
  `;

  return Promise.all([conn.query(sender), conn.query(reciever)]);
}

function isExistAndEnoughBalance(sender, receiver) {
  if (sender.length === 0) throw new Error('Sender account not found');
  if (receiver.length === 0) throw new Error('Receiver account not found');
  if (sender[0].balance < 1000) throw new Error('Insufficient funds');

  return true;
}

function performTransaction(conn) {
  const withdraw = `
    UPDATE account
    SET balance = balance - 1000
    WHERE account_number = 101;
  `;
  const deposit = `
    UPDATE account
    SET balance = balance + 1000
    WHERE account_number = 102;
  `;

  return Promise.all([conn.query(withdraw), conn.query(deposit)]);
}

function logTransaction(conn) {
  const logWithdraw = `
    INSERT INTO account_changes (account_number, amount, changed_date, remark)
    VALUES (101, -1000, CURDATE(), 'Transfer to account 102');
  `;
  const logDeposit = `
    INSERT INTO account_changes (account_number, amount, changed_date, remark)
    VALUES (102, 1000, CURDATE(), 'Transfer from account 101');
  `;

  return Promise.all([conn.query(logWithdraw), conn.query(logDeposit)]);
}
