import mysql from "mysql2/promise";
import { connectionData } from "./connectionData.js";

const main = async () => {
  const connection = await mysql.createConnection(connectionData);

  try {
    await connection.query("DROP DATABASE IF EXISTS meetup;");

    // 1. Create a database called meetup
    await connection.query("CREATE DATABASE meetup;");
    await connection.query("USE meetup;");

    // 3. Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by)
    await connection.query(`CREATE TABLE Invitee (
          invitee_no INT AUTO_INCREMENT PRIMARY KEY,
          invitee_name VARCHAR(255) NOT NULL UNIQUE,
          invited_by VARCHAR(255)
        --   FOREIGN KEY (invited_by) REFERENCES Invitee(invitee_no) ON DELETE CASCADE ON UPDATE CASCADE
          );`);

    // 4. Create a table called Room with the following fields (room_no, room_name and floor_number)
    await connection.query(`CREATE TABLE Room (
          room_no INT AUTO_INCREMENT PRIMARY KEY,
          room_name VARCHAR(255),
          floor_number int);`);

    // 5. Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time ,room_no)
    await connection.query(`CREATE TABLE Meeting (
          meeting_no INT AUTO_INCREMENT PRIMARY KEY, 
          meeting_title VARCHAR(255),
          starting_time DATETIME,
          ending_time DATETIME,
          room_no int,
          FOREIGN KEY (room_no) REFERENCES Room(room_no) 
          ON DELETE CASCADE ON UPDATE CASCADE);`);

    // 6. Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields
    await connection.query(`INSERT INTO Invitee (invitee_name, invited_by)
          VALUES ('Bob', 2), ('Jack', 1), ('John', 1), ('Jane', 1), ('Jim', 1);`);

    await connection.query(`INSERT INTO Room (room_name, floor_number)
          VALUES ('Green', 0), ('Yellow', 1), ('White', 1), ('Blue', 2), ('Black', 2);`);

    await connection.query(`INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
          VALUES ('Daily', '2024-10-14 10:30:00', '2024-10-14 11:45:00', 1), 
          ('Standup', '2024-10-15 12:00:00', '2024-10-15 13:00:00', 2), 
          ('Planning-poker', '2024-10-16 15:00:00', '2024-10-16 16:00:00', 3), 
          ('Team meeting', '2024-10-17 13:00:00', '2024-10-17 14:00:00', 4), 
          ('Discussing', '2024-10-20 11:00:00', '2024-10-20 12:00:00', 5);`);
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

main();
