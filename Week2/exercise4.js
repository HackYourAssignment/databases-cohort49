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

  // Query for number of authors per research paper
  const authorsPerPaperQuery = `
        SELECT rp.paper_title, COUNT(a.author_id) AS num_authors
        FROM research_papers rp
        LEFT JOIN authors a ON rp.author_id = a.author_id
        GROUP BY rp.paper_id;
    `;

  connection.query(authorsPerPaperQuery, (err, results) => {
    if (err) throw err;
    console.log("Authors per research paper:", results);
  });

  // Query for sum of research papers by female authors
  const femalePapersQuery = `
        SELECT COUNT(*) AS female_papers
        FROM research_papers rp
        JOIN authors a ON rp.author_id = a.author_id
        WHERE a.gender = 'Female';
    `;

  connection.query(femalePapersQuery, (err, results) => {
    if (err) throw err;
    console.log("Research papers by female authors:", results);
  });

  // Additional aggregate queries
  const avgHIndexQuery = `
        SELECT university, AVG(h_index) AS avg_h_index
        FROM authors
        GROUP BY university;
    `;

  connection.query(avgHIndexQuery, (err, results) => {
    if (err) throw err;
    console.log("Average H-Index per university:", results);
  });

  const sumPapersPerUniversityQuery = `
        SELECT a.university, COUNT(rp.paper_id) AS total_papers
        FROM authors a
        LEFT JOIN research_papers rp ON a.author_id = rp.author_id
        GROUP BY a.university;
    `;

  connection.query(sumPapersPerUniversityQuery, (err, results) => {
    if (err) throw err;
    console.log("Total research papers per university:", results);
  });

  const minMaxHIndexQuery = `
        SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
        FROM authors
        GROUP BY university;
    `;

  connection.query(minMaxHIndexQuery, (err, results) => {
    if (err) throw err;
    console.log("Min and Max H-Index per university:", results);
    connection.end();
  });
});
