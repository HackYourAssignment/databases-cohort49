const transferAmount = `
START TRANSACTION;

UPDATE account
SET balance = balance - 1000
WHERE account_number = 101;

UPDATE account
SET balance = balance + 1000
WHERE account_number = 102;

INSERT INTO account_changes (account_number, amount, remark) VALUES
  (101, -1000, 'Transfer to account 102'),
  (102, 1000, 'Transfer from account 101');

COMMIT;
`;

module.exports = transferAmount;