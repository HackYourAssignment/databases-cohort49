const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'hyfuser', 
  password: '1122', 
  database: 'world' 
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

const queries = [
  // 1. Countries with population greater than 8 million
  `SELECT Name FROM country WHERE Population > 8000000`,

  // 2. Countries that have "land" in their names
  `SELECT Name FROM country WHERE Name LIKE '%land%'`,

  // 3. Cities with population between 500,000 and 1 million
  `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000`,

  // 4. All countries in Europe
  `SELECT Name FROM country WHERE Continent = 'Europe'`,

  // 5. Countries in descending order of surface area
  `SELECT Name FROM country ORDER BY SurfaceArea DESC`,

  // 6. All cities in the Netherlands
  `SELECT Name FROM city WHERE CountryCode = 'NLD'`,

  // 7. Population of Rotterdam
  `SELECT Population FROM city WHERE Name = 'Rotterdam'`,

  // 8. Top 10 countries by surface area
  `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`,

  // 9. Top 10 most populated cities
  `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`,

  // 10. Population number of the world
  `SELECT SUM(Population) AS WorldPopulation FROM country`
];

// Execute all queries and log results
queries.forEach((query, index) => {
  connection.query(query, (error, results) => {
    if (error) {
      console.error(`Error executing query ${index + 1}:`, error);
    } else {
      console.log(`Results of query ${index + 1}:`, results);
    }
  });
});

// Close the connection
connection.end((err) => {
  if (err) {
    console.error('Error closing the connection:', err);
  } else {
    console.log('Connection closed.');
  }
});
