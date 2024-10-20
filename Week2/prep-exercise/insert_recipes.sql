-- Insert recipes
INSERT INTO recipes (recipe_name, is_vegetarian, is_vegan, requires_baking, category, cuisine) VALUES
('Vegetarian Potato Salad', true, false, false, 'salad', 'American'),
('Vegan Miso Soup', false, true, false, 'soup', 'Japanese'),
('No-Bake Chocolate Cake', false, false, false, 'cake', 'Dessert');

-- Insert ingredients
INSERT INTO ingredients (name) VALUES ('potato'), ('miso'), ('chocolate');

-- Link recipes with ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(1, 1),  -- Vegetarian Potato Salad with potato
(2, 2),  -- Vegan Miso Soup with miso
(3, 3);  -- No-Bake Chocolate Cake with chocolate
