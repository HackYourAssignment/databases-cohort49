import connection from './dbconnection.js';

const runQuery = (query, description) => {
  connection.query(query, (err, result) => {
    if (err) {
      console.log(`Error executing ${description}:`, err);
      return;
    }
    console.log(`${description} executed successfully`, result);
    connection.end();
  });
};

connection.connect((err) => {
  if (err) {
    console.log('error connecting to the database:', err);
    return;
  }
  console.log('connected to the database');

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS research_paper(
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(100) NOT NULL,
  conference TEXT NOT NULL,
  published_date DATE NOT NULL,
  authors_id INT,
  FOREIGN KEY (authors_id) REFERENCES authors(authors_id)
);`;
  runQuery(createTableQuery, 'creating the table');
  // connection.end();
});
