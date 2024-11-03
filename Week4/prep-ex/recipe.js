const recipe = {
  _id: "recipe_id",
  title: "Spaghetti Bolognese",
  description: "A classic Italian pasta dish with a rich, savory sauce.",
  servings: 4,
  prepTime: 20,
  cookTime: 45,
  ingredients: [
    { ingredient_id: "123", quantity: "200g", notes: "ground beef" },
    { ingredient_id: "124", quantity: "2 cups", notes: "diced tomatoes" },
  ],
  steps: [
    "Heat oil in a large skillet over medium heat.",
    "Add beef and cook until browned.",
  ],
  category: "Italian",
  createdAt: new Date(),
  updatedAt: new Date(),
};
module.exports = recipe;
