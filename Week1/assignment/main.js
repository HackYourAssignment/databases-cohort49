const {
  createDatabase,
  createInviteeTable,
  createRoomTable,
  createMeetingTable,
  insertInviteeData,
  insertRoomData,
  insertMeetingData,
} = require("./createTables");

async function setupDatabase() {
  try {
    await createDatabase();
    await createInviteeTable();
    await createRoomTable();
    await createMeetingTable();

    await insertInviteeData();
    await insertRoomData();
    await insertMeetingData();

    console.log("Database setup completed!");
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    const connection = require("./db");
    connection.end((err) => {
      if (err) throw err;
      console.log("Database connection closed.");
    });
  }
}

setupDatabase();
