-- Insert into categories
INSERT INTO categories (name) VALUES 
('salad'), 
('soup'), 
('cake');

-- Insert into cuisines
INSERT INTO cuisines (name) VALUES 
('American'), 
('Japanese'), 
('Dessert');

-- Insert recipes with new foreign keys
INSERT INTO recipes (recipe_name, is_vegetarian, is_vegan, requires_baking, category_id, cuisine_id) VALUES
('Vegetarian Potato Salad', true, false, false, 1, 1),
('Vegan Miso Soup', false, true, false, 2, 2),
('No-Bake Chocolate Cake', false, false, false, 3, 3);

-- Insert ingredients (unchanged)
INSERT INTO ingredients (name) VALUES 
('potato'), 
('miso'), 
('chocolate');

-- Link recipes with ingredients (unchanged)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(1, 1),  -- Vegetarian Potato Salad with potato
(2, 2),  -- Vegan Miso Soup with miso
(3, 3);  -- No-Bake Chocolate Cake with chocolate
