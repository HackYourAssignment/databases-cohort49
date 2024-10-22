const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password',
  database: 'research_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');

  // Create the research_Papers table
  const createResearchPapersTable = `
  CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
  );
  `;

  connection.query(createResearchPapersTable, (err, result =>{
    if (err) throw err;
    console.log('research_papers table created');
    connection.end();
  }))
})