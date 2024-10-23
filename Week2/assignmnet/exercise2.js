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
    publish_date DATE,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
  );
`;

connection.query(createResearchPapersTable, (error, results) => {
  if (error) throw error;
});

connection.end();
