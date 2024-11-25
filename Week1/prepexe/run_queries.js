import connection from './dbConnection.js';
import fs from 'fs';

// Function to run SQL from a file
const runSQLFile = (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf-8');
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(`Executed SQL from ${filePath}`, results);
  });
};
// Run create tables SQL
runSQLFile('./foodprep.sql');
// Query to get all vegetarian recipes with potatoes
const allVegetarianRecipesWithPotatoes = `
SELECT r.name AS recipe_name
FROM Recipe r
JOIN Recipe_Category rc ON r.recipe_id = rc.recipe_id
JOIN Recipe_Ingredient ri ON r.recipe_id = ri.recipe_id
JOIN Ingredient i ON ri.ingredient_id = i.ingredient_id
WHERE rc.category_id = (SELECT category_id FROM Category WHERE name = 'Vegetarian')
  AND i.name LIKE '%potato%';
`;

// Query to get all cakes that do not need baking
const allNoBakingCakeRecipes = `
SELECT r.name AS recipe_name
FROM Recipe r
JOIN Recipe_Category rc ON r.recipe_id = rc.recipe_id
JOIN Category c ON rc.category_id = c.category_id
WHERE c.name = 'Cake'
AND r.recipe_id NOT IN (
    SELECT recipe_id FROM Recipe_Step
);
`;
// Query to get all vegan and Japanese recipes
const allVeganAndJapaneseRecipes = `
SELECT r.name AS recipe_name
FROM Recipe r
JOIN Recipe_Category rc ON r.recipe_id = rc.recipe_id
JOIN Category c ON rc.category_id = c.category_id
WHERE c.name IN ('Vegan', 'Japanese')
GROUP BY r.recipe_id
HAVING COUNT(DISTINCT c.category_id) = 2;
`;

// Function to run a query and log results
const runQuery = (query, description) => {
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(`${description}:`, results);
  });
};

// Execute queries
runQuery(allVegetarianRecipesWithPotatoes, 'Vegetarian recipes with potatoes');
runQuery(allNoBakingCakeRecipes, 'No-bake cake recipes');
runQuery(allVeganAndJapaneseRecipes, 'Vegan and Japanese recipes');

// Close the connection after a short delay to allow queries to complete
setTimeout(() => {
  connection.end();
}, 2000);
