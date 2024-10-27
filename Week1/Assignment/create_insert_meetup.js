const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password',
});

connection.connect(async (err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  try {
    // Drop and create database
    await connection.promise().query('DROP DATABASE IF EXISTS meetup');
    console.log('Database dropped');

    await connection.promise().query('CREATE DATABASE meetup');
    console.log('Database created');

    await connection.promise().query('USE meetup');

    // Create Invitee table
    const createInviteeTable = `
      CREATE TABLE Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by VARCHAR(255)
      )`;
    await connection.promise().query(createInviteeTable);
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
    await connection.promise().query(insertInvitee);
    console.log('Rows inserted into Invitee');

    // Create Room table
    const createRoomTable = `
      CREATE TABLE Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255),
        floor_number INT
      )`;
    await connection.promise().query(createRoomTable);
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
    await connection.promise().query(insertRoom);
    console.log('Rows inserted into Room');

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
    await connection.promise().query(createMeetingTable);
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
    await connection.promise().query(insertMeeting);
    console.log('Rows inserted into Meeting');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    connection.end();
    console.log('Database connection closed');
  }
});
