const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

const getVegetarianPotatoes = () => {
  connection.query(
    `
    SELECT recipe_name FROM recipes 
    JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
    JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id
    WHERE ingredients.name = 'potato' AND recipes.is_vegetarian = true
  `,
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }
      console.log(results);
    }
  );

  // Close the connection after the query is complete
  connection.end();
};

getVegetarianPotatoes();
