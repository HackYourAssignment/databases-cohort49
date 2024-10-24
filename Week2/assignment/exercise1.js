const mysql = require("mysql2");
const { promisify } = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "keys_db",
});

const query = promisify(connection.query).bind(connection);

async function createAuthorsTable() {
  try {
    await promisify(connection.connect).bind(connection)();
    console.log("Connected to MySQL server");

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS authors (
       author_id INT AUTO_INCREMENT PRIMARY KEY,
       author_name VARCHAR(255) NOT NULL,
       university VARCHAR(255),
       date_of_birth DATE NOT NULL,
       h_index INT,
       gender ENUM('m', 'f')
       );
       `;

    await query(createTableQuery);
    console.log("Authors table created successfully");

    const checkMentorColumnQuery = `
      SELECT COUNT(*) AS columnExists
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE table_schema = 'keys_db'
      AND table_name = 'authors'
      AND column_name = 'mentor';
    `;
    const result = await query(checkMentorColumnQuery);
    const columnExists = result[0].columnExists;

    if (columnExists === 0) {
      const addMentorColumnQuery = `
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor
      FOREIGN KEY (mentor) REFERENCES authors(author_id)
      ON DELETE SET NULL;
    `;
      await query(addMentorColumnQuery);
      console.log("Mentor column added successfully.");
    } else {
      console.log("Mentor column already exists.");
    }

    connection.end();
  } catch (error) {
    console.error("Error creating authors table:", error);
  }
}

createAuthorsTable();
