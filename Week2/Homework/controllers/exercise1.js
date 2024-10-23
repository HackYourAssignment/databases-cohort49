import db from '../db.js';

const createAuthorsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS authors (
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(100),
      university VARCHAR(100),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('Male', 'Female', 'Other')
    );
  `;

  const addMentorColumn = `
    ALTER TABLE authors 
    ADD mentor INT,
    ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL;
  `;

  try {
    await db.query(createTableQuery);
    console.log('Authors table created.');
    await db.query(addMentorColumn);
    console.log('Mentor column added.');
  } catch (error) {
    console.error('Error creating authors table:', error);
  }
};

createAuthorsTable();