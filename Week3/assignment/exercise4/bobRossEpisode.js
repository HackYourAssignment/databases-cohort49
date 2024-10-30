import mongoose from "mongoose";
const { Schema } = mongoose;

const episodeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  title: String,
  season: Number,
  episode: Number,
  elements: [String],
});

const BobRossEpisode = mongoose.model("BobRossEpisode", episodeSchema);
export default BobRossEpisode;
