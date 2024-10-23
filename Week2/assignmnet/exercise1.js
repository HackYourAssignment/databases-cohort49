const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

const createAuthorsTable = `
  CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('male', 'female', 'other')
  );
`;

const addMentorColumn = `
  ALTER TABLE authors ADD COLUMN mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
`;

connection.query(createAuthorsTable, (error, results) => {
  if (error) throw error;

  connection.query(addMentorColumn, (error, results) => {
    if (error) throw error;
  });
});

connection.end();
