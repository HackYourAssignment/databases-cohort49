const mysql = require("mysql2/promise");

async function insertData() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
  });

  const insertAuthorsQuery = `
        INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES
        ('Alice Smith', 'Harvard', '1975-06-15', 25, 'Female'),
        ('Bob Johnson', 'MIT', '1980-11-25', 30, 'Male'),
        ('Clara Davis', 'Stanford', '1985-04-10', 20, 'Female'),
        ('David Moore', 'Oxford', '1978-09-12', 15, 'Male'),
        ('Eva Taylor', 'Cambridge', '1990-01-05', 18, 'Female'),
        ('Frank Harris', 'Princeton', '1983-02-14', 22, 'Male'),
        ('Grace Evans', 'Yale', '1986-09-25', 17, 'Female'),
        ('Hannah White', 'Columbia', '1992-03-12', 23, 'Female'),
        ('Ian Turner', 'Harvard', '1985-11-02', 26, 'Male'),
        ('Jack Green', 'MIT', '1979-07-17', 19, 'Male'),
        ('Kara Black', 'Stanford', '1993-01-21', 21, 'Female'),
        ('Liam Scott', 'Oxford', '1981-05-30', 27, 'Male'),
        ('Mia Walker', 'Cambridge', '1990-10-13', 20, 'Female'),
        ('Noah Lee', 'Princeton', '1987-08-24', 24, 'Male'),
        ('Olivia Adams', 'Yale', '1982-04-15', 16, 'Female');
    `;
  await connection.execute(insertAuthorsQuery);

  const insertPapersQuery = `
        INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
        ('Deep Learning in Practice', 'ICML', '2022-07-15'),
        ('Quantum Computing Advances', 'QCC', '2021-11-10'),
        ('Blockchain and Security', 'CryptoCon', '2023-02-20'),
        ('AI for Healthcare', 'AI Health', '2020-10-05'),
        ('Sustainable Energy Systems', 'GreenTech', '2019-05-15'),
        ('Neural Networks Explained', 'NeuroCon', '2021-03-18'),
        ('Big Data and Privacy', 'BigDataCon', '2022-12-01'),
        ('Machine Learning in Finance', 'FinTechCon', '2020-09-20'),
        ('Genomics and AI', 'BioCon', '2021-06-25'),
        ('Ethics in AI', 'EthicsConf', '2022-04-10'),
        ('Autonomous Vehicles', 'AutoCon', '2023-01-30'),
        ('Smart Cities and IoT', 'IoTCon', '2020-07-12'),
        ('Cybersecurity in the Modern World', 'CyberCon', '2021-08-15'),
        ('Quantum Algorithms', 'QCC', '2022-05-22'),
        ('AI in Medicine', 'MedTech', '2020-11-14'),
        ('Sustainable Architecture', 'GreenTech', '2019-09-28'),
        ('Robotics and Automation', 'RoboCon', '2023-03-10'),
        ('Natural Language Processing', 'NLPCon', '2021-02-05'),
        ('AI and Climate Change', 'EcoCon', '2020-06-16'),
        ('Data Science in Healthcare', 'HealthCon', '2022-08-09'),
        ('Blockchain for Security', 'CryptoCon', '2021-12-13'),
        ('AI for Education', 'EduCon', '2023-04-25'),
        ('Quantum Cryptography', 'QCC', '2020-11-30'),
        ('AI and Ethics in Law', 'LawCon', '2021-01-11'),
        ('Autonomous Drones', 'RoboCon', '2022-03-29'),
        ('Smart Homes and AI', 'SmartHomeCon', '2020-10-10'),
        ('AI for Mental Health', 'MedCon', '2023-07-19'),
        ('Predictive Analytics', 'DataCon', '2021-09-21'),
        ('Artificial Intelligence for Good', 'AI4Good', '2022-11-05'),
        ('AI and Robotics', 'RoboCon', '2021-04-02');
    `;
  await connection.execute(insertPapersQuery);

  const insertAuthorPaperQuery = `
        INSERT INTO author_paper (author_id, paper_id) VALUES
        (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), 
        (4, 7), (4, 8), (5, 9), (5, 10), (6, 11), (6, 12), 
        (7, 13), (7, 14), (8, 15), (8, 16), (9, 17), (9, 18), 
        (10, 19), (10, 20), (11, 21), (11, 22), (12, 23), (12, 24), 
        (13, 25), (13, 26), (14, 27), (14, 28), (15, 29), (15, 30);
    `;
  await connection.execute(insertAuthorPaperQuery);

  console.log(
    "Data inserted into authors, research_papers, and author_paper tables"
  );
  await connection.end();
}

insertData().catch((err) => console.error(err));
