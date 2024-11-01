import connection from './dbconnection.js';

const runQuery = (query, description) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log(`Error executing ${description}:`, err);
        reject(err);
      } else {
        console.log(`${description} executed successfully`, result);
        resolve(result);
      }
    });
  });
};
// insert data into authors table
const insertData = async () => {
  try {
    const insertAuthorsQuery = `
  INSERT INTO authors (author_name, university, date_of_birth, h_index,gender,mentor) 
  VALUES
  ('John Doe', 'Harvard University', '1990-01-01', 10, 'm', NULL),
  ('Jane Doe', 'MIT', '1992-01-01', 12, 'f', 1),
  ('Alice', 'Oxford University', '1991-01-01', 11, 'f', 1),
  ('Bob', 'Stanford University', '1993-01-01', 13, 'm', 2),
  ('Charlie', 'Cambridge University', '1994-01-01', 14, 'm', 2),
  ('David', 'ETH Zurich', '1995-01-01', 15, 'm', 3),
  ('Eve', 'University of Copenhagen', '1996-01-01', 16, 'f', 3),
  ('Frank', 'University of Amsterdam', '1997-01-01', 17, 'm', 4),
  ('Grace', 'University of Helsinki', '1998-01-01', 18, 'f', 4),
  ('Heidi', 'University of Oslo', '1999-01-01', 19, 'f', 5),
  ('Ivan', 'University of Stockholm', '2000-01-01', 20, 'm', 5),
  ('Julia', 'University of Berlin', '2001-01-01', 21, 'f', 6),
  ('Kevin', 'University of Paris', '2002-01-01', 22, 'm', 6),
  ('Linda', 'University of Madrid', '2003-01-01', 23, 'f', 7),
  ('Michael', 'University of Rome', '2004-01-01', 24, 'm', 7)
  ;`;
    await runQuery(insertAuthorsQuery, 'inserting data into authors table');

    // insert data into research_paper table

    const insertResearchPaperQuery = `
  INSERT INTO research_paper (paper_title, conference, published_date, authors_id)
  VALUES
        ('Quantum Computing', 'QuantumCon', '2023-11-10', 2),
        ('Blockchain Technology', 'TechSummit', '2023-09-22', 3),
        ('Machine Learning Trends', 'MLConf', '2023-06-12', 4),
        ('Big Data Analytics', 'BigDataWorld', '2024-02-01', 5),
        ('Neural Networks', 'DeepTech', '2024-04-18', 6),
        ('Robotics in Healthcare', 'HealthTech', '2024-01-25', 7),
        ('Data Science Applications', 'DataSciSummit', '2023-10-05', 8),
        ('Autonomous Vehicles', 'AutoTech', '2023-12-08', 9),
        ('Natural Language Processing', 'LangTech', '2024-05-02', 10),
        ('Quantum Cryptography', 'QuantumSec', '2023-07-19', 11),
        ('Artificial General Intelligence', 'AGIConf', '2024-03-01', 12),
        ('Wearable Technology', 'WearableWorld', '2023-11-23', 13),
        ('Cloud Computing Advances', 'CloudExpo', '2023-09-30', 14),
        ('Cybersecurity Challenges', 'CyberSummit', '2024-02-20', 15),
        ('IoT in Smart Homes', 'SmartHomeExpo', '2023-12-05', 1),
        ('Augmented Reality', 'ARConf', '2023-10-22', 2),
        ('3D Printing in Medicine', 'MedTech', '2024-01-15', 3),
        ('Biotechnology Revolution', 'BioConf', '2023-09-12', 4),
        ('Sustainable Energy', 'EnergySummit', '2023-11-07', 5),
        ('AI and Ethics', 'EthicsAI', '2024-02-12', 6),
        ('Quantum Physics Breakthroughs', 'QuantumWorld', '2024-03-25', 7),
        ('Genomics in Healthcare', 'GenomicsConf', '2023-07-14', 8),
        ('Automation in Industry', 'Industry4.0', '2023-12-12', 9),
        ('Cloud Security', 'CloudSec', '2024-05-10', 10),
        ('Space Exploration Technologies', 'SpaceTech', '2024-04-05', 11),
        ('Smart Cities', 'SmartCityExpo', '2024-01-05', 12),
        ('Blockchain in Finance', 'FinTech', '2023-09-20', 13),
        ('Nanotechnology Advances', 'NanoWorld', '2023-11-18', 14),
        ('Edge Computing', 'EdgeConf', '2024-03-12', 15),
        ('Quantum Machine Learning', 'QuantumML', '2023-10-30', 1);
    `;
    await runQuery(
      insertResearchPaperQuery,
      'inserting data into research_paper table',
    );
  } catch (err) {
    console.log('Error occurred while inserting data:', err);
  } finally {
    connection.end();
  }
};

insertData();
