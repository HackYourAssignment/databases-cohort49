const getConnection = require("./connectDatabase");

async function createAuthorsTable() {
  const connection = await getConnection();
  try {
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

    await connection.query(createTableQuery);
    console.log("Authors table created successfully");

    const checkMentorColumnQuery = `
      SELECT COUNT(*) AS columnExists
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE table_schema = 'keys_db'
      AND table_name = 'authors'
      AND column_name = 'mentor';
    `;
    const result = await connection.query(checkMentorColumnQuery);
    const columnExists = result[0].columnExists;

    if (columnExists === 0) {
      const addMentorColumnQuery = `
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor
      FOREIGN KEY (mentor) REFERENCES authors(author_id)
      ON DELETE SET NULL;
    `;
      await connection.query(addMentorColumnQuery);
      console.log("Mentor column added successfully.");
    } else {
      console.log("Mentor column already exists.");
    }
  } catch (error) {
    console.error("Error creating authors table:", error);
  } finally {
    await connection.end();
  }
}

createAuthorsTable();
