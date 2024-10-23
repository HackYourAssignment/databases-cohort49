import connection from './dbconnection.js';

const runQuery = (query, description) => {
  connection.query(query, (err, result) => {
    if (err) {
      console.log(`Error executing ${description}:`, err);
      return;
    }
    console.log(`${description} executed successfully`, result);
  });
  const queryAuthorsMentors = `
  SELECT a1.author_name AS author, a2.author_name AS mentor
  FROM authors a1
  LEFT JOIN authors a2 ON a1.mentor = a2.authors_id;`;
  runQuery(queryAuthorsMentors, 'getting authors and their mentors');
  const queryAuthorsPapers = `
  SELECT authors.author_name, research_paper.paper_title
  FROM authors
  LEFT JOIN research_paper ON authors.authors_id = research_paper.authors_id;`;
  runQuery(queryAuthorsPapers, 'getting authors and their papers');
  connection.end();
};
