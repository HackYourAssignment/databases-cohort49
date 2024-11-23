const { connectToDatabase, closeDatabase } = require('./db');

async function listRecipes() {
  const db = await connectToDatabase();
  const recipesCollection = db.collection('recipes');

  try {
    // Example: Find all recipes in the "Cake" category
    const recipes = await recipesCollection.find({ category: "Cake" }).toArray();
    console.log("Recipes in 'Cake' category:", recipes);
  } catch (error) {
    console.error("Error listing recipes:", error);
  } finally {
    await closeDatabase();
  }
}

listRecipes();
