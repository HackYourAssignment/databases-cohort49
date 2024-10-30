const getConnection = require("./connectDatabase");

async function runAggregateQyeries() {
  const connection = await getConnection();

  try {
    console.log("Connected to MySQL server");

    const paperAuthorCount = await connection.query(`
            SELECT rp.paper_title, COUNT(rp.author_id) AS author_count
            FROM research_Papers rp
            GROUP BY rp.paper_title;`);
    console.log("Paper Author Count:", paperAuthorCount);

    const totalFemalePapers = await connection.query(`
            SELECT COUNT(*) AS total_female_papers
            FROM research_Papers rp
            JOIN authors a ON rp.author_id = a.author_id
            WHERE a.gender = 'f';`);
    console.log("Total Female Papers:", totalFemalePapers);

    const averageHIndex = await connection.query(`
                SELECT university, AVG(h_index) AS average_h_index
                FROM authors
                GROUP BY university;`);
    console.log("Average H-Index:", averageHIndex);

    const totalPapers = await connection.query(`
                SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
                FROM authors
                GROUP BY university;`);
    console.log("Min and Max H-Index:", totalPapers);
  } catch (error) {
    console.error("Error running aggregate queries:", error);
  } finally {
    await connection.end();
    console.log("MySQL connection closed");
  }
}

runAggregateQyeries();
