import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ', err);
    return;
  }
  console.log('connected to the database');
});
export default connection;
