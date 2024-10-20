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
--insert recipe
INSERT INTO Recipe (name)
VALUES ('No-Bake Cheesecake'),
  ('Roasted Brussels Sprouts'),
  ('Mac & Cheese'),
  ('Tamagoyaki Japanese Omelette');
--insert category
INSERT INTO Category (name)
VALUES ('Cake'),
  ('No-Bake'),
  ('Vegetarian'),
  ('Vegan'),
  ('Gluten-Free'),
  ('Japanese');
-- Insert Ingredients
INSERT INTO Ingredient (name)
VALUES ('Condensed milk'),
  ('Cream Cheese'),
  ('Lemon Juice'),
  ('Pie Crust'),
  ('Cherry Jam'),
  ('Brussels Sprouts'),
  ('Sesame seeds'),
  ('Pepper'),
  ('Salt'),
  ('Olive Oil'),
  ('Macaroni'),
  ('Butter'),
  ('Flour'),
  ('Milk'),
  ('Shredded Cheddar cheese'),
  ('Eggs'),
  ('Soy sauce'),
  ('Sugar');
-- Insert Steps
INSERT INTO Step (description)
VALUES -- No-Bake Cheesecake
  ('Beat Cream Cheese'),
  ('Add condensed Milk and blend'),
  ('Add Lemon Juice and blend'),
  ('Add the mix to the pie crust'),
  ('Spread the Cherry Jam'),
  ('Place in refrigerator for 3 hours'),
  -- Roasted Brussels Sprouts
  ('Preheat the oven'),
  ('Mix the ingredients in a bowl'),
  ('Spread the mix on baking sheet'),
  ('Bake for 30 minutes'),
  -- Mac & Cheese
  ('Cook Macaroni for 8 minutes'),
  ('Melt butter in a saucepan'),
  ('Add flour, salt, pepper and mix'),
  ('Add Milk and mix'),
  ('Cook until mix is smooth'),
  ('Add cheddar cheese'),
  ('Add the macaroni'),
  -- Tamagoyaki Japanese Omelette
  ('Beat the eggs'),
  ('Add soy sauce, sugar, and salt'),
  ('Add oil to a sauce pan'),
  ('Bring to medium heat'),
  (
    'Add some egg mix to the pan and let it cook for 1 minute'
  ),
  ('Remove pan from fire');
-- link recipe to category
-- cake, no-bake, vegetarian
INSERT INTO Recipe_Category (recipe_id, category_id)
VALUES (1, 1),
  (1, 2),
  (1, 3);
-- Vegan, Gluten-Free
INSERT INTO Recipe_Category (recipe_id, category_id)
VALUES (2, 4),
  -- Vegan
  (2, 5);
-- Gluten-Free
-- Mac & Cheese categories: Vegetarian
INSERT INTO Recipe_Category (recipe_id, category_id)
VALUES (3, 3);
-- Vegetarian
-- Tamagoyaki Japanese Omelette categories: Japanese, Vegetarian
INSERT INTO Recipe_Category (recipe_id, category_id)
VALUES (4, 6),
  -- Japanese
  (4, 3);
-- Vegetarian
-- Link Recipes with Ingredients and quantities
INSERT INTO Recipe_Ingredient (recipe_id, ingredient_id, quantity)
VALUES (1, 1, '1 can'),
  -- Condensed milk
  (1, 2, '200g'),
  -- Cream Cheese
  (1, 3, '2 tbsp'),
  -- Lemon Juice
  (1, 4, '1 piece'),
  -- Pie Crust
  (1, 5, '100g');
-- Cherry Jam
-- Roasted Brussels Sprouts ingredients
INSERT INTO Recipe_Ingredient (recipe_id, ingredient_id, quantity)
VALUES (2, 6, '500g'),
  -- Brussels Sprouts
  (2, 3, '2 tbsp'),
  -- Lemon Juice
  (2, 7, '1 tsp'),
  -- Sesame seeds
  (2, 8, 'To taste'),
  -- Pepper
  (2, 9, 'To taste'),
  -- Salt
  (2, 10, '2 tbsp');
-- Olive Oil
-- Mac & Cheese ingredients
INSERT INTO Recipe_Ingredient (recipe_id, ingredient_id, quantity)
VALUES (3, 11, '200g'),
  -- Macaroni
  (3, 12, '2 tbsp'),
  -- Butter
  (3, 13, '2 tbsp'),
  -- Flour
  (3, 9, 'To taste'),
  -- Salt
  (3, 8, 'To taste'),
  -- Pepper
  (3, 14, '200ml'),
  -- Milk
  (3, 15, '150g');
-- Shredded Cheddar cheese
-- Tamagoyaki Japanese Omelette ingredients
INSERT INTO Recipe_Ingredient (recipe_id, ingredient_id, quantity)
VALUES (4, 16, '3 large'),
  -- Eggs
  (4, 17, '2 tbsp'),
  -- Soy sauce
  (4, 18, '1 tsp'),
  -- Sugar
  (4, 9, 'To taste'),
  -- Salt
  (4, 10, '1 tbsp');
-- Olive Oil
-- Link Recipes with Steps (recipe_id, step_id, step_order)
-- No-Bake Cheesecake steps
INSERT INTO Recipe_Step (recipe_id, step_id, step_order)
VALUES (1, 1, 1),
  (1, 2, 2),
  (1, 3, 3),
  (1, 4, 4),
  (1, 5, 5),
  (1, 6, 6);
-- Roasted Brussels Sprouts steps
INSERT INTO Recipe_Step (recipe_id, step_id, step_order)
VALUES (2, 7, 1),
  (2, 8, 2),
  (2, 9, 3),
  (2, 10, 4);
-- Mac & Cheese steps
INSERT INTO Recipe_Step (recipe_id, step_id, step_order)
VALUES (3, 11, 1),
  (3, 12, 2),
  (3, 13, 3),
  (3, 14, 4),
  (3, 15, 5),
  (3, 16, 6),
  (3, 17, 7);
-- Tamagoyaki Japanese Omelette steps
INSERT INTO Recipe_Step (recipe_id, step_id, step_order)
VALUES (4, 18, 1),
  (4, 19, 2),
  (4, 20, 3),
  (4, 21, 4),
  (4, 22, 5),
  (4, 23, 6);