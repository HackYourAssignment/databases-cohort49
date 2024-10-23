const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

// Query for all research papers and the number of authors that wrote each paper
const queryPapersAndAuthorsCount = `
SELECT rp.paper_title, COUNT(a.author_id) AS number_of_authors
FROM research_papers rp
LEFT JOIN authors a ON rp.author_id = a.author_id
GROUP BY rp.paper_id;`;

// Query for sum of research papers published by all female authors
const queryFemalePapersCount = `
SELECT COUNT(*) AS total_female_papers
FROM research_papers rp
JOIN authors a ON rp.author_id = a.author_id
WHERE a.gender = 'Female';`;

// Query for average h-index of all authors per university
const queryAverageHIndex = `
SELECT university, AVG(h_index) AS average_h_index
FROM authors
GROUP BY university;`;

// Query for sum of research papers of authors per university
const queryTotalPapersPerUniversity = `
SELECT a.university, COUNT(rp.paper_id) AS total_papers
FROM authors a
LEFT JOIN research_papers rp ON a.author_id = rp.author_id
GROUP BY a.university;`;

// Query for minimum and maximum of h-index of all authors per university
const queryMinMaxHIndex = `
SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;`;

connection.query(queryPapersAndAuthorsCount, (error, results) => {
    if (error) throw error;
    console.log('Research papers and number of authors:', results);
});

connection.query(queryFemalePapersCount, (error, results) => {
    if (error) throw error;
    console.log('Total research papers by female authors:', results);
});

connection.query(queryAverageHIndex, (error, results) => {
    if (error) throw error;
    console.log('Average H-index per university:', results);
});

connection.query(queryTotalPapersPerUniversity, (error, results) => {
    if (error) throw error;
    console.log('Total research papers per university:', results);
});

connection.query(queryMinMaxHIndex, (error, results) => {
    if (error) throw error;
    console.log('Min and Max H-index per university:', results);
});

// Close the connection
connection.end();
