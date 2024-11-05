// 1. Give an example of a value that can be passed as name and code that would take
// advantage of SQL-injection and (fetch all the records in the database)

// answer: 
// Name = "' OR '1'='1"
// code = "' OR '1'='1"

import mysql from 'mysql2/promise';

async function getPopulation(country, name, code, cb) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima',
        database: 'world',
    });

    try {
        const tableName = country === 'CountryTable' ? 'CountryTable' : null;
        if (!tableName) {
            return cb(new Error("Invalid table name"));
        }

        // Use parameterized query to prevent SQL injection
        const query = `SELECT Population FROM ${tableName} WHERE Name = ? AND Code = ?`;
        const [rows] = await connection.execute(query, [name, code]);

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


getPopulation('CountryTable', 'SampleCountry', 'SampleCode', (err, population) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('Population:', population);
    }
});
