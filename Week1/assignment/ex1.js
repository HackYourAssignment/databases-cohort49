import mysql from "mysql";
import { connectionData } from "./connectionData.js";

const connection = mysql.createConnection(connectionData);

const query = (command) => {
  connection.query(command, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });
};

try {
  connection.connect();
  query("DROP DATABASE IF EXISTS meetup;");

  // 1. Create a database called meetup
  query("CREATE DATABASE meetup;");
  query("USE meetup;");

  // 3. Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by)
  query(`CREATE TABLE Invitee (
          invitee_no int,
          invitee_name varchar(255),
          invited_by int);`);

  // 4. Create a table called Room with the following fields (room_no, room_name and floor_number)
  query(`CREATE TABLE Room (
          room_no int,
          room_name varchar(255),
          floor_number int);`);

  // 5. Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time ,room_no)
  query(`CREATE TABLE Meeting (
          meeting_no int,
          meeting_title varchar(255),
          starting_time datetime,
          ending_time datetime,
          room_no int);`);

  // 6. Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields
  query(`INSERT INTO Invitee
          VALUES (1, 'Bob', 2), (2, 'Jack', 1), (3, 'John', 1), (4, 'Jane', 1), (5, 'Jim', 1);`);
  query(`INSERT INTO Room
          VALUES (1, 'Green', 0), (2, 'Yellow', 1), (3, 'White', 1), (4, 'Blue', 2), (5, 'Black', 2);`);
  query(`INSERT INTO Meeting
          VALUES (1, 'Daily', '2024-10-14 10:30:00', '2024-10-14 11:45:00', 1), 
          (2, 'Standup', '2024-10-15 12:00:00', '2024-10-15 13:00:00', 2), 
          (3, 'Planning-poker', '2024-10-16 15:00:00', '2024-10-16 16:00:00', 3), 
          (4, 'Team meeting', '2024-10-17 13:00:00', '2024-10-17 14:00:00', 4), 
          (5, 'Discussing', '2024-10-20 11:00:00', '2024-10-20 12:00:00', 5);`);

  connection.end();
} catch (error) {
  throw error;
}
