const mysql = require('mysql2');

// Create a connection to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password'
});

// Connect to MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // Drop the database if it exists to start fresh
  connection.query(`DROP DATABASE IF EXISTS newRecipe_db`, (err, result) => {
    if (err) throw err;
    console.log('Old database dropped (if existed)');

    // Create database
    connection.query(`CREATE DATABASE newRecipe_db`, (err, result) => {
      if (err) throw err;
      console.log('Database "newRecipe_db" created');

      // Switch to the new database
      connection.query(`USE newRecipe_db`, (err, result) => {
        if (err) throw err;

        // Create tables
        createTables();
      });
    });
  });
});

// Create all the necessary tables
function createTables() {
  const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS Categories (
      category_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );
  `;
  
  const createRecipesTable = `
    CREATE TABLE IF NOT EXISTS Recipes (
      recipe_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      preparation_time VARCHAR(50),
      category_id INT,
      FOREIGN KEY (category_id) REFERENCES Categories(category_id)
    );
  `;
  
  const createIngredientsTable = `
    CREATE TABLE IF NOT EXISTS Ingredients (
      ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;
  
  const createRecipeIngredientsTable = `
    CREATE TABLE IF NOT EXISTS Recipe_Ingredients (
      recipe_id INT,
      ingredient_id INT,
      PRIMARY KEY (recipe_id, ingredient_id),
      FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
      FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
    );
  `;
  
  const createStepsTable = `
    CREATE TABLE IF NOT EXISTS Steps (
      step_id INT AUTO_INCREMENT PRIMARY KEY,
      recipe_id INT,
      description TEXT NOT NULL,
      FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
    );
  `;

  // Execute the table creation queries
  connection.query(createCategoriesTable, (err, result) => {
    if (err) throw err;
    console.log('Categories table created');

    connection.query(createRecipesTable, (err, result) => {
      if (err) throw err;
      console.log('Recipes table created');

      connection.query(createIngredientsTable, (err, result) => {
        if (err) throw err;
        console.log('Ingredients table created');

        connection.query(createRecipeIngredientsTable, (err, result) => {
          if (err) throw err;
          console.log('Recipe_Ingredients table created');

          connection.query(createStepsTable, (err, result) => {
            if (err) throw err;
            console.log('Steps table created');

            // Insert data after tables are created
            insertData();
          });
        });
      });
    });
  });
}

// Insert data into tables
function insertData() {
  const insertCategories = `
    INSERT INTO Categories (name) VALUES 
    ('Cake'), 
    ('Vegan'), 
    ('Vegetarian'), 
    ('Japanese'), 
    ('Gluten-Free'), 
    ('No-Bake');
  `;
  
  connection.query(insertCategories, (err, result) => {
    if (err) throw err;
    console.log('Categories inserted');

    const insertRecipes = `
      INSERT INTO Recipes (name, preparation_time, category_id) VALUES 
      ('No-Bake Cheesecake', '180 mins', 1),
      ('Roasted Brussels Sprouts', '30 mins', 2),
      ('Mac & Cheese', '15 mins', 3),
      ('Tamagoyaki Japanese Omelette', '5 mins', 4);
    `;
    
    connection.query(insertRecipes, (err, result) => {
      if (err) throw err;
      console.log('Recipes inserted');

      const insertIngredients = `
        INSERT INTO Ingredients (name) VALUES 
        ('Condensed Milk'), 
        ('Cream Cheese'), 
        ('Lemon Juice'), 
        ('Pie Crust'), 
        ('Cherry Jam'), 
        ('Brussels Sprouts'), 
        ('Sesame seeds'), 
        ('Macaroni'), 
        ('Cheddar cheese'), 
        ('Eggs'), 
        ('Soy sauce'), 
        ('Sugar'), 
        ('Salt'), 
        ('Olive Oil');
      `;
      
      connection.query(insertIngredients, (err, result) => {
        if (err) throw err;
        console.log('Ingredients inserted');

        const insertRecipeIngredients = `
          INSERT INTO Recipe_Ingredients (recipe_id, ingredient_id) VALUES 
          (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),  -- No-Bake Cheesecake Ingredients
          (2, 6), (2, 7),                          -- Roasted Brussels Sprouts Ingredients
          (3, 8), (3, 9), (3, 13),                 -- Mac & Cheese Ingredients
          (4, 10), (4, 11), (4, 12), (4, 13), (4, 14);  -- Tamagoyaki Japanese Omelette Ingredients
        `;
        
        connection.query(insertRecipeIngredients, (err, result) => {
          if (err) throw err;
          console.log('Recipe_Ingredients inserted');

          const insertSteps = `
            INSERT INTO Steps (recipe_id, description) VALUES
            (1, 'Beat Cream Cheese'),
            (1, 'Add condensed Milk and blend'),
            (1, 'Add Lemon Juice and blend'),
            (1, 'Add the mix to the pie crust'),
            (1, 'Spread the Cherry Jam'),
            (1, 'Place in refrigerator for 3h.'),
            (2, 'Preheat the oven'),
            (2, 'Mix the ingredients in a bowl'),
            (2, 'Spread the mix on baking sheet'),
            (2, 'Bake for 30 minutes'),
            (3, 'Cook Macaroni for 8 minutes'),
            (3, 'Melt butter in a saucepan'),
            (3, 'Add flour, salt, pepper and mix'),
            (3, 'Add Milk and mix'),
            (3, 'Cook until mix is smooth'),
            (3, 'Add cheddar cheese'),
            (3, 'Add the macaroni'),
            (4, 'Beat the eggs'),
            (4, 'Add soya sauce, sugar and salt'),
            (4, 'Add oil to a sauce pan'),
            (4, 'Bring to medium heat'),
            (4, 'Add some mix to the sauce pan'),
            (4, 'Let it cook for 1 minute'),
            (4, 'Remove pan from fire');
          `;
          
          connection.query(insertSteps, (err, result) => {
            if (err) throw err;
            console.log('Steps inserted');
            
            connection.end(); // Close the connection after all data is inserted
          });
        });
      });
    });
  });
}
