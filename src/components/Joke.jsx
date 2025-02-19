import React, { useState, useEffect } from "react";
import "../index.css";

const Joke = ({ joke, onNext }) => {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    if (joke?.availableVotes) {
      const initialVotes = joke.availableVotes.map((emoji) => {
        const existingVote = joke.votes?.find((vote) => vote.label === emoji);
        return {
          label: emoji,
          value: existingVote ? existingVote.value : 0,
        };
      });
      setVotes(initialVotes);
    }
  }, [joke]);

  if (!joke || !joke._id) return <div>Loading...</div>; 

  const handleVote = async (label) => {
    try {
      const response = await fetch(`http://localhost:5000/api/joke/${joke._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, value: 1 }),
      });

      if (!response.ok) throw new Error("Failed to vote");

      const updatedJoke = await response.json();
      setVotes(updatedJoke.votes || []);
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  return (
    <div className="joke-container">
      <div className="joke">
        <h2>{joke.question}</h2>
        <p>{joke.answer}</p>
      </div>
      <div className="votes">
        {votes.map(({ label, value }) => (
          <button key={label} className="emoji-btn" onClick={() => handleVote(label)}>
            {label} {value} votes
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={onNext}>Next Joke</button>
    </div>
  );
};

export default Joke;
