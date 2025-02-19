import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
  question: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
  votes: {
    type: [
      {
        label: String,
        value: { type: Number, default: 0 },
      },
    ],
    default: [
      { label: "😂", value: 0 },
      { label: "👍", value: 0 },
      { label: "❤️", value: 0 },
    ],
  },
  availableVotes: { type: [String], default: ["😂", "👍", "❤️"] },
});

const Joke = mongoose.model("Joke", jokeSchema);
export default Joke;
