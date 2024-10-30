conn.beginTransaction(function (err) {
  if (err) throw err;

  const transferAmount = 1000;
  const deductFromAccount =
    "UPDATE account SET balance = balance - ? WHERE account_number = 101";
  const addToAccount =
    "UPDATE account SET balance = balance + ? WHERE account_number = 102";

  conn.query(deductFromAccount, [transferAmount], function (err) {
    if (err) {
      return conn.rollback(function () {
        throw err;
      });
    }

    conn.query(addToAccount, [transferAmount], function (err) {
      if (err) {
        return conn.rollback(function () {
          throw err;
        });
      }

      const logChanges = `
          INSERT INTO account_changes (account_number, amount, remark) VALUES 
          (101, -?, 'Transfer to 102'),
          (102, ?, 'Transfer from 101')
        `;

      conn.query(logChanges, [transferAmount, transferAmount], function (err) {
        if (err) {
          return conn.rollback(function () {
            throw err;
          });
        }

        conn.commit(function (err) {
          if (err) {
            return conn.rollback(function () {
              throw err;
            });
          }
          console.log("Transaction Completed Successfully.");
          conn.end();
        });
      });
    });
  });
});
