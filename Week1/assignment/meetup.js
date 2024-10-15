import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting: " + error.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

const dropDatabase = `DROP DATABASE IF EXISTS meetup;`;
const createDatabase = `CREATE DATABASE meetup;`;

connection.query(dropDatabase, (error) => {
  if (error) throw error;
  console.log("Existing database dropped.");

  connection.query(createDatabase, (error) => {
    if (error) throw error;
    console.log("New database created.");

    connection.query("USE meetup;", (error) => {
      if (error) throw error;
      console.log("Using the meetup database.");

      const createTableInvitee = `
  CREATE TABLE IF NOT EXISTS invitee (
    invitee_num INT NOT NULL, 
    invitee_name VARCHAR(100) NOT NULL, 
    invited_by VARCHAR(100),
    PRIMARY KEY (invitee_num)
  )
 `;

      const createTableRoom = `
 CREATE TABLE IF NOT EXISTS room (
 room_num INT NOT NULL,
 room_name VARCHAR(100),
 floor_number INT NOT NULL,
 PRIMARY KEY (room_num)
 )
 `;

      const createTableMeeting = `
 CREATE TABLE IF NOT EXISTS meeting (
 meeting_num INT NOT NULL,
 meeting_title VARCHAR(100) NOT NULL,
 starting_time TIME NOT NULL,
 ending_time TIME NOT NULL,
 room_num INT NOT NULL,
 PRIMARY KEY (meeting_num)
 )
 `;

      connection.query(createTableInvitee, (error) => {
        if (error) {
          throw error;
        }
        console.log("Invitee table created");
      });

      connection.query(createTableRoom, (error) => {
        if (error) {
          throw error;
        }
        console.log("Room Table created");
      });

      connection.query(createTableMeeting, (error) => {
        if (error) {
          throw error;
        }
        console.log("Meeting table created");
      });

      const insertInviteeData = `
    INSERT IGNORE INTO invitee (invitee_num, invitee_name, invited_by) VALUES
    (1, 'Alia','Sara'),(2, 'Seba', 'Sara'),(3, 'Salwa', 'Sara'),(4, 'Lamis', 'Sara'),(5, 'Buthina', 'Sara')
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

      insertQueries.forEach((query, index) => {
        connection.query(query, (error, results) => {
          if (error) {
            console.error(`Error executing query ${index + 1}:`, error.message);
          } else {
            console.log(`Query ${index + 1} executed successfully.`);
          }
        });
      });

      connection.end();
    });
  });
});
