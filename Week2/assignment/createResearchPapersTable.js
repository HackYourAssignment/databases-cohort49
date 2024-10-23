const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

// SQL command to create the research_papers table
const createResearchPapersTable = `
CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255) NOT NULL,
    conference VARCHAR(255),
    publish_date DATE,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);`;

// Execute the SQL command
connection.query(createResearchPapersTable, (error, results) => {
    if (error) {
        console.error('Error creating research_papers table:', error);
        return;
    }
    console.log('Research papers table created successfully.');
});

// Close the connection
connection.end();
