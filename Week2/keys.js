const mysql = require("mysql2/promise");

async function executeQuery(connection, query) {
  try {
    await connection.query(query);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "meetup",
  });

  try {
    // Step 1: Create the authors table
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
    await executeQuery(connection, createTableQuery);
    console.log("Authors table created.");

    // Step 2: Check if the mentor column exists before adding it
    const checkColumnQuery = `
      SELECT COUNT(*) AS count 
      FROM information_schema.COLUMNS 
      WHERE TABLE_NAME = 'authors' 
        AND COLUMN_NAME = 'mentor';
    `;
    const [rows] = await connection.query(checkColumnQuery);

    if (rows[0].count === 0) {
      // Step 3: Add the mentor column with foreign key constraint
      const addMentorColumnQuery = `
        ALTER TABLE authors
        ADD COLUMN mentor INT,
        ADD CONSTRAINT fk_mentor
        FOREIGN KEY (mentor) REFERENCES authors(author_id);
      `;
      await executeQuery(connection, addMentorColumnQuery);
      console.log("Mentor column added with foreign key constraint.");
    } else {
      console.log("Mentor column already exists. Skipping addition.");
    }
  } finally {
    await connection.end();
    console.log("Connection closed.");
  }
}

// Run the main function
main();
