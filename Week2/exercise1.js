import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
});

console.log("Connected as id " + connection.threadId);

const main = async () => {
    try {
        const dropDatabase = "DROP DATABASE IF EXISTS assignment";
        const createDatabase = "CREATE DATABASE IF NOT EXISTS assignment";

        await connection.query(dropDatabase);
        await connection.query(createDatabase);
        await connection.query("USE author_db");
        console.log("Database created");

        const createTableAuthor =
            "CREATE TABLE IF NOT EXISTS author (author_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(50) NOT NULL, date_of_birth DATE NOT NULL, h_index INT, gender ENUM('m', 'f') NOT NULL)";

        await connection.query(createTableAuthor);
        console.log("Table created");

        try {
            const addColumnAndConstraint = `
                ALTER TABLE author 
                ADD COLUMN mentor INT,
                ADD CONSTRAINT mentor_fk FOREIGN KEY (mentor) REFERENCES author(author_id)
            `;
        
            await connection.query(addColumnAndConstraint);
            console.log("Column and foreign key constraint added successfully");
        } catch (error) {
            console.error("Failed to add column and constraint:", error);
        }
        console.log("Constraint added");

        // automated data generation
        const authors = [];
        const names = ['John', 'Mark', 'Tim', 'Jo', 'Max', 'Nima', 'Fred', 'Kim', 'Sara', 'Chester', 'Kevin', 'Fill', 'Liam', 'Liana', 'Withney'];
        const genders = ['f', 'm'];
        const mentorIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = 0; i < 15; i++) {
            const name = names[i % names.length];
            const dateOfBirth = `${1980 + Math.floor(Math.random() * 25)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
            const hIndex = Math.floor(Math.random() * 10) + 1;
            const gender = genders[i % 2];
            const mentor = mentorIds[Math.floor(Math.random() * mentorIds.length)];

            authors.push(`('${name}', '${dateOfBirth}', ${hIndex}, '${gender}', ${mentor})`);
        }

        const insertQuery = `
            INSERT INTO author (author_name, date_of_birth, h_index, gender, mentor) VALUES
            ${authors.join(',\n')}
        ;`;

        await connection.query(insertQuery);
        console.log("Data inserted dynamically");
    } catch (error) {
        console.log("error:", error.message);
        console.log("error:", error.stack);
    } finally {
        await connection.end();
    }
};

main();
