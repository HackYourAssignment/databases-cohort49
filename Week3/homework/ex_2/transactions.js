import mysql from 'mysql2/promise';
import { databaseConnection } from './connectionOptions.js';

export const pool = mysql.createPool(databaseConnection);

/*in case the account_numbers and the amount of money
is passed the query should use the .execute() method.

Here a hardcoded queries are used for simplicity 
and to show the transaction management.
*/

async function main(senderAcNu, receiverAcNu, amount) {
  //necessary for transactions. Otherwise a pool automatically establish connection
  const conn = await pool.getConnection();

  try {
    //(autocommit) is managed by mysql2 transactions

    await conn.query(`
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
    `);
    await conn.beginTransaction();

    const [sender, receiver] = await getAccountsAndLockThem(
      conn,
      senderAcNu,
      receiverAcNu,
    );
    isExistAndEnoughBalance(sender, receiver); //throws error if not

    await Promise.all([
      performTransaction(conn, senderAcNu, receiverAcNu, amount),
      logTransaction(conn, senderAcNu, receiverAcNu, amount),
    ]);
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

main(101, 102, 1000.0);

function getAccountsAndLockThem(conn, senderAcNu, receiverAcNu) {
  const sender = `
    SELECT * FROM account
    WHERE account_number = ?
    FOR UPDATE;
  `;
  const receiver = `
    SELECT * FROM account
    WHERE account_number = ?
    FOR UPDATE;
  `;

  return Promise.all([
    conn.execute(sender, [senderAcNu]),
    conn.execute(receiver, [receiverAcNu]),
  ]);
}

function isExistAndEnoughBalance(sender, receiver) {
  if (sender.length === 0) throw new Error('Sender account not found');
  if (receiver.length === 0) throw new Error('Receiver account not found');
  if (sender[0].balance < 1000) throw new Error('Insufficient funds');

  return true;
}

function performTransaction(conn, senderAcNu, receiverAcNu, amount) {
  const withdraw = `
    UPDATE account
    SET balance = balance - ?
    WHERE account_number = ?;
  `;
  const deposit = `
    UPDATE account
    SET balance = balance + ?
    WHERE account_number = ?;
  `;

  return Promise.all([
    conn.execute(withdraw, [senderAcNu, amount]),
    conn.execute(deposit, [receiverAcNu, amount]),
  ]);
}

function logTransaction(conn, senderAcNu, receiverAcNu, amount) {
  const logWithdraw = ` INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, CURDATE(), ?); `;
  const logDeposit = ` INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, CURDATE(), ?); `;

  return Promise.all([
    conn.query(logWithdraw, [
      senderAcNu,
      -amount,
      `Transfer to account ${receiverAcNu}`,
    ]),
    conn.query(logDeposit, [
      receiverAcNu,
      amount,
      `Transfer from account ${senderAcNu}`,
    ]),
  ]);
}
