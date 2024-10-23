const mysql = require("mysql2/promise");

async function createAuthorsTable() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
  });

  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS authors (
            author_id INT AUTO_INCREMENT PRIMARY KEY,
            author_name VARCHAR(255) NOT NULL,
            university VARCHAR(255),
            date_of_birth DATE,
            h_index INT,
            gender ENUM('Male', 'Female', 'Other')
        );
    `;
  await connection.execute(createTableQuery);

  const addMentorColumnQuery = `
        ALTER TABLE authors
        ADD mentor INT,
        ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL;
    `;
  await connection.execute(addMentorColumnQuery);

  console.log(
    "Table created and mentor column added with foreign key constraint"
  );
  await connection.end();
}

createAuthorsTable().catch((err) => console.error(err));
