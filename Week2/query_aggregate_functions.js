const mysql = require("mysql2/promise");

async function aggregateQueries() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
  });

  const queryPapersAndAuthors = `
        SELECT research_papers.paper_title, COUNT(author_paper.author_id) AS 'Number of Authors'
        FROM research_papers
        LEFT JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
        GROUP BY research_papers.paper_title;
    `;
  const [papersAndAuthors] = await connection.execute(queryPapersAndAuthors);
  console.log("Research Papers and the Number of Authors:");
  console.table(papersAndAuthors);

  const queryPapersByFemaleAuthors = `
        SELECT COUNT(research_papers.paper_id) AS 'Total Papers by Female Authors'
        FROM authors
        JOIN author_paper ON authors.author_id = author_paper.author_id
        JOIN research_papers ON author_paper.paper_id = research_papers.paper_id
        WHERE authors.gender = 'Female';
    `;
  const [papersByFemale] = await connection.execute(queryPapersByFemaleAuthors);
  console.log("Total Papers Published by Female Authors:");
  console.table(papersByFemale);

  const queryAverageHIndex = `
        SELECT university, AVG(h_index) AS 'Average h-index'
        FROM authors
        GROUP BY university;
    `;
  const [averageHIndex] = await connection.execute(queryAverageHIndex);
  console.log("Average h-index per University:");
  console.table(averageHIndex);

  const queryTotalPapersPerUniversity = `
        SELECT authors.university, COUNT(research_papers.paper_id) AS 'Total Papers'
        FROM authors
        JOIN author_paper ON authors.author_id = author_paper.author_id
        JOIN research_papers ON author_paper.paper_id = research_papers.paper_id
        GROUP BY authors.university;
    `;
  const [totalPapersPerUni] = await connection.execute(
    queryTotalPapersPerUniversity
  );
  console.log("Total Research Papers per University:");
  console.table(totalPapersPerUni);

  const queryMinMaxHIndex = `
        SELECT university, MIN(h_index) AS 'Min h-index', MAX(h_index) AS 'Max h-index'
        FROM authors
        GROUP BY university;
    `;
  const [minMaxHIndex] = await connection.execute(queryMinMaxHIndex);
  console.log("Min and Max h-index per University:");
  console.table(minMaxHIndex);

  await connection.end();
}

aggregateQueries().catch((err) => console.error(err));
