import connection from "./connection.js";

const main = async () => {
  try {
    const useDb = `USE assignment2;`;

    // All research papers and the number of authors that wrote that paper.
    const getPapersAndNumberOfAuthors = `
        SELECT rp.paper_title, count(arp.author_id) as count
        FROM research_Papers rp 
        LEFT JOIN authors_research_Papers arp 
        ON rp.paper_id = arp.paper_id 
        GROUP BY rp.paper_title;
    `;

    // Sum of the research papers published by all female authors.
    const getSumOfFemaleAuthors = `
        SELECT count(distinct arp.paper_id) 
        FROM authors_research_Papers arp
        LEFT JOIN authors a
        ON a.author_id = arp.author_id
        where a.gender = 'Female';
    `;

    // Average of the h-index of all authors per university.
    const getAvgHIndex = `
        SELECT university, avg(h_index)
        FROM authors 
        GROUP BY university;
    `;

    // Sum of the research papers of the authors per university.
    const getSumOfPapersPerUniversity = `
        SELECT a.university, count(arp.paper_id) as count
        FROM authors a
        LEFT JOIN authors_research_Papers arp
        ON a.author_id = arp.author_id
        GROUP BY a.university;
    `;

    // Minimum and maximum of the h-index of all authors per university.
    const getMinAndMaxHIndexPerUniversity = `
        SELECT a.university, max(h_index) max, min(h_index) min 
        FROM authors a 
        GROUP BY a.university;
    `;

    // use db
    await connection.query(useDb);

    // print papers and number of authors
    const printPapersAndNumberOfAuthors = await connection.query(
      getPapersAndNumberOfAuthors
    );
    console.log(printPapersAndNumberOfAuthors[0]);

    // print sum of female authors
    const printSumOfFemaleAuthors = await connection.query(
      getSumOfFemaleAuthors
    );
    console.log(printSumOfFemaleAuthors[0]);

    // print Sum Of Papers Per University
    const printSumOfPapersPerUniversity = await connection.query(
      getSumOfPapersPerUniversity
    );
    console.log(printSumOfPapersPerUniversity[0]);

    // print Min and Max H-index Of All Authors Per University
    const printMinAndMaxHIndexPerUniversity = await connection.query(
      getMinAndMaxHIndexPerUniversity
    );
    console.log(printMinAndMaxHIndexPerUniversity[0]);
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};

main();
