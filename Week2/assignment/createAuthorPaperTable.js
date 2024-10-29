const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

const createAuthorPaperTable = `
CREATE TABLE author_paper (
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id),
    PRIMARY KEY (author_id, paper_id)
);`;

connection.query(createAuthorPaperTable, (error, results) => {
    if (error) {
        console.error('Error creating author_paper table:', error);
        return;
    }
    console.log('Author-paper association table created successfully.');
});

connection.end();
