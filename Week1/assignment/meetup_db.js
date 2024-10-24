import mysql from 'mysql';
import { connectionData } from './connection.js';

const connection = mysql.createConnection(connectionData);

const query = (command, msg) => {
  connection.query(command, (error, results) => {
    if (error) {
      console.error(`Error in: ${msg}`, error);
      return;
    }
    console.log(`Results from: ${msg}`, results);
  });
};

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to the database.');
  // dropping and creating the database
  query('DROP DATABASE IF EXISTS meetup_db', 'Dropping database');
  query('CREATE DATABASE meetup_db', 'Creating database');
  query('USE meetup_db', 'Using database');

  // create Invitee table
  query(
    `CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY , invitee_name VARCHAR(255), invited_by INT);`,
    'Creating Invitee table',
  );

  // creating room table
  query(
    `CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255) NOT NULL, floor_no INT);`,
    'Creating Room table',
  );
  // create meeting table
  query(
    `CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), start_time DATETIME, end_time DATETIME, room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no) ON DELETE CASCADE);`,
    'Creating Meeting table',
  );

  // inserting data into Invitee table
  query(
    `INSERT INTO Invitee (invitee_name, invited_by)
    VALUES ('John Doe', 5), 
    ('Jane Doe', 1),
    ('James Smith', 2),
    ('Anne Smith', 3),
    ('David Johnson', 4);`,
    'Inserting data into Invitee table',
  );
  // inserting data into Room table
  query(
    `INSERT INTO Room (room_name, floor_no) 
    VALUES ('brown', 1), 
    ('yellow', 2),
    ('green', 3),
    ('Red', 4),
    ('white', 5);`,
    'Inserting data into Room table',
  );
  // inserting data into Meeting table
  query(
    `INSERT INTO Meeting (meeting_title, start_time, end_time, room_no) 
    VALUES ('Meeting1', '2021-08-01 09:00:00', '2021-08-01 10:00:00', 1), 
    ('Meeting2', '2021-08-01 10:00:00', '2021-08-01 11:00:00', 2),
    ('Meeting3', '2021-08-01 11:00:00', '2021-08-01 12:00:00', 3),
    ('Meeting4', '2021-08-01 12:00:00', '2021-08-01 13:00:00', 4),
    ('Meeting5', '2021-08-01 13:00:00', '2021-08-01 14:00:00', 5);`,
    'Inserting data into Meeting table',
  );

  // closing connection
  connection.end((error) => {
    if (error) throw error;
    console.log('connection closed');
  });
});
