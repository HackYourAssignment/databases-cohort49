const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");
});

const selectedQueries = `
  SELECT name FROM country WHERE population > 8000000;

  SELECT name FROM country WHERE name Like '%land%';

  SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;

  SELECT name FROM country WHERE continent = 'Europe';

  SELECT name, surfacearea FROM country ORDER BY surfacearea DESC;

  SELECT name FROM city WHERE countrycode = 'NLD';

  SELECT population FROM city WHERE name = 'Rotterdam';

  SELECT name, surfacearea FROM country ORDER BY surfacearea DESC LIMIT 10;

  SELECT name, population FROM city ORDER BY population DESC LIMIT 10;
  
  SELECT SUM(population) AS world_population FROM country;
  `;
connection.query(selectedQueries, (err, results) => {
  if (err) throw err;
  console.log(
    "1. Countries with population greater than 8 million:",
    results[0],
  );
  console.log('2. Countries with "land" in their names:', results[1]);
  console.log(
    "3. Cities with population between 500,000 and 1 million:",
    results[2],
  );
  console.log('4. Countries on the continent "Europe":', results[3]);
  console.log("5. Countries ordered by surface area (descending):", results[4]);
  console.log("6. Cities in the Netherlands:", results[5]);
  console.log("7. Population of Rotterdam:", results[6]);
  console.log("8. Top 10 countries by surface area:", results[7]);
  console.log("9. Top 10 most populated cities:", results[8]);
  console.log(
    "10. Total population of the world:",
    results[9][0].world_population,
  );

  connection.end();
});
