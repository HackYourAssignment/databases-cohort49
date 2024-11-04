const insertValues = `
  INSERT INTO account (account_number, balance) VALUES (101, 5000), (102, 3000);

  INSERT INTO account_changes (account_number, amount, remark) VALUES
  (101, -1000, 'Transfer out'),
  (102, 1000, 'Transfer in');
`;

conn.query(insertValues, function (err) {
  if (err) throw err;
  console.log("Sample data inserted successfully!");
  conn.end();
});
