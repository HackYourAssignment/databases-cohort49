function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;
    conn.query(query, [Country, name, code], function (err, result) {
      if (err) return cb(err);
      if (result.length === 0) return cb(new Error("Not found"));
      cb(null, result[0].Population); // Corrected to return population instead of name
    });
  }
  


  /*
Example of SQL Injection:

In the original function, an attacker can manipulate the name and code-
inputs to modify the query and potentially retrieve all records from the database.
Here's an example of what the name and code values could look like to exploit-
the vulnerability:

- name: anything' OR '1'='1
- code: anything' OR '1'='1

This would turn the query into something like:

SELECT Population FROM Country WHERE
Name = 'anything' OR '1'='1' AND code = 'anything' OR '1'='1'

Since '1'='1' is always true, this would cause the query to return all records in the-
 database, rather than just the record matching the name and code.
  */