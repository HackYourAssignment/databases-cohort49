import connection from "./connection.js";

const main = async () => {
  try {
    const useDb = `USE assignment2;`;

    // Write a query that prints names of all authors and their corresponding mentors.
    const getAuthorsAndMentors = `
      SELECT a.author_name as author, b.author_name as mentor 
      FROM authors a 
      LEFT JOIN authors b 
      ON a.mentor = b.author_id;
    `;

    // Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
    const getAuthorsAndPaperTitle = `
      SELECT a.author_name, rp.paper_title 
      FROM authors a 
      LEFT JOIN authors_research_Papers arp 
      ON a.author_id = arp.author_id 
      LEFT JOIN research_Papers rp 
      ON arp.paper_id = rp.paper_id;
    `;

    // use db
    await connection.query(useDb);

    // print authors and mentors
    const authorsAndMentors = await connection.query(getAuthorsAndMentors);
    console.log(authorsAndMentors[0]);

    // print authors and paper title
    const authorsAndPapers = await connection.query(getAuthorsAndPaperTitle);
    console.log(authorsAndPapers[0]);
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};

main();
