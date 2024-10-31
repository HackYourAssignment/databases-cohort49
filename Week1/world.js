const mysql = require("mysql2/promise");

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser", // Replace with your MySQL username
    password: "hyfpassword", // Replace with your MySQL password
    database: "new_world", // Use the correct database name
  });

  const queryDatabase = async (query) => {
    const [results] = await connection.query(query);
    return results;
  };

  try {
    // Query 1: Names of countries with population greater than 8 million
    const countriesOver8Million = await queryDatabase(`
      SELECT Name FROM country WHERE Population > 8000000
    `);
    console.log(
      "Countries with population greater than 8 million:",
      countriesOver8Million.map((c) => c.Name)
    );

    // Query 2: Names of countries that have “land” in their names
    const countriesWithLand = await queryDatabase(`
      SELECT Name FROM country WHERE Name LIKE '%land%'
    `);
    console.log(
      "Countries with 'land' in their names:",
      countriesWithLand.map((c) => c.Name)
    );

    // Query 3: Names of cities with population between 500,000 and 1 million
    const citiesBetween500kAnd1M = await queryDatabase(`
      SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000
    `);
    console.log(
      "Cities with population between 500,000 and 1 million:",
      citiesBetween500kAnd1M.map((c) => c.Name)
    );

    // Query 4: Names of all the countries on the continent ‘Europe’
    const europeanCountries = await queryDatabase(`
      SELECT Name FROM country WHERE Continent = 'Europe'
    `);
    console.log(
      "Countries in Europe:",
      europeanCountries.map((c) => c.Name)
    );

    // Query 5: All countries in descending order of their surface areas
    const countriesByArea = await queryDatabase(`
      SELECT Name FROM country ORDER BY SurfaceArea DESC
    `);
    console.log(
      "Countries by surface area (descending):",
      countriesByArea.map((c) => c.Name)
    );

    // Query 6: Names of all the cities in the Netherlands
    const citiesInNetherlands = await queryDatabase(`
      SELECT Name FROM city WHERE CountryCode = (SELECT Code FROM country WHERE Name = 'Netherlands')
    `);
    console.log(
      "Cities in the Netherlands:",
      citiesInNetherlands.map((c) => c.Name)
    );

    // Query 7: Population of Rotterdam
    const rotterdamPopulation = await queryDatabase(`
      SELECT Population FROM city WHERE Name = 'Rotterdam'
    `);
    console.log(
      "Population of Rotterdam:",
      rotterdamPopulation.length > 0
        ? rotterdamPopulation[0].Population
        : "Not found"
    );

    // Query 8: Top 10 countries by Surface Area
    const top10CountriesByArea = await queryDatabase(`
      SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10
    `);
    console.log("Top 10 countries by surface area:", top10CountriesByArea);

    // Query 9: Top 10 most populated cities
    const top10PopulatedCities = await queryDatabase(`
      SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10
    `);
    console.log("Top 10 most populated cities:", top10PopulatedCities);

    // Query 10: Population number of the world
    const worldPopulation = await queryDatabase(`
      SELECT SUM(Population) AS TotalPopulation FROM country
    `);
    console.log("World population:", worldPopulation[0].TotalPopulation);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
    console.log("Connection closed.");
  }
}

// Run the main function
main();
