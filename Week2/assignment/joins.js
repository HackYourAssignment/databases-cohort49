const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

// Query to get authors and their mentors
const queryAuthorsAndMentors = `
SELECT a1.author_name AS Author, a2.author_name AS Mentor
FROM authors a1
LEFT JOIN authors a2 ON a1.mentor = a2.author_id;`;

connection.query(queryAuthorsAndMentors, (error, results) => {
    if (error) throw error;
    console.log('Authors and their mentors:', results);
});

// Query to get authors and their research papers
const queryAuthorsAndPapers = `
SELECT a.author_name AS Author, rp.paper_title
FROM authors a
JOIN author_paper ap ON a.author_id = ap.author_id
JOIN research_papers rp ON ap.paper_id = rp.paper_id;`;

connection.query(queryAuthorsAndPapers, (error, results) => {
    if (error) throw error;
    console.log('Authors and their research papers:', results);
});

// Close the connection
connection.end();
