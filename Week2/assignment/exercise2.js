const getConnection = require("./connectDatabase");
async function createTableAndInsertData() {
  const connection = await getConnection();
  try {
    console.log("Connected to MySQL server");

    const createResearchPapersTable = `
    CREATE TABLE IF NOT EXISTS research_Papers (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title TEXT NOT NULL,
        conference VARCHAR(255),
        publish_date DATE,
        author_id INT,
        FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE);
    `;
    await connection.query(createResearchPapersTable);
    console.log("Research papers table created successfully");

    const inserAuthors = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES
     ('Author 1', 'University 1', '1970-01-01', 25, 'm'),
      ('Author 2', 'University 2', '1975-05-15', 18, 'f'),
      ('Author 3', 'University 3', '1980-10-20', 30, 'm'),
      ('Author 4', 'University 4', '1985-03-12', 22, 'f'),
      ('Author 5', 'University 5', '1990-08-30', 20, 'm'),
      ('Author 6', 'University 1', '1973-02-02', 28, 'f'),
      ('Author 7', 'University 2', '1978-07-07', 26, 'm'),
      ('Author 8', 'University 3', '1983-12-18', 32, 'f'),
      ('Author 9', 'University 4', '1989-06-25', 24, 'm'),
      ('Author 10', 'University 5', '1992-09-09', 19, 'f'),
      ('Author 11', 'University 1', '1976-11-11', 29, 'm'),
      ('Author 12', 'University 2', '1981-04-04', 23, 'f'),
      ('Author 13', 'University 3', '1986-01-01', 27, 'm'),
      ('Author 14', 'University 4', '1991-07-23', 21, 'f'),
      ('Author 15', 'University 5', '1995-05-05', 17, 'm');
    `;

    await connection.query(inserAuthors);
    console.log("Inserted authors successfully.");

    const insertResearchPapers = `
    INSERT INTO research_Papers (paper_title, conference, publish_date, author_id) VALUES
    ('Paper 1', 'Conference A', '2022-01-01', 1),
    ('Paper 2', 'Conference B', '2022-02-01', 2),
    ('Paper 3', 'Conference A', '2022-03-01', 3),
    ('Paper 4', 'Conference C', '2022-04-01', 4),
    ('Paper 5', 'Conference A', '2022-05-01', 5),
    ('Paper 6', 'Conference B', '2022-06-01', 6),
    ('Paper 7', 'Conference C', '2022-07-01', 7),
    ('Paper 8', 'Conference A', '2022-08-01', 8),
    ('Paper 9', 'Conference B', '2022-09-01', 9),
    ('Paper 10', 'Conference C', '2022-10-01', 10),
    ('Paper 11', 'Conference A', '2022-11-01', 11),
    ('Paper 12', 'Conference B', '2022-12-01', 12),
    ('Paper 13', 'Conference A', '2023-01-01', 13),
    ('Paper 14', 'Conference C', '2023-02-01', 14),
    ('Paper 15', 'Conference A', '2023-03-01', 15),
    ('Paper 16', 'Conference B', '2023-04-01', 1),
    ('Paper 17', 'Conference C', '2023-05-01', 2),
    ('Paper 18', 'Conference A', '2023-06-01', 3),
    ('Paper 19', 'Conference B', '2023-07-01', 4),
    ('Paper 20', 'Conference C', '2023-08-01', 5),
    ('Paper 21', 'Conference A', '2023-09-01', 6),
    ('Paper 22', 'Conference B', '2023-10-01', 7),
    ('Paper 23', 'Conference C', '2023-11-01', 8),
    ('Paper 24', 'Conference A', '2023-12-01', 9),
    ('Paper 25', 'Conference B', '2024-01-01', 10),
    ('Paper 26', 'Conference C', '2024-02-01', 11),
    ('Paper 27', 'Conference A', '2024-03-01', 12),
    ('Paper 28', 'Conference B', '2024-04-01', 13),
    ('Paper 29', 'Conference C', '2024-05-01', 14),
    ('Paper 30', 'Conference A', '2024-06-01', 15);
  `;

    await connection.query(insertResearchPapers);
    console.log("Inserted research papers successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

createTableAndInsertData();
