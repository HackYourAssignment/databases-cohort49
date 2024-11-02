const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
});

connection.connect();

function runQuery(query, description) {
    connection.query(query, (error, results) => {
        if (error) throw error;
        console.log(description, results);
    });
}

const queries = [
    {
        query: `SELECT paper_title, COUNT(author_id) AS author_count FROM author_paper JOIN research_papers ON author_paper.paper_id = research_papers.paper_id GROUP BY paper_title;`,
        description: "Research papers and author count:",
    },
    {
        query: `SELECT COUNT(DISTINCT author_paper.paper_id) AS female_paper_count FROM author_paper JOIN authors ON author_paper.author_id = authors.author_id WHERE authors.gender = 'female';`,
        description: "Count of unique papers by female authors:",
    },
    {
        query: `SELECT university, AVG(h_index) AS avg_h_index FROM authors GROUP BY university;`,
        description: "Average H-index per university:",
    },
    {
        query: `SELECT university, COUNT(research_papers.paper_id) AS paper_count FROM authors LEFT JOIN author_paper ON authors.author_id = author_paper.author_id LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id GROUP BY university;`,
        description: "Papers per university:",
    },
    {
        query: `SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index FROM authors GROUP BY university;`,
        description: "Min and Max H-index per university:",
    },
];

queries.forEach(({ query, description }) => runQuery(query, description));

connection.end();
