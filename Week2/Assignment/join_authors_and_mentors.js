const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password',
  database: 'research_db'
});

connection.connect(err =>{
  if (err) throw err;
  console.log('Connected to the database');

  // Query to get authors and their mentors
  const queryAuthorsWithMentors = `
    SELECT a.author_name AS Author, m.author_name AS Mentor
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id;
  `;

  connection.query(queryAuthorsWithMentors, (err, result) =>{
    if (err) throw err;
    console.log('Authors and their mentors:');
    console.table(result);
    connection.end();
  })
})