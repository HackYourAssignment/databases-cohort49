const mysql = require('mysql2/promise');

async function getPopulation (country, name, code) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima',
        database: 'world',
    });

    try {
        const [rows] = await connection.execute(
            `SELECT Population FROM ?? WHERE Name = ? AND Code = ?`,
            [country, name, code]
        );

        if (rows.length === 0) throw new Error('Not found');
        return rows[0].Population;
    } catch (error) {
        console.error('Error fetching population:', error.message);
    } finally {
        connection.end();
    }
}

module.exports = { getPopulation };