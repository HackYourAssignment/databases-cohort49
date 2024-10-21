const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");
});

const createTablesAndInsertData = `
DROP TABLE IF EXISTS Meeting;
DROP TABLE IF EXISTS Room;
DROP TABLE IF EXISTS Invitee;

 CREATE TABLE Invitee (
    invitee_no INT PRIMARY KEY,
    invitee_name VARCHAR(255) NOT NULL,
    invited_by VARCHAR(255)
    );
  CREATE TABLE Room (
    room_no INT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    floor_number INT NOT NULL
    );

  CREATE TABLE Meeting (
    meeting_no INT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time TIMESTAMP NOT NULL,
    ending_time TIMESTAMP NOT NULL,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
    );

  INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES
    (1, 'John Doe', 'Jane Smith'),
    (2, 'Jane Smith', 'John Doe'),
    (3, 'Emily Johnson', 'Michael Doe'),
    (4, 'Michael Johnson', 'Emily Johnson'),
    (5, 'Sarah Connor', 'John Doe');

  INSERT INTO Room (room_no, room_name, floor_number) VALUES
   (1, 'Conference Room 1', 1),
    (2, 'Conference Room 2', 2),
    (3, 'Board Room', 3),
    (4, 'Training Room', 4),
    (5, 'Event Hall', 5);

  INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES
    (1, 'Tech Talk', '2024-10-14 10:00:00', '2024-10-14 12:00:00', 1),
    (2, 'Budget Meeting', '2024-10-15 09:00:00', '2024-10-15 11:00:00', 2),
    (3, 'Team Building', '2024-10-16 14:00:00', '2024-10-16 16:00:00', 3),
    (4, 'Project Kickoff', '2024-10-17 13:00:00', '2024-10-17 15:00:00', 4),
    (5, 'Sales Review', '2024-10-18 10:00:00', '2024-10-18 12:00:00', 5);`;

connection.query(createTablesAndInsertData, (err) => {
  if (err) throw err;
  console.log("Tables and data inserted successfully");
  connection.end();
});
