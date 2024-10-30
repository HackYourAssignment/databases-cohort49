const mysql = require("mysql2/promise");

async function getConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS keys_db`);
  await connection.query(`USE keys_db`);

  return connection;
}
module.exports = getConnection;
