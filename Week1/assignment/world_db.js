import mysql from 'mysql';
import { connectionData } from './connection.js';

const connection = mysql.createConnection(connectionData);

const query = (command, msg) => {
  connection.query(command, (error, results) => {
    if (error) {
      console.error(`Error in: ${msg}`, error);
      return;
    }
    console.log(`Results from: ${msg}`, results);
  });
};

// Connect to the database

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to the database.');
  // 1. countries with population greater than 8 million
  query(
    `SELECT name, population FROM country WHERE population > 8000000;`,
    'Countries with population greater than 8 million',
  );
  // 2.what are the name of countries that have 'land' in their names?
  query(
    `SELECT name FROM country WHERE name LIKE '%land%';`,
    'Countries with land in their names',
  );
  //3. what are the names of the cities with population in between 500,000 and 1 million?
  query(
    `SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;`,
    'Cities with population between 500,000 and 1 million',
  );
  // 4 what is the name of all counties on the continent 'Europe'?
  query(
    `SELECT name FROM country WHERE continent = 'Europe';`,
    'Countries in Europe',
  );
  // 5 list all countries in the descending order of their surface areas.
  query(
    `SELECT name, surface_area FROM country ORDER BY surface_area DESC;`,
    'Countries in descending order of their surface areas',
  );
  // 6. what are the names of all cities in the Netherlands?
  query(
    `SELECT name FROM city WHERE country_code = 'NLD';`,
    'Cities in the Netherlands',
  );
  // 7. what is the population of Rotterdam?
  query(
    `SELECT name, population FROM city WHERE name = 'Rotterdam';`,
    'Population of Rotterdam',
  );
  // 8. what are the top 10 countries by surface area?
  query(
    `SELECT name, surface_area FROM country ORDER BY surface_area DESC LIMIT 10;`,
    'Top 10 countries by surface area',
  );
  // 9. what are the top 10 most populated cities?
  query(
    `SELECT name, population FROM city ORDER BY population DESC LIMIT 10;`,
    'Top 10 most populated cities',
  );
  // 10. what is the population of the world?
  query(`SELECT SUM(population) FROM country;`, 'Population of the world');
  connection.end((error) => {
    if (error) throw error;
    console.log('Disconnected from the database.');
  });
});
