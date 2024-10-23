import connection from './dbconnection.js';

const runQuery = (query, description) => {
  connection.query(query, (err, result) => {
    if (err) {
      console.log(`Error executing ${description}:`, err);
      return;
    }
    console.log(`${description} executed successfully`, result);
  });
};
// connection to the database
connection.connect((err) => {
  if (err) {
    console.log('error connecting the database:', err);
    return;
  }
  console.log('connected to the database');

  const createTableQuery = `
CREATE TABLE IF NOT EXISTS authors(
   authors_id INT AUTO_INCREMENT PRIMARY KEY,
   author_name VARCHAR(100) NOT NULL, 
   university TEXT NOT NULL, 
   date_of_birth DATE NOT NULL, 
   h_index INT NOT NULL, 
   gender ENUM('m','f')
   );`;
  runQuery(createTableQuery, 'creating the table');

  const addMentorColumnQuery = `
ALTER TABLE authors
ADD COLUMN mentor INT;`;
  runQuery(addMentorColumnQuery, 'adding mentor column');

  const addForeignKeyQuery = `
ALTER TABLE authors
ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(authors_id) ON DELETE SET NULL;`;

  runQuery(addForeignKeyQuery, 'adding foreign key');

  connection.end();
});
