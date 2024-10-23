import db from '../db.js'; 

const createTablesAndInsertData = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(200),
      conference VARCHAR(100),
      publish_date DATE,
      author_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
    );
  `;

  const insertAuthors = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES 
      ('Alice Johnson', 'University of Oxford', '1978-02-15', 30, 'Female', NULL),
      ('Bob Smith', 'MIT', '1980-07-21', 40, 'Male', 1),
      ('Clara Adams', 'Stanford University', '1985-09-13', 25, 'Female', 1),
      ('David Clark', 'Harvard University', '1990-11-10', 15, 'Male', 2),
      ('Eva Stone', 'Cambridge University', '1975-03-25', 50, 'Female', NULL),
      ('Frank White', 'University of Tokyo', '1988-05-16', 20, 'Male', 4),
      ('Grace Lee', 'ETH Zurich', '1992-08-04', 18, 'Female', 5),
      ('Henry Baker', 'University of California, Berkeley', '1981-12-01', 35, 'Male', 3),
      ('Ivy Cooper', 'National University of Singapore', '1993-06-11', 12, 'Female', 8),
      ('Jack Wilson', 'University of Toronto', '1976-09-09', 45, 'Male', NULL),
      ('Kelly Brown', 'Imperial College London', '1984-04-20', 22, 'Female', 10),
      ('Liam Green', 'University of Melbourne', '1991-07-23', 16, 'Male', 7),
      ('Maria Gonzalez', 'Universidad Nacional Autónoma de México', '1982-10-12', 30, 'Female', 9),
      ('Nina Patel', 'Indian Institute of Science', '1995-03-30', 10, 'Female', 11),
      ('Oscar Turner', 'University of Cape Town', '1987-11-05', 28, 'Male', 6);
  `;

  const insertPapers = `
    INSERT INTO research_Papers (paper_title, conference, publish_date, author_id)
    VALUES 
      ('Quantum Computing Breakthrough', 'QCon 2022', '2022-02-01', 1),
      ('AI and Ethics', 'AI Symposium 2021', '2021-03-15', 2),
      ('New Algorithms in Machine Learning', 'MLConf 2020', '2020-04-25', 3),
      ('Advances in Cryptography', 'CryptoCon 2019', '2019-05-20', 4),
      ('Data Privacy in the 21st Century', 'PrivacyCon 2018', '2018-06-10', 5),
      ('Nanotechnology in Medicine', 'NanoMed 2021', '2021-07-18', 6),
      ('Climate Change Solutions', 'GreenTech 2020', '2020-08-30', 7),
      ('Blockchain Applications', 'BlockchainConf 2022', '2022-09-12', 8),
      ('Cybersecurity Threats', 'CyberCon 2020', '2020-10-03', 9),
      ('Genomics and Personalized Medicine', 'BioTech 2019', '2019-11-22', 10),
      ('Robotics in Surgery', 'MedTech 2021', '2021-12-01', 11),
      ('Space Exploration Advances', 'SpaceCon 2022', '2022-01-14', 12),
      ('Artificial Intelligence in Healthcare', 'AIHealth 2019', '2019-02-16', 13),
      ('Autonomous Vehicles', 'AutoTech 2020', '2020-03-27', 14),
      ('Sustainable Energy Innovations', 'EnergyConf 2021', '2021-04-14', 15),
      ('Deep Learning in Natural Language Processing', 'NLPConf 2019', '2019-05-10', 1),
      ('Human-Computer Interaction Advances', 'HCIConf 2020', '2020-06-08', 2),
      ('5G Networks and Beyond', 'TelecomConf 2021', '2021-07-20', 3),
      ('Virtual Reality in Education', 'VRCon 2022', '2022-08-31', 4),
      ('Quantum Cryptography', 'QuantumCon 2021', '2021-09-25', 5),
      ('Machine Learning in Finance', 'FinTech 2020', '2020-10-19', 6),
      ('Innovations in Biotechnology', 'BioTech 2021', '2021-11-28', 7),
      ('Advanced Robotics', 'RoboCon 2020', '2020-12-02', 8),
      ('Neuroscience and AI', 'NeuroTech 2022', '2022-01-15', 9),
      ('Artificial Intelligence in Industry 4.0', 'AIConf 2019', '2019-02-26', 10),
      ('Green Technology for the Future', 'EcoTech 2020', '2020-03-11', 11),
      ('Quantum Machine Learning', 'QMLCon 2021', '2021-04-17', 12),
      ('Autonomous Drones', 'DroneCon 2022', '2022-05-24', 13),
      ('Sustainable Agriculture', 'AgriTech 2020', '2020-06-15', 14),
      ('AI in Smart Cities', 'SmartCityConf 2021', '2021-07-07', 15);
  `;

  try {
    await db.query(createTableQuery);
    console.log('Research Papers table created.');

    await db.query(insertAuthors);
    console.log('15 Authors inserted.');

    await db.query(insertPapers);
    console.log('30 Research papers inserted.');
  } catch (error) {
    console.error('Error creating tables or inserting data:', error);
  }
};

createTablesAndInsertData();