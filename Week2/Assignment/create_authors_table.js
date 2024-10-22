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

  // 1. Create the authors table
  const createAuthorsTable = `
    CREATE TABLE AUTHORS (
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(255),
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('Male', 'Female', 'Other')
    );
  `;

  connection.query(createAuthorsTable, (err, result) => {
    if (err) throw err;;
    console.log('authors table created');

    // 2. Add mentor column and set it is as a foreign key referencing the author_id
    const addMentorColumn = `
      ALTER TABLE authors
      ADD mentor INT,
      ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
      `;

      connection.query(addMentorColumn, (err, result) =>{
        if (err) throw err;
        console.log('mentor column added to authors table');
        connection.end();
      })
  });
});