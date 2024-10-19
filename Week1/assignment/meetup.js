import mysql2 from "mysql2/promise";

async function main() {
  try {
    const connection = await mysql2.createConnection({
      host: "localhost",
      user: "hyfuser",
      password: "hyfpassword",
      database: "meetup",
    });

    await connection.connect(
      console.log("Connected as id " + connection.threadId)
    );

    const dropDatabase = `DROP DATABASE IF EXISTS meetup;`;
    const createDatabase = `CREATE DATABASE meetup;`;

    await connection.query(dropDatabase);
    await connection.query(createDatabase);
    await connection.query("USE meetup;");
    console.log("Database created");

    const createTableInvitee = `
  CREATE TABLE IF NOT EXISTS invitee (
    invitee_num INT PRIMARY KEY AUTO_INCREMENT, 
    invitee_name VARCHAR(100) NOT NULL, 
    invited_by INT,
    FOREIGN KEY (invited_by) REFERENCES invitee(invitee_num)
  )
 `;

    const createTableRoom = `
 CREATE TABLE IF NOT EXISTS room (
 room_num INT PRIMARY KEY,
 room_name VARCHAR(100),
 floor_number TINYINT NOT NULL
 )
 `;

    const createTableMeeting = `
 CREATE TABLE IF NOT EXISTS meeting (
 meeting_num INT PRIMARY KEY,
 meeting_title VARCHAR(100) NOT NULL,
 starting_time TIMESTAMP NOT NULL,
 ending_time TIMESTAMP NOT NULL,
 room_num INT NOT NULL
 )
 `;

    await connection.query(createTableInvitee);
    await connection.query(createTableRoom);
    await connection.query(createTableMeeting);
    console.log("Tables created");
    

    const insertInviteeData = `
    INSERT IGNORE INTO invitee ( invitee_name, invited_by) VALUES
    ('Alia', 1),('Seba', 1),('Salwa', 1),('Lamis', 1),('Buthina', 1)
    `;

    const insertRoomData = `
    INSERT IGNORE INTO room (room_num, room_name, floor_number) VALUES
     (879,'Single room', 8),(857,'Single room',8),(880,'Single room',8),(886,'Single room',8),(869,'Single room',8)
    `;

    const insertMeetingData = `
    INSERT IGNORE INTO meeting (meeting_num, meeting_title, starting_time, ending_time, room_num)  VALUES
    (1,'Kickoff Strategy','2024-12-15 10:00:00',' 2024-12-15 13:00:00',906),
    (2,'Milestone Review & Planning','2024-12-16 10:00:00',' 2024-12-16 15:00:00',432),
    (3,'Process Improvement Session',' 2024-12-17 10:00:00','2024-12-17 12:00:00',976),
    (4,'Long-Term Strategic Planning','2024-12-18 10:00:00','2024-12-18 13:00:00',976),
    (5,'Creative Collaboration Session',' 2024-12-19 10:00:00','2024-12-19 16:00:00',906)
    `;
    const insertQueries = [
      insertInviteeData,
      insertRoomData,
      insertMeetingData,
    ];

    for (const [index, query] of insertQueries.entries()) {
      try {
        await connection.query(query);
        console.log(`Query ${index + 1} executed successfully.`);
      } catch (error) {
        console.error(`Error executing query ${index + 1}:`, error.message);
      }
    }

    await connection.end();
  } catch (error) {
    console.error("Error :", error.message);
  }
}
main();
