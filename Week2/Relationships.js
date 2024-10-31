const mysql = require("mysql2/promise");

async function executeQuery(connection, query) {
  try {
    await connection.query(query);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

async function createAuthorsTable(connection) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS authors (
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(255) NOT NULL,
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('Male', 'Female', 'Other'),
      mentor INT,
      FOREIGN KEY (mentor) REFERENCES authors(author_id)
    );
  `;
  await executeQuery(connection, createTableQuery);
  console.log("Authors table created.");
}

async function createResearchPapersTable(connection) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255) NOT NULL,
      conference VARCHAR(255),
      publish_date DATE,
      author_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(author_id)
    );
  `;
  await executeQuery(connection, createTableQuery);
  console.log("Research papers table created.");
}

async function insertSampleData(connection) {
  const authors = [
    ["Alice Smith", "University A", "1985-05-12", 15, "Female"],
    ["Bob Johnson", "University B", "1978-11-22", 20, "Male"],
    ["Carol Williams", "University C", "1990-02-17", 10, "Female"],
    ["David Brown", "University D", "1982-03-03", 25, "Male"],
    ["Eve Davis", "University E", "1989-07-25", 30, "Female"],
    ["Frank Miller", "University F", "1983-09-30", 12, "Male"],
    ["Grace Wilson", "University G", "1991-01-15", 8, "Female"],
    ["Hank Moore", "University H", "1975-12-05", 22, "Male"],
    ["Ivy Taylor", "University I", "1987-06-14", 18, "Female"],
    ["Jack Anderson", "University J", "1980-10-01", 16, "Male"],
    ["Kathy Thomas", "University K", "1992-04-21", 5, "Female"],
    ["Liam Jackson", "University L", "1986-08-11", 14, "Male"],
    ["Mia White", "University M", "1993-05-19", 7, "Female"],
    ["Noah Harris", "University N", "1984-03-12", 20, "Male"],
    ["Olivia Martin", "University O", "1990-11-30", 15, "Female"],
  ];

  const insertAuthorsQuery = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
    VALUES ?;
  `;

  await connection.query(insertAuthorsQuery, [authors]);

  // Insert research papers
  const papers = [];
  for (let i = 1; i <= 30; i++) {
    const authorId = Math.floor(Math.random() * 15) + 1; // Random author_id between 1 and 15
    papers.push([
      `Research Paper ${i}`,
      `Conference ${i}`,
      `2023-01-${i}`,
      authorId,
    ]);
  }

  const insertPapersQuery = `
    INSERT INTO research_papers (paper_title, conference, publish_date, author_id)
    VALUES ?;
  `;

  await connection.query(insertPapersQuery, [papers]);
  console.log("Sample data inserted.");
}

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "meetup",
  });

  try {
    await createAuthorsTable(connection);
    await createResearchPapersTable(connection);
    await insertSampleData(connection);
  } finally {
    await connection.end();
    console.log("Connection closed.");
  }
}

// Run the main function
main();
