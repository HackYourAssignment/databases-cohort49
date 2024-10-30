import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "company",
  multipleStatements: true,
});

const main = async () => {
  try {
    const insertData = `
        INSERT INTO account (balance) VALUES (10000), (5000), (7500);
        
        INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES 
        (2, 4000, '2024-10-30', 'comment 1'), 
        (1, 2000, '2024-10-27', 'comment 2'), 
        (3, 6000, '2024-10-25', 'comment 3');
    `;

    await connection.query(insertData);
    console.log("data inserted");
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};

main();
