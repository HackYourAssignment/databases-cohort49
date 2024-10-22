const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "myRecipes",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  // Create research_papers table if it doesn't exist
  const createPapersTable = `
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id INT PRIMARY KEY AUTO_INCREMENT,
            paper_title VARCHAR(255),
            conference VARCHAR(255),
            publish_date DATE,
            author_id INT,
            FOREIGN KEY (author_id) REFERENCES authors(author_id)
        );
    `;

  connection.query(createPapersTable, (err) => {
    if (err) throw err;
    console.log("Research papers table created or already exists.");

    // Insert authors and papers here (repeat for 15 authors and 30 papers)
    const insertAuthors = `
            INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
            VALUES 
            ('Author One', 'University A', '1980-01-01', 10, 'Male'),
            ('Author Two', 'University B', '1985-02-02', 15, 'Female');
            -- Add 13 more authors
        `;

    const insertPapers = `
            INSERT INTO research_papers (paper_title, conference, publish_date, author_id)
            VALUES 
            ('Research Paper One', 'Conference A', '2020-05-01', 1),
            ('Research Paper Two', 'Conference B', '2021-06-01', 2);
            -- Add 28 more papers
        `;

    connection.query(insertAuthors, (err) => {
      if (err) throw err;
      console.log("Authors inserted.");

      connection.query(insertPapers, (err) => {
        if (err) throw err;
        console.log("Research papers inserted.");
        connection.end();
      });
    });
  });
});
