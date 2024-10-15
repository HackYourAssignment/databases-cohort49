const { createConnection } = require("mysql2");

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

connection.query(createDatabase, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("server status is ", results.serverStatus);
});
// 3. Create a table called `Invitee` with the following fields (`invitee_no`, `invitee_name` and `invited_by`)

const createTableInvitee = `create table if not exists meetup.Invitee (
  invitee_no int primary key,
  invitee_name varchar(50),
  invited_by int
)`;

connection.query(createTableInvitee, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("affected rows is ", results.affectedRows);
});

// 4. Create a table called `Room` with the following fields (`room_no`, `room_name` and `floor_number`)

const createTableRoom = `create table if not exists meetup.Room (
    room_no int primary key,
    room_name varchar(50),
    floor_number int
    )`;

connection.query(createTableRoom, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("affected rows is ", results.affectedRows);
});

// 5. Create a table called `Meeting` with the following fields (`meeting_no, meeting_title, starting_time, ending_time`
//    ,`room_no`)

const createTableMeeting = `create table if not exists meetup.Meeting (
    meeting_no int primary key,
    meeting_title varchar(50),
    starting_time time,
    ending_time time,
    room_no int
    )`;

connection.query(createTableMeeting, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("affected rows: ", results.affectedRows);
});

// 6. Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields

const insertQueries = [
  "insert into meetup.Invitee values (1, 'Ali', 2)",
  "insert into meetup.Invitee values (2, 'Ahmed', 3)",
  "insert into meetup.Invitee values (3, 'Sara', 4)",
  "insert into meetup.Invitee values (4, 'Sami', 5)",
  "insert into meetup.Invitee values (5, 'Nora', 6)",
  "insert into meetup.Room values (1, 'Room1', 1)",
  "insert into meetup.Room values (2, 'Room2', 2)",
  "insert into meetup.Room values (3, 'Room3', 3)",
  "insert into meetup.Room values (4, 'Room4', 4)",
  "insert into meetup.Room values (5, 'Room5', 5)",
  "insert into meetup.Meeting values (1, 'Meeting1', '10:00:00', '12:00:00', 1)",
  "insert into meetup.Meeting values (2, 'Meeting2', '11:00:00', '13:00:00', 2)",
  "insert into meetup.Meeting values (3, 'Meeting3', '12:00:00', '14:00:00', 3)",
  "insert into meetup.Meeting values (4, 'Meeting4', '13:00:00', '15:00:00', 4)",
  "insert into meetup.Meeting values (5, 'Meeting5', '14:00:00', '16:00:00', 5)",
];

for (let i = 0; i < insertQueries.length; i++) {
  connection.query(insertQueries[i], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("affected rows: ", results.affectedRows);
  });
}

// 7. Close the connection
connection.end();
