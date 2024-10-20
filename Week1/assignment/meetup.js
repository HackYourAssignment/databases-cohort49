// Import the mysql package
const mysql = require('mysql2/promise');

// Create a connection to the database
async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',  
        user: 'hyfuser', 
        password: 'hyfpassword',
    });

    try {
        console.log('Connected as id ' + connection.threadId);

        await connection.query('DROP DATABASE IF EXISTS meetup');
        console.log('Database dropped.');

        await connection.query('CREATE DATABASE meetup');
        console.log('Database created.');

        // Use the newly created database
        await connection.query('USE meetup');

        // Create Invitee table
        const createInviteeTable = `
            CREATE TABLE Invitee (
                invitee_no INT AUTO_INCREMENT PRIMARY KEY,
                invitee_name VARCHAR(255) NOT NULL,
                invited_by INT,
                FOREIGN KEY (invited_by) REFERENCES Invitee(invitee_no)
            )`;
        await connection.query(createInviteeTable);
        console.log('Invitee table created.');

        // Create Room table
        const createRoomTable = `
            CREATE TABLE Room (
                room_no INT AUTO_INCREMENT PRIMARY KEY,
                room_name VARCHAR(255) NOT NULL,
                floor_number TINYINT NOT NULL
            )`;
        await connection.query(createRoomTable);
        console.log('Room table created.');

        // Create Meeting table
        const createMeetingTable = `
            CREATE TABLE Meeting (
                meeting_no INT AUTO_INCREMENT PRIMARY KEY,
                meeting_title VARCHAR(255) NOT NULL,
                starting_time DATETIME NOT NULL,
                ending_time DATETIME NOT NULL,
                room_no INT,
                FOREIGN KEY (room_no) REFERENCES Room(room_no)
            )`;
        await connection.query(createMeetingTable);
        console.log('Meeting table created.');

        // Insert data into Invitee table
        const insertInvitee = `
            INSERT INTO Invitee (invitee_name, invited_by)
            VALUES 
                ('John Doe', NULL),  -- Assuming initial invitees are not invited by anyone
                ('Jane Doe', NULL),
                ('Alice Smith', NULL),
                ('Bob Johnson', NULL),
                ('Charlie Brown', NULL)`;
        await connection.query(insertInvitee);
        console.log('5 rows inserted into Invitee table.');

        // Insert data into Room table
        const insertRoom = `
            INSERT INTO Room (room_name, floor_number)
            VALUES 
                ('Conference Room A', 1),
                ('Conference Room B', 1),
                ('Meeting Room C', 2),
                ('Board Room', 3),
                ('Lounge', 1)`;
        await connection.query(insertRoom);
        console.log('5 rows inserted into Room table.');

        // Insert data into Meeting table
        const insertMeeting = `
            INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
            VALUES 
                ('Project Kickoff', '2024-10-15 09:00:00', '2024-10-15 10:00:00', 1),
                ('Weekly Sync', '2024-10-15 10:30:00', '2024-10-15 11:30:00', 2),
                ('Client Meeting', '2024-10-15 14:00:00', '2024-10-15 15:00:00', 3),
                ('Team Building', '2024-10-15 16:00:00', '2024-10-15 17:00:00', 4),
                ('Product Review', '2024-10-15 11:00:00', '2024-10-15 12:00:00', 5)`;
        await connection.query(insertMeeting);
        console.log('5 rows inserted into Meeting table.');
        
    } catch (err) {
        console.error('Error: ', err);
    } finally {
        // End the connection
        await connection.end();
    }
}

main();
