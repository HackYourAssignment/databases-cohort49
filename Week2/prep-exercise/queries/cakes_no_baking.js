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

const getCakesNoBaking = () => {
  connection.query(
    `SELECT recipe_name FROM recipes 
     JOIN categories ON recipes.category_id = categories.id 
     WHERE categories.name = 'cake' AND requires_baking = false`,
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }
      console.log(results);
    }
  );

  connection.end();
};

getCakesNoBaking();
