require("dotenv").config();
const mysql = require("mysql2");

// Create connection to the database using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to execute a query and log the results
const executeQuery = (query) => {
  connection.query(query, (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log("The reply is", results);
  });
};

// Queries to execute
const queries = [
  "SELECT name FROM country WHERE population > 8000000",
  "SELECT name FROM country WHERE name LIKE '%land%'",
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
  "SELECT name FROM country WHERE continent = 'Europe'",
  "SELECT name FROM country ORDER BY surface_area DESC",
  "SELECT name FROM city WHERE country_code = 'NLD'",
  "SELECT population FROM city WHERE name = 'Rotterdam'",
  "SELECT name FROM country ORDER BY surface_area DESC LIMIT 10",
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  "SELECT SUM(population) FROM country",
];

// Execute all queries
queries.forEach(executeQuery);
