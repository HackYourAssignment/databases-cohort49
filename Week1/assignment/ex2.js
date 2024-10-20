import mysql from "mysql2/promise";
import { connectionData } from "./connectionData.js";

const main = async () => {
  const connection = await mysql.createConnection(connectionData);

  try {
    await connection.query("USE new_world;");

    // 1. What are the names of countries with population greater than 8 million?
    await connection.query(`SELECT Name FROM country
         WHERE Population > 8000000;`);

    // 2. What are the names of countries that have “land” in their names?
    await connection.query(`SELECT Name FROM country
         WHERE Name LIKE '%land%';`);

    // 3. What are the names of the cities with population in between 500,000 and 1 million?
    await connection.query(`SELECT Name FROM city
         WHERE Population BETWEEN 500000 AND 1000000;`);

    // 4. What's the name of all the countries on the continent ‘Europe’?
    await connection.query(`SELECT Name FROM country
         WHERE Continent = 'Europe';`);

    // 5. List all the countries in the descending order of their surface areas.
    await connection.query(`SELECT Name FROM country
         ORDER BY SurfaceArea DESC;`);

    // 6. What are the names of all the cities in the Netherlands?
    await connection.query(`SELECT Name FROM city
         WHERE CountryCode = 'NLD';`);

    // 7. What is the population of Rotterdam?
    await connection.query(`SELECT Population FROM city
         WHERE Name = 'Rotterdam';`);

    // 8. What's the top 10 countries by Surface Area?
    await connection.query(`SELECT Name FROM country
         ORDER BY SurfaceArea DESC
         LIMIT 10;`);

    // 9. What's the top 10 most populated cities?
    await connection.query(`SELECT Name FROM city
         ORDER BY Population DESC 
         LIMIT 10;`);

    // 10. What is the population number of the world?
    await connection.query(`SELECT SUM(Population) FROM country`);
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

main();
