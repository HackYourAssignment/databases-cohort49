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
    `CREATE TABLE Invitee (invitee_no INT PRIMARY KEY, invitee_name VARCHAR(255), invited_by INT);`,
    'Creating Invitee table',
  );

  // creating room table
  query(
    `CREATE TABLE Room (room_no INT PRIMARY KEY, room_name VARCHAR(255), floor_no INT);`,
    'Creating Room table',
  );
  // create meeting table
  query(
    `CREATE TABLE Meeting (meeting_no INT PRIMARY KEY, meeting_title VARCHAR(255), start_time DATETIME, end_time DATETIME, room_no INT);`,
    'Creating Meeting table',
  );

  // inserting data into Invitee table
  query(
    `INSERT INTO Invitee 
    VALUES (1,'John Doe', 5), 
    (2,'Jane Doe', 1),
    (3,'James Smith', 2),
    (4,'Anne Smith', 3),
    (5,'David Johnson', 4);`,
    'Inserting data into Invitee table',
  );
  // inserting data into Room table
  query(
    `INSERT INTO Room  
    VALUES (1,'brown', 1), 
    (2,'yellow', 2),
    (3,'green', 3),
    (4,'Red', 4),
    (5,'white', 5);`,
    'Inserting data into Room table',
  );
  // inserting data into Meeting table
  query(
    `INSERT INTO Meeting  
    VALUES (1,'Meeting1', '2021-08-01 09:00:00', '2021-08-01 10:00:00', 1), 
    (2,'Meeting2', '2021-08-01 10:00:00', '2021-08-01 11:00:00', 2),
    (3,'Meeting3', '2021-08-01 11:00:00', '2021-08-01 12:00:00', 3),
    (4,'Meeting4', '2021-08-01 12:00:00', '2021-08-01 13:00:00', 4),
    (5,'Meeting5', '2021-08-01 13:00:00', '2021-08-01 14:00:00', 5);`,
    'Inserting data into Meeting table',
  );

  // closing connection
  connection.end((error) => {
    if (error) throw error;
    console.log('connection closed');
  });
});
