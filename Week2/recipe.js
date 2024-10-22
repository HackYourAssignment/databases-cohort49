const mysql = require('mysql');

/**
 * Creates a connection to the MySQL database.
 * 
 * @constant {object} connection - The MySQL connection object.
 * @property {string} host - The hostname of the database you are connecting to.
 * @property {string} user - The MySQL user to authenticate as.
 * @property {string} password - The password of that MySQL user.
 * @property {string} database - The name of the database to use for this connection.
 */
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "myRecipes",
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');

    /**
     * Query to select the names of recipes that are categorized as 'Vegetarian' 
     * and contain the ingredient 'Potato'.
     *
     * The query joins the following tables:
     * - recipes (r)
     * - recipe_ingredients (ri)
     * - ingredients (i)
     * - recipe_categories (rc)
     * - categories (c)
     *
     * The WHERE clause filters the results to include only recipes that belong 
     * to the 'Vegetarian' category and have 'Potato' as an ingredient.
     *
     * @constant {string} query - The SQL query string.
     */
    const query = `SELECT r.name AS Recipe
                   FROM recipes r
                   JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
                   JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
                   JOIN recipe_categories rc ON r.recipe_id = rc.recipe_id
                   JOIN categories c ON rc.category_id = c.category_id
                   WHERE c.name = 'Vegetarian' AND i.name = 'Potato'`;

    connection.query(query, (err, results) => {
        if (err) throw err;
        console.log('Vegetarian recipes with potatoes:', results);
    });

    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
            return;
        }
        console.log('Connection closed.');
    });
});
