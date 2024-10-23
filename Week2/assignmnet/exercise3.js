const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});
connection.connect();

const authorsAndMentors = `
  SELECT a1.author_name AS author, a2.author_name AS mentor
  FROM authors a1
  LEFT JOIN authors a2 ON a1.mentor = a2.author_id;
`;

connection.query(authorsAndMentors, (error, results) => {
  if (error) throw error;
  console.log(results);
});

const authorsAndPapers = `
  SELECT authors.*, research_papers.paper_title
  FROM authors
  LEFT JOIN research_papers ON authors.author_id = research_papers.author_id;
`;

connection.query(authorsAndPapers, (error, results) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
