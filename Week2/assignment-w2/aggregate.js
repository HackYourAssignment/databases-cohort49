import connection from './dbconnection.js';

const runQuery = (query, description) => {
  connection.query(query, (err, result) => {
    if (err) {
      console.log(`Error executing ${description}:`, err);
      return;
    }
    console.log(`${description} executed successfully`, result);
  });
  const queryPaperAuthorsCount = `
  SELECT paper_title, COUNT(authors_id) AS authors_count
  FROM research_paper
  GROUP BY paper_title;`;
  runQuery(queryPaperAuthorsCount, 'getting paper and authors count');

  // sum of research paper by female authors
  const querySumPaperByFemale = `
  SELECT SUM(CASE WHEN gender = 'f' THEN 1 ELSE 0 END) AS female_paper_count
  FROM authors
  JOIN research_paper ON authors.authors_id = research_paper.authors_id;`;
  runQuery(querySumPaperByFemale, 'getting sum of research');
  // average h-index per university
  const queryAvgHIndex = `
  SELECT university, AVG(h_index) AS avg_h_index
  FROM authors
  GROUP BY university;`;
  runQuery(queryAvgHIndex, 'getting average h-index per university');

  // sum of research paper by authors per university
  const querySumPaperByAuthorsPerUniversity = `
  SELECT university, COUNT(research_paper.paper_id) AS paper_count
  FROM authors
  LEFT JOIN research_paper ON authors.authors_id = research_paper.authors_id
  GROUP BY university;`;
  runQuery(
    querySumPaperByAuthorsPerUniversity,
    'getting sum of research paper by authors per university',
  );

  // min and max h-index per university
  const queryMinMaxHIndex = `
  SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
  FROM authors
  GROUP BY university;`;
  runQuery(queryMinMaxHIndex, 'getting min and max h-index per university');
  connection.end();
};
