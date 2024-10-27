-- Create categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create cuisines table
CREATE TABLE cuisines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Updated recipes table
CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    is_vegetarian BOOLEAN,
    is_vegan BOOLEAN,
    requires_baking BOOLEAN,
    category_id INT,
    cuisine_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (cuisine_id) REFERENCES cuisines(id)
);

-- Ingredients table (unchanged)
CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Recipe-Ingredients Join Table (unchanged)
CREATE TABLE recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
