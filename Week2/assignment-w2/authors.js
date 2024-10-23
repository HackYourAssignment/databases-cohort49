import connection from './dbconnection.js';

// connection to the database
connection.connect((err) => {
  if (err) {
    console.log('error connecting the database:', err);
    return;
  }
  console.log('connected to the database');

  const createTableQuery = `
CREATE TABLE IF NOT EXISTS authors(
   authors_id INT AUTO_INCREMENT PRIMARY KEY,
   author_name VARCHAR(100) NOT NULL, 
   university TEXT NOT NULL, 
   date_of_birth DATE NOT NULL, 
   h_index INT NOT NULL, 
   gender ENUM('m','f'))`;

  const addMentorColumnQuery = `
ALTER TABLE authors
ADD COLUMN mentor INT;`;

  const addForeignKeyQuery = `
ALTER TABLE authors
ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(authors_id) ON DELETE SET NULL;`;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.log('Error creating the table:', err);
      return;
    }
    console.log('Table created successfully', result);

    connection.query(addMentorColumnQuery, (err, result) => {
      if (err) {
        console.log('Error adding mentor column:', err);
        return;
      }
      console.log('mentor column added successfully', result);
      connection.query(addForeignKeyQuery, (err, result) => {
        if (err) {
          console.log('Error adding foreign key:', err);
          return;
        }
        console.log('foreign key added successfully', result);
        connection.end();
      });
    });
  });
});
