import connection from "./connection.js";

const main = async () => {
  try {
    const createDb = `
    DROP DATABASE IF EXISTS assignment2;
    CREATE DATABASE IF NOT EXISTS assignment2;
    USE assignment2;`;

    // Create a table, called authors. Give it the following fields: (author_id(Primary Key), author_name, university, date_of_birth, h_index, gender)
    const createTableAuthors = `
    CREATE TABLE authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR(100) NOT NULL,
        university VARCHAR(100) NOT NULL,
        date_of_birth DATETIME,
        h_index INT,
        gender VARCHAR(100) 
    );`;

    // Write a query that adds a column called mentor to authors table that references the column author_id. For integrity add a foreign key on this column.
    const addColumnAndForeignKey = `
    ALTER TABLE authors
    ADD mentor INT NULL;
 
    ALTER TABLE authors
    ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);`;

    await connection.query(createDb);
    console.log("database created");

    await connection.query(createTableAuthors);
    console.log("table authors created");

    await connection.query(addColumnAndForeignKey);
    console.log("mentor column and foreign key added");
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};

main();
