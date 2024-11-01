const mysql = require('mysql2/promise');

async function getPopulation(country, name, code, cb) {
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


        if (rows.length === 0) {
            return cb(new Error('Not found'));
        }

        cb(null, rows[0].Population);
    } catch (error) {
        cb(error); 
    } finally {
        await connection.end(); 
    }
}

getPopulation('CountryTable', 'CountryName', 'CountryCode', (err, population) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('Population:', population);
    }
});

module.exports = { getPopulation };
