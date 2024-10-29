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
SELECT rp.paper_title, COUNT(ap.author_id) AS number_of_authors
FROM research_papers rp
LEFT JOIN author_paper ap ON rp.paper_id = ap.paper_id
GROUP BY rp.paper_id;`;

// Query for sum of research papers published by all female authors
const queryFemalePapersCount = `
SELECT COUNT(DISTINCT rp.paper_id) AS total_female_papers
FROM research_papers rp
JOIN author_paper ap ON rp.paper_id = ap.paper_id
JOIN authors a ON ap.author_id = a.author_id
WHERE a.gender = 'Female';`;

// Query for average h-index of all authors per university
const queryAverageHIndex = `
SELECT university, AVG(h_index) AS average_h_index
FROM authors
GROUP BY university;`;

// Query for sum of research papers of authors per university
const queryTotalPapersPerUniversity = `
SELECT a.university, COUNT(DISTINCT rp.paper_id) AS total_papers
FROM authors a
JOIN author_paper ap ON a.author_id = ap.author_id
JOIN research_papers rp ON ap.paper_id = rp.paper_id
GROUP BY a.university;`;

// Query for minimum and maximum of h-index of all authors per university
const queryMinMaxHIndex = `
SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;`;

// Function to execute a query and log the result
function executeQuery(query, logMessage) {
    connection.query(query, (error, results) => {
        if (error) throw error;
        console.log(logMessage, results);
    });
}

// Execute the queries
executeQuery(queryPapersAndAuthorsCount, 'Research papers and number of authors:');
executeQuery(queryFemalePapersCount, 'Total research papers by female authors:');
executeQuery(queryAverageHIndex, 'Average H-index per university:');
executeQuery(queryTotalPapersPerUniversity, 'Total research papers per university:');
executeQuery(queryMinMaxHIndex, 'Min and Max H-index per university:');

// Close the connection
connection.end();
