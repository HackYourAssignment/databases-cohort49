-- Create Recipe table
CREATE TABLE Recipe (
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
-- Create Category table
CREATE TABLE Category (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
-- Create Recipe_Category junction table
CREATE TABLE Recipe_Category (
  recipe_id INT,
  category_id INT,
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
  FOREIGN KEY (category_id) REFERENCES Category(category_id),
  PRIMARY KEY (recipe_id, category_id)
);
-- Create Ingredient table
CREATE TABLE Ingredient (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
-- Create Recipe_Ingredient junction table
CREATE TABLE Recipe_Ingredient (
  recipe_id INT,
  ingredient_id INT,
  quantity VARCHAR(255),
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id),
  PRIMARY KEY (recipe_id, ingredient_id)
);
-- Create Step table
CREATE TABLE Step (
  step_id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT NOT NULL
);
-- Create Recipe_Step junction table
CREATE TABLE Recipe_Step (
  recipe_id INT,
  step_id INT,
  step_order INT,
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
  FOREIGN KEY (step_id) REFERENCES Step(step_id),
  PRIMARY KEY (recipe_id, step_id)
);