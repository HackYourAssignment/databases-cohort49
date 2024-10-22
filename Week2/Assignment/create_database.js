const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password'
});

connection.connect(err=>{
  if (err) throw err;
  console.log('Connected to MySQL Server');

  const createDatabase = 'CREATE DATABASE research_db';

  connection.query(createDatabase, (err, result) => {
    if (err) throw err;
    console.log('Database "research_db" created');
    connection.end();
  })
})