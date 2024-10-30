const mysql = require("mysql2/promise");

async function getPopulation(country, name, code) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });

  try {
    const [rows] = await connection.execute(
      `SELECT Population FROM ?? WHERE Name = ? AND Code = ?`,
      [country, name, code]
    );

    if (!rows.length) {
      throw new Error("Population data not found for the specified criteria.");
    }

    return rows[0].Population;
  } catch (error) {
    console.error("Error fetching population:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = { getPopulation };
