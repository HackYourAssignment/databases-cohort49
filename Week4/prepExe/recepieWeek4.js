import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'recipes';
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log('Successfully connected to the server');
    const db = client.db(dbName);
    // collections
    const catagoriesCollection = db.collection('categories');
    const recipesCollection = db.collection('recipes');
    const ingredientsCollection = db.collection('ingredients');
    const stepsCollection = db.collection('steps');

    // insert categories
    const categories = [
      { name: 'Cake' },
      { name: 'No-Bake' },
      { name: 'Vegan' },
    ];
    const categoryResult = await catagoriesCollection.insertMany(categories);

    // insert ingredients
    const ingredients = [
      { name: 'Condensed Milk' },
      { name: 'Cream Cheese' },
      { name: 'Lemon Juice' },
      { name: 'Pie Crust' },
      { name: 'Cherry Jam' },
    ];
    const ingredientsResult = await ingredientsCollection.insertMany(
      ingredients,
    );
    console.log(
      'Inserted ingredients successfully',
      ingredientsResult.insertedIds,
    );

    // insert steps
    const steps = [
      { description: 'Beat Cream Cheese' },
      { description: 'Add Condensed Milk and blend' },
      { description: 'Add Lemon Juice and blend' },
      { description: 'Add the mix to the pie crust' },
      { description: 'Spread the Cherry Jam' },
      { description: 'Place in refrigerator for 3 hours' },
    ];
    const stepsResult = await stepsCollection.insertMany(steps);
    console.log('Inserted steps successfully', stepsResult.insertedIds);
    // insert recipes

    const recipes = [
      {
        name: 'No-Bake Cheesecake',
        category_ids: [
          categoryResult.insertedIds[0],
          categoryResult.insertedIds[2],
        ],
        ingredient_ids: [
          ingredientsResult.insertedIds[0],
          ingredientsResult.insertedIds[1],
          ingredientsResult.insertedIds[2],
          ingredientsResult.insertedIds[3],
          ingredientsResult.insertedIds[4],
        ],
        steps_ids: stepsResult.insertedIds,
      },
    ];
    const recipesResult = await recipesCollection.insertMany(recipes);
    console.log('Inserted recipes successfully', recipesResult.insertedIds);
  } catch (error) {
    console.error('Error connecting:', error);
  } finally {
    await client.close();
  }
}
main();
