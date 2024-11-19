const mysql = require("mysql2/promise");

async function executeQuery(connection, query) {
  try {
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "meetup",
  });

  try {
    // 1. Authors and their corresponding mentors
    const authorsWithMentorsQuery = `
      SELECT a.author_name AS Author, m.author_name AS Mentor
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
    `;
    const authorsWithMentors = await executeQuery(
      connection,
      authorsWithMentorsQuery
    );
    console.log("Authors and their Mentors:");
    console.table(authorsWithMentors);

    // 2. Authors and their published papers
    const authorsWithPapersQuery = `
      SELECT a.author_name, p.paper_title
      FROM authors a
      LEFT JOIN author_papers ap ON a.author_id = ap.author_id
      LEFT JOIN research_papers p ON ap.paper_id = p.paper_id;
    `;
    const authorsWithPapers = await executeQuery(
      connection,
      authorsWithPapersQuery
    );
    console.log("Authors and their Published Papers:");
    console.table(authorsWithPapers);

    // 3. All research papers and the number of authors that wrote that paper
    const papersWithAuthorCountQuery = `
      SELECT p.paper_title, COUNT(ap.author_id) AS AuthorCount
      FROM research_papers p
      LEFT JOIN author_papers ap ON p.paper_id = ap.paper_id
      GROUP BY p.paper_id;
    `;
    const papersWithAuthorCount = await executeQuery(
      connection,
      papersWithAuthorCountQuery
    );
    console.log("Research Papers and the Number of Authors:");
    console.table(papersWithAuthorCount);

    // 4. Sum of the research papers published by all female authors
    const femaleAuthorsPapersCountQuery = `
      SELECT COUNT(*) AS FemaleAuthorsPapers
      FROM authors a
      JOIN author_papers ap ON a.author_id = ap.author_id
      JOIN research_papers p ON ap.paper_id = p.paper_id
      WHERE a.gender = 'Female';
    `;
    const femaleAuthorsPapersCount = await executeQuery(
      connection,
      femaleAuthorsPapersCountQuery
    );
    console.log(
      "Total Research Papers by Female Authors:",
      femaleAuthorsPapersCount[0].FemaleAuthorsPapers
    );

    // 5. Average of the h-index of all authors per university
    const avgHIndexPerUniversityQuery = `
      SELECT university, AVG(h_index) AS AverageHIndex
      FROM authors
      GROUP BY university;
    `;
    const avgHIndexPerUniversity = await executeQuery(
      connection,
      avgHIndexPerUniversityQuery
    );
    console.log("Average H-Index of Authors per University:");
    console.table(avgHIndexPerUniversity);

    // 6. Sum of the research papers of the authors per university
    const sumPapersPerUniversityQuery = `
      SELECT a.university, COUNT(ap.paper_id) AS TotalPapers
      FROM authors a
      LEFT JOIN author_papers ap ON a.author_id = ap.author_id
      GROUP BY a.university;
    `;
    const sumPapersPerUniversity = await executeQuery(
      connection,
      sumPapersPerUniversityQuery
    );
    console.log("Total Research Papers by Authors per University:");
    console.table(sumPapersPerUniversity);

    // 7. Minimum and maximum of the h-index of all authors per university
    const minMaxHIndexPerUniversityQuery = `
      SELECT university, MIN(h_index) AS MinHIndex, MAX(h_index) AS MaxHIndex
      FROM authors
      GROUP BY university;
    `;
    const minMaxHIndexPerUniversity = await executeQuery(
      connection,
      minMaxHIndexPerUniversityQuery
    );
    console.log("Min and Max H-Index of Authors per University:");
    console.table(minMaxHIndexPerUniversity);
  } finally {
    await connection.end();
    console.log("Connection closed.");
  }
}

// Run the main function
main();
