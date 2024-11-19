import mysql from 'mysql';

async function createConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world',
  });
  return connection;
}

export default createConnection;
