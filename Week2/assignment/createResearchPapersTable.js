const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

const createResearchPapersTable = `
CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255) NOT NULL,
    conference VARCHAR(255),
    publish_date DATE
);`;

connection.query(createResearchPapersTable, (error, results) => {
    if (error) {
        console.error('Error creating research_papers table:', error);
        return;
    }
    console.log('Research papers table created successfully.');
});

// Close the connection
connection.end();
