import { createConnection } from "mysql2";
import { executeQuery } from "./dbUtils.js";

// 1. Create a database called `meetup`
// 2. Make a connection to your database, using your MySQL `hyfuser` login credentials

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  // database: "meetup",
});

connection.connect();

const createDatabase = "create database if not exists meetup";
executeQuery(createDatabase, connection);

// 3. Create a table called `Invitee` with the following fields (`invitee_no`, `invitee_name` and `invited_by`)

const createTableInvitee = `create table if not exists meetup.Invitee (
  invitee_no int primary key AUTO_INCREMENT,
  invitee_name varchar(50),
  invited_by int,
  foreign key (invited_by) references meetup.Invitee(invitee_no) on delete set null
)`;
executeQuery(createTableInvitee, connection);

// 4. Create a table called `Room` with the following fields (`room_no`, `room_name` and `floor_number`)

const createTableRoom = `create table if not exists meetup.Room (
    room_no int primary key AUTO_INCREMENT,
    room_name varchar(50),
    floor_number tinyint
    )`;
executeQuery(createTableRoom, connection);

// 5. Create a table called `Meeting` with the following fields (`meeting_no, meeting_title, starting_time, ending_time`
//    ,`room_no`)

const createTableMeeting = `create table if not exists meetup.Meeting (
    meeting_no int primary key AUTO_INCREMENT,
    meeting_title varchar(50),
    starting_time datetime,
    ending_time datetime,
    room_no int,
    foreign key (room_no) references meetup.Room(room_no) on delete cascade
)`;
executeQuery(createTableMeeting, connection);

// 6. Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields

const insertQueries = [
  "insert into meetup.Invitee (invitee_name, invited_by) values ('Ali', NULL)",
  "insert into meetup.Invitee (invitee_name, invited_by) values ('Ahmed', NULL)",
  "insert into meetup.Invitee (invitee_name, invited_by) values ('Sara', NULL)",
  "insert into meetup.Invitee (invitee_name, invited_by) values ('Sami', NULL)",
  "insert into meetup.Invitee (invitee_name, invited_by) values ('Nora', NULL)",
  "insert into meetup.Room (room_name, floor_number) values ('Room1', 1)",
  "insert into meetup.Room (room_name, floor_number) values ('Room2', 2)",
  "insert into meetup.Room (room_name, floor_number) values ('Room3', 3)",
  "insert into meetup.Room (room_name, floor_number) values ('Room4', 4)",
  "insert into meetup.Room (room_name, floor_number) values ('Room5', 5)",
  "insert into meetup.Meeting (meeting_title, starting_time, ending_time, room_no) values ('Meeting1', '2024-10-23 10:00:00', '2024-10-23 12:00:00', 1)",
  "insert into meetup.Meeting (meeting_title, starting_time, ending_time, room_no) values ('Meeting2', '2024-10-23 11:00:00', '2024-10-23 13:00:00', 2)",
  "insert into meetup.Meeting (meeting_title, starting_time, ending_time, room_no) values ('Meeting3', '2024-10-23 12:00:00', '2024-10-23 14:00:00', 3)",
  "insert into meetup.Meeting (meeting_title, starting_time, ending_time, room_no) values ('Meeting4', '2024-10-23 13:00:00', '2024-10-23 15:00:00', 4)",
  "insert into meetup.Meeting (meeting_title, starting_time, ending_time, room_no) values ('Meeting5', '2024-10-23 14:00:00', '2024-10-23 16:00:00', 5)",
];

for (let i = 0; i < insertQueries.length; i++) {
  executeQuery(insertQueries[i], connection);
}

const updateInviteeQueries = [
  "update meetup.Invitee set invited_by = 2 where invitee_name = 'Ali'",
  "update meetup.Invitee set invited_by = 3 where invitee_name = 'Ahmed'",
  "update meetup.Invitee set invited_by = 4 where invitee_name = 'Sara'",
  "update meetup.Invitee set invited_by = 5 where invitee_name = 'Sami'",
  "update meetup.Invitee set invited_by = 1 where invitee_name = 'Nora'",
];

for (let i = 0; i < updateInviteeQueries.length; i++) {
  executeQuery(updateInviteeQueries[i], connection);
}

// 7. Close the connection
connection.end(function (err) {
  if (err) {
    console.error("Error closing the connection:", err.message);
    return;
  }
  console.log("Connection closed successfully.");
});
