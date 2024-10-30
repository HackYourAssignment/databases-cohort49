import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  // database: 'bank_transactions',
  database: 'world',
});
export default connection;
