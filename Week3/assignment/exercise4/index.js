import mongoose from "mongoose";
import dotenv from "dotenv";
import BobRossEpisode from "./bobRossEpisode.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

async function addEpisode(data) {
  const episode = new BobRossEpisode(data);
  await episode.save();
  console.log("Episode added:", episode);
}

addEpisode({
  title: "Mountain Retreat",
  season: 3,
  episode: 5,
  elements: ["mountain", "trees", "clouds"],
});

async function findAllEpisodes() {
  const episodes = await BobRossEpisode.find();
  console.log("All episodes:", episodes);
}

findAllEpisodes();

async function updateEpisode(id, data) {
  const episode = await BobRossEpisode.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (episode) {
    console.log("Updated episode:", episode);
  } else {
    console.log("Updated episode:", episode);
  }
}
updateEpisode("61426985e216000000477259");

async function deleteEpisode(id) {
  const episode = await BobRossEpisode.findByIdAndDelete(id);
  if (episode) {
    console.log("Episode deleted");
  } else {
    console.log("Episode not found");
  }
}

deleteEpisode("61426985e216000000477259");
