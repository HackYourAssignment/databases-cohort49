const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

const researchPapersAuthorsCount = `
  SELECT paper_title, COUNT(author_id) AS author_count
  FROM research_papers
  GROUP BY paper_title;
`;

connection.query(researchPapersAuthorsCount, (error, results) => {
  if (error) throw error;
  console.log(results);
});

const femaleAuthorsPaperCount = `
  SELECT SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END) AS female_paper_count
  FROM research_papers
  JOIN authors ON research_papers.author_id = authors.author_id;
`;

connection.query(femaleAuthorsPaperCount, (error, results) => {
  if (error) throw error;
  console.log(results);
});

const avgHIndexPerUniversity = `
  SELECT university, AVG(h_index) AS avg_h_index
  FROM authors
  GROUP BY university;
`;

connection.query(avgHIndexPerUniversity, (error, results) => {
  if (error) throw error;
  console.log(results);
});

const papersPerUniversity = `
  SELECT university, COUNT(research_papers.paper_id) AS paper_count
  FROM authors
  LEFT JOIN research_papers ON authors.author_id = research_papers.author_id
  GROUP BY university;
`;

connection.query(papersPerUniversity, (error, results) => {
  if (error) throw error;
  console.log(results);
});

const minMaxHIndexPerUniversity = `
  SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
  FROM authors
  GROUP BY university;
`;

connection.query(minMaxHIndexPerUniversity, (error, results) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
