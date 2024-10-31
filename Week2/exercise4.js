import mysql2 from "mysql2/promise";

const connection = await mysql2.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
    database: "author_db",
});
console.log("Connected as id " + connection.threadId);

const main = async () => {
    try {
        const queries = [
            {
                description: "All research papers and the number of authors that wrote that paper",
                query: `
                    SELECT research_paper.paper_name, COUNT(research_paper_author.author_id) AS author_count 
                    FROM research_paper 
                    JOIN research_paper_author ON research_paper.paper_id = research_paper_author.paper_id 
                    GROUP BY research_paper.paper_id;
                `,
            },
            {
                description: "Sum of the research papers published by all female authors",
                query: `
                    SELECT COUNT(research_paper_author.paper_id) AS female_paper_count 
                    FROM research_paper_author 
                    JOIN author ON research_paper_author.author_id = author.author_id 
                    WHERE author.gender = 'f';
                `,
            },
            {
                description: "Average of the h-index of all authors per university",
                query: `
                    SELECT AVG(author.h_index) AS average_h_index, author.university 
                    FROM author 
                    GROUP BY author.university;
                `,
            },
            {
                description: "Sum of the research papers of the authors per university",
                query: `
                    SELECT author.university, COUNT(research_paper_author.paper_id) AS paper_count 
                    FROM research_paper_author 
                    JOIN author ON research_paper_author.author_id = author.author_id 
                    GROUP BY author.university;
                `,
            },
            {
                description: "Minimum and maximum of the h-index of all authors per university",
                query: `
                    SELECT author.university, MIN(author.h_index) AS min_h_index, MAX(author.h_index) AS max_h_index 
                    FROM author 
                    GROUP BY author.university;
                `,
            },
        ];

        for (const { description, query } of queries) {
            console.log(description);
            const [rows] = await connection.query(query);
            console.table(rows);
        }
    } catch (error) {
        console.log("error:", error.message);
        console.log("error:", error.stack);
    } finally {
        await connection.end();
    }
};

main();
