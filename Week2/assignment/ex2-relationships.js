import connection from "./connection.js";

const main = async () => {
  try {
    const useDb = `USE assignment2;`;

    // Create another table, called research_Papers with the following fields: (paper_id, paper_title, conference, publish_date, ...)
    const createTableResearchPapers = `
    CREATE TABLE research_Papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(100),
      conference VARCHAR(100),
      publish_date DATETIME
    )`;

    // What is the relationship between Authors and Research papers ? Make necessary changes to authors and research_Papers tables and add more tables if necessary.
    const createTableAuthorsResearchPapers = `
    CREATE TABLE authors_research_Papers (
      author_id INT, 
      paper_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id) ON DELETE CASCADE ON UPDATE CASCADE,
      PRIMARY KEY (author_id, paper_id)
    )`;

    // Read exercises 3 and 4 and then add information (insert rows) of 15 authors and 30 research papers such that all queries in the exercises 3 and 4 will return some answers
    const insertAuthors = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES 
      ('John Doe', 'Institute of Knowledge', '1980-07-15 00:00:00', 10, 'Male'),
      ('Jane Doe', 'National University', '1985-01-22 00:00:00', 15, 'Female'),
      ('Alex Smith', 'Innovative Institute', '1978-03-10 00:00:00', 8, 'Male'),
      ('Emily White', 'Institute of Ideas', '1990-11-05 00:00:00', 12, 'Female'),
      ('Michael Johnson', 'National University', '1983-08-13 00:00:00', 20, 'Male'),
      ('Sarah Brown', 'Global Institute', '1975-06-30 00:00:00', 25, 'Female'),
      ('Chris Black', 'Institute of Ideas', '1988-12-19 00:00:00', 18, 'Male'),
      ('Anna Green', 'Innovative Institute', '1992-04-04 00:00:00', 7, 'Female'),
      ('David Lee', 'Institute of Knowledge', '1977-09-28 00:00:00', 30, 'Male'),
      ('Sophia Clark', 'Innovative Institute', '1982-02-15 00:00:00', 22, 'Female'),
      ('Daniel King', 'Innovative Institute', '1979-07-07 00:00:00', 13, 'Male'),
      ('Olivia Hall', 'Institute of Ideas', '1991-10-25 00:00:00', 17, 'Female'),
      ('James Wright', 'Institute of Knowledge', '1984-05-18 00:00:00', 9, 'Male'),
      ('Lucy Scott', 'Institute of Ideas', '1987-03-03 00:00:00', 21, 'Female'),
      ('Robert Young', 'Global Institute', '1980-11-11 00:00:00', 14, 'Male');
    `;

    const insertMentors = `
      UPDATE authors SET mentor = 2 WHERE author_id = 1;
      UPDATE authors SET mentor = 4 WHERE author_id = 2;
      UPDATE authors SET mentor = 7 WHERE author_id = 3;
      UPDATE authors SET mentor = 1 WHERE author_id = 4;
      UPDATE authors SET mentor = 3 WHERE author_id = 5;
      UPDATE authors SET mentor = 5 WHERE author_id = 6;
      UPDATE authors SET mentor = 9 WHERE author_id = 7;
      UPDATE authors SET mentor = 10 WHERE author_id = 8;
      UPDATE authors SET mentor = 8 WHERE author_id = 9;
      UPDATE authors SET mentor = 13 WHERE author_id = 10;
      UPDATE authors SET mentor = 12 WHERE author_id = 11;
      UPDATE authors SET mentor = 15 WHERE author_id = 12;
      UPDATE authors SET mentor = 9 WHERE author_id = 13;
      UPDATE authors SET mentor = 6 WHERE author_id = 14;
      UPDATE authors SET mentor = 7 WHERE author_id = 15;
    `;

    const insertResearchPapers = `
    INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES
      ('Advances in Machine Learning', 'AI Summit', '2021-05-10'),
      ('Quantum Computing: The Next Frontier', 'TechCon 2022', '2022-08-15'),
      ('Deep Learning for Healthcare', 'MedTech Conference', '2020-10-22'),
      ('Blockchain in Finance', 'FinTech Expo', '2019-09-13'),
      ('Cybersecurity in the Modern World', 'CyberSec Global', '2023-01-12'),
      ('Data Privacy in a Connected Age', 'InfoSec Symposium', '2021-11-07'),
      ('Augmented Reality in Education', 'EdTech Conference', '2022-02-18'),
      ('The Future of 5G Networks', 'Mobile World Congress', '2020-06-25'),
      ('Artificial Intelligence Ethics', 'AI & Society Forum', '2021-03-30'),
      ('Cloud Computing and Its Applications', 'Cloud Expo', '2020-09-14'),
      ('Advances in Robotics', 'RoboTech Summit', '2023-04-01'),
      ('Internet of Things in Smart Cities', 'Smart City Expo', '2019-10-11'),
      ('Big Data Analytics in Business', 'DataCon Global', '2020-07-19'),
      ('Autonomous Vehicles: Challenges Ahead', 'AutoTech Summit', '2022-12-09'),
      ('Sustainable Energy Solutions', 'GreenTech Forum', '2021-04-20'),
      ('Nanotechnology in Medicine', 'NanoMed Conference', '2023-06-14'),
      ('Biometric Security Solutions', 'SecureTech Expo', '2020-01-28'),
      ('Wearable Technology in Healthcare', 'HealthTech Symposium', '2022-03-17'),
      ('Virtual Reality in Gaming', 'GameTech 2022', '2021-10-05'),
      ('Advances in Renewable Energy', 'EnergyCon 2023', '2023-07-22'),
      ('Smart Homes and IoT', 'Connected World Expo', '2019-11-30'),
      ('Artificial Intelligence in Agriculture', 'AgriTech Conference', '2021-12-15'),
      ('Edge Computing for the Future', 'TechForward 2022', '2022-05-21'),
      ('Human-Computer Interaction', 'HCI Conference', '2020-08-10'),
      ('Quantum Cryptography: A New Era', 'CryptoCon 2021', '2021-06-02'),
      ('Smart Grids for a Sustainable Future', 'EnergyTech Expo', '2023-09-10'),
      ('Ethics in Data Science', 'Data Ethics Forum', '2022-11-18'),
      ('Bioinformatics and Genomics', 'BioCon 2020', '2020-02-12'),
      ('Neural Networks in Finance', 'AI in Finance Symposium', '2021-09-09'),
      ('Autonomous Drones for Delivery', 'TechWings Conference', '2022-07-14'),
      ('The Future of Space Exploration', 'SpaceTech Summit', '2023-05-30');
    `;

    const insertAuthorsResearchPapers = `
    INSERT INTO authors_research_Papers (author_id, paper_id) VALUES
      (1, 10),
      (2, 10),
      (3, 1),
      (4, 2),
      (5, 3),
      (6, 4),
      (7, 5),
      (8, 6),
      (9, 7),
      (10, 8),
      (11, 9),
      (12, 10),
      (13, 11),
      (14, 12),
      (15, 13),
      (1, 14),
      (2, 15),
      (3, 16),
      (4, 17),
      (5, 18),
      (6, 19),
      (7, 20),
      (8, 21),
      (9, 22),
      (10, 23),
      (11, 24),
      (12, 25),
      (13, 26),
      (14, 27),
      (15, 28),
      (1, 29),
      (2, 30);
    `;

    // create tables
    await connection.query(useDb);
    await connection.query(createTableResearchPapers);
    console.log("table research_Papers created");

    await connection.query(createTableAuthorsResearchPapers);
    console.log("table authors_research_Papers created");

    // insert data
    await connection.query(insertAuthors);
    await connection.query(insertMentors);
    await connection.query(insertResearchPapers);
    await connection.query(insertAuthorsResearchPapers);
    console.log("data inserted");
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};

main();
