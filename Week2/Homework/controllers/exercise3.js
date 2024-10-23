import db from '../db.js';

const getAuthorsAndMentors = async () => {
  const query = `
    SELECT a.author_name AS author, m.author_name AS mentor
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id;
  `;

  try {
    const [results] = await db.query(query);
    console.log(results);
  } catch (error) {
    console.error('Error fetching authors and mentors:', error);
  }
};

const getAuthorsAndPapers = async () => {
  const query = `
    SELECT a.*, rp.paper_title
    FROM authors a
    LEFT JOIN research_Papers rp ON a.author_id = rp.author_id;
  `;

  try {
    const [results] = await db.query(query);
    console.log(results);
  } catch (error) {
    console.error('Error fetching authors and papers:', error);
  }
};

getAuthorsAndMentors();
getAuthorsAndPapers();