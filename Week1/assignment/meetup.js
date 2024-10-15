// Import the mysql package
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',  
    user: 'hyfuser', 
    password: '1122',
});

// Connect to MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);

    // Drop the database if it exists and create a new one
    connection.query('DROP DATABASE IF EXISTS meetup', (err) => {
        if (err) throw err;
        console.log('Database dropped.');

        connection.query('CREATE DATABASE meetup', (err) => {
            if (err) throw err;
            console.log('Database created.');

            // Use the newly created database
            connection.query('USE meetup', (err) => {
                if (err) throw err;

                // Create Invitee table
                const createInviteeTable = `
                    CREATE TABLE Invitee (
                        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
                        invitee_name VARCHAR(255) NOT NULL,
                        invited_by VARCHAR(255) NOT NULL
                    )`;

                connection.query(createInviteeTable, (err) => {
                    if (err) throw err;
                    console.log('Invitee table created.');

                    // Create Room table
                    const createRoomTable = `
                        CREATE TABLE Room (
                            room_no INT AUTO_INCREMENT PRIMARY KEY,
                            room_name VARCHAR(255) NOT NULL,
                            floor_number INT NOT NULL
                        )`;

                    connection.query(createRoomTable, (err) => {
                        if (err) throw err;
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

                        connection.query(createMeetingTable, (err) => {
                            if (err) throw err;
                            console.log('Meeting table created.');

                            // Insert data into Invitee table
                            const insertInvitee = `
                                INSERT INTO Invitee (invitee_name, invited_by)
                                VALUES 
                                    ('John Doe', 'Alice Smith'),
                                    ('Jane Doe', 'Bob Johnson'),
                                    ('Alice Smith', 'Charlie Brown'),
                                    ('Bob Johnson', 'David Wilson'),
                                    ('Charlie Brown', 'Eve Davis')`;

                            connection.query(insertInvitee, (err) => {
                                if (err) throw err;
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

                                connection.query(insertRoom, (err) => {
                                    if (err) throw err;
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

                                    connection.query(insertMeeting, (err) => {
                                        if (err) throw err;
                                        console.log('5 rows inserted into Meeting table.');

                                        // End the connection
                                        connection.end();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
