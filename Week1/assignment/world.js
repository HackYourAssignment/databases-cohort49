import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

const queries = [
  {
    description: "Countries with population greater than 8 million",
    query: `SELECT Name FROM country WHERE Population > 8000000`,
  },
  {
    description: "Countries that have “land” in their names",
    query: `SELECT Name FROM country WHERE Name LIKE '%land%'`,
  },
  {
    description: "Cities with population between 500,000 and 1 million",
    query: `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000`,
  },
  {
    description: "Countries on the continent “Europe”",
    query: `SELECT Name FROM country WHERE Continent = 'Europe'`,
  },
  {
    description: "Countries in descending order of surface areas",
    query: `SELECT Name FROM country ORDER BY SurfaceArea DESC`,
  },
  {
    description: "Cities in the Netherlands",
    query: `SELECT Name FROM city WHERE CountryCode = 'NLD'`,
  },
  {
    description: "Population of Rotterdam",
    query: `SELECT Population FROM city WHERE Name = 'Rotterdam'`,
  },
  {
    description: "Top 10 countries by Surface Area",
    query: `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10`,
  },
  {
    description: "Top 10 most populated cities",
    query: `SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10`,
  },
  {
    description: "Population number of the world",
    query: `SELECT SUM(Population) AS 'Total Population of the World' FROM city`,
  },
];

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  queries.forEach(({ description, query }) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query:", error.message);
      } else {
        console.log(`${description}`);
        console.log("Query Result:", results);
      }
    });
  });

  connection.end();
});
