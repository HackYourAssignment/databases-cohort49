import { createConnection } from './connection.js';

const insertValues = async () => {
    const connection = await createConnection();

    try {
        console.log('Connected to MySQL');

        const invitees = [
            { invitee_name: 'Jan van Dijk', invited_by: 'Mary de Jong' }, 
            { invitee_name: 'Alex Gonzalez', invited_by: 'Martijn Harrys' }, 
            { invitee_name: 'Martijn Bakker', invited_by: 'George Simion' }, 
            { invitee_name: 'Michelle Smit', invited_by: 'Jeroen Janssen' }, 
            { invitee_name: 'Tom Janssen', invited_by: 'Pedro Perez' }
        ];

        const insertInviteeQuery = 'INSERT IGNORE INTO invitee (invitee_name, invited_by) VALUES (?, ?)';
        for (const invitee of invitees) {
            await connection.execute(insertInviteeQuery, [invitee.invitee_name, invitee.invited_by]);
        }
        console.log('Invitees inserted successfully.');

        const rooms = [
            { room_no: 101, room_name: 'Conference Room A', floor_number: 1 },
            { room_no: 102, room_name: 'Conference Room B', floor_number: 1 },
            { room_no: 103, room_name: 'Conference Room C', floor_number: 1 },
            { room_no: 505, room_name: 'Board Room', floor_number: 5 },
            { room_no: 303, room_name: 'Meeting Room 1', floor_number: 3 }
        ];

        const insertRoomQuery = 'INSERT IGNORE INTO room (room_no, room_name, floor_number) VALUES (?, ?, ?)';
        for (const room of rooms) {
            await connection.execute(insertRoomQuery, [room.room_no, room.room_name, room.floor_number]);
        }
        console.log('Room values inserted successfully.');

        const meetings = [
            { meeting_title: 'Project Kickoff', starting_time: '2024-10-20 10:00:00', ending_time: '2024-10-20 11:00:00', room_no: 101 }, 
            { meeting_title: 'Weekly Sync', starting_time: '2024-10-21 14:00:00', ending_time: '2024-10-21 15:00:00', room_no: 102 }, 
            { meeting_title: 'Budget Review', starting_time: '2024-10-22 09:00:00', ending_time: '2024-10-22 10:30:00', room_no: 505 }, 
            { meeting_title: 'Team Building Exercise', starting_time: '2024-10-23 13:00:00', ending_time: '2024-10-23 15:00:00', room_no: 103 }, 
            { meeting_title: 'Sales Strategy Meeting', starting_time: '2024-10-24 09:30:00', ending_time: '2024-10-24 11:00:00', room_no: 303 } 
        ];

        const insertMeetingQuery = 'INSERT INTO meeting (meeting_title, starting_time, ending_time, room_no) VALUES (?, ?, ?, ?)';
        for (const meeting of meetings) {
            await connection.execute(insertMeetingQuery, [meeting.meeting_title, meeting.starting_time, meeting.ending_time, meeting.room_no]);
        }
        console.log('Meeting values inserted successfully.');

    } catch (err) {
        console.error('Error inserting values:', err);
    } finally {
        await connection.end();
    }
};

insertValues();
