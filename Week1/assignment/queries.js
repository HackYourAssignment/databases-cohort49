const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

const executeQuery = (query) => {
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
    } else {
      console.log(results);
    }
  });
};

executeQuery("SELECT name FROM country WHERE population > 8000000;"); // Q1
executeQuery("SELECT name FROM country WHERE name LIKE '%land%';"); // Q2
executeQuery(
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;"
); // Q3
executeQuery("SELECT name FROM country WHERE continent = 'Europe';"); // Q4
executeQuery("SELECT name FROM country ORDER BY surfacearea DESC;"); // Q5
executeQuery(
  "SELECT name FROM city WHERE CountryCode = (SELECT Code FROM country WHERE Name = 'Netherlands');"
); // Q6
executeQuery("SELECT population FROM city WHERE name = 'Rotterdam';"); // Q7
executeQuery("SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10;"); // Q8
executeQuery("SELECT name FROM city ORDER BY population DESC LIMIT 10;"); // Q9
executeQuery("SELECT SUM(population) AS world_population FROM country;"); // Q10

connection.end();
