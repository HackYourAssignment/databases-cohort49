-- Table for storing recipes
CREATE TABLE recipes (
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each recipe
  recipe_name VARCHAR(255) NOT NULL          -- Name of the recipe
);

-- Table for storing categories
CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each category
  category_name VARCHAR(100) NOT NULL         -- Name of the category (e.g., Vegetarian, Dessert)
);

-- Many-to-many relationship between recipes and categories
CREATE TABLE recipe_categories (
  recipe_id INT,                             -- Recipe ID
  category_id INT,                           -- Category ID
  PRIMARY KEY (recipe_id, category_id),      -- Composite primary key (recipe and category)
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),   -- Foreign key to the recipes table
  FOREIGN KEY (category_id) REFERENCES categories(category_id) -- Foreign key to the categories table
);

-- Table for storing ingredients
CREATE TABLE ingredients (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each ingredient
  ingredient_name VARCHAR(255) NOT NULL         -- Name of the ingredient (e.g., Flour, Egg)
);

-- Many-to-many relationship between recipes and ingredients
CREATE TABLE recipe_ingredients (
  recipe_id INT,                             -- Recipe ID
  ingredient_id INT,                         -- Ingredient ID
  PRIMARY KEY (recipe_id, ingredient_id),    -- Composite primary key
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),      -- Foreign key to the recipes table
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) -- Foreign key to the ingredients table
);

-- Table for storing steps
CREATE TABLE steps (
  step_id INT AUTO_INCREMENT PRIMARY KEY,    -- Unique ID for each step
  step_description TEXT NOT NULL             -- Description of the step (e.g., "Boil the pasta")
);

-- Many-to-many relationship between recipes and steps
CREATE TABLE recipe_steps (
  recipe_id INT,                             -- Recipe ID
  step_id INT,                               -- Step ID
  step_order INT NOT NULL,                   -- Order of the steps in the recipe
  PRIMARY KEY (recipe_id, step_id),          -- Composite primary key
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),      -- Foreign key to the recipes table
  FOREIGN KEY (step_id) REFERENCES steps(step_id)             -- Foreign key to the steps table
);
