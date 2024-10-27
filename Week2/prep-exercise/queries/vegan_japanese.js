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

const getVeganJapaneseRecipes = () => {
  connection.query(
    `SELECT recipe_name FROM recipes 
     JOIN cuisines ON recipes.cuisine_id = cuisines.id 
     WHERE is_vegan = true AND cuisines.name = 'Japanese'`,
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

getVeganJapaneseRecipes();
