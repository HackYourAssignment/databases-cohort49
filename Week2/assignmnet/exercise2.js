const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

const createResearchPapersTable = `
  CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(100),
    publish_date DATE
  );
`;

const createAuthorPaperTable = `
  CREATE TABLE IF NOT EXISTS author_paper (
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id),
    PRIMARY KEY (author_id, paper_id)
  );
`;

async function setupDatabase() {
  try {
    await connection.query(createResearchPapersTable);
    await connection.query(createAuthorPaperTable);
    console.log("Research papers and author-paper tables created.");
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

setupDatabase();
