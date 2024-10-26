import mysql2 from "mysql2/promise";

const connection = await mysql2.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "assignment",
});
console.log("Connected as id " + connection.threadId);

const main = async () => {
  try {
    const queries = [
      {
        description: "All research papers and the id of authors",
        query:
          "SELECT rp.paper_name, a.author_id FROM research_paper rp LEFT JOIN research_paper_author rpa ON rp.paper_id = rpa.paper_id INNER JOIN author a ON rpa.author_id = a.author_id;",
      },
      {
        description:
          "Sum of the research papers published by all female authors",
        query: `SELECT COUNT(rp.paper_id) as research_papers, a.gender FROM research_paper rp LEFT JOIN research_paper_author as rpa ON rp.paper_id = rpa.paper_id INNER JOIN  author a ON rpa.author_id = a.author_id WHERE a.gender = 'f';`,
      },
      {
        description: "Average of the h-index of all authors per university",
        query:
          "SELECT AVG(h_index) as average_h_index, university FROM author GROUP BY university;",
      },
      {
        description: "Sum of the research papers of the authors per university",
        query:
          "SELECT COUNT(rp.paper_id) as research_papers, a.university FROM research_paper rp LEFT JOIN research_paper_author  rpa ON rp.paper_id = rpa.paper_id INNER JOIN  author a ON rpa.author_id = a.author_id GROUP BY a.university;",
      },
      {
        description:
          "Minimum and maximum of the h-index of all authors per university",
        query:
          "SELECT MAX(a.h_index) as max_h_index, MIN(a.h_index) as min_h_index, a.university FROM author as a GROUP BY a.university;",
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
