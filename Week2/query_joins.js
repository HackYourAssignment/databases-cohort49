const mysql = require("mysql2/promise");

async function getAuthorsAndMentors() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
  });

  const queryMentors = `
        SELECT a.author_name AS 'Author', m.author_name AS 'Mentor'
        FROM authors a
        LEFT JOIN authors m ON a.mentor = m.author_id;
    `;
  const [mentors] = await connection.execute(queryMentors);
  console.log("Authors and their Mentors:");
  console.table(mentors);

  const queryAuthorsAndPapers = `
        SELECT authors.*, research_papers.paper_title
        FROM authors
        LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
        LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id;
    `;
  const [authorsAndPapers] = await connection.execute(queryAuthorsAndPapers);
  console.log("Authors and their Research Papers:");
  console.log(authorsAndPapers);

  await connection.end();
}

getAuthorsAndMentors().catch((err) => console.error(err));
