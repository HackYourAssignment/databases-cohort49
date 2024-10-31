const mysql = require("mysql2/promise");

const DATABASE_NAME = "meetup";

async function main() {
  // Step 1: Create a connection to the MySQL database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser", // Replace with your MySQL username
    password: "hyfpassword", // Replace with your MySQL password
    database: DATABASE_NAME, // Use the database name here
  });

  const query = async (sql, values = []) => {
    return connection.query(sql, values);
  };

  try {
    // Step 2: Drop the database if it exists
    await query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    console.log(`Database ${DATABASE_NAME} dropped if it existed.`);

    // Step 3: Create the database
    await query(`CREATE DATABASE ${DATABASE_NAME}`);
    console.log(`Database ${DATABASE_NAME} created.`);

    // Step 4: Use the created database
    await query(`USE ${DATABASE_NAME}`);

    // Step 5: Create the Invitee table
    await query(`
      CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by VARCHAR(255) NOT NULL
      )`);
    console.log("Invitee table created.");

    // Step 6: Create the Room table
    await query(`
      CREATE TABLE IF NOT EXISTS Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
        floor_number INT NOT NULL
      )`);
    console.log("Room table created.");

    // Step 7: Create the Meeting table
    await query(`
      CREATE TABLE IF NOT EXISTS Meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY,
        meeting_title VARCHAR(255) NOT NULL,
        starting_time DATETIME NOT NULL,
        ending_time DATETIME NOT NULL,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
      )`);
    console.log("Meeting table created.");

    // Step 8: Insert data into the Invitee table
    const invitees = [
      ["Alice", "Bob"],
      ["Charlie", "Dave"],
      ["Eve", "Frank"],
      ["Grace", "Heidi"],
      ["Ivan", "Judy"],
    ];
    await query(`INSERT INTO Invitee (invitee_name, invited_by) VALUES ?`, [
      invitees,
    ]);
    console.log("Data inserted into Invitee table.");

    // Step 9: Insert data into the Room table
    const rooms = [
      ["Conference Room A", 1],
      ["Conference Room B", 1],
      ["Meeting Room 1", 2],
      ["Meeting Room 2", 2],
      ["Lounge", 0],
    ];
    await query(`INSERT INTO Room (room_name, floor_number) VALUES ?`, [rooms]);
    console.log("Data inserted into Room table.");

    // Step 10: Insert data into the Meeting table
    const meetings = [
      ["Project Kickoff", "2023-10-29 10:00:00", "2023-10-29 11:00:00", 1],
      ["Weekly Sync", "2023-10-29 13:00:00", "2023-10-29 14:00:00", 2],
      ["Strategy Planning", "2023-10-30 15:00:00", "2023-10-30 16:30:00", 1],
      ["Client Meeting", "2023-10-31 09:00:00", "2023-10-31 10:30:00", 2],
    ];
    await query(
      `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ?`,
      [meetings]
    );
    console.log("Data inserted into Meeting table.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Step 11: Close the connection
    await connection.end();
    console.log("Connection closed.");
  }
}

// Run the main function
main();
