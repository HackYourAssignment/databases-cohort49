const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

// Step 1: Create a connection to the MySQL server using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Step 2: Create the 'meetup' database if it doesn't exist
const createDatabase = (dbName) => `
  CREATE DATABASE IF NOT EXISTS ${dbName}
`;
const createDatabaseAsync = async (dbName) => {
  return new Promise((resolve, reject) => {
    connection.query(createDatabase(dbName), (error, results) => {
      if (error) return reject(error);
      console.log("Database created or already exists:", results);
      resolve();
    });
  });
};

const useDatabaseAsync = async (dbName) => {
  return new Promise((resolve, reject) => {
    connection.query(`USE ${dbName}`, (error) => {
      if (error) return reject(error);
      console.log("Using database:", dbName);
      resolve();
    });
  });
};

const main = async () => {
  try {
    await createDatabaseAsync(process.env.DB_NAME);
    await useDatabaseAsync(process.env.DB_NAME);
    createTables();
  } catch (error) {
    console.error("Error:", error);
  }
};

main();

// Step 3: Use the 'meetup' database after it has been created
connection.query(`USE ${process.env.DB_NAME}`, function (error) {
  if (error) throw error;
  console.log("Using database:", process.env.DB_NAME);

  // Proceed with creating tables
  createTables();
});

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
  runQuery(createInviteeQuery, "'Invitee' table created", insertData);
};

// Function to insert data into tables
const insertData = () => {
  const insertRoomQuery = `
    INSERT INTO Room (room_name, floor_number) VALUES 
    ('Conference Room A', 1),
    ('Conference Room B', 2),
    ('Conference Room C', 3),
    ('Conference Room D', 4),
    ('Conference Room E', 5)
  `;
  runQuery(insertRoomQuery, "Data inserted into 'Room' table");

  const insertMeetingQuery = `
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES 
    ('Project Kickoff', '09:00:00', '10:00:00', 1),
    ('Team Sync', '10:00:00', '11:00:00', 2),
    ('Client Meeting', '11:00:00', '12:00:00', 3),
    ('Design Review', '13:00:00', '14:00:00', 4),
    ('Sprint Planning', '14:00:00', '15:00:00', 5)
  `;
  runQuery(insertMeetingQuery, "Data inserted into 'Meeting' table");

  const insertInviteeQuery = `
    INSERT INTO Invitee (invitee_name, meeting_no) VALUES 
    ('Alice', 1),
    ('Bob', 2),
    ('Charlie', 3),
    ('David', 4),
    ('Eve', 5)
  `;
  runQuery(insertInviteeQuery, "Data inserted into 'Invitee' table");
};

// Helper function to run queries
const runQuery = (query, message, callback) => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.log(message, results);
    if (callback) callback();
  });
};
