async function getPopulation(country, name = null, code = null, cb) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima',
        database: 'world',
    });

    try {
        let query = `SELECT Population FROM ??`;
        let queryParams = [country];

        if (name) {
            query += ` WHERE Name = ?`;
            queryParams.push(name);
        }
        if (code) {
            query += name ? ` AND Code = ?` : ` WHERE Code = ?`;
            queryParams.push(code);
        }

        const [rows] = await connection.execute(query, queryParams);

        if (rows.length === 0) {
            return cb(new Error('Not found'));
        }

        cb(null, rows);
    } catch (error) {
        cb(error);
    } finally {
        await connection.end();
    }
}

getPopulation('CountryTable', null, null, (err, populations) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('Populations:', populations);
    }
});