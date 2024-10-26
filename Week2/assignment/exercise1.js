import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

console.log("Connected as id " + connection.threadId);

const main = async () => {
  try {
    const dropDatabase = "DROP DATABASE IF EXISTS assignment";
    const createDatabase = "CREATE DATABASE IF NOT EXISTS assignment";

    await connection.query(dropDatabase);
    await connection.query(createDatabase);
    await connection.query("USE assignment");
    console.log("Database created");

    const createTableAuthor =
      "CREATE TABLE IF NOT EXISTS author (author_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(50) NOT NULL, university VARCHAR(100) NOT NULL,date_of_birth DATE NOT NULL, h_index INT, gender ENUM('m', 'f') NOT NULL)";

    await connection.query(createTableAuthor);
    console.log("Table created");

    const addColum = "ALTER TABLE  author ADD COLUMN mentor INT";

    await connection.query(addColum);
    console.log("Column added");

    const addConstraint =
      "ALTER TABLE author ADD CONSTRAINT mentor_fk FOREIGN KEY (mentor) REFERENCES author(author_id) ON DELETE CASCADE ON UPDATE CASCADE";

    await connection.query(addConstraint);
    console.log("Constraint added");

    const insertQuery = `
    INSERT INTO author (author_name, university, date_of_birth, h_index, gender) VALUES
    ('Lubna', 'University of Amsterdam', '1990-06-01', 10, 'f'),
    ('Salwa' , 'Maastricht University', '1991-12-01', 9, 'f'),
    ('Jim', 'University of Toronto', '1992-11-01', 8, 'm'),
    ('Mo', 'University of Amsterdam', '1993-12-20', 7, 'm'),
    ('Max', 'Maastricht University', '1994-09-04', 6, 'm'),
    ('Alia', 'University of Toronto', '1995-07-04', 5, 'f'),
    ('Seba', 'Maastricht University', '1996-09-04', 4, 'f'),
    ('Ali', 'University of Oxford', '1997-07-04', 3, 'm'),
    ('Sara', 'University of Toronto', '1998-09-04', 2, 'f'),
    ('Saeed', 'University of Amsterdam', '1999-07-04', 1, 'm'),
    ('Lamis', 'University of Oxford', '1998-09-04', 2, 'f'),
    ('Hani', 'University of Toronto', '1999-07-04', 1, 'm'),
    ('Lina', 'University of Amsterdam', '1998-09-04', 2, 'f'),
    ('Hassan', 'University of Oxford', '1999-07-04', 1, 'm'),
    ('Buthina', 'Maastricht University', '1995-03-03', 8, 'f');
  `;

    await connection.query(insertQuery);
    console.log("Data inserted");

    const updateMentors = [
      "UPDATE author SET mentor = 15 WHERE author_id = 1;",
      "UPDATE author SET mentor = 1 WHERE author_id = 2;",
      "UPDATE author SET mentor = 2 WHERE author_id = 3;",
      "UPDATE author SET mentor = 3 WHERE author_id = 4;",
      "UPDATE author SET mentor = 4 WHERE author_id = 5;",
      "UPDATE author SET mentor = 5 WHERE author_id = 6;",
      "UPDATE author SET mentor = 1 WHERE author_id = 7;",
      "UPDATE author SET mentor = 6 WHERE author_id = 8;",
      "UPDATE author SET mentor = 7 WHERE author_id = 9;",
      "UPDATE author SET mentor = 8 WHERE author_id = 10;",
      "UPDATE author SET mentor = 9 WHERE author_id = 11;",
      "UPDATE author SET mentor = 10 WHERE author_id = 12;",
      "UPDATE author SET mentor = 11 WHERE author_id = 13;",
      "UPDATE author SET mentor = 12 WHERE author_id = 14;",
      "UPDATE author SET mentor = 13 WHERE author_id = 15;",
    ];

    for (const update of updateMentors) {
      await connection.query(update);
    }

    console.log("Mentors updated");
  } catch (error) {
    console.log("error:", error.message);
    console.log("error:", error.stack);
  } finally {
    await connection.end();
  }
};

main();
