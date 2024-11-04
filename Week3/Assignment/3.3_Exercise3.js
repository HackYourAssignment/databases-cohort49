const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world'
});
conn.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server.');
    function getPopulation(Country, name, code, cb) {
        conn.query(
        `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
        function (err, result) {
          if (err) cb(err);
          if (result.length == 0) cb(new Error("Not found"));
          cb(null, result);
        }
      );
    }
    function getPopulationSafe(Country, name, code, cb) {
      conn.query(
          'SELECT Population FROM ?? WHERE Name = ? AND Code = ?',
          [Country, name, code],
          function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
          }
        );
      }

    getPopulationSafe('country', "' OR '1'='1", "' OR '1'='1", (err, result) => {
        if (err) {
          console.error('Error occurred while fetching data securely:', err.message);
        } else {
            console.log('Results:', result);
        }
        conn.end();
    });
});