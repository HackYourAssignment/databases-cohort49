const mysql = require('mysql2');

// Create a connection to MySQL
const connection = mysql.createConnection({
  host: 'localhost',     // Replace with your MySQL server host
  user: 'hyfuser',       // Replace with your MySQL username
  password: 'password',  // Replace with your MySQL password
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  // Create the meetup database
  connection.query('DROP DATABASE IF EXISTS meetup', (err, result) => {
    if (err) throw err;
    console.log('Database dropped');

    connection.query('CREATE DATABASE meetup', (err, result) => {
      if (err) throw err;
      console.log('Database created');

      // Use the newly created database
      connection.query('USE meetup', (err, result) => {
        if (err) throw err;

        // Create Invitee table
        const createInviteeTable = `
          CREATE TABLE Invitee (
            invitee_no INT AUTO_INCREMENT PRIMARY KEY,
            invitee_name VARCHAR(255),
            invited_by VARCHAR(255)
          )`;
        connection.query(createInviteeTable, (err, result) => {
          if (err) throw err;
          console.log('Invitee table created');

          // Insert rows into Invitee table
          const insertInvitee = `
            INSERT INTO Invitee (invitee_name, invited_by)
            VALUES 
              ('Alice', 'John'),
              ('Bob', 'Anna'),
              ('Charlie', 'Mike'),
              ('David', 'Sarah'),
              ('Eve', 'Paul')`;
          connection.query(insertInvitee, (err, result) => {
            if (err) throw err;
            console.log('Rows inserted into Invitee');
          });
        });

        // Create Room table
        const createRoomTable = `
          CREATE TABLE Room (
            room_no INT AUTO_INCREMENT PRIMARY KEY,
            room_name VARCHAR(255),
            floor_number INT
          )`;
        connection.query(createRoomTable, (err, result) => {
          if (err) throw err;
          console.log('Room table created');

          // Insert rows into Room table
          const insertRoom = `
            INSERT INTO Room (room_name, floor_number)
            VALUES 
              ('Conference Room', 1),
              ('Meeting Room', 2),
              ('Board Room', 3),
              ('Training Room', 4),
              ('Event Hall', 5)`;
          connection.query(insertRoom, (err, result) => {
            if (err) throw err;
            console.log('Rows inserted into Room');
          });
        });

        // Create Meeting table
        const createMeetingTable = `
          CREATE TABLE Meeting (
            meeting_no INT AUTO_INCREMENT PRIMARY KEY,
            meeting_title VARCHAR(255),
            starting_time DATETIME,
            ending_time DATETIME,
            room_no INT,
            FOREIGN KEY (room_no) REFERENCES Room(room_no)
          )`;
        connection.query(createMeetingTable, (err, result) => {
          if (err) throw err;
          console.log('Meeting table created');

          // Insert rows into Meeting table
          const insertMeeting = `
            INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
            VALUES 
              ('Team Meeting', '2024-10-15 09:00:00', '2024-10-15 10:00:00', 1),
              ('Project Kickoff', '2024-10-16 11:00:00', '2024-10-16 12:00:00', 2),
              ('Client Call', '2024-10-17 13:00:00', '2024-10-17 14:00:00', 3),
              ('Weekly Review', '2024-10-18 15:00:00', '2024-10-18 16:00:00', 4),
              ('Annual Meeting', '2024-10-19 17:00:00', '2024-10-19 18:00:00', 5)`;
          connection.query(insertMeeting, (err, result) => {
            if (err) throw err;
            console.log('Rows inserted into Meeting');
            connection.end();  // Close the connection after all operations
          });
        });
      });
    });
  });
});

