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

  // Query to get authors' information and their published papers
  const queryAuthorsWithPapers = `
    SELECT a.*, rp.paper_title
    FROM authors a
    LEFT JOIN research_papers rp ON a.author_id = rp.author_id;
  `;

  connection.query(queryAuthorsWithPapers, (err, result) =>{
    if (err) throw err;
    console.log('Authors and their published papers:');
    console.table(result);
    connection.end();
  });
});