import mysql from "mysql2/promise";

export async function initializeConnection() {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "hyfuser",
      password: "hyfpassword",
      database: "transactions",
    });
    return connection;
  }
  

async function insertData(connection) {
  try {
    
    const accountData = `INSERT IGNORE INTO account (account_number, balance) VALUES
         (1, 1000),
         (2, 700),
         (100, 800),
         (101, 400),
         (103, 700),
         (102, 100),
         (109,8800),
         (200, 900),
         (5, 50);
         `;

    const changeData = ` INSERT IGNORE  INTO account_change ( account_number, amount, changed_date, remark) VALUES  ( 1, 300, '2020-01-01', 'successful transaction'), 
        (5,5000,'2020-03-06' ,'successful transaction'),
        (109, 800, '2023-01-01' , 'successful transaction');`;

    await connection.query(accountData);
    await connection.query(changeData);

    console.log("Data inserted");
  } catch (error) {
    console.log("Error inserting data:", error.message);
    console.log(error.stack);
  }
};

async function main() {
    const connection = await initializeConnection(); 
    await insertData(connection); 
    await connection.end(); 
};

main().catch(e => {
    console.error(e)
});