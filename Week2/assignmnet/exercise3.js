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

const authorsAndPapers = `
  SELECT authors.author_name, research_papers.paper_title
  FROM authors
  LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
  LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id;
`;

async function runQueries() {
  try {
    const mentorsResult = await connection.query(authorsAndMentors);
    console.log("Authors and mentors:", mentorsResult);

    const papersResult = await connection.query(authorsAndPapers);
    console.log("Authors and papers:", papersResult);
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

runQueries();
