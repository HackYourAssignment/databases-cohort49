const mysql = require('mysql2/promise');

async function updateDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'password',
    database: 'newRecipe_db'
  });

  console.log('Connected to the database.');

  try {
    // 1. Add index to Categories and Ingredients tables
    await connection.query(`
      CREATE INDEX idx_category_name ON Categories(name);
    `);
    console.log('Index added to Categories table.');

    await connection.query(`
      CREATE INDEX idx_ingredient_name ON Ingredients(name);
    `);
    console.log('Index added to Ingredients table.');

    // 2. Create a new table, Step_Descriptions, and update the Steps table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Step_Descriptions (
        step_id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT NOT NULL
      );
    `);
    console.log('Step_Descriptions table created.');

    // Modify Steps table to link with Step_Descriptions
    await connection.query(`
      ALTER TABLE Steps
      DROP COLUMN description,
      ADD COLUMN step_description_id INT,
      ADD FOREIGN KEY (step_description_id) REFERENCES Step_Descriptions(step_id);
    `);
    console.log('Steps table modified to reference Step_Descriptions.');

    // 3. Add index to Recipe_Ingredients for performance optimization
    await connection.query(`
      CREATE INDEX idx_recipe_ingredient ON Recipe_Ingredients(recipe_id, ingredient_id);
    `);
    console.log('Index added to Recipe_Ingredients table.');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await connection.end();
    console.log('Database connection closed.');
  }
}

updateDatabase();
