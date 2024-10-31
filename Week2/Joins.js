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
    // 1. Query to get all authors and their corresponding mentors
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

    // 2. Query to get all columns of authors and their published paper titles
    const authorsWithPapersQuery = `
      SELECT a.*, p.paper_title
      FROM authors a
      LEFT JOIN research_papers p ON a.author_id = p.author_id;
    `;
    const authorsWithPapers = await executeQuery(
      connection,
      authorsWithPapersQuery
    );
    console.log("Authors and their Published Papers:");
    console.table(authorsWithPapers);
  } finally {
    await connection.end();
    console.log("Connection closed.");
  }
}

// Run the main function
main();
