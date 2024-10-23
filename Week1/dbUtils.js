export function executeQuery(query, connection) {
  connection.query(query, function (error, results) {
    if (error) {
      console.error(`Error executing query: ${query}`, error.message);
      return;
    }
    console.log(
      `Query executed successfully. Affected rows: ${results.affectedRows}`
    );
  });
}
