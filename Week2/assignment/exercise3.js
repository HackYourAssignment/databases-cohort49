const getConnection = require("./connectDatabase");

async function getAuthorsAndMentors(connection) {
  try {
    const authorsAndMentorsQuery = `
      SELECT a.author_name AS Author, m.author_name AS Mentor
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
      `;

    const [result] = await connection.query(authorsAndMentorsQuery);
    console.log("Authors and their mentors:", result);
  } catch (err) {
    console.error("Error retrieving authors and mentors:", err);
  }
}

async function getAuthorsAndPapers(connection) {
  try {
    const authorsAndPapersQuery = `
            SELECT a.*, rp.paper_title
            FROM authors a
            LEFT JOIN research_Papers rp ON a.author_id = rp.author_id;`;

    const [result] = await connection.query(authorsAndPapersQuery);
    console.log("Authors and their papers:", result);
  } catch (error) {
    console.error("Error retrieving authors and papers:", error);
  }
}

async function main() {
  const connection = await getConnection();
  try {
    console.log("Connected to MySQL server");

    await getAuthorsAndMentors(connection);
    await getAuthorsAndPapers(connection);
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
    console.log("MySQL connection closed");
  }
}

main();
