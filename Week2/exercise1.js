const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "myRecipes",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  // Create authors table if it doesn't exist
  const createAuthorsTable = `
        CREATE TABLE IF NOT EXISTS authors (
            author_id INT PRIMARY KEY AUTO_INCREMENT,
            author_name VARCHAR(255),
            university VARCHAR(255),
            date_of_birth DATE,
            h_index INT,
            gender ENUM('Male', 'Female', 'Other')
        );
    `;

  connection.query(createAuthorsTable, (err) => {
    if (err) throw err;
    console.log("Authors table created or already exists.");

    // Check if mentor column exists
    const checkMentorColumn = `
        SHOW COLUMNS FROM authors LIKE 'mentor';
    `;

    connection.query(checkMentorColumn, (err, results) => {
      if (err) throw err;

      // If mentor column doesn't exist, add it
      if (results.length === 0) {
        const addMentorColumn = `
            ALTER TABLE authors
            ADD mentor INT,
            ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
        `;

        connection.query(addMentorColumn, (err) => {
          if (err) throw err;
          console.log("Mentor column added.");
          connection.end();
        });
      } else {
        console.log("Mentor column already exists.");
        connection.end();
      }
    });
  });
});
