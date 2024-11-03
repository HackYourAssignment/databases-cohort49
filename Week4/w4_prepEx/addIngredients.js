const { connectToDatabase, closeDatabase } = require('./db');

async function addIngredients() {
  const db = await connectToDatabase();
  const ingredientsCollection = db.collection('ingredients');

  const ingredients = [
    { name: "Condensed Milk", calories: 130 },
    { name: "Cream Cheese", calories: 200 },
    { name: "Lemon Juice", calories: 10 },
    { name: "Pie Crust", calories: 150 },
    { name: "Cherry Jam", calories: 80 }
  ];

  try {
    const result = await ingredientsCollection.insertMany(ingredients);
    console.log("Ingredients inserted with IDs:", result.insertedIds);
  } catch (error) {
    console.error("Error adding ingredients:", error);
  } finally {
    await closeDatabase();
  }
}

addIngredients();
