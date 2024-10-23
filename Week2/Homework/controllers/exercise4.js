import db from '../db.js';

const getAuthorsPerPaper = async () => {
  const query = `
    SELECT rp.paper_title, COUNT(a.author_id) AS author_count
    FROM research_Papers rp
    JOIN authors a ON rp.author_id = a.author_id
    GROUP BY rp.paper_title;
  `;

  try {
    const [results] = await db.query(query);
    console.log('Authors per paper:', results);
  } catch (error) {
    console.error('Error fetching authors per paper:', error);
  }
};

const getFemaleAuthorsPaperCount = async () => {
  const query = `
    SELECT COUNT(rp.paper_id) AS female_paper_count
    FROM research_Papers rp
    JOIN authors a ON rp.author_id = a.author_id
    WHERE a.gender = 'Female';
  `;

  try {
    const [results] = await db.query(query);
    console.log('Total papers by female authors:', results);
  } catch (error) {
    console.error('Error fetching female authors paper count:', error);
  }
};

const getAverageHIndexByUniversity = async () => {
  const query = `
    SELECT a.university, AVG(a.h_index) AS avg_h_index
    FROM authors a
    GROUP BY a.university;
  `;

  try {
    const [results] = await db.query(query);
    console.log('Average h-index by university:', results);
  } catch (error) {
    console.error('Error fetching average h-index by university:', error);
  }
};

const getPapersByUniversity = async () => {
  const query = `
    SELECT a.university, COUNT(rp.paper_id) AS paper_count
    FROM authors a
    LEFT JOIN research_Papers rp ON a.author_id = rp.author_id
    GROUP BY a.university;
  `;

  try {
    const [results] = await db.query(query);
    console.log('Total papers by university:', results);
  } catch (error) {
    console.error('Error fetching papers by university:', error);
  }
};

const getMinMaxHIndexByUniversity = async () => {
  const query = `
    SELECT a.university, MIN(a.h_index) AS min_h_index, MAX(a.h_index) AS max_h_index
    FROM authors a
    GROUP BY a.university;
  `;

  try {
    const [results] = await db.query(query);
    console.log('Min and Max h-index by university:', results);
  } catch (error) {
    console.error('Error fetching min and max h-index by university:', error);
  }
};

getAuthorsPerPaper();
getFemaleAuthorsPaperCount();
getAverageHIndexByUniversity();
getPapersByUniversity();
getMinMaxHIndexByUniversity();