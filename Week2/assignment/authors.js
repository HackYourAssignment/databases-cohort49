const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

// SQL command to create the authors table
const createAuthorsTable = `
CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('Male', 'Female', 'Other'),
    mentor INT,
    FOREIGN KEY (mentor) REFERENCES authors(author_id)
);`;

// Execute the SQL command
connection.query(createAuthorsTable, (error, results) => {
    if (error) {
        console.error('Error creating table:', error);
        return;
    }
    console.log('Authors table created successfully.');
});

// Close the connection
connection.end();
