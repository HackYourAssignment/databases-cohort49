const connection = require("./db");

function createDatabase() {
  return new Promise((resolve, reject) => {
    connection.query("DROP DATABASE IF EXISTS meetup", (err) => {
      if (err) return reject(err);
      console.log("Database dropped (if existed)");
      connection.query("CREATE DATABASE meetup", (err) => {
        if (err) return reject(err);
        console.log("Database created!");
        connection.query("USE meetup", (err) => {
          if (err) return reject(err);
          console.log("Using meetup database!");
          resolve();
        });
      });
    });
  });
}

function createInviteeTable() {
  const createInviteeQuery = `CREATE TABLE Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255) NOT NULL,
    invited_by VARCHAR(255) NOT NULL
  )`;

  return new Promise((resolve, reject) => {
    connection.query(createInviteeQuery, (err) => {
      if (err) return reject(err);
      console.log("Invitee table created!");
      resolve();
    });
  });
}

function createRoomTable() {
  const createRoomQuery = `CREATE TABLE Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    floor_number INT NOT NULL
  )`;

  return new Promise((resolve, reject) => {
    connection.query(createRoomQuery, (err) => {
      if (err) return reject(err);
      console.log("Room table created!");
      resolve();
    });
  });
}

function createMeetingTable() {
  const createMeetingQuery = `CREATE TABLE Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`;

  return new Promise((resolve, reject) => {
    connection.query(createMeetingQuery, (err) => {
      if (err) return reject(err);
      console.log("Meeting table created!");
      resolve();
    });
  });
}

function insertInviteeData() {
  const invitees = [
    ["Alice", "John"],
    ["Bob", "Alice"],
    ["Charlie", "John"],
    ["David", "Bob"],
    ["Eve", "Charlie"],
  ];

  const insertInviteeQuery =
    "INSERT INTO Invitee (invitee_name, invited_by) VALUES ?";

  return new Promise((resolve, reject) => {
    connection.query(insertInviteeQuery, [invitees], (err) => {
      if (err) return reject(err);
      console.log("Invitee data inserted!");
      resolve();
    });
  });
}

function insertRoomData() {
  const rooms = [
    ["Conference Room 1", 1],
    ["Conference Room 2", 2],
    ["Meeting Room 1", 1],
    ["Meeting Room 2", 2],
    ["Event Hall", 0],
  ];

  const insertRoomQuery = "INSERT INTO Room (room_name, floor_number) VALUES ?";

  return new Promise((resolve, reject) => {
    connection.query(insertRoomQuery, [rooms], (err) => {
      if (err) return reject(err);
      console.log("Room data inserted!");
      resolve();
    });
  });
}

function insertMeetingData() {
  const meetings = [
    ["Project Kickoff", "2024-10-15 10:00:00", "2024-10-15 11:00:00", 1],
    ["Design Review", "2024-10-16 14:00:00", "2024-10-16 15:00:00", 2],
    ["Sprint Planning", "2024-10-17 09:00:00", "2024-10-17 10:00:00", 3],
    ["Team Building", "2024-10-18 13:00:00", "2024-10-18 14:30:00", 4],
    ["Quarterly Review", "2024-10-19 15:00:00", "2024-10-19 16:00:00", 5],
  ];

  const insertMeetingQuery =
    "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ?";

  return new Promise((resolve, reject) => {
    connection.query(insertMeetingQuery, [meetings], (err) => {
      if (err) return reject(err);
      console.log("Meeting data inserted!");
      resolve();
    });
  });
}

module.exports = {
  createDatabase,
  createInviteeTable,
  createRoomTable,
  createMeetingTable,
  insertInviteeData,
  insertRoomData,
  insertMeetingData,
};
