// > For this part of the assignment, use the `world.sql` file in the `week1/databases` folder to create the database and
// > tables. Before you go on, execute the file to create a database instance of the `world` database, using mysql console or
// > any tool. Test to see if it's created. Make sure all the tables (`city`, `country` and `countrylanguage`) and the
// > containing data are there.

// Write a JavaScript file (to be executed with Node.js) that queries (using select statements) the `world` database. The
// results given back should answer following questions:
// Don't omit to test your queries every time.

// 1. What are the names of countries with population greater than 8 million?
// 2. What are the names of countries that have “land” in their names?
// 3. What are the names of the cities with population in between 500,000 and 1 million?
// 4. What's the name of all the countries on the continent ‘Europe’?
// 5. List all the countries in the descending order of their surface areas.
// 6. What are the names of all the cities in the Netherlands?
// 7. What is the population of Rotterdam?
// 8. What's the top 10 countries by Surface Area?
// 9. What's the top 10 most populated cities?
// 10. What is the population number of the world?

// After you've written your **tested** queries, test to see if everything work by executing `node <FILE_NAME>`.

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();

const queries = [
  {
    query: "SELECT name FROM country WHERE population > 8000000",
    question:
      "What are the names of countries with population greater than 8 million?",
  },
  {
    query: "SELECT name FROM country WHERE name LIKE '%land%'",
    question:
      "What are the names of countries that have 'land' in their names?",
  },
  {
    query: "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
    question:
      "What are the names of the cities with population in between 500,000 and 1 million?",
  },
  {
    query: "SELECT name FROM country WHERE continent = 'Europe'",
    question: "What's the name of all the countries on the continent `Europe`?",
  },
  {
    query: "SELECT name FROM country ORDER BY surfacearea DESC",
    question:
      "List all the countries in the descending order of their surface areas.",
  },
  {
    query: "SELECT name FROM city WHERE countrycode = 'NLD'",
    question: "What are the names of all the cities in Netherlands?",
  },
  {
    query: "SELECT population FROM city WHERE name = 'Rotterdam'",
    question: "What is the population of Rotterdam?",
  },
  {
    query: "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10",
    question: "What are the top 10 countries by surface area?",
  },
  {
    query: "SELECT name FROM city ORDER BY population DESC LIMIT 10",
    question: "What are the top 10 most populated cities?",
  },
  {
    query: "SELECT SUM(population) AS world_population FROM country",
    question: "What is the sum of the population of the world?",
  },
];

for (let i in queries) {
  connection.query(queries[i].query, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(`${queries[i].question}`, results);
  });
}

connection.end();
