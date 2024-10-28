require("dotenv").config();
const mysql = require("mysql2/promise"); // Use the promise version of mysql2

// Create an async function to handle database connection and queries
const runQueries = async () => {
  // Create connection to the database using environment variables
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Function to execute a query and log the results
  const executeQuery = async (query) => {
    try {
      const [results] = await connection.query(query);
      console.log("The reply is", results);
    } catch (error) {
      console.error("Error executing query:", error);
    }
  };

  // Queries to execute
  const queries = [
    "SELECT name FROM country WHERE population > 8000000",
    "SELECT name FROM country WHERE name LIKE '%land%'",
    "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
    "SELECT name FROM country WHERE continent = 'Europe'",
    "SELECT name FROM country ORDER BY SurfaceArea DESC",
    "SELECT name FROM city WHERE country_code = 'NLD'",
    "SELECT population FROM city WHERE name = 'Rotterdam'",
    "SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
    "SELECT name FROM city ORDER BY population DESC LIMIT 10",
    "SELECT SUM(population) FROM country",
  ];

  // Execute all queries in sequence
  for (const query of queries) {
    await executeQuery(query);
  }

  // Close the connection
  await connection.end();
  console.log("Database connection closed.");
};

// Run the async function
runQueries().catch((error) => {
  console.error("Error in runQueries:", error);
});
