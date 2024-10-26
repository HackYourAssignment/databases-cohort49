import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "assignment",
});

const main = async () => {
  try {
    const queries = [
      {
        description: "All authors and their corresponding mentors",
        query:
          "SELECT a.author_name as author, m.author_name as mentor FROM author a LEFT JOIN author m ON a.mentor = m.author_id",
      },
      {
        description: "All authors and the title of their published papers.",
        query:
          "SELECT author.author_name,  research_paper.paper_name FROM author  LEFT JOIN research_paper_author as ra ON ra.author_id = author.author_id INNER JOIN research_paper ON ra.paper_id = research_paper.paper_id",
      },
    ];

    for (const { description, query } of queries) {
      console.log(description);
      const [rows] = await connection.query(query);
      console.table(rows);
    }
  } catch (error) {
    console.log("error:", error.message);
    console.log("error:", error.stack);
  } finally {
    await connection.end();
  }
};
main();
