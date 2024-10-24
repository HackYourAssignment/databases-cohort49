const mysql = require("mysql2");
const { promisify } = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "keys_db",
});

const query = promisify(connection.query).bind(connection);

async function getAuthorsAndMentors() {
  try {
    const authorsAndMentorsQuery = `
      SELECT a.author_name AS Author, m.author_name AS Mentor
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
      `;

    const result = await query(authorsAndMentorsQuery);
    console.log("Authors and their mentors:", result);
  } catch (err) {
    console.error("Error retrieving authors and mentors:", err);
  }
}

async function getAuthorsAndPapers() {
  try {
    const authorsAndPapersQuery = `
            SELECT a.*, rp.paper_title
            FROM authors a
            LEFT JOIN research_Papers rp ON a.author_id = rp.author_id;`;

    const result = await query(authorsAndPapersQuery);
    console.log("Authors and their papers:", result);
  } catch (error) {
    console.error("Error retrieving authors and papers:", error);
  }
}

async function main() {
  try {
    await promisify(connection.connect).bind(connection)();
    console.log("Connected to MySQL server");

    await getAuthorsAndMentors();
    await getAuthorsAndPapers();
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

main();
