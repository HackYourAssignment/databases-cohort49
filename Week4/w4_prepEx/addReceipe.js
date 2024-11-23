const { connectToDatabase, closeDatabase } = require('./db');

async function addRecipe() {
  const db = await connectToDatabase();
  const ingredientsCollection = db.collection('ingredients');
  const recipesCollection = db.collection('recipes');

  try {
    // Find ingredient IDs by name
    const ingredientNames = ["Condensed Milk", "Cream Cheese", "Lemon Juice", "Pie Crust", "Cherry Jam"];
    const ingredientDocs = await ingredientsCollection.find({ name: { $in: ingredientNames } }).toArray();
    const ingredientIds = ingredientDocs.map(doc => doc._id);

    const recipe = {
      name: "No-Bake Cheesecake",
      preparation_time: "180 mins",
      category: "Cake",
      ingredients: ingredientIds,  // References to ingredient IDs
      steps: [
        "Beat Cream Cheese",
        "Add condensed Milk and blend",
        "Add Lemon Juice and blend",
        "Add the mix to the pie crust",
        "Spread the Cherry Jam",
        "Place in refrigerator for 3h."
      ]
    };

    const result = await recipesCollection.insertOne(recipe);
    console.log("Recipe inserted with ID:", result.insertedId);
  } catch (error) {
    console.error("Error adding recipe:", error);
  } finally {
    await closeDatabase();
  }
}

addRecipe();
