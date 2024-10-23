const mysql = require("mysql2/promise");

async function createResearchPapersTable() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
  });

  const createPapersTableQuery = `
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id INT AUTO_INCREMENT PRIMARY KEY,
            paper_title VARCHAR(255) NOT NULL,
            conference VARCHAR(255),
            publish_date DATE
        );
    `;
  await connection.execute(createPapersTableQuery);

  const createAuthorPaperTableQuery = `
        CREATE TABLE IF NOT EXISTS author_paper (
            author_id INT,
            paper_id INT,
            PRIMARY KEY (author_id, paper_id),
            FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
            FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
        );
    `;
  await connection.execute(createAuthorPaperTableQuery);

  console.log("Tables created successfully");
  await connection.end();
}

createResearchPapersTable().catch((err) => console.error(err));
