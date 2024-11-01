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
// connection to the database
const setupDatabase = async () => {
  try {
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.log('error connecting the database:', err);
          reject(err);
        } else {
          console.log('connected to the database');
          resolve();
        }
      });
    });

    const createTableQuery = `
CREATE TABLE IF NOT EXISTS authors(
   authors_id INT AUTO_INCREMENT PRIMARY KEY,
   author_name VARCHAR(100) NOT NULL, 
   university TEXT NOT NULL, 
   date_of_birth DATE NOT NULL, 
   h_index INT NOT NULL, 
   gender ENUM('m','f')
   );`;

    const addMentorColumnQuery = `
ALTER TABLE authors
ADD COLUMN mentor INT;`;

    const addForeignKeyQuery = `
ALTER TABLE authors
ADD CONSTRAINT fk_mentor 
FOREIGN KEY (mentor) REFERENCES authors(authors_id) ON DELETE SET NULL;`;
    await runQuery(createTableQuery, 'creating the table');
    await runQuery(addMentorColumnQuery, 'adding mentor column');
    await runQuery(addForeignKeyQuery, 'adding foreign key');
  } catch (err) {
    console.log('Error occurred while setting up the database:', err);
  } finally {
    connection.end();
  }
};

setupDatabase();
