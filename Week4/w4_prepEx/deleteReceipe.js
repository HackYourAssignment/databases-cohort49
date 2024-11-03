const { connectToDatabase, closeDatabase } = require('./db');

async function deleteRecipe(recipeName) {
  const db = await connectToDatabase();
  const recipesCollection = db.collection('recipes');

  try {
    const result = await recipesCollection.deleteOne({ name: recipeName });
    console.log(`${result.deletedCount} recipe(s) deleted.`);
  } catch (error) {
    console.error("Error deleting recipe:", error);
  } finally {
    await closeDatabase();
  }
}

deleteRecipe("No-Bake Cheesecake");
