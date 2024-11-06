const { ObjectId } = require("mongodb");
const { connectToDB } = require("./bobRossEpisode");

async function addEpisode(data) {
  const { collection, client } = await connectToDB();
  const result = await collection.insertOne(data);
  console.log("Episode added:", result.insertedId);
  await client.close();
}

async function findAllEpisodes() {
  const { collection, client } = await connectToDB();
  const episodes = await collection.find().toArray();
  console.log("All episodes:", episodes);
  await client.close();
}

async function updateEpisode(id, data) {
  const { collection, client } = await connectToDB();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data },
  );
  if (result.matchedCount > 0) {
    console.log(
      "Updated episode:",
      await collection.findOne({ _id: new ObjectId(id) }),
    );
  } else {
    console.log("Episode not found");
  }
  await client.close();
}

async function deleteEpisode(id) {
  const { collection, client } = await connectToDB();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount > 0) {
    console.log("Episode deleted");
  } else {
    console.log("Episode not found");
  }
  await client.close();
}

(async () => {
  try {
    await addEpisode({
      title: "Mountain Retreat",
      season: 3,
      episode: 5,
      elements: ["mountain", "trees", "clouds"],
    });

    await findAllEpisodes();

    await updateEpisode("672b543647baefc1687546c9", {
      title: "New Title",
      season: 4,
    });

    await deleteEpisode("672b543647baefc1687546c9");
  } catch (error) {
    console.error("Error in CRUD operations:", error);
  }
})();
