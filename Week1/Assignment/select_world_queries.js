const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',         // Replace with your MySQL username
  password: 'password',    // Replace with your MySQL password
  database: 'world',       // Use the 'world' database
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL successfully!');

  // 1. Countries with a population greater than 8 million
  connection.query("SELECT Name FROM country WHERE Population > 8000000", (err, result) => {
    if (err) throw err;
    console.log('Countries with population greater than 8 million:', result);
  });

  // 2. Countries with 'land' in their name
  connection.query("SELECT Name FROM country WHERE Name LIKE '%land%'", (err, result) => {
    if (err) throw err;
    console.log('Countries with "land" in their name:', result);
  });

  // 3. Cities with population between 500,000 and 1 million
  connection.query("SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000", (err, result) => {
    if (err) throw err;
    console.log('Cities with population between 500,000 and 1 million:', result);
  });

  // 4. Countries on the continent 'Europe'
  connection.query("SELECT Name FROM country WHERE Continent = 'Europe'", (err, result) => {
    if (err) throw err;
    console.log('Countries on the continent Europe:', result);
  });

  // 5. Countries ordered by surface area (descending order)
  connection.query("SELECT Name FROM country ORDER BY SurfaceArea DESC", (err, result) => {
    if (err) throw err;
    console.log('Countries ordered by surface area:', result);
  });

  // 6. Cities in the Netherlands
  connection.query("SELECT Name FROM city WHERE CountryCode = 'NLD'", (err, result) => {
    if (err) throw err;
    console.log('Cities in the Netherlands:', result);
  });

  // 7. Population of Rotterdam
  connection.query("SELECT Population FROM city WHERE Name = 'Rotterdam'", (err, result) => {
    if (err) throw err;
    console.log('Population of Rotterdam:', result);
  });

  // 8. Top 10 countries by surface area
  connection.query("SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10", (err, result) => {
    if (err) throw err;
    console.log('Top 10 countries by surface area:', result);
  });

  // 9. Top 10 most populated cities
  connection.query("SELECT Name FROM city ORDER BY Population DESC LIMIT 10", (err, result) => {
    if (err) throw err;
    console.log('Top 10 most populated cities:', result);
  });

  // 10. Population of the world
  connection.query("SELECT SUM(Population) AS WorldPopulation FROM country", (err, result) => {
    if (err) throw err;
    console.log('Population of the world:', result);
    connection.end();  // Close the connection when done
  });
});
