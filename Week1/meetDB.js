import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Step 1: Create a connection to the MySQL server using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Step 2: Create the 'meetup' database if it doesn't exist
connection.query(
  "CREATE DATABASE IF NOT EXISTS ??",
  [process.env.DB_NAME],
  function (error, results) {
    if (error) throw error;
    console.log("Database 'meetup' created or already exists:", results);
  }
);

// Step 3: Switch to the 'meetup' database
connection.query("USE ??", [process.env.DB_NAME], function (error, results) {
  if (error) throw error;
  console.log("Using 'meetup' database:", results);
});

// Step 4: Connect to the database
connection.connect();

// Step 5: Create the 'Room' table if it doesn't exist
const createRoomQuery = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT PRIMARY KEY AUTO_INCREMENT, 
    room_name VARCHAR(50) NOT NULL, 
    floor_number INT NOT NULL
  )`;

connection.query(createRoomQuery, function (error, results) {
  if (error) throw error;
  console.log("'Room' table created:", results);
});

// Step 6: Create the 'Invitee' table if it doesn't exist
const createInviteeQuery = `
  CREATE TABLE IF NOT EXISTS Invitee (
    meeting_no INT PRIMARY KEY AUTO_INCREMENT, 
    meeting_title VARCHAR(50) NOT NULL, 
    starting_time TIME, 
    ending_time TIME, 
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`;

connection.query(createInviteeQuery, function (error, results) {
  if (error) throw error;
  console.log("'Invitee' table created:", results);
});

// Step 7: Insert rows into the 'Room' table
const insertRoomsQuery = `
  INSERT INTO Room (room_name, floor_number) 
  VALUES 
    ('room1', 1), 
    ('room2', 2), 
    ('room3', 3), 
    ('room4', 4), 
    ('room5', 5)`;

connection.query(insertRoomsQuery, function (error, results) {
  if (error) throw error;
  console.log("Rows inserted into 'Room' table:", results);
});

// Step 8: Insert rows into the 'Invitee' table
const insertInviteesQuery = `
  INSERT INTO Invitee (meeting_title, starting_time, ending_time, room_no) 
  VALUES 
    ('meeting1', '10:00:00', '11:00:00', 1), 
    ('meeting2', '11:00:00', '12:00:00', 2), 
    ('meeting3', '12:00:00', '13:00:00', 3), 
    ('meeting4', '13:00:00', '14:00:00', 4), 
    ('meeting5', '14:00:00', '15:00:00', 5)`;

connection.query(insertInviteesQuery, function (error, results) {
  if (error) throw error;
  console.log("Rows inserted into 'Invitee' table:", results);
});

// Optional: Close the database connection when done
connection.end(function (error) {
  if (error) throw error;
  console.log("Database connection closed.");
});
