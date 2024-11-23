const { connectToDatabase, closeDatabase } = require('./db');

async function updateRecipe(recipeName, updatedFields) {
  const db = await connectToDatabase();
  const recipesCollection = db.collection('recipes');

  try {
    const result = await recipesCollection.updateOne(
      { name: recipeName },
      { $set: updatedFields }
    );
    console.log(`${result.modifiedCount} recipe(s) updated.`);
  } catch (error) {
    console.error("Error updating recipe:", error);
  } finally {
    await closeDatabase();
  }
}

updateRecipe("No-Bake Cheesecake", { preparation_time: "200 mins" });
