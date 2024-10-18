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
const createDatabase = (dbName) => `
  CREATE DATABASE IF NOT EXISTS ${dbName}
`;

connection.query(
  createDatabase(process.env.DB_NAME),
  function (error, results) {
    if (error) throw error;
    console.log("Database created or already exists:", results);

    // Step 3: Use the 'meetup' database after it has been created
    connection.query(`USE ${process.env.DB_NAME}`, function (error) {
      if (error) throw error;
      console.log("Using database:", process.env.DB_NAME);

      // Proceed with creating tables
      createTables();
    });
  }
);

// Function to create tables
const createTables = () => {
  // Step 5: Create the 'Room' table
  const createRoomQuery = `
    CREATE TABLE IF NOT EXISTS Room (
      room_no INT PRIMARY KEY AUTO_INCREMENT, 
      room_name VARCHAR(50) NOT NULL, 
      floor_number INT NOT NULL
    )
  `;
  runQuery(createRoomQuery, "'Room' table created");

  // Step 6: Create the 'Meeting' table
  const createMeetingQuery = `
    CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT PRIMARY KEY AUTO_INCREMENT, 
      meeting_title VARCHAR(50) NOT NULL, 
      starting_time TIME, 
      ending_time TIME, 
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )
  `;
  runQuery(createMeetingQuery, "'Meeting' table created");

  // Step 7: Create the 'Invitee' table
  const createInviteeQuery = `
    CREATE TABLE IF NOT EXISTS Invitee (
      invitee_id INT PRIMARY KEY AUTO_INCREMENT, 
      invitee_name VARCHAR(50) NOT NULL, 
      meeting_no INT,
      FOREIGN KEY (meeting_no) REFERENCES Meeting(meeting_no)
    )
  `;
  runQuery(createInviteeQuery, "'Invitee' table created");
};

// Helper function to run queries
const runQuery = (query, message) => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.log(message, results);
  });
};

// Final step: Close the database connection when done
connection.end(function (error) {
  if (error) throw error;
  console.log("Database connection closed.");
});
