const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "myRecipes",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  // Query for authors and their mentors
  const authorMentorQuery = `
        SELECT a1.author_name AS Author, a2.author_name AS Mentor
        FROM authors a1
        LEFT JOIN authors a2 ON a1.mentor = a2.author_id;
    `;

  connection.query(authorMentorQuery, (err, results) => {
    if (err) throw err;
    console.log("Authors and their mentors:", results);
  });

  // Query for authors and their published papers
  const authorPapersQuery = `
        SELECT a.*, rp.paper_title
        FROM authors a
        LEFT JOIN research_papers rp ON a.author_id = rp.author_id;
    `;

  connection.query(authorPapersQuery, (err, results) => {
    if (err) throw err;
    console.log("Authors and their research papers:", results);
    connection.end();
  });
});
