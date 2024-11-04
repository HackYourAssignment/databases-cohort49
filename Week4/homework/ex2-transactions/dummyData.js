import getNextChangeNumber from './getNextChangeNumber.js';

export default async function (db) {
  const accounts2D = [
    [101, 3000.0],
    [102, 2000.0],
    [103, 5000.0],
    [104, 100.0],
    [105, 1500.0],
    [106, 177.0],
    [107, 11589.0],
    [108, 1020.0],
    [109, 2024.0],
    [110, 1000.0],
  ];

  const changes2D = [
    [101, 100.0, '2020-01-01', 'Deposit'],
    [102, 200.0, '2020-01-02', 'Withdraw'],
    [103, 300.0, '2020-01-03', 'Deposit'],
    [104, 400.0, '2020-01-04', 'Withdraw'],
    [105, 500.0, '2020-01-05', 'Deposit'],
  ];

  //convert the arrays of data into arrays of objects in the final required schema
  const accounts = accounts2D.map(([account_number, balance]) => ({
    account_number,
    balance,
  }));

  const changes = await Promise.all(
    changes2D.map(async ([account_number, amount, changed_date, remark]) => {
      const change_number = await getNextChangeNumber(db);

      return {
        change_number,
        account_number,
        amount,
        changed_date: new Date(changed_date),
        remark,
      };
    }),
  );

  return [accounts, changes];
}
