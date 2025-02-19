import express from "express";
import axios from "axios";
import Joke from "../models/Joke.js";

const router = express.Router();

router.get("/joke", async (req, res) => {
  try {
    const response = await axios.get("https://teehee.dev/api/joke");
    const joke = response.data;

    let existingJoke = await Joke.findOne({ question: joke.question });

    if (existingJoke) {
      return res.json(existingJoke);
    }

    const newJoke = new Joke({
      question: joke.question,
      answer: joke.answer,
    });

    await newJoke.save();
    res.json(newJoke);
  } catch (error) {
    res.status(500).json({ message: "Error fetching joke: " + error.message });
  }
});

router.post("/joke/:jokeId", async (req, res) => {
  try {
    const { label } = req.body;
    const { jokeId } = req.params;

    const availableLabels = ["😂", "👍", "❤️"];
    if (!availableLabels.includes(label)) {
      return res.status(400).json({ message: "Invalid vote" });
    }

    const joke = await Joke.findById(jokeId);
    if (!joke) {
      return res.status(404).json({ message: "Joke not found" });
    }

    const voteIndex = joke.votes.findIndex(v => v.label === label);

    if (voteIndex !== -1) {
      joke.votes[voteIndex].value += 1;
    } else {
      joke.votes.push({ label, value: 1 });
    }

    await joke.save();
    res.json(joke);
  } catch (error) {
    console.error("Error updating votes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete a joke by ID
router.delete("/joke/:id", async (req, res) => {
  try {
    const joke = await Joke.findByIdAndDelete(req.params.id);
    if (!joke) {
      return res.status(404).json({ message: "Joke not found" });
    }
    res.json({ message: "Joke deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting joke: " + error.message });
  }
});

// UPDATE: Update a joke by ID
router.put("/joke/:id", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const joke = await Joke.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );

    if (!joke) {
      return res.status(404).json({ message: "Joke not found" });
    }

    res.json(joke);
  } catch (error) {
    res.status(500).json({ message: "Error updating joke: " + error.message });
  }
});

export default router;
